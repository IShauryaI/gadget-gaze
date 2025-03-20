
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPhoneById, getMostMentionedPhones } from '@/utils/mockData';
import PhoneDetailsSkeleton from '@/components/phone/PhoneDetailsSkeleton';
import PhoneNotFound from '@/components/phone/PhoneNotFound';
import PhoneBreadcrumb from '@/components/phone/PhoneBreadcrumb';
import PhoneHeaderInfo from '@/components/phone/PhoneHeaderInfo';
import PhoneSpecs from '@/components/phone/PhoneSpecs';
import PhoneFeatures from '@/components/phone/PhoneFeatures';
import PhoneDetailTabs from '@/components/phone/PhoneDetailTabs';
import SimilarPhones from '@/components/phone/SimilarPhones';

const PhoneDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState(null);
  const [similarPhones, setSimilarPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Simulate data loading
      setIsLoading(true);
      setTimeout(() => {
        const phoneData = getPhoneById(id);
        setPhone(phoneData || null);
        
        // Get similar phones
        const topPhones = getMostMentionedPhones();
        setSimilarPhones(topPhones.filter(p => p.id !== id));
        
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  if (isLoading) {
    return <PhoneDetailsSkeleton />;
  }

  if (!phone) {
    return <PhoneNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <PhoneBreadcrumb brand={phone.brand} model={phone.model} />
            
            {/* Phone Details */}
            <div className="md:flex gap-8 mb-12">
              {/* Phone Image */}
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="sticky top-24 bg-muted/30 rounded-lg overflow-hidden">
                  <img 
                    src={phone.image} 
                    alt={`${phone.brand} ${phone.model}`}
                    className="w-full h-auto object-cover animate-fade-in"
                  />
                </div>
              </div>
              
              {/* Phone Information */}
              <div className="md:w-2/3">
                <PhoneHeaderInfo 
                  brand={phone.brand} 
                  model={phone.model} 
                  price={phone.price} 
                  rating={phone.rating} 
                  releaseYear={phone.releaseYear} 
                />
                
                {/* Quick Specs */}
                <PhoneSpecs
                  display={phone.specs.display}
                  processor={phone.specs.processor}
                  ram={phone.specs.ram}
                  storage={phone.specs.storage}
                  battery={phone.specs.battery}
                />
                
                {/* Key Features */}
                <PhoneFeatures features={phone.specs.features} />
                
                {/* Tabs */}
                <PhoneDetailTabs phone={phone} />
              </div>
            </div>
            
            {/* Similar Phones */}
            <SimilarPhones phones={similarPhones} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PhoneDetails;
