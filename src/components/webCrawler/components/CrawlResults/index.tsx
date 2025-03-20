
import React from 'react';
import ResultHeader from './ResultHeader';
import ResultTabs from './ResultTabs';

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

interface CrawlResultsProps {
  crawlResult: CrawlResult;
}

const CrawlResults: React.FC<CrawlResultsProps> = ({ crawlResult }) => {
  if (!crawlResult || !crawlResult.data || crawlResult.data.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <ResultHeader 
        status={crawlResult.status || 'Unknown'} 
        completed={crawlResult.completed || 0} 
        total={crawlResult.total || 0} 
        creditsUsed={crawlResult.creditsUsed || 0}
      />
      
      <ResultTabs data={crawlResult.data[0]} />
    </div>
  );
};

export default CrawlResults;
