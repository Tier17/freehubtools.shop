'use client';

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Line, Text, Rect, Image, Transformer } from 'react-konva';

export interface Annotation {
  id: string;
  type: 'text' | 'line' | 'rect' | 'image' | 'redact';
  page: number;
  x: number; // PDF Point coordinates (unscaled)
  y: number; // PDF Point coordinates (unscaled)
  width?: number; // PDF Point units
  height?: number; // PDF Point units
  text?: string;
  fontSize?: number;
  points?: number[]; // PDF Point coordinates
  color?: string;
  image?: HTMLImageElement; // For display
  imageBuffer?: ArrayBuffer; // For export
  imageType?: string; // 'image/png' or 'image/jpeg'
  rotation?: number;
}

interface PdfEditorCanvasProps {
  width: number;
  height: number;
  scale: number;
  tool: string;
  annotations: Annotation[];
  drawingAnnotation: Annotation | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (newAttrs: Annotation) => void;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: (e: any) => void;
}

export default function PdfEditorCanvas({
  width,
  height,
  scale,
  tool,
  annotations,
  drawingAnnotation,
  selectedId,
  onSelect,
  onChange,
  onMouseDown,
  onMouseMove,
  onMouseUp
}: PdfEditorCanvasProps) {
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (selectedId && trRef.current) {
      // we need to attach transformer manually
      const node = trRef.current.getStage().findOne('.' + selectedId);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, annotations]);

  const handleDragEnd = (e: any, ann: Annotation) => {
    onChange({
      ...ann,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any, ann: Annotation) => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = trRef.current.nodes()[0];
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
    
    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);

    onChange({
      ...ann,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: newWidth,
      height: newHeight,
      rotation: node.rotation(),
    });
  };

  const selectedAnn = annotations.find(a => a.id === selectedId);

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={(e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          onSelect(null);
        }
        onMouseDown(e);
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={
        tool === 'text' ? 'cursor-text' :
        tool !== 'move' ? 'cursor-crosshair' : 
        'cursor-default'
      }
    >
      <Layer scaleX={scale} scaleY={scale}>
        {(drawingAnnotation ? [...annotations, drawingAnnotation] : annotations).map((ann) => {
          const isSelected = ann.id === selectedId;
          const commonProps = {
             key: ann.id,
             id: ann.id,
             name: ann.id,
             draggable: tool === 'move',
             onClick: () => {
               if (tool === 'move') onSelect(ann.id);
             },
             onTap: () => {
               if (tool === 'move') onSelect(ann.id);
             },
             onDragEnd: (e: any) => handleDragEnd(e, ann),
          };

          if (ann.type === 'line') {
            return (
              <Line
                {...commonProps}
                points={ann.points}
                stroke={ann.color}
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                // Lines cannot be transformed easily with Rect transformer in Konva without complex logic
                // So we disable selection for lines for now, or just allow move
              />
            );
          } else if (ann.type === 'text') {
            return (
              <Text
                {...commonProps}
                x={ann.x}
                y={ann.y}
                text={ann.text}
                fontSize={ann.fontSize || 16}
                fill={ann.color}
                width={ann.width}
                rotation={ann.rotation}
                onTransformEnd={(e) => {
                   const node = e.target;
                   const scaleX = node.scaleX();
                   
                   // Update font size based on scale
                   const newFontSize = Math.round((ann.fontSize || 16) * scaleX);
                   
                   onChange({
                      ...ann,
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      fontSize: newFontSize,
                      width: node.width() * scaleX,
                   });
                   // Reset scale
                   node.scaleX(1);
                   node.scaleY(1);
                }}
              />
            );
          } else if (ann.type === 'rect' || ann.type === 'redact') {
            return (
              <Rect
                {...commonProps}
                x={ann.x}
                y={ann.y}
                width={ann.width}
                height={ann.height}
                fill={ann.type === 'redact' ? '#000000' : 'transparent'}
                stroke={ann.type === 'redact' ? 'none' : '#64748b'}
                strokeWidth={2}
                rotation={ann.rotation}
                onTransformEnd={(e) => handleTransformEnd(e, ann)}
              />
            );
          } else if (ann.type === 'image' && ann.image) {
             return (
              <Image
                {...commonProps}
                image={ann.image}
                x={ann.x}
                y={ann.y}
                width={ann.width}
                height={ann.height}
                rotation={ann.rotation}
                onTransformEnd={(e) => handleTransformEnd(e, ann)}
              />
            );
          }
          return null;
        })}
        
        {selectedId && tool === 'move' && selectedAnn?.type !== 'line' && (
           <Transformer
             ref={trRef}
             keepRatio={selectedAnn?.type === 'text'}
             enabledAnchors={selectedAnn?.type === 'text' ? ['top-left', 'top-right', 'bottom-left', 'bottom-right'] : undefined}
             boundBoxFunc={(oldBox, newBox) => {
               // limit resize
               if (newBox.width < 5 || newBox.height < 5) {
                 return oldBox;
               }
               return newBox;
             }}
           />
        )}
      </Layer>
    </Stage>
  );
}
