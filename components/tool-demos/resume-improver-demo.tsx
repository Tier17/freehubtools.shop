'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, ArrowRight, Wand2, FileText, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WEAK_WORDS = {
  'helped': ['facilitated', 'assisted', 'supported', 'collaborated'],
  'worked': ['executed', 'operated', 'managed', 'orchestrated'],
  'made': ['created', 'developed', 'designed', 'constructed'],
  'did': ['performed', 'conducted', 'executed', 'achieved'],
  'responsible for': ['accountable for', 'charged with', 'oversaw', 'directed'],
  'good': ['exceptional', 'superior', 'excellent', 'proficient'],
  'changed': ['transformed', 'revamped', 'modified', 'enhanced'],
  'talked': ['communicated', 'negotiated', 'presented', 'liaised'],
  'led': ['spearheaded', 'guided', 'mentored', 'directed'],
  'managed': ['supervised', 'coordinated', 'administered', 'controlled'],
};

export function ResumeImproverDemo() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const analyzeBullet = () => {
    if (!input.trim()) return;

    const newSuggestions: string[] = [];
    const lowerInput = input.toLowerCase();

    // Check for weak words
    Object.entries(WEAK_WORDS).forEach(([weak, strong]) => {
      if (lowerInput.includes(weak)) {
        newSuggestions.push(`Replace "${weak}" with stronger action verbs like: ${strong.join(', ')}`);
      }
    });

    // Check for metrics
    if (!/\d/.test(input)) {
      newSuggestions.push('Add quantifiable metrics (numbers, percentages, $) to prove your impact.');
    }

    // Check length
    if (input.split(' ').length < 10) {
      newSuggestions.push('Expand your bullet point to include Context, Action, and Result (CAR method).');
    }

    if (newSuggestions.length === 0) {
      newSuggestions.push('Great job! This bullet point uses strong language and includes metrics.');
    }

    setSuggestions(newSuggestions);
    setAnalyzed(true);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Your Bullet Point
            </h3>
            <Card className="p-4 border-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                placeholder="Paste a resume bullet point here...
Example: 'Worked on sales team to increase revenue'"
                className="min-h-[300px] resize-none border-0 focus-visible:ring-0 text-lg p-2"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (analyzed) setAnalyzed(false);
                }}
              />
            </Card>
            
            <Button 
              onClick={analyzeBullet}
              className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all"
              disabled={!input.trim()}
              size="lg"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Analyze & Improve
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Analysis Results
            </h3>
            
            <Card className="min-h-[300px] bg-muted/30 p-6">
              {!analyzed ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 opacity-60">
                  <Wand2 className="w-12 h-12" />
                  <p className="text-lg">Enter a bullet point and click analyze<br/>to see improvements.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant={suggestions.length === 1 && suggestions[0].startsWith('Great') ? "default" : "secondary"} className="text-sm px-3 py-1">
                      {suggestions.length === 1 && suggestions[0].startsWith('Great') ? 'Perfect Score' : `${suggestions.length} Suggestions`}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="bg-background p-4 rounded-lg border border-border/50 shadow-sm flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="shrink-0 mt-1">
                          {suggestion.startsWith('Great') ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                              <ArrowRight className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-base leading-relaxed pt-0.5">{suggestion}</p>
                      </div>
                    ))}
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
