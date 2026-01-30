'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Download, Loader2, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function TextToSpeechDemo() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [speed, setSpeed] = useState([1.0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!text) return;
    
    setIsProcessing(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          speed: speed[0],
        }),
      });

      if (!response.ok) throw new Error('Failed to generate speech');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate speech. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [text, voice, speed]);

  if (!mounted) return null;

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary/5 border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            See It In Action
          </h2>
          <p className="text-foreground/70">
            Convert your text to lifelike speech instantly.
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-border/50">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to convert to speech..."
                className="min-h-[200px] resize-none text-lg"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                      <SelectItem value="echo">Echo (Male)</SelectItem>
                      <SelectItem value="fable">Fable (British)</SelectItem>
                      <SelectItem value="onyx">Onyx (Deep Male)</SelectItem>
                      <SelectItem value="nova">Nova (Female)</SelectItem>
                      <SelectItem value="shimmer">Shimmer (Clear Female)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Speed: {speed[0]}x</label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={0.25}
                    max={4.0}
                    step={0.25}
                    className="py-4"
                  />
                </div>
              </div>

              <Button
                className="w-full h-12 text-lg"
                onClick={handleGenerate}
                disabled={!text || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Audio...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Generate Speech
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </Card>

          {audioUrl && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex flex-col items-center gap-4">
                  <audio controls className="w-full" src={audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = audioUrl;
                      a.download = 'speech.mp3';
                      a.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download MP3
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
