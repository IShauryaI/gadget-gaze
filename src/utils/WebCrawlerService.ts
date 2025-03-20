
// Interface for API responses
interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class WebCrawlerService {
  private static API_KEY_STORAGE_KEY = 'webcrawler_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async crawlWebsite(url: string, apiKey: string): Promise<CrawlResponse> {
    try {
      console.log('Making crawl request to API for URL:', url);
      
      // This is a placeholder for the actual API call
      // In a real implementation, you would call your crawler API here
      const mockResponse: CrawlStatusResponse = {
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
      
      return mockResponse;
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Crawler API' 
      };
    }
  }
}
