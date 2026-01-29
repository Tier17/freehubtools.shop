'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface ToolDemoProps {
  toolName: string;
  inputType: 'text' | 'file' | 'textarea';
  placeholder: string;
}

export function ToolDemo({ toolName, inputType, placeholder }: ToolDemoProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setOutput('Demo output: This is a placeholder showing where the results would appear after processing.');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section id="demo" className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Try {toolName}
          </h2>
          <p className="text-foreground/70">
            Experience the power of this tool with a quick demo
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              {inputType === 'file' ? 'Upload or drag and drop a file' : 'Enter your content'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputType === 'file' && (
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border/50 px-6 py-10">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-foreground/70 mb-2">
                    Drag and drop a file here, or click to select
                  </p>
                  <Button variant="outline" size="sm">
                    Select File
                  </Button>
                </div>
              </div>
            )}

            {inputType === 'textarea' && (
              <Textarea
                placeholder={placeholder}
                className="min-h-32"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}

            {inputType === 'text' && (
              <Input
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}

            <Button onClick={handleProcess} disabled={isProcessing} className="w-full">
              {isProcessing ? 'Processing...' : 'Process'}
            </Button>
          </CardContent>
        </Card>

        {output && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>
                Your processed result is ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4 text-foreground">
                <p className="text-sm">{output}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
