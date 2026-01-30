'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Copy, Check, Search, FileSearch } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function SeoGeneratorDemo() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ metaTitle: string; metaDescription: string; keywords: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const generateSEO = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await fetch('/api/seo-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.metaTitle) setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Content to Optimize</Label>
            </div>
            <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors h-full">
               <div className="flex flex-col h-full gap-4">
                <Textarea
                  placeholder="Paste your article, blog post, or product description here..."
                  className="flex-1 min-h-[300px] resize-none border-0 focus-visible:ring-0 text-base p-2"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button 
                  onClick={generateSEO} 
                  className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all" 
                  disabled={loading || !text}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Generate SEO Tags
                    </>
                  )}
                </Button>
               </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">SEO Metadata</Label>
            </div>
            
            {!result ? (
              <Card className="h-[400px] flex flex-col items-center justify-center text-center p-6 bg-muted/30 border-dashed">
                 <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
                 <p className="text-muted-foreground text-lg">Enter content to generate optimized<br/>Title, Description, and Keywords.</p>
              </Card>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-6 space-y-3 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Meta Title</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(result.metaTitle, 'title')}
                      className={copiedField === 'title' ? "text-green-600" : ""}
                    >
                      {copiedField === 'title' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xl font-medium text-blue-600 dark:text-blue-400 leading-tight">{result.metaTitle}</p>
                  <div className="flex items-center justify-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${result.metaTitle.length > 60 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {result.metaTitle.length} / 60 chars
                    </span>
                  </div>
                </Card>

                <Card className="p-6 space-y-3 border-l-4 border-l-gray-500 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Meta Description</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(result.metaDescription, 'desc')}
                      className={copiedField === 'desc' ? "text-green-600" : ""}
                    >
                      {copiedField === 'desc' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-base text-foreground/90 leading-relaxed">{result.metaDescription}</p>
                  <div className="flex items-center justify-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${result.metaDescription.length > 160 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {result.metaDescription.length} / 160 chars
                    </span>
                  </div>
                </Card>

                <Card className="p-6 space-y-3 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Keywords</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(result.keywords.join(', '), 'keys')}
                      className={copiedField === 'keys' ? "text-green-600" : ""}
                    >
                      {copiedField === 'keys' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors">
                        {kw}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
