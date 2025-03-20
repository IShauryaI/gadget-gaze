import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPhoneById, getMostMentionedPhones, Phone } from '@/utils/mockData';
import { ArrowLeft, Star, Share2, Heart, Phone as PhoneIcon, Battery, Cpu, Database, Camera } from 'lucide-react';
import PhoneCard from '@/components/ui/PhoneCard';

const PhoneDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [similarPhones, setSimilarPhones] = useState<Phone[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
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
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 w-48 bg-muted/50 rounded mb-8"></div>
              <div className="md:flex gap-8">
                <div className="md:w-1/3 bg-muted/50 h-96 rounded-lg mb-6 md:mb-0"></div>
                <div className="md:w-2/3 space-y-4">
                  <div className="h-6 w-32 bg-muted/50 rounded"></div>
                  <div className="h-10 w-64 bg-muted/50 rounded"></div>
                  <div className="h-6 w-24 bg-muted/50 rounded"></div>
                  <div className="h-4 w-full bg-muted/50 rounded mt-8"></div>
                  <div className="h-4 w-full bg-muted/50 rounded"></div>
                  <div className="h-4 w-3/4 bg-muted/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Phone Not Found</h2>
            <p className="mb-6">Sorry, the phone you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to={`/search?brand=${phone.brand.toLowerCase()}`} className="hover:text-foreground transition-colors">
                {phone.brand}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{phone.model}</span>
            </div>
            
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
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground animate-fade-in">{phone.brand}</span>
                  <div className="ml-auto flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{phone.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2 animate-slide-up">{phone.model}</h1>
                
                <div className="flex items-baseline mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <span className="text-2xl font-bold">${phone.price}</span>
                  <span className="ml-2 text-sm text-muted-foreground">Release: {phone.releaseYear}</span>
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
                
                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/10 rounded-full">
                      <PhoneIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Display</p>
                      <p className="text-sm font-medium">{phone.specs.display.split(',')[0]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/10 rounded-full">
                      <Cpu className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Processor</p>
                      <p className="text-sm font-medium">{phone.specs.processor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/10 rounded-full">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Memory</p>
                      <p className="text-sm font-medium">{phone.specs.ram}, {phone.specs.storage.split('/')[0]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/10 rounded-full">
                      <Battery className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Battery</p>
                      <p className="text-sm font-medium">{phone.specs.battery}</p>
                    </div>
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <h3 className="font-medium mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {phone.specs.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="bg-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tabs */}
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
                
                {/* Tab Content */}
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
              </div>
            </div>
            
            {/* Similar Phones */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Similar Phones</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarPhones.slice(0, 4).map((phone) => (
                  <PhoneCard key={phone.id} phone={phone} showDetails={false} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PhoneDetails;
