'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Check, Mail, PenTool } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function EmailRewriterDemo() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const rewriteEmail = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await fetch('/api/email-rewriter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style }),
      });
      const data = await response.json();
      if (data.rewrittenEmail) setResult(data.rewrittenEmail);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <Mail className="w-5 h-5 text-primary" />
                 <Label className="text-lg font-semibold">Draft Email</Label>
              </div>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual / Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="concise">Concise / Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                placeholder="Paste your rough draft here..."
                className="min-h-[400px] resize-none border-0 focus-visible:ring-0 text-base p-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Card>
            
            <Button 
              onClick={rewriteEmail} 
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all" 
              disabled={loading || !text}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Rewriting...
                </>
              ) : (
                <>
                  <PenTool className="w-4 h-4 mr-2" />
                  Rewrite Email
                </>
              )}
            </Button>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center h-10">
               <div className="flex items-center gap-2">
                 <PenTool className="w-5 h-5 text-primary" />
                 <Label className="text-lg font-semibold">Polished Version</Label>
              </div>
              {result && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className={copied ? "text-green-600" : ""}
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />} 
                  {copied ? "Copied" : "Copy Text"}
                </Button>
              )}
            </div>
            
            <Card className="min-h-[400px] p-6 bg-muted/30 whitespace-pre-wrap leading-relaxed relative">
              {result ? (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  {result}
                </div>
              ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground opacity-60">
                  <Mail className="w-12 h-12 mb-4" />
                  <p className="text-lg">Select a style and click rewrite<br/>to see the magic happen.</p>
                </div>
              )}
            </Card>
          </div>
          
        </div>
      </div>
    </section>
  );
}
