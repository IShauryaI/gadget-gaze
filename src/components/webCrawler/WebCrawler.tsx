
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { WebCrawlerService } from '@/utils/WebCrawlerService';
import { Link } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';

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
          
          {crawlResult && crawlResult.data && crawlResult.data.length > 0 && (
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
              
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="text-analysis">Text Analysis</TabsTrigger>
                  <TabsTrigger value="spelling">Spell Check</TabsTrigger>
                  <TabsTrigger value="suggestions">Word Completion</TabsTrigger>
                  <TabsTrigger value="frequencies">Word Frequencies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <h4 className="font-medium">Content Preview:</h4>
                  <div className="bg-muted/20 p-3 rounded-md max-h-80 overflow-auto">
                    <h5 className="font-medium">{crawlResult.data[0].title}</h5>
                    <p className="mt-2">{crawlResult.data[0].content}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="text-analysis" className="space-y-4">
                  <h4 className="font-medium">Text Analysis (TextAnalyser):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Phone Numbers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm">
                          {crawlResult.data[0].analysis.phoneNumbers.map((phone: string, i: number) => (
                            <li key={i}>{phone}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Email Addresses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm">
                          {crawlResult.data[0].analysis.emailAddresses.map((email: string, i: number) => (
                            <li key={i}>{email}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">URLs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm">
                          {crawlResult.data[0].analysis.urls.map((url: string, i: number) => (
                            <li key={i} className="break-all">{url}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="spelling" className="space-y-4">
                  <h4 className="font-medium">Spell Checking (SpellChecker):</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Original</TableHead>
                        <TableHead>Suggested</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {crawlResult.data[0].spellingCorrections.map((correction: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono">{correction.original}</TableCell>
                          <TableCell className="font-mono">{correction.suggested}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="suggestions" className="space-y-4">
                  <h4 className="font-medium">Word Completion (WordCompletion):</h4>
                  <div className="bg-muted/20 p-3 rounded-md">
                    <p className="mb-2">Suggestions for prefix "ph":</p>
                    <div className="flex flex-wrap gap-2">
                      {crawlResult.data[0].searchSuggestions.map((suggestion: string, i: number) => (
                        <Badge key={i} variant="outline">{suggestion}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="frequencies" className="space-y-4">
                  <h4 className="font-medium">Word Frequencies (FrequencyCount):</h4>
                  <div className="bg-muted/20 p-3 rounded-md max-h-80 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Word</TableHead>
                          <TableHead>Frequency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(crawlResult.data[0].wordFrequencies)
                          .sort(([, a]: any, [, b]: any) => b - a)
                          .map(([word, count]: [string, any], i: number) => (
                            <TableRow key={i}>
                              <TableCell>{word}</TableCell>
                              <TableCell>{count}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebCrawler;
