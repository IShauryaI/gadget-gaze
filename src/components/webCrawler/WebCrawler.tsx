
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { WebCrawlerService } from '@/utils/WebCrawlerService';
import { Link } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';

// Import refactored components
import ApiKeyInput from './components/ApiKeyInput';
import UrlInput from './components/UrlInput';
import CrawlProgressBar from './components/CrawlProgressBar';
import CrawlResults from './components/CrawlResults';

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

const WebCrawler: React.FC = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(10);
    setCrawlResult(null);
    
    try {
      // Save the API key
      WebCrawlerService.saveApiKey(apiKey);
      
      toast({
        title: "Crawling Started",
        description: "Processing your request...",
      });
      
      // Simulate progress with intervals
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return newProgress;
        });
      }, 800);
      
      // Call the actual crawling service
      const result = await WebCrawlerService.crawlWebsite(url, apiKey);
      
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);
      
      if (result.success) {
        setCrawlResult(result);
        
        toast({
          title: "Crawling Complete",
          description: "Website successfully crawled",
        });
      } else {
        toast({
          title: "Error",
          description: (result as any).error || "Failed to crawl website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      setIsLoading(false);
      setProgress(0);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Web Crawler (Shaurya)</CardTitle>
            <Link to="/crawler/backend-info" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
              <InfoIcon className="h-4 w-4 mr-1" />
              Backend Integration
            </Link>
          </div>
          <CardDescription>
            This crawler currently runs with simulated data. See Backend Integration for Spring Boot setup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <UrlInput url={url} setUrl={setUrl} />
            
            <CrawlProgressBar isLoading={isLoading} progress={progress} />
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Crawling..." : "Start Crawl"}
            </Button>
          </form>
          
          <CrawlResults crawlResult={crawlResult} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WebCrawler;
