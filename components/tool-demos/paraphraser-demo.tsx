'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, PenTool, Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ParaphraserDemo() {
  const [text, setText] = useState('');
  const [rewritten, setRewritten] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tone, setTone] = useState('professional');
  const [mode, setMode] = useState('standard');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleParaphrase = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setRewritten('');
    setError(null);

    try {
      const response = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tone, mode }),
      });
      if (!response.ok) throw new Error('Failed to paraphrase');
      const data = await response.json();
      if (data.rewritten) {
        setRewritten(data.rewritten);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to paraphrase text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewritten);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <PenTool className="w-5 h-5" />
              Original Text
            </h3>
            <Card className="p-4">
              <Textarea
                placeholder="Enter text to rewrite..."
                className="min-h-[400px] resize-none border-0 focus-visible:ring-0 text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mode</Label>
                 <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="fluency">Fluency</SelectItem>
                    <SelectItem value="expand">Expand</SelectItem>
                    <SelectItem value="shorten">Shorten</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleParaphrase}
              disabled={!text.trim() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Rewriting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Paraphrase
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Rewritten Text</h3>
              {rewritten && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </div>
            <Card className="p-6 min-h-[400px] bg-muted/30">
              {rewritten ? (
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {rewritten}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Rewritten text will appear here...
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
