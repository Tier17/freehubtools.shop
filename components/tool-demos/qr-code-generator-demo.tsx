'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Link as LinkIcon, Type } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export function QrCodeGeneratorDemo() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('https://freehubtools.shop');
  const [size, setSize] = useState(250);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Using a reliable public API for QR generation
    const encodedText = encodeURIComponent(text);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`);
  }, [text, size]);

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              Configuration
            </h3>
            <Card className="p-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Content Type</Label>
                  <Tabs defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="url"><LinkIcon className="w-4 h-4 mr-2" /> URL</TabsTrigger>
                      <TabsTrigger value="text"><Type className="w-4 h-4 mr-2" /> Text</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="content" className="text-base">Content</Label>
                  <Input
                    id="content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL or text..."
                    className="h-11"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Size (px)</Label>
                    <span className="text-sm font-medium text-muted-foreground">{size}px</span>
                  </div>
                  <Slider
                    value={[size]}
                    onValueChange={(vals) => setSize(vals[0])}
                    min={100}
                    max={500}
                    step={10}
                    className="py-2"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Preview & Download
            </h3>
            <Card className="p-8 flex flex-col items-center justify-center space-y-8 min-h-[400px] bg-gradient-to-br from-muted/50 to-background border-2 border-primary/10">
              <div className="bg-white p-4 rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={qrUrl} 
                  alt="Generated QR Code" 
                  width={size} 
                  height={size}
                  className="max-w-full h-auto"
                />
              </div>
              
              <Button onClick={handleDownload} size="lg" className="w-full max-w-[240px] shadow-md hover:shadow-lg transition-all">
                <Download className="w-5 h-5 mr-2" /> Download PNG
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
