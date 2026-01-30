'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Check, Sparkles, Type } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function TitleGeneratorDemo() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('mixed');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const generateTitles = async () => {
    if (!text) return;
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch('/api/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style }),
      });
      const data = await response.json();
      if (data.titles) setResults(data.titles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Input Section */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Content Description</Label>
            </div>
            <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                placeholder="Describe your content topic or paste a draft here...
Example: '10 tips for healthy eating on a budget'"
                className="min-h-[140px] resize-none border-0 focus-visible:ring-0 text-lg p-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Card>
          </div>
          
          <div className="space-y-4">
            <Label className="text-lg font-semibold block">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixed">Mixed Styles</SelectItem>
                <SelectItem value="clickbait">Click-Worthy</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="question">Question Based</SelectItem>
                <SelectItem value="listicle">Listicle</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={generateTitles} 
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all" 
              disabled={loading || !text}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generated Titles
            </h3>
            <div className="grid gap-4">
              {results.map((title, i) => (
                <Card 
                  key={i} 
                  className="group p-4 flex items-center justify-between hover:bg-muted/50 hover:border-primary/30 transition-all duration-200"
                >
                  <span className="font-medium text-lg leading-relaxed">{title}</span>
                  <Button
                    variant={copiedIndex === i ? "default" : "ghost"}
                    size="sm"
                    className={copiedIndex === i ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    onClick={() => copyToClipboard(title, i)}
                  >
                    {copiedIndex === i ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedIndex === i ? "Copied" : "Copy"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
