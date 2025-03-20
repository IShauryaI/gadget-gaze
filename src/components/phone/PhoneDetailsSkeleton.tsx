
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PhoneDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 w-48 bg-muted/50 rounded mb-8"></div>
            <div className="md:flex gap-8">
              <div className="md:w-1/3 bg-muted/50 h-96 rounded-lg mb-6 md:mb-0"></div>
              <div className="md:w-2/3 space-y-4">
                <div className="h-6 w-32 bg-muted/50 rounded"></div>
                <div className="h-10 w-64 bg-muted/50 rounded"></div>
                <div className="h-6 w-24 bg-muted/50 rounded"></div>
                <div className="h-4 w-full bg-muted/50 rounded mt-8"></div>
                <div className="h-4 w-full bg-muted/50 rounded"></div>
                <div className="h-4 w-3/4 bg-muted/50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhoneDetailsSkeleton;
