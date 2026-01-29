'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';

export function ArticleSummarizerDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSummarize = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setOutput('📌 Key Points:\n\n1. Main insight from the article\n2. Important supporting detail\n3. Actionable takeaway\n\n⏱ Reading time: 30 seconds instead of 15 minutes');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-blue-500/5 border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Try Article Summarizer
          </h2>
          <p className="text-foreground/70">
            Paste any article and watch it transform into a concise summary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <div className="border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Your Article
              </label>
              <Textarea
                placeholder="Paste your article here... The longer, the better!"
                className="min-h-40 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                onClick={handleSummarize}
                disabled={isProcessing || !input.trim()}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {output ? (
              <div className="border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <label className="text-sm font-semibold text-foreground">
                    Summary
                  </label>
                </div>
                <div className="rounded-lg bg-blue-500/10 p-4 text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {output}
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border/40 rounded-2xl p-8 flex items-center justify-center min-h-56">
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 text-foreground/40 mx-auto mb-3 rotate-90" />
                  <p className="text-foreground/50 text-sm">Your summary will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
