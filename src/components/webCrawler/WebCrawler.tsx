
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { WebCrawlerService } from '@/utils/WebCrawlerService';
import { Link } from 'react-router-dom';
import { InfoIcon, ServerIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [useSimulation, setUseSimulation] = useState(true);

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
      
      // Call the actual crawling service or simulation based on user choice
      let result;
      if (useSimulation) {
        result = await WebCrawlerService.simulateCrawl(url);
      } else {
        result = await WebCrawlerService.crawlWebsite(url, apiKey);
      }
      
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
            <CardTitle className="text-2xl font-bold">Web Crawler</CardTitle>
            <div className="flex gap-4">
              <Link to="/crawler/backend-info" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ServerIcon className="h-4 w-4 mr-1" />
                Spring Boot Integration
              </Link>
            </div>
          </div>
          <CardDescription>
            Crawl websites to extract and analyze smartphone information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs 
            defaultValue={useSimulation ? "simulation" : "backend"} 
            onValueChange={(value) => setUseSimulation(value === "simulation")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="simulation">Use Simulation</TabsTrigger>
              <TabsTrigger value="backend">Use Real Backend</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simulation">
              <div className="p-3 bg-amber-50 text-amber-800 rounded-md mb-4 text-sm">
                <p>Simulation mode uses mock data that mimics a real backend response. No actual crawling is performed.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="backend">
              <div className="p-3 bg-blue-50 text-blue-800 rounded-md mb-4 text-sm">
                <p>This mode connects to your Spring Boot backend at <strong>http://localhost:8081</strong>. Make sure your backend is running.</p>
              </div>
            </TabsContent>
          </Tabs>
          
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
