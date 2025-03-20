
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface CrawlProgressBarProps {
  isLoading: boolean;
  progress: number;
}

const CrawlProgressBar: React.FC<CrawlProgressBarProps> = ({ isLoading, progress }) => {
  if (!isLoading) return null;
  
  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full h-2" />
      <p className="text-xs text-center text-muted-foreground">Crawling in progress: {progress}%</p>
    </div>
  );
};

export default CrawlProgressBar;
