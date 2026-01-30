'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Youtube, Loader2, CheckCircle, AlertCircle, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export function YoutubeDownloaderDemo() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) return;
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);
    setCompleted(false);

    // Simulate fetching video info
    setTimeout(() => {
      setVideoInfo({
        title: 'Amazing Nature Documentary - 4K Ultra HD',
        thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        duration: '12:45',
        author: 'Nature Channel',
        qualities: ['1080p', '720p', '480p', '360p']
      });
      setLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">YouTube Video Downloader</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Download videos in high quality MP4, WebM, or extract audio.
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-lg border-2 border-primary/10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Youtube className="w-5 h-5" />
              </div>
              <Input 
                placeholder="Paste YouTube URL here..." 
                className="pl-10 h-12 text-lg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              />
            </div>
            <Button 
              size="lg" 
              className="h-12 px-8 font-semibold text-lg"
              onClick={handleFetch}
              disabled={loading || !url}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Fetch Video'}
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {videoInfo && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1">
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                    <img 
                      src={videoInfo.thumbnail} 
                      alt={videoInfo.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {videoInfo.duration}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold line-clamp-2 mb-1">{videoInfo.title}</h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Film className="w-4 h-4" /> {videoInfo.author}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="space-y-2 w-full md:w-auto">
                      <label className="text-sm font-medium text-muted-foreground">Quality</label>
                      <Select defaultValue="1080p">
                        <SelectTrigger className="w-full md:w-[140px]">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          {videoInfo.qualities.map((q: string) => (
                            <SelectItem key={q} value={q}>{q} MP4</SelectItem>
                          ))}
                          <SelectItem value="mp3">Audio (MP3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={handleDownload} 
                      className="w-full md:w-auto flex-grow" 
                      size="lg"
                      disabled={downloading || completed}
                    >
                      {downloading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Downloading...
                        </>
                      ) : completed ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Downloaded
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {(downloading || completed) && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{completed ? 'Download Complete' : 'Converting & Downloading...'}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  {completed && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      File saved to your downloads folder.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {!videoInfo && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center opacity-60">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Youtube className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Paste URL</h4>
                <p className="text-sm text-muted-foreground">Copy video link from YouTube</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Film className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Select Format</h4>
                <p className="text-sm text-muted-foreground">Choose MP4 or MP3 audio</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Download</h4>
                <p className="text-sm text-muted-foreground">Save directly to your device</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
