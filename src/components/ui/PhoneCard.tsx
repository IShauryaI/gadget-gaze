
import React, { useState } from 'react';
import { Phone } from '@/utils/mockData';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

interface PhoneCardProps {
  phone: Phone;
  className?: string;
  showDetails?: boolean;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ 
  phone, 
  className = '',
  showDetails = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/phone/${phone.id}`}
      className={`block group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 ${
        isHovered ? 'shadow-soft transform scale-[1.01]' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
        <img 
          src={phone.image} 
          alt={`${phone.brand} ${phone.model}`}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'image-loaded' : 'image-blur-loading'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">{phone.brand}</span>
          <div className="flex items-center">
            <Star className="w-3.5 h-3.5 text-yellow-500 mr-1" />
            <span className="text-xs font-medium">{phone.rating}</span>
          </div>
        </div>
        
        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
          {phone.model}
        </h3>
        
        <p className="text-lg font-semibold">${phone.price}</p>
        
        {showDetails && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Display:</span> {phone.specs.display.split(',')[0]}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Processor:</span> {phone.specs.processor}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Camera:</span> {phone.specs.camera.split('+')[0]}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          {phone.specs.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="text-xs bg-secondary py-1 px-2 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <button 
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        onClick={(e) => {
          e.preventDefault();
          // Favorite functionality would go here
        }}
      >
        <Heart className="w-4 h-4 text-muted-foreground" />
      </button>
    </Link>
  );
};

export default PhoneCard;
