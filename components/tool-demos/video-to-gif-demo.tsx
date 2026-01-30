'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Upload, Play, Pause, Film, FileVideo, Download, CheckCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function VideoToGifDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setVideoUrl(URL.createObjectURL(selectedFile));
      setCompleted(false);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);

    // Simulate conversion process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setConverting(false);
          setCompleted(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Video to GIF Converter</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert MP4, WebM, and other video files to high-quality animated GIFs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Controls Section */}
          <div className="space-y-6">
            <Card className={`p-8 border-2 border-dashed transition-colors flex flex-col items-center justify-center min-h-[300px] ${file ? 'border-primary/20 bg-muted/10' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}>
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
                  <p className="text-muted-foreground text-center mb-6">Drag & drop or click to select</p>
                  <Button className="relative">
                    Choose File
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">MP4, WebM, AVI up to 50MB</p>
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border shadow-sm">
                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <FileVideo className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setVideoUrl(null); }}>
                      Change
                    </Button>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Start Time</span>
                        <span className="text-muted-foreground">00:00</span>
                      </div>
                      <Slider defaultValue={[0]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Duration</span>
                        <span className="text-muted-foreground">5s</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    size="lg" 
                    onClick={handleConvert}
                    disabled={converting || completed}
                  >
                    {converting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <Film className="w-5 h-5 mr-2" />
                        Convert to GIF
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-6 h-full flex flex-col min-h-[300px]">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Preview
              </h3>
              
              <div className="flex-1 bg-black/5 rounded-xl overflow-hidden flex items-center justify-center border border-border/50 relative group">
                {videoUrl ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={videoUrl} 
                      className="max-w-full max-h-[300px] rounded-lg"
                      onEnded={() => setIsPlaying(false)}
                      loop={completed} // Loop if completed (simulating GIF)
                    />
                    {!converting && !completed && (
                      <button 
                        onClick={togglePlay}
                        className="absolute inset-0 m-auto w-16 h-16 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 hover:scale-110 duration-200"
                      >
                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted-foreground opacity-50">
                    <Film className="w-16 h-16 mx-auto mb-2" />
                    <p>Video preview will appear here</p>
                  </div>
                )}
              </div>

              {(converting || completed) && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{completed ? 'Conversion Complete' : 'Processing Frames...'}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  {completed && (
                    <Button className="w-full shadow-lg hover:shadow-xl transition-all" variant="default" size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Download GIF
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
