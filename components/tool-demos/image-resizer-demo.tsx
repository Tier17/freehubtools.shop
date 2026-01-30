'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Download, RefreshCw, FileImage, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ImageResizerDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Dimensions
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  
  // Output settings
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('jpeg');
  const [quality, setQuality] = useState<number>(0.9);
  const [fileSize, setFileSize] = useState<number | null>(null); // In bytes
  const [outputSize, setOutputSize] = useState<number | null>(null); // Estimated or actual
  
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Canvas ref for processing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle File Selection
  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile) return;
    
    // Reset state
    setError(null);
    setFile(selectedFile);
    setFileSize(selectedFile.size);
    
    try {
      // Use createImageBitmap for performance
      const bitmap = await createImageBitmap(selectedFile);
      setImageBitmap(bitmap);
      
      const w = bitmap.width;
      const h = bitmap.height;
      
      setOriginalDimensions({ width: w, height: h });
      setWidth(w);
      setHeight(h);
      setAspectRatio(w / h);
      
      // Default format based on file type or fallback to jpeg
      const fileType = selectedFile.type.split('/')[1];
      if (['png', 'webp'].includes(fileType)) {
        setFormat(fileType as 'png' | 'webp');
      } else {
        setFormat('jpeg');
      }

    } catch (err) {
      console.error("Error loading image:", err);
      setError("Failed to load image. Please try another file.");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Handle Dimension Changes
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = Math.max(1, Math.min(10000, parseInt(e.target.value) || 0));
    setWidth(newWidth);
    
    if (maintainAspectRatio && aspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = Math.max(1, Math.min(10000, parseInt(e.target.value) || 0));
    setHeight(newHeight);
    
    if (maintainAspectRatio && aspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  // Update Preview/Canvas when settings change
  useEffect(() => {
    if (!imageBitmap || !width || !height) return;

    const renderImage = async () => {
      // Prevent 0 dimensions
      const renderWidth = Math.max(1, width);
      const renderHeight = Math.max(1, height);

      const canvas = document.createElement('canvas');
      canvas.width = renderWidth;
      canvas.height = renderHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Draw
      ctx.drawImage(imageBitmap, 0, 0, renderWidth, renderHeight);

      // Export
      const mimeType = `image/${format}`;
      // For PNG, quality argument is ignored by standard, but we pass it anyway or handle logic
      const q = format === 'png' ? undefined : quality;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev); // Cleanup old URL
            return url;
          });
          setOutputSize(blob.size);
        }
      }, mimeType, q);
    };

    const timer = setTimeout(renderImage, 100); // Debounce
    return () => clearTimeout(timer);

  }, [imageBitmap, width, height, format, quality]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  const handleDownload = () => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `resized-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (originalDimensions) {
      setWidth(originalDimensions.width);
      setHeight(originalDimensions.height);
      setMaintainAspectRatio(true);
      setQuality(0.9);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!file) {
    return (
      <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary/5 border-b border-border/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
           <div className="mb-8 slide-up text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Start Resizing
            </h2>
            <p className="text-foreground/70">
              Drag and drop an image or select a file to begin
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border/40 hover:border-primary/50'
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={onFileInputChange}
            />
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
            <p className="text-foreground/60 mb-6 max-w-sm mx-auto">
              Supports JPG, PNG, and WebP formats. No file size limit (processed locally).
            </p>
            <Button size="lg" className="rounded-full">
              Select Image
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Settings</h3>
                <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-muted-foreground">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                <Label>Dimensions (px)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-xs text-muted-foreground">Width</Label>
                    <Input 
                      id="width" 
                      type="number" 
                      value={width} 
                      onChange={handleWidthChange}
                      min={1} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-xs text-muted-foreground">Height</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={height} 
                      onChange={handleHeightChange}
                      min={1} 
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="aspect-ratio" 
                    checked={maintainAspectRatio} 
                    onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
                  />
                  <Label htmlFor="aspect-ratio" className="text-sm font-normal cursor-pointer">
                    Maintain aspect ratio
                  </Label>
                </div>
              </div>

              {/* Format & Quality */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={format} onValueChange={(v: 'png' | 'jpeg' | 'webp') => setFormat(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {format !== 'png' && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Quality</Label>
                      <span className="text-sm text-muted-foreground">{Math.round(quality * 100)}%</span>
                    </div>
                    <Slider 
                      value={[quality]} 
                      min={0.1} 
                      max={1} 
                      step={0.05} 
                      onValueChange={(val) => setQuality(val[0])} 
                    />
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Size:</span>
                  <span className="font-medium">{fileSize ? formatBytes(fileSize) : '...'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Size (est):</span>
                  <span className="font-medium text-primary">{outputSize ? formatBytes(outputSize) : '...'}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleDownload} disabled={!previewUrl}>
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => setFile(null)}>
                Upload Different Image
              </Button>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 bg-muted/30 rounded-xl border border-border/50 flex flex-col items-center justify-center p-6 min-h-[500px] overflow-hidden relative">
             {previewUrl ? (
               <div className="relative max-w-full max-h-[600px] shadow-lg">
                 <img 
                   src={previewUrl} 
                   alt="Preview" 
                   className="max-w-full max-h-[600px] object-contain rounded-md bg-[url('/transparent-bg.png')] bg-repeat"
                   style={{
                     backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                     backgroundSize: '20px 20px',
                     backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                     backgroundColor: '#fff'
                   }}
                 />
                 <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                   {width} x {height}
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center text-muted-foreground">
                 <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                 <p>Processing preview...</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  );
}
