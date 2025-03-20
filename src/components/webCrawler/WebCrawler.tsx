
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      // Simulate API call for demo purposes
      toast({
        title: "Crawling Started",
        description: "Processing your request...",
      });
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 800);
      
      // Simulate API response after delay
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setIsLoading(false);
        
        const mockResult: CrawlResult = {
          success: true,
          status: "completed",
          completed: 15,
          total: 15,
          creditsUsed: 15,
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          data: [
            {
              url: url,
              title: "Sample Page Title",
              content: "This is sample crawled content from the website...",
              metadata: {
                description: "Sample meta description",
                keywords: ["sample", "crawler", "web"]
              }
            }
          ]
        };
        
        setCrawlResult(mockResult);
        
        toast({
          title: "Crawling Complete",
          description: "Website successfully crawled",
        });
      }, 3000);
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Web Crawler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Website URL
              </label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full"
              />
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-xs text-center text-muted-foreground">Crawling in progress: {progress}%</p>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Crawling..." : "Start Crawl"}
            </Button>
          </form>
          
          {crawlResult && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Crawl Results</h3>
                <Badge variant="secondary">
                  Status: {crawlResult.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Pages Crawled:</span>{" "}
                  <span className="font-medium">{crawlResult.completed} / {crawlResult.total}</span>
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Credits Used:</span>{" "}
                  <span className="font-medium">{crawlResult.creditsUsed}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Content Preview:</h4>
                <div className="bg-muted/20 p-3 rounded-md max-h-80 overflow-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(crawlResult.data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebCrawler;
