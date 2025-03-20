
import React from 'react';
import { Phone as PhoneIcon, Battery, Cpu, Database, Camera } from 'lucide-react';

interface PhoneSpecsProps {
  display: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
}

const PhoneSpecs: React.FC<PhoneSpecsProps> = ({ display, processor, ram, storage, battery }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
        <div className="mr-3 p-2 bg-primary/10 rounded-full">
          <PhoneIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Display</p>
          <p className="text-sm font-medium">{display.split(',')[0]}</p>
        </div>
      </div>
      
      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
        <div className="mr-3 p-2 bg-primary/10 rounded-full">
          <Cpu className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Processor</p>
          <p className="text-sm font-medium">{processor}</p>
        </div>
      </div>
      
      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
        <div className="mr-3 p-2 bg-primary/10 rounded-full">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Memory</p>
          <p className="text-sm font-medium">{ram}, {storage.split('/')[0]}</p>
        </div>
      </div>
      
      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
        <div className="mr-3 p-2 bg-primary/10 rounded-full">
          <Battery className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Battery</p>
          <p className="text-sm font-medium">{battery}</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneSpecs;
