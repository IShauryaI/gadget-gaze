
import React, { useState } from 'react';
import { Phone } from '@/utils/mockData';

interface PhoneDetailTabsProps {
  phone: Phone;
}

const PhoneDetailTabs: React.FC<PhoneDetailTabsProps> = ({ phone }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <div className="border-b border-border mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-sm font-medium relative ${
              activeTab === 'overview' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`py-3 text-sm font-medium relative ${
              activeTab === 'specifications' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Specifications
            {activeTab === 'specifications' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="space-y-4 text-muted-foreground">
          <p>
            The {phone.brand} {phone.model} features a {phone.specs.display} display,
            powered by the {phone.specs.processor} processor with {phone.specs.ram} of RAM
            and up to {phone.specs.storage.split('/').pop()} of storage.
          </p>
          <p>
            Its camera system consists of {phone.specs.camera}, capable of capturing stunning photos
            and videos in various lighting conditions. The phone packs a {phone.specs.battery} battery
            that should provide all-day usage for most users.
          </p>
          <p>
            With features like {phone.specs.features.join(', ')}, the {phone.model} represents
            {phone.brand}'s latest innovations in smartphone technology for {phone.releaseYear}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Display</h3>
            <p className="text-muted-foreground">{phone.specs.display}</p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Performance</h3>
            <p className="text-muted-foreground">Processor: {phone.specs.processor}</p>
            <p className="text-muted-foreground">RAM: {phone.specs.ram}</p>
            <p className="text-muted-foreground">Storage: {phone.specs.storage}</p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Camera</h3>
            <p className="text-muted-foreground">{phone.specs.camera}</p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Battery</h3>
            <p className="text-muted-foreground">{phone.specs.battery}</p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Features</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {phone.specs.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneDetailTabs;
