import React from "react"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </main>
  );
}
