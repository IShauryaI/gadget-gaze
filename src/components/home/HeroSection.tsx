
import React from 'react';
import SearchBar from '@/components/ui/SearchBar';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 pt-20 pb-16">
      <div className="absolute inset-0 pattern-bg opacity-[0.02] pointer-events-none" />
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-6 animate-fade-in">
            The Ultimate Smartphone Guide
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
            Discover Your Perfect <br />
            <span className="text-primary">Smartphone Match</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Explore comprehensive specs, reviews, and comparisons to find the smartphone that perfectly fits your needs.
          </p>
          
          <div className="max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <SearchBar 
              fullWidth 
              placeholder="Search iPhone 15, Galaxy S24, camera comparison..." 
              className="shadow-soft"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <button className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm">
              5G Phones
            </button>
            <button className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm">
              Best Cameras
            </button>
            <button className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm">
              Fast Charging
            </button>
            <button className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm">
              Gaming Phones
            </button>
            <button className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm">
              Long Battery Life
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors animate-pulse-soft"
      >
        <span className="text-sm mb-2">Scroll down</span>
        <ChevronDown className="w-5 h-5" />
      </button>
      
      {/* Background gradient circles */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-primary/20 filter blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-primary/10 filter blur-[100px] opacity-40 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
