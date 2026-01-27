'use client';

import { useState } from 'react';
import { RefreshCw, Quote as QuoteIcon } from 'lucide-react';
import type { Quote } from '@/lib/quotes';

export function QuoteClient({ 
  initialQuote, 
  allQuotes 
}: { 
  initialQuote: Quote; 
  allQuotes: Quote[] 
}) {
  const [quote, setQuote] = useState(initialQuote);
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = () => {
    setIsRotating(true);
    setTimeout(() => {
      const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
      setQuote(randomQuote);
      setIsRotating(false);
    }, 400);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
          <QuoteIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <button 
          onClick={handleRefresh}
          className="p-2 text-fd-muted-foreground hover:text-fd-primary transition-colors rounded-lg hover:bg-fd-accent"
          aria-label="Nueva cita"
        >
          <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <blockquote className="flex-1 flex flex-col justify-center space-y-3">
        <p className="text-sm font-medium leading-relaxed italic text-fd-foreground/90 line-clamp-3">
          "{quote.text}"
        </p>
        <footer className="flex items-center gap-2 pt-3 border-t border-fd-border/50">
          <cite className="text-xs font-semibold not-italic text-fd-muted-foreground flex-1">
            {quote.author}
          </cite>
          <span className="text-xs px-2 py-0.5 rounded-full bg-fd-primary/10 text-fd-primary">
            {quote.tag}
          </span>
        </footer>
      </blockquote>
    </div>
  );
}