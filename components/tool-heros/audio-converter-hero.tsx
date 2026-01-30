import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileAudio, Music, RefreshCw } from "lucide-react";
import Link from "next/link";

export function AudioConverterHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-24 sm:pb-32 border-b border-border/40 bg-gradient-to-b from-transparent to-primary/5">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 slide-up">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary animate-pulse">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              Fast & Lossless Conversion
            </span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Convert Audio Files <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Instantly & Securely
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Convert your audio files between MP3, WAV, AAC, FLAC, and more. 
            All processing happens locally in your browser for maximum privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300" asChild>
              <Link href="#demo">
                Start Converting <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5" asChild>
              <Link href="#features">
                View Supported Formats
              </Link>
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-muted-foreground/50">
            <div className="flex items-center gap-2">
              <FileAudio className="w-5 h-5" />
              <span className="text-sm font-medium">MP3 & WAV</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              <span className="text-sm font-medium">Lossless Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-medium">Batch Processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
