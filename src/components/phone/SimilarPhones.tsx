
import React from 'react';
import { Phone } from '@/utils/mockData';
import PhoneCard from '@/components/ui/PhoneCard';

interface SimilarPhonesProps {
  phones: Phone[];
}

const SimilarPhones: React.FC<SimilarPhonesProps> = ({ phones }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Phones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {phones.slice(0, 4).map((phone) => (
          <PhoneCard key={phone.id} phone={phone} showDetails={false} />
        ))}
      </div>
    </div>
  );
};

export default SimilarPhones;
