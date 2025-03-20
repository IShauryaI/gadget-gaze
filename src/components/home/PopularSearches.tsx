
import React from 'react';
import { Link } from 'react-router-dom';
import { popularSearches, popularFeatures } from '@/utils/mockData';
import { Search, TrendingUp, BarChart } from 'lucide-react';

const PopularSearches: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Popular Trends & Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Popular Searches */}
          <div className="bg-card rounded-lg shadow-soft border border-border p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Popular Searches</h3>
            </div>
            
            <ul className="space-y-4">
              {popularSearches.map((search, index) => (
                <li key={index}>
                  <Link 
                    to={`/search?q=${encodeURIComponent(search)}`}
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <span className="w-6 text-muted-foreground group-hover:text-foreground transition-colors">
                      {index + 1}
                    </span>
                    <span className="ml-4 group-hover:text-foreground transition-colors">
                      {search}
                    </span>
                    <TrendingUp className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Most Mentioned Features */}
          <div className="bg-card rounded-lg shadow-soft border border-border p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Most Mentioned Features</h3>
            </div>
            
            <ul className="space-y-3">
              {popularFeatures.map((feature, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{feature.name}</span>
                    <span className="text-sm text-muted-foreground">{feature.count} mentions</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${(feature.count / popularFeatures[0].count) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
