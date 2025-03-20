
import React from 'react';
import { Phone } from '@/utils/mockData';
import { comparePhones } from '@/utils/searchUtils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface ComparisonTableProps {
  phoneId1: string;
  phoneId2: string;
  className?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  phoneId1, 
  phoneId2,
  className = ''
}) => {
  const { phone1, phone2, comparison } = comparePhones(phoneId1, phoneId2);
  
  if (!phone1 || !phone2) {
    return (
      <div className={`p-6 text-center rounded-lg border border-border ${className}`}>
        <p className="text-lg font-medium">One or both of the selected phones could not be found.</p>
      </div>
    );
  }

  const comparisonCategories = [
    { id: 'price', label: 'Price', inverseWinner: true }, // Lower is better
    { id: 'display', label: 'Display' },
    { id: 'processor', label: 'Processor' },
    { id: 'ram', label: 'RAM' },
    { id: 'battery', label: 'Battery' },
    { id: 'camera', label: 'Camera' },
    { id: 'rating', label: 'User Rating' },
    { id: 'popularity', label: 'Popularity' }
  ];

  // Function to render the appropriate icon based on winner
  const renderComparisonIcon = (winner: 1 | 2 | 0, inverseWinner = false) => {
    if (winner === 0) {
      return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
    
    const isWinner = inverseWinner ? 
      (winner === 1 ? 2 : 1) : 
      winner;
      
    return isWinner === 1 ? 
      <ArrowUp className="w-4 h-4 text-green-500" /> : 
      <ArrowDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className={`rounded-lg border border-border overflow-hidden ${className}`}>
      <div className="bg-muted p-4">
        <h2 className="text-xl font-medium text-center">Comparison</h2>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <img 
              src={phone1.image}
              alt={`${phone1.brand} ${phone1.model}`}
              className="w-24 h-24 object-cover rounded-lg mx-auto"
            />
            <h3 className="mt-2 font-medium">{phone1.brand} {phone1.model}</h3>
          </div>
          <div className="text-center">
            <img 
              src={phone2.image}
              alt={`${phone2.brand} ${phone2.model}`}
              className="w-24 h-24 object-cover rounded-lg mx-auto"
            />
            <h3 className="mt-2 font-medium">{phone2.brand} {phone2.model}</h3>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {comparisonCategories.map(({ id, label, inverseWinner }) => (
          <div key={id} className="grid grid-cols-7 items-center p-4">
            <div className="col-span-1 font-medium">{label}</div>
            
            <div className={`col-span-3 text-sm px-3 py-2 rounded ${
              comparison[id].winner === 1 ? 'bg-green-50 dark:bg-green-950/20' : ''
            }`}>
              {comparison[id].value1}
              <span className="ml-2 inline-flex items-center">
                {renderComparisonIcon(comparison[id].winner, inverseWinner)}
              </span>
            </div>
            
            <div className={`col-span-3 text-sm px-3 py-2 rounded ${
              comparison[id].winner === 2 ? 'bg-green-50 dark:bg-green-950/20' : ''
            }`}>
              {comparison[id].value2}
              <span className="ml-2 inline-flex items-center">
                {renderComparisonIcon(comparison[id].winner === 1 ? 2 : (comparison[id].winner === 2 ? 1 : 0), inverseWinner)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-muted">
        <h3 className="font-medium mb-2">Key Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">{phone1.brand} {phone1.model}</h4>
            <ul className="text-sm space-y-1">
              {phone1.specs.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">{phone2.brand} {phone2.model}</h4>
            <ul className="text-sm space-y-1">
              {phone2.specs.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
