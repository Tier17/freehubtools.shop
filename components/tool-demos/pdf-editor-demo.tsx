'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, Download, ZoomIn, ZoomOut, 
  Type, Pen, Square, Image as ImageIcon, 
  ChevronLeft, ChevronRight,
  Move, Ban, Trash2,
  Save, Loader2
} from 'lucide-react';
import PdfThumbnail from './pdf-thumbnail';
// import * as pdfjsLib from 'pdfjs-dist'; // Removed top-level import to fix DOMMatrix error
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { PDFDocumentProxy } from 'pdfjs-dist';

import type { Annotation } from './pdf-editor-canvas';

// Import Konva components dynamically to avoid SSR issues
const PdfEditorCanvas = dynamic(() => import('./pdf-editor-canvas'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-muted/20">Loading Editor...</div>
});

export function PdfEditorDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [pageSize, setPageSize] = useState<{width: number, height: number} | null>(null);

  const [tool, setTool] = useState<'move' | 'text' | 'draw' | 'rect' | 'redact'>('move');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [drawingAnnotation, setDrawingAnnotation] = useState<Annotation | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Drawing state
  const isDrawing = useRef<boolean>(false);
  const currentLine = useRef<Annotation | null>(null);
  const startPos = useRef<{x: number, y: number} | null>(null); // For rect drag-create

  // Initialize PDF.js worker safely
  useEffect(() => {
    const initPdf = async () => {
        if (typeof window !== 'undefined') {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        }
    }
    initPdf();
  }, []);

  const resetEditor = () => {
    setFile(null);
    setPdfDoc(null);
    setNumPages(0);
    setCurrentPage(1);
    setAnnotations([]);
    setTool('move');
    setScale(1.0);
    currentLine.current = null;
    isDrawing.current = false;
    setSelectedId(null);
    startPos.current = null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      resetEditor(); // Reset state before loading new file
      
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist');
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
        alert("Failed to load PDF. Please try another file.");
      }
    }
  };

  // Render PDF Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Update page size state for Stage sync
        setPageSize({
            width: viewport.width / scale, // Store unscaled width
            height: viewport.height / scale // Store unscaled height
        });

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        if (!isCancelled) {
          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error("Error rendering page:", error);
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, currentPage, scale]);

  // Handle Konva Stage Events for Drawing
  const handleMouseDown = (e: any) => {
    // If we clicked on a transformer anchor or shape while in move mode, do nothing here
    if (tool === 'move') return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    // Convert screen coordinates to PDF point coordinates
    const pdfX = pos.x / scale;
    const pdfY = pos.y / scale;

    if (tool === 'draw') {
      isDrawing.current = true;
      const newLine: Annotation = {
        id: Date.now().toString(),
        type: 'line',
        page: currentPage,
        x: 0,
        y: 0,
        points: [pdfX, pdfY], // Store unscaled points
        color: '#ef4444', // Red color
      };
      setDrawingAnnotation(newLine);
    } else if (tool === 'text') {
      // Create default text without prompt
      const newText: Annotation = {
        id: Date.now().toString(),
        type: 'text',
        page: currentPage,
        x: pdfX,
        y: pdfY,
        text: "Double click to edit",
        color: '#000000',
        width: 200, // Default width
      };
      setAnnotations([...annotations, newText]);
      setTool('move');
      setSelectedId(newText.id);
    } else if (tool === 'rect' || tool === 'redact') {
       isDrawing.current = true;
       startPos.current = { x: pdfX, y: pdfY };
       
       const newRect: Annotation = {
        id: Date.now().toString(),
        type: tool,
        page: currentPage,
        x: pdfX,
        y: pdfY,
        width: 1, // Start small
        height: 1,
        color: tool === 'redact' ? '#000000' : 'transparent',
      };
      setDrawingAnnotation(newRect);
    }
  };

  const handleMouseMove = (e: any) => {
    if (tool === 'move') return;

    if (tool === 'draw' && isDrawing.current && drawingAnnotation) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      if (!point) return;

      // Convert to PDF points
      const pdfX = point.x / scale;
      const pdfY = point.y / scale;

      const currentPoints = drawingAnnotation.points || [];
      const newPoints = currentPoints.concat([pdfX, pdfY]);
      
      setDrawingAnnotation({ ...drawingAnnotation, points: newPoints });
    } else if ((tool === 'rect' || tool === 'redact') && isDrawing.current && drawingAnnotation && startPos.current) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      if (!point) return;

      const pdfX = point.x / scale;
      const pdfY = point.y / scale;

      const newWidth = Math.abs(pdfX - startPos.current.x);
      const newHeight = Math.abs(pdfY - startPos.current.y);
      const newX = Math.min(pdfX, startPos.current.x);
      const newY = Math.min(pdfY, startPos.current.y);

      setDrawingAnnotation({
          ...drawingAnnotation,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current && drawingAnnotation) {
        setAnnotations(prev => [...prev, drawingAnnotation]);
        
        if (tool === 'rect' || tool === 'redact') {
             // Auto switch to move tool after creating shape and select it
             setSelectedId(drawingAnnotation.id);
             setTool('move');
        }
    }
    isDrawing.current = false;
    setDrawingAnnotation(null);
    startPos.current = null;
  };

  const handleAnnotationChange = (newAttrs: Annotation) => {
     setAnnotations(prev => prev.map(a => a.id === newAttrs.id ? newAttrs : a));
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      
      // 1. Read as DataURL for Konva Display
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new window.Image();
        imgObj.src = event.target?.result as string;
        imgObj.onload = () => {
          
          // 2. Read as ArrayBuffer for PDF Export
          const bufferReader = new FileReader();
          bufferReader.onload = (bufferEvent) => {
             const buffer = bufferEvent.target?.result as ArrayBuffer;
             
             const newImage: Annotation = {
              id: Date.now().toString(),
              type: 'image',
              page: currentPage,
              x: 50,
              y: 50,
              image: imgObj,
              imageBuffer: buffer,
              imageType: fileType,
              width: 200,
              height: 200 * (imgObj.height / imgObj.width),
            };
            setAnnotations([...annotations, newImage]);
            setTool('move');
          };
          bufferReader.readAsArrayBuffer(file);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  const handleExport = async () => {
    if (!file) return;

    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDocLib = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDocLib.embedFont(StandardFonts.Helvetica);
      const pages = pdfDocLib.getPages();

      for (const ann of annotations) {
        if (ann.page > pages.length) continue;
        const page = pages[ann.page - 1];
        const { height } = page.getSize();
        
        // Coordinates are already in PDF points (unscaled)
        // PDF-lib uses bottom-left origin, so flip Y
        
        if (ann.type === 'text' && ann.text) {
          const size = 16;
          page.drawText(ann.text, {
            x: ann.x,
            y: height - ann.y - size, // Adjust for top-left visual origin
            size: size,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else if (ann.type === 'line' && ann.points) {
           for (let i = 0; i < ann.points.length - 2; i += 2) {
             const x1 = ann.points[i];
             const y1 = height - ann.points[i + 1];
             const x2 = ann.points[i + 2];
             const y2 = height - ann.points[i + 3];
             
             page.drawLine({
               start: { x: x1, y: y1 },
               end: { x: x2, y: y2 },
               thickness: 2,
               color: rgb(0.94, 0.27, 0.27), // Red
             });
           }
        } else if (ann.type === 'rect' || ann.type === 'redact') {
          page.drawRectangle({
            x: ann.x,
            y: height - ann.y - (ann.height || 0),
            width: ann.width,
            height: ann.height,
            color: ann.type === 'redact' ? rgb(0, 0, 0) : undefined,
            borderColor: ann.type === 'rect' ? rgb(1, 0, 0) : undefined,
            borderWidth: ann.type === 'rect' ? 2 : 0,
            rotate: ann.rotation ? { type: 'degrees', angle: -ann.rotation } : undefined, // PDF rotation is counter-clockwise
          });
        } else if (ann.type === 'image' && ann.imageBuffer) {
            let embeddedImage;
            if (ann.imageType === 'image/png') {
                embeddedImage = await pdfDocLib.embedPng(ann.imageBuffer);
            } else {
                embeddedImage = await pdfDocLib.embedJpg(ann.imageBuffer);
            }
            
            page.drawImage(embeddedImage, {
                x: ann.x,
                y: height - ann.y - (ann.height || 0),
                width: ann.width,
                height: ann.height,
                rotate: ann.rotation ? { type: 'degrees', angle: -ann.rotation } : undefined,
            });
        }
      }

      const pdfBytes = await pdfDocLib.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'edited_document.pdf';
      link.click();

    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. See console for details.");
    }
  };

  const currentAnnotations = annotations.filter(a => a.page === currentPage);

  return (
    <section id="demo" className="py-12 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-2">
            {!file ? (
               <div className="relative">
                <Input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="pdf-upload"
                />
                <Button asChild>
                  <label htmlFor="pdf-upload" className="cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </label>
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={resetEditor}>
                Change File
              </Button>
            )}
          </div>

          {file && (
            <>
              <div className="flex items-center gap-1 border-l border-r border-border px-4 mx-2 overflow-x-auto">
                <Button variant={tool === 'move' ? 'default' : 'ghost'} size="icon" onClick={() => setTool('move')} title="Move / Select">
                  <Move className="w-4 h-4" />
                </Button>
                <Button variant={tool === 'text' ? 'default' : 'ghost'} size="icon" onClick={() => setTool('text')} title="Add Text">
                  <Type className="w-4 h-4" />
                </Button>
                <Button variant={tool === 'draw' ? 'default' : 'ghost'} size="icon" onClick={() => setTool('draw')} title="Draw">
                  <Pen className="w-4 h-4" />
                </Button>
                 <Button variant={tool === 'rect' ? 'default' : 'ghost'} size="icon" onClick={() => setTool('rect')} title="Add Rectangle">
                  <Square className="w-4 h-4" />
                </Button>
                 <Button variant={tool === 'redact' ? 'default' : 'ghost'} size="icon" onClick={() => setTool('redact')} title="Visual Redaction (Black Box)">
                  <Ban className="w-4 h-4" />
                </Button>
                <div className="relative">
                    <Input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                    />
                    <Button variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()} title="Add Image">
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                </div>
                <Button variant={selectedId && annotations.find(a => a.id === selectedId) ? 'destructive' : 'ghost'} size="icon" 
                  onClick={() => selectedId && handleDeleteAnnotation(selectedId)} 
                  disabled={!selectedId}
                  title="Delete Selected"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                
                {selectedId && annotations.find(a => a.id === selectedId)?.type === 'text' && (
                    <Input 
                        value={annotations.find(a => a.id === selectedId)?.text || ''} 
                        onChange={(e) => {
                            const ann = annotations.find(a => a.id === selectedId);
                            if (ann) handleAnnotationChange({ ...ann, text: e.target.value });
                        }}
                        className="w-40 h-8 ml-2"
                        placeholder="Edit text..."
                    />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(2.0, s + 0.1))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

               <div className="flex items-center gap-2 border-l border-border pl-4">
                 <Button variant="ghost" size="icon" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>
                   <ChevronLeft className="w-4 h-4" />
                 </Button>
                 <span className="text-sm whitespace-nowrap">Page {currentPage} of {numPages}</span>
                 <Button variant="ghost" size="icon" disabled={currentPage >= numPages} onClick={() => setCurrentPage(p => p + 1)}>
                   <ChevronRight className="w-4 h-4" />
                 </Button>
               </div>

              <Button className="ml-auto bg-primary text-primary-foreground" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </>
          )}
        </div>

        {/* Editor Area */}
        <div className="relative min-h-[600px] bg-muted/50 rounded-xl border border-border overflow-auto flex justify-center items-start p-8">
          {!file && (
             <div className="flex flex-col items-center justify-center h-full mt-32 text-muted-foreground">
               <Upload className="w-16 h-16 mb-4 opacity-20" />
               <p className="text-xl font-medium">Upload a PDF to start editing</p>
               <p className="text-sm mt-2">Secure, client-side processing. No files uploaded to server.</p>
             </div>
          )}

          {file && (
            <div ref={containerRef} className="relative shadow-2xl bg-white">
              <canvas ref={canvasRef} className="block" />
              
              <div className="absolute inset-0 top-0 left-0">
                 <PdfEditorCanvas 
                    width={pageSize ? pageSize.width * scale : (canvasRef.current?.width || 0)} 
                    height={pageSize ? pageSize.height * scale : (canvasRef.current?.height || 0)}
                    scale={scale}
                    tool={tool}
                    annotations={currentAnnotations}
                    drawingAnnotation={drawingAnnotation}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onChange={handleAnnotationChange}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                 />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
