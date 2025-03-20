
import React from 'react';
import { getTrendingPhones } from '@/utils/mockData';
import PhoneCard from '@/components/ui/PhoneCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TrendingPhones: React.FC = () => {
  const trendingPhones = getTrendingPhones();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Trending Phones</h2>
            <p className="text-muted-foreground max-w-xl">
              Discover the most searched and viewed smartphones right now based on user interest and popularity.
            </p>
          </div>
          <Link 
            to="/search?filter=trending" 
            className="inline-flex items-center mt-4 md:mt-0 text-primary hover:text-primary/80 transition-colors"
          >
            View all trending phones
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingPhones.slice(0, 4).map((phone, index) => (
            <div 
              key={phone.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PhoneCard phone={phone} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPhones;
