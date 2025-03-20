
import React from 'react';
import { Star, Share2, Heart } from 'lucide-react';

interface PhoneHeaderInfoProps {
  brand: string;
  model: string;
  price: number;
  rating: number;
  releaseYear: number;
}

const PhoneHeaderInfo: React.FC<PhoneHeaderInfoProps> = ({ 
  brand, 
  model, 
  price, 
  rating, 
  releaseYear 
}) => {
  return (
    <>
      <div className="flex items-center mb-1">
        <span className="text-sm font-medium text-muted-foreground animate-fade-in">{brand}</span>
        <div className="ml-auto flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2 animate-slide-up">{model}</h1>
      
      <div className="flex items-baseline mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <span className="text-2xl font-bold">${price}</span>
        <span className="ml-2 text-sm text-muted-foreground">Release: {releaseYear}</span>
      </div>
      
      <div className="flex space-x-3 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors">
          Add to Compare
        </button>
        <button className="p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default PhoneHeaderInfo;
