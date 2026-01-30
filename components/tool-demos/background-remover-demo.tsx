'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

export function BackgroundRemoverDemo() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary/5 border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            See It In Action
          </h2>
          <p className="text-foreground/70">
            Upload an image and watch the background disappear instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border/40 hover:border-primary/50'
            }`}
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
          >
            <Upload className="w-12 h-12 text-primary/60 mx-auto mb-4" />
            <p className="text-sm font-medium text-foreground mb-2">
              Drag image here or click to select
            </p>
            <p className="text-xs text-foreground/50 mb-4">
              Supports JPG, PNG, WebP up to 50MB
            </p>
            <Button
              variant="outline"
              className="rounded-full border-2 border-primary/30 hover:bg-primary/5 bg-transparent"
            >
              Choose Image
            </Button>
          </div>

          <div className="border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            {!isComplete ? (
              <div className="flex flex-col items-center justify-center min-h-48">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
                {!isProcessing && (
                  <Button
                    onClick={handleProcess}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4"
                  >
                    {isProcessing ? 'Processing...' : 'Process Image'}
                  </Button>
                )}
                {isProcessing && (
                  <p className="text-sm text-foreground/70 animate-pulse">
                    Removing background...
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-primary">
                    ✓ Background removed successfully!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
