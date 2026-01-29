'use client';

import { CheckCircle } from 'lucide-react';

const benefits = [
  {
    title: 'Completely Free',
    description: 'All tools are 100% free to use without any hidden charges or subscriptions.',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'No Account Required',
    description: 'Start using tools instantly without creating an account or signing up.',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'AI-Powered',
    description: 'Leveraging the latest AI technology for accurate and reliable results.',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Fast & Reliable',
    description: 'Quick processing times and consistent performance you can depend on.',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-500',
  },
];

export function WhySection() {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-transparent to-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
            Why FreeHubTools?
          </h2>
          <p className="text-foreground/70 font-medium">
            We believe powerful tools should be accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.color} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
