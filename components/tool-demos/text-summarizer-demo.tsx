'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, FileText, Wand2, CheckCircle, Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export function TextSummarizerDemo() {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const generateSummary = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await fetch('/api/text-summarizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, length }),
      });
      const data = await response.json();
      if (data.summary) setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Input Text
              </h3>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Summary Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (Bullet Points)</SelectItem>
                  <SelectItem value="medium">Medium (Concise)</SelectItem>
                  <SelectItem value="long">Long (Detailed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                placeholder="Paste the text you want to summarize here...
(Articles, emails, reports, etc.)"
                className="min-h-[300px] resize-none border-0 focus-visible:ring-0 text-base p-2 leading-relaxed"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={generateSummary}  
              className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all"
              disabled={loading || !text}
              size="lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
              {loading ? 'Summarizing...' : 'Summarize Text'}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generated Summary
            </h3>
            
            <Card className="min-h-[300px] bg-muted/30 p-6 relative group border-2 border-transparent hover:border-primary/10 transition-colors">
              {!summary ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 opacity-60 min-h-[300px]">
                  <Wand2 className="w-12 h-12" />
                  <p className="text-lg">Enter text and click summarize<br/>to see the result here.</p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {length.charAt(0).toUpperCase() + length.slice(1)} Summary
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
