'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface CategoryFAQProps {
  faqs: FAQ[];
  categoryName: string;
}

export function CategoryFAQ({ faqs, categoryName }: CategoryFAQProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/70">
            Learn more about {categoryName} tools
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-border/40">
              <AccordionTrigger className="py-4 text-foreground hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-foreground/70">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
