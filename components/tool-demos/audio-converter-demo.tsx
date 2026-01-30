'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileAudio, ArrowRight, Download, Loader2, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface AudioFile {
  file: File;
  status: 'pending' | 'converting' | 'completed' | 'error';
  targetFormat: string;
  convertedUrl?: string;
}

export function AudioConverterDemo() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [globalFormat, setGlobalFormat] = useState('mp3');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'pending' as const,
      targetFormat: globalFormat
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, [globalFormat]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac']
    }
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertFile = async (index: number) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, status: 'converting' } : f));
    
    // Simulate conversion
    await new Promise(resolve => setTimeout(resolve, 2000));

    setFiles(prev => prev.map((f, i) => i === index ? { 
      ...f, 
      status: 'completed',
      convertedUrl: URL.createObjectURL(f.file) // In a real app, this would be the converted blob
    } : f));
  };

  const convertAll = () => {
    files.forEach((_, index) => {
      if (files[index].status === 'pending') {
        convertFile(index);
      }
    });
  };

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary/5 border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            See It In Action
          </h2>
          <p className="text-foreground/70">
            Convert your audio files instantly. <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded ml-2 dark:bg-yellow-900 dark:text-yellow-100">Demo Mode</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            (Client-side demo: Real conversion requires server-side processing)
          </p>
        </div>

        <div className="grid gap-8">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border/40 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-primary/60 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drag audio files here or click to select
            </p>
            <p className="text-sm text-foreground/50">
              Supports MP3, WAV, FLAC, OGG, AAC (Max 50MB)
            </p>
          </div>

          {/* Controls */}
          {files.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-secondary/20 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Convert all to:</span>
                <Select 
                  value={globalFormat} 
                  onValueChange={(val) => {
                    setGlobalFormat(val);
                    setFiles(prev => prev.map(f => f.status === 'pending' ? { ...f, targetFormat: val } : f));
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                    <SelectItem value="ogg">OGG</SelectItem>
                    <SelectItem value="flac">FLAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={convertAll} disabled={files.every(f => f.status !== 'pending')}>
                Convert All
              </Button>
            </div>
          )}

          {/* File List */}
          <div className="space-y-4">
            {files.map((file, index) => (
              <Card key={index} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileAudio className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="uppercase">{file.targetFormat}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {file.status === 'pending' && (
                    <Button size="sm" onClick={() => convertFile(index)}>Convert</Button>
                  )}
                  {file.status === 'converting' && (
                    <Button size="sm" disabled>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </Button>
                  )}
                  {file.status === 'completed' && (
                    <Button size="sm" variant="outline" className="text-green-500 border-green-500/20 hover:bg-green-500/10">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => removeFile(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
