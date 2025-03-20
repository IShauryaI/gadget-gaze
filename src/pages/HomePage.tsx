
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrendingPhones from '@/components/home/TrendingPhones';
import FeaturedComparisons from '@/components/home/FeaturedComparisons';
import PopularSearches from '@/components/home/PopularSearches';
import WebCrawler from '@/components/webCrawler/WebCrawler';

const HomePage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <TrendingPhones />
        <FeaturedComparisons />
        <PopularSearches />
        <WebCrawler />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
