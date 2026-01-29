"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  href: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Gourmet Burgers",
    clipId: "clip-original",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "#"
  },
  {
    num: "02",
    name: "Fresh Desserts",
    clipId: "clip-hexagons",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "#"
  },
  {
    num: "03",
    name: "Artisan Waffles",
    clipId: "clip-pixels",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "#"
  }
];

export const ConnoisseurStackInteractor = ({
  items = defaultItems,
  className
}: { items?: MenuItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Expo Out)
    tl.to(selector, {
      scale: 2.5,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
    // 2. IDLE (Sine Breath)
    .to(selector, {
      scale: 2.6,
      duration: 1.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: { amount: 0.2, from: "center" }
    })
    // 3. OUT (Expo In)
    .to(selector, {
      scale: 0,
      duration: 0.6,
      stagger: { amount: 0.3, from: "edges" },
      ease: "expo.in",
    });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
  }, [items]);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full p-4 md:p-8 overflow-hidden transition-colors duration-500",
        "bg-background", 
        className
      )}
    >
      
      {/* LEFT SIDE: HIGH CONTRAST MENU */}
      <div className="z-20 w-full md:w-1/3">
        <nav>
          <ul className="flex flex-col gap-8">
            {items.map((item, index) => (
              <li
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <Link href={item.href} className="flex items-start gap-6">
                  {/* Numbers: Increased visibility for non-hover state */}
                  <span className={cn(
                    "text-3xl font-bold transition-all duration-500 mt-2",
                    activeIndex === index 
                      ? "text-primary scale-110" 
                      : "text-muted-foreground" 
                  )}>
                    {item.num}
                  </span>
                  
                  {/* Main Text: Enhanced visibility logic */}
                  <h2 className={cn(
                    "text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700",
                    activeIndex === index 
                      ? "text-foreground opacity-100 translate-x-4" 
                      // INACTIVE STATE:
                      : "opacity-40 translate-x-0 text-muted-foreground/50"
                  )}>
                    {item.name.split(' ')[0]}<br />
                    {item.name.split(' ')[1]}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE: SQUARE GRID (Sharp Squares) */}
      <div className="relative w-full md:w-2/3 flex justify-center items-center mt-16 md:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-accent/10 blur-[120px] rounded-full transition-opacity duration-1000" />
        
        <svg viewBox="0 0 500 500" className="w-full max-w-[700px] h-auto z-10 drop-shadow-xl">
          <defs>
            {/* 1. Article Summarizer: "The Scanner" (Viewfinder + Focus) */}
            <clipPath id="clip-original">
              <path className="path" d="M50,50 H170 V90 H90 V170 H50 Z" />
              <path className="path" d="M330,50 H450 V170 H410 V90 H330 Z" />
              <path className="path" d="M50,330 H90 V410 H170 V450 H50 Z" />
              <path className="path" d="M410,330 V410 H330 V450 H450 V330 Z" />
              <rect className="path" x="180" y="180" width="140" height="140" rx="20" />
            </clipPath>

            {/* 2. Background Remover: "The Aperture" (Hexagon Shutter) */}
            <clipPath id="clip-hexagons">
              <path className="path" d="M250,250 L350,77 L450,250 Z" />
              <path className="path" d="M250,250 L450,250 L350,423 Z" />
              <path className="path" d="M250,250 L350,423 L150,423 Z" />
              <path className="path" d="M250,250 L150,423 L50,250 Z" />
              <path className="path" d="M250,250 L50,250 L150,77 Z" />
              <path className="path" d="M250,250 L150,77 L350,77 Z" />
            </clipPath>

            {/* 3. Text to Speech: "The Sound Wave" (Equalizer Bars) */}
            <clipPath id="clip-pixels">
              <rect className="path" x="50" y="190" width="40" height="120" rx="20" />
              <rect className="path" x="110" y="150" width="40" height="200" rx="20" />
              <rect className="path" x="170" y="90" width="40" height="320" rx="20" />
              <rect className="path" x="230" y="30" width="40" height="440" rx="20" />
              <rect className="path" x="290" y="90" width="40" height="320" rx="20" />
              <rect className="path" x="350" y="150" width="40" height="200" rx="20" />
              <rect className="path" x="410" y="190" width="40" height="120" rx="20" />
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0]?.clipId || 'clip-original'})`}>
            <image
              ref={imageRef}
              href={items[0]?.image || ''}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
