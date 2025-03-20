
import React from 'react';
import { Link } from 'react-router-dom';
import { phones } from '@/utils/mockData';
import ComparisonTable from '@/components/ui/ComparisonTable';
import { ArrowRight } from 'lucide-react';

const FeaturedComparisons: React.FC = () => {
  // Featured comparison pairs (using hardcoded IDs of popular phones)
  const comparisonPairs = [
    { id1: 'iphone15pro', id2: 'samsungs24ultra', title: 'iPhone 15 Pro vs Samsung S24 Ultra' },
    { id1: 'pixel8pro', id2: 'xiaomi14ultra', title: 'Pixel 8 Pro vs Xiaomi 14 Ultra' }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Featured Comparisons</h2>
            <p className="text-muted-foreground max-w-xl">
              See how the most popular smartphones stack up against each other in our detailed comparison analysis.
            </p>
          </div>
          <Link 
            to="/compare" 
            className="inline-flex items-center mt-4 md:mt-0 text-primary hover:text-primary/80 transition-colors"
          >
            Create your own comparison
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisonPairs.map((pair, index) => (
            <div key={index} className="bg-card rounded-lg shadow-soft overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold">{pair.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed side-by-side comparison of specs and features
                </p>
              </div>
              
              <div className="p-6">
                <ComparisonTable 
                  phoneId1={pair.id1} 
                  phoneId2={pair.id2} 
                  className="mb-6"
                />
                
                <Link 
                  to={`/compare?phone1=${pair.id1}&phone2=${pair.id2}`}
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View full comparison
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedComparisons;
