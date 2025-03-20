
import React from 'react';
import { Link } from 'react-router-dom';

interface PhoneBreadcrumbProps {
  brand: string;
  model: string;
}

const PhoneBreadcrumb: React.FC<PhoneBreadcrumbProps> = ({ brand, model }) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-8">
      <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
      <span className="mx-2">/</span>
      <Link to={`/search?brand=${brand.toLowerCase()}`} className="hover:text-foreground transition-colors">
        {brand}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{model}</span>
    </div>
  );
};

export default PhoneBreadcrumb;
