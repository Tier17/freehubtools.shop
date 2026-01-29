"use client";

import {
  FileText,
  Image as ImageIcon,
  Edit,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: ImageIcon,
    name: "Image Compressor",
    description: "Optimize images without losing quality.",
    href: "/tool/image-compressor",
    cta: "Open Tool",
    background: <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="absolute -right-20 -top-20 opacity-60 w-[500px] h-[500px] object-cover" />,
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: FileText,
    name: "Text Summarizer",
    description: "Condense long articles into key points.",
    href: "/tool/article-summarizer",
    cta: "Open Tool",
    background: <img src="https://images.unsplash.com/photo-1456324504439-367cee10d6e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="absolute -right-20 -top-20 opacity-60 w-[500px] h-[500px] object-cover" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Edit,
    name: "PDF Editor",
    description: "Edit, sign, and annotate PDFs securely.",
    href: "/tool/pdf-editor",
    cta: "Open Tool",
    background: <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="absolute -right-20 -top-20 opacity-60 w-[500px] h-[500px] object-cover" />,
    className: "lg:col-span-3 lg:row-span-1",
  },
];

export function ConnoisseurStackInteractor() {
  return (
    <BentoGrid className="lg:grid-rows-2">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
