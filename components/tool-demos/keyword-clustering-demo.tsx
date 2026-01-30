'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Copy, Layers, Check, Database, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export function KeywordClusteringDemo() {
  const [text, setText] = useState('');
  const [clusters, setClusters] = useState<{ name: string; keywords: string[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedCluster, setCopiedCluster] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const clusterKeywords = async () => {
    if (!text) return;
    setLoading(true);
    setClusters([]);
    try {
      const response = await fetch('/api/keyword-clustering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.clusters) setClusters(data.clusters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyCluster = (keywords: string[], index: number) => {
    navigator.clipboard.writeText(keywords.join(', '));
    setCopiedCluster(index);
    setTimeout(() => setCopiedCluster(null), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Input Section */}
        <div className="space-y-4">
           <div className="flex items-center gap-2">
              <List className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Keyword List</Label>
           </div>
           <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                placeholder="Paste your list of keywords here (one per line or comma separated)...
Example:
seo tools
keyword research
content marketing
digital marketing strategy"
                className="min-h-[200px] resize-none border-0 focus-visible:ring-0 text-base p-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
           </Card>
           
           <Button 
              onClick={clusterKeywords} 
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all" 
              disabled={loading || !text}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Clustering Keywords...
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4 mr-2" />
                  Cluster Keywords
                </>
              )}
            </Button>
        </div>

        {/* Results Section */}
        {clusters.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Identified Clusters</h3>
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">
                  {clusters.length} Groups Found
                </Badge>
             </div>
             
            <div className="grid md:grid-cols-2 gap-6">
              {clusters.map((cluster, i) => (
                <Card key={i} className="p-6 space-y-4 hover:shadow-md transition-all border-l-4 border-l-primary/50">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-semibold text-lg text-primary">{cluster.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {cluster.keywords.length}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyCluster(cluster.keywords, i)}
                      >
                        {copiedCluster === i ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {cluster.keywords.map((kw, k) => (
                      <li key={k} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                        {kw}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
