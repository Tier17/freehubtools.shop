import React, { useEffect, useRef } from 'react';
import { PDFDocumentProxy } from 'pdfjs-dist';

interface PdfThumbnailProps {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
  scale?: number;
  isActive: boolean;
  onClick: () => void;
}

export default function PdfThumbnail({ pdfDoc, pageNumber, scale = 0.2, isActive, onClick }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    const renderThumbnail = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        if (!isCancelled) {
          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error(`Error rendering thumbnail for page ${pageNumber}:`, error);
      }
    };

    renderThumbnail();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div 
      className={`cursor-pointer p-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 border-primary border' : 'hover:bg-muted border border-transparent'}`}
      onClick={onClick}
    >
      <canvas ref={canvasRef} className="shadow-sm block mx-auto bg-white" />
      <p className={`text-xs text-center mt-1 font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        Page {pageNumber}
      </p>
    </div>
  );
}
