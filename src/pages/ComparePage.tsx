
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ComparisonTable from '@/components/ui/ComparisonTable';
import { phones } from '@/utils/mockData';
import { Search } from 'lucide-react';

const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phone1Id, setPhone1Id] = useState<string>(searchParams.get('phone1') || '');
  const [phone2Id, setPhone2Id] = useState<string>(searchParams.get('phone2') || '');
  const [isComparing, setIsComparing] = useState<boolean>(
    !!(searchParams.get('phone1') && searchParams.get('phone2'))
  );

  // Update URL when phones change
  useEffect(() => {
    if (phone1Id && phone2Id) {
      setSearchParams({ phone1: phone1Id, phone2: phone2Id });
      setIsComparing(true);
    } else if (phone1Id) {
      setSearchParams({ phone1: phone1Id });
      setIsComparing(false);
    } else if (phone2Id) {
      setSearchParams({ phone2: phone2Id });
      setIsComparing(false);
    } else {
      setSearchParams({});
      setIsComparing(false);
    }
  }, [phone1Id, phone2Id, setSearchParams]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReset = () => {
    setPhone1Id('');
    setPhone2Id('');
    setIsComparing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Smartphones</h1>
            <p className="text-muted-foreground mb-8">
              Select two phones to compare their specifications side by side and find the perfect match for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Phone 1 Selection */}
              <div className={`rounded-lg border ${phone1Id ? 'border-primary/50' : 'border-border'} p-6 transition-colors`}>
                <h2 className="text-lg font-medium mb-4">Phone 1</h2>
                <select
                  value={phone1Id}
                  onChange={(e) => setPhone1Id(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                >
                  <option value="">Select a phone</option>
                  {phones.map((phone) => (
                    <option key={phone.id} value={phone.id}>
                      {phone.brand} {phone.model}
                    </option>
                  ))}
                </select>
                
                {phone1Id && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <img 
                        src={phones.find(p => p.id === phone1Id)?.image}
                        alt={phones.find(p => p.id === phone1Id)?.model}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-medium">
                          {phones.find(p => p.id === phone1Id)?.brand}{' '}
                          {phones.find(p => p.id === phone1Id)?.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${phones.find(p => p.id === phone1Id)?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Phone 2 Selection */}
              <div className={`rounded-lg border ${phone2Id ? 'border-primary/50' : 'border-border'} p-6 transition-colors`}>
                <h2 className="text-lg font-medium mb-4">Phone 2</h2>
                <select
                  value={phone2Id}
                  onChange={(e) => setPhone2Id(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                >
                  <option value="">Select a phone</option>
                  {phones.map((phone) => (
                    <option key={phone.id} value={phone.id}>
                      {phone.brand} {phone.model}
                    </option>
                  ))}
                </select>
                
                {phone2Id && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <img 
                        src={phones.find(p => p.id === phone2Id)?.image}
                        alt={phones.find(p => p.id === phone2Id)?.model}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-medium">
                          {phones.find(p => p.id === phone2Id)?.brand}{' '}
                          {phones.find(p => p.id === phone2Id)?.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${phones.find(p => p.id === phone2Id)?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Reset Button */}
            <div className="flex justify-center mb-10">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Reset Selection
              </button>
            </div>
            
            {/* Comparison Table */}
            {isComparing ? (
              <div className="animate-fade-in">
                <ComparisonTable 
                  phoneId1={phone1Id} 
                  phoneId2={phone2Id} 
                  className="mb-8"
                />
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-border rounded-lg animate-fade-in">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Select Two Phones to Compare</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Choose a phone from each dropdown above to see a detailed side-by-side comparison.
                </p>
              </div>
            )}
            
            {/* Popular Comparisons */}
            <div className="mt-12">
              <h2 className="text-xl font-medium mb-6">Popular Comparisons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link 
                  to="/compare?phone1=iphone15pro&phone2=samsungs24ultra"
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  iPhone 15 Pro vs Samsung S24 Ultra
                </Link>
                <Link 
                  to="/compare?phone1=pixel8pro&phone2=xiaomi14ultra"
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  Pixel 8 Pro vs Xiaomi 14 Ultra
                </Link>
                <Link 
                  to="/compare?phone1=oneplus12&phone2=motorolaedge40ultra"
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  OnePlus 12 vs Motorola Edge 40 Ultra
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compare;
