"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  href?: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Gourmet Burgers",
    clipId: "clip-layout",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    num: "02",
    name: "Fresh Desserts",
    clipId: "clip-pixels",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    num: "03",
    name: "Artisan Waffles",
    clipId: "clip-lines",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
    // 2. IDLE (Sine Breath)
    .to(selector, {
      scale: 1.05,
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
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex flex-col md:flex-row items-center justify-between min-h-[600px] w-full p-8 md:p-12 overflow-hidden transition-colors duration-500",
        // Removed bg-white and dark:bg-[#050505] to blend with app background
        className
      )}
    >
      
      {/* LEFT SIDE: HIGH CONTRAST MENU */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-14">
            {items.map((item, index) => (
              <li
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <Link href={item.href || "#"} className="flex items-start gap-6 block w-full" onClick={(e) => !item.href && e.preventDefault()}>
                  {/* Numbers: Increased visibility for non-hover state */}
                  <span className={cn(
                    "text-3xl font-bold transition-all duration-500 mt-2",
                    activeIndex === index 
                      ? "text-orange-500 scale-110" 
                      : "text-zinc-400 dark:text-zinc-600" 
                  )}>
                    {item.num}
                  </span>
                  
                  {/* Main Text: Enhanced visibility logic */}
                  <h2 className={cn(
                    "text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700",
                    activeIndex === index 
                      ? "text-zinc-950 dark:text-white opacity-100 translate-x-4" 
                      : "opacity-40 translate-x-0 " + 
                        "text-zinc-500 dark:text-transparent " + 
                        "dark:[text-stroke:1.5px_#52525b] dark:[-webkit-text-stroke:1.5px_#52525b]"
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
      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-orange-500/10 dark:bg-orange-600/5 blur-[120px] rounded-full transition-opacity duration-1000" />
        
        <svg viewBox="0 0 500 500" className="w-[100%] max-w-[500px] h-auto z-10 drop-shadow-xl dark:drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <defs>
            <clipPath id="clip-layout">
              <rect className="path" x="10" y="10" width="235" height="480" rx="16" />
              <rect className="path" x="255" y="10" width="235" height="235" rx="16" />
              <rect className="path" x="255" y="255" width="235" height="235" rx="16" />
            </clipPath>

            <clipPath id="clip-lines">
               <rect className="path" x="10" y="20" width="480" height="90" rx="45" />
               <rect className="path" x="10" y="130" width="480" height="90" rx="45" />
               <rect className="path" x="10" y="240" width="380" height="90" rx="45" />
               <rect className="path" x="10" y="350" width="280" height="90" rx="45" />
            </clipPath>

            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="12" 
                />
              ))}
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image
              ref={imageRef}
              href={items[0].image}
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
