
import React from 'react';

interface PhoneFeaturesProps {
  features: string[];
}

const PhoneFeatures: React.FC<PhoneFeaturesProps> = ({ features }) => {
  return (
    <div className="mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="font-medium mb-3">Key Features</h3>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <span 
            key={index} 
            className="bg-secondary px-3 py-1 rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PhoneFeatures;
