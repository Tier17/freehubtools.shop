'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertTriangle, Type, CheckCircle2, Eraser } from 'lucide-react';

// Types for our analysis results
interface SpellError {
  word: string;
  index: number;
  suggestions: string[];
}

interface StyleWarning {
  index: number;
  offset: number;
  reason: string;
  original?: string;
}

export function GrammarCheckerDemo() {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [spellErrors, setSpellErrors] = useState<SpellError[]>([]);
  const [styleWarnings, setStyleWarnings] = useState<StyleWarning[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const analyzeText = useCallback(async () => {
    if (!text.trim()) return;

    setIsChecking(true);
    setError(null);
    setSpellErrors([]);
    setStyleWarnings([]);

    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      
      const newSpellErrors: SpellError[] = [];
      const newStyleWarnings: StyleWarning[] = [];

      data.items.forEach((item: any) => {
        if (item.type === 'spelling') {
          newSpellErrors.push({
            word: item.original,
            index: -1, // Not provided by AI directly, could search if needed
            suggestions: [item.suggestion],
          });
        } else {
          newStyleWarnings.push({
            index: -1,
            offset: 0,
            reason: `${item.suggestion} (${item.explanation})`,
            original: item.original, // Add original text for context
          });
        }
      });

      setSpellErrors(newSpellErrors);
      setStyleWarnings(newStyleWarnings);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('Failed to analyze text. Please try again later.');
    } finally {
      setIsChecking(false);
    }
  }, [text]);

  if (!mounted) {
    return null;
  }

  const handleClear = () => {
    setText('');
    setSpellErrors([]);
    setStyleWarnings([]);
    setError(null);
  };

  const loadExample = () => {
    const example = "I have written this sentence in passive voice. It is believed that mistakes was made. So basically, actually, I think this is sort of good.";
    setText(example);
    setError(null);
  };

  const applySuggestion = (originalWord: string, suggestion: string) => {
    const newText = text.replace(originalWord, suggestion);
    setText(newText);
    setSpellErrors((prev) => prev.filter((e) => e.word !== originalWord));
  };

  return (
    <section id="demo" className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Input Text
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={loadExample} disabled={isChecking}>
                  Load Example
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} disabled={isChecking}>
                  <Eraser className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            
            <Card className="p-4 bg-muted/30">
              <Textarea
                placeholder="Type or paste your text here..."
                className="min-h-[400px] resize-none border-0 bg-transparent focus-visible:ring-0 text-lg leading-relaxed p-0"
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
              size="lg" 
              className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={analyzeText}
              disabled={!text.trim() || isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Check Grammar & Style
                </>
              )}
            </Button>
            
            {/* Removed dictionary loading indicator since we use AI now */}
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Analysis Results
            </h3>

            <Card className="min-h-[400px] p-6 bg-background border-border/60 shadow-sm flex flex-col">
              {!spellErrors.length && !styleWarnings.length && !isChecking && text.length > 0 ? (
                 <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
                   <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                     <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                   </div>
                   <h4 className="text-lg font-medium">Looks good!</h4>
                   <p className="text-muted-foreground">No spelling errors or style issues found.</p>
                 </div>
              ) : (
                <Tabs defaultValue="spelling" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="spelling" className="relative">
                      Spelling
                      {spellErrors.length > 0 && (
                        <Badge variant="destructive" className="ml-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                          {spellErrors.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="style" className="relative">
                      Style & Grammar
                      {styleWarnings.length > 0 && (
                        <Badge variant="secondary" className="ml-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-yellow-500 text-white hover:bg-yellow-600">
                          {styleWarnings.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="spelling" className="space-y-4 focus-visible:ring-0 outline-none">
                    {spellErrors.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No spelling errors found.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {spellErrors.map((error, i) => (
                          <Alert key={i} variant="destructive" className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30">
                            <AlertTitle className="font-bold mb-2 flex items-center gap-2">
                              <span className="line-through decoration-2 opacity-70">{error.word}</span>
                            </AlertTitle>
                            <AlertDescription>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {error.suggestions.length > 0 ? (
                                  error.suggestions.map((s, idx) => (
                                    <Badge 
                                      key={idx} 
                                      variant="outline" 
                                      className="bg-background cursor-pointer hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/30 dark:hover:text-green-300 transition-colors border-dashed"
                                      onClick={() => applySuggestion(error.word, s)}
                                    >
                                      {s}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-sm text-muted-foreground">No suggestions available</span>
                                )}
                              </div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4 focus-visible:ring-0 outline-none">
                    {styleWarnings.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No style issues found.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {styleWarnings.map((warning, i) => (
                          <Alert key={i} className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30">
                            <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-500 capitalize mb-1">
                              {warning.original ? <span className="mr-2 line-through opacity-70">{warning.original}</span> : null}
                              {warning.reason.split('(')[0]}
                            </AlertTitle>
                            <AlertDescription className="text-yellow-700 dark:text-yellow-400/80">
                              {warning.reason}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
              
              {/* Default empty state */}
              {!spellErrors.length && !styleWarnings.length && !isChecking && text.length === 0 && (
                <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4 opacity-50">
                  <Type className="w-16 h-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Enter text to start checking...</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
