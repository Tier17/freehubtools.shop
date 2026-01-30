'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, Download, Image as ImageIcon, RefreshCw, FileImage } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ImageCompressorDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState('image/jpeg');
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let selectedFile: File | null = null;
    setError(null);
    setCompressedUrl(null);
    setCompressedSize(null);

    if ('dataTransfer' in e) {
      e.preventDefault();
      selectedFile = e.dataTransfer.files[0];
    } else {
      selectedFile = e.target.files?.[0] || null;
    }

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const compressImage = async () => {
    if (!file || !previewUrl) return;

    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError('Compression failed.');
            setIsProcessing(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          setCompressedUrl(url);
          setCompressedSize(blob.size);
          setIsProcessing(false);
        },
        format,
        quality
      );

    } catch (err) {
      console.error(err);
      setError('An error occurred during compression.');
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Upload Image
                </h3>
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                  onDrop={handleFileSelect}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('compressor-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="compressor-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {file ? file.name : "Drag & drop or click to upload"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Quality: {Math.round(quality * 100)}%</Label>
                  </div>
                  <Slider 
                    value={[quality]} 
                    max={1} 
                    min={0.1}
                    step={0.05}
                    onValueChange={(vals) => setQuality(vals[0])}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Output Format</Label>
                  <RadioGroup 
                    value={format} 
                    onValueChange={setFormat}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image/jpeg" id="jpg" />
                      <Label htmlFor="jpg">JPG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image/png" id="png" />
                      <Label htmlFor="png">PNG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image/webp" id="webp" />
                      <Label htmlFor="webp">WebP</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={compressImage}
                disabled={!file || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <FileImage className="w-4 h-4 mr-2" />
                    Compress Image
                  </>
                )}
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
             <h3 className="text-lg font-semibold flex items-center gap-2">
                <Download className="w-5 h-5" />
                Result
             </h3>
             
             {file && (
               <Card className="p-6">
                 <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <Label className="text-muted-foreground">Original Size</Label>
                       <p className="text-xl font-bold">{formatSize(file.size)}</p>
                     </div>
                     {compressedSize && (
                       <div>
                         <Label className="text-muted-foreground">Compressed Size</Label>
                         <p className="text-xl font-bold text-green-600">
                           {formatSize(compressedSize)}
                           <span className="text-sm font-normal text-muted-foreground ml-2">
                             (-{Math.round((1 - compressedSize / file.size) * 100)}%)
                           </span>
                         </p>
                       </div>
                     )}
                   </div>

                   {compressedUrl && (
                      <div className="mt-4">
                        <img 
                          src={compressedUrl} 
                          alt="Compressed result" 
                          className="w-full max-h-[400px] object-contain rounded-md border" 
                        />
                        <Button className="w-full mt-4" asChild>
                          <a href={compressedUrl} download={`compressed_${file.name}`}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Compressed Image
                          </a>
                        </Button>
                      </div>
                   )}
                 </div>
               </Card>
             )}
          </div>

        </div>
      </div>
    </section>
  );
}
