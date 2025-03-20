
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
  
  // Inspired by the Java WebCrawler class with simplified functionality for the frontend
  static readonly BASE_URLS = [
    "https://www.apple.com",
    "https://store.google.com",
    "https://www.samsung.com",
    "https://www.oneplus.com",
    "https://www.mi.com",
    "https://www.motorola.com"
  ];

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static isFromKnownBase(url: string): boolean {
    return this.BASE_URLS.some(baseUrl => url.startsWith(baseUrl));
  }

  static async crawlWebsite(url: string, apiKey: string): Promise<CrawlResponse> {
    try {
      console.log('Making crawl request to API for URL:', url);
      
      // Check if URL is from known base (similar to Java implementation)
      if (!this.isFromKnownBase(url) && !url.includes('example.com')) {
        // For demo purposes, we'll allow example.com
        console.warn('URL is not from known base, but proceeding for demo purposes');
      }
      
      // This is a placeholder for the actual API call
      // In a real implementation, you would call your crawler API here
      // with techniques inspired by the Java implementation
      
      // Simulate data processing using concepts from provided Java classes
      const mockData = [
        {
          url: url,
          title: "Sample Page Title",
          content: "This is sample crawled content from the website...",
          metadata: {
            description: "Sample meta description",
            keywords: ["sample", "crawler", "web"]
          },
          // TextAnalyser-like results
          analysis: {
            phoneNumbers: ["555-123-4567", "800-555-1234"],
            emailAddresses: ["contact@example.com", "info@example.com"],
            urls: ["https://example.com/about", "https://example.com/contact"]
          },
          // SpellChecker-like results
          spellingCorrections: [
            { original: "teh", suggested: "the" },
            { original: "thier", suggested: "their" }
          ],
          // WordCompletion-like results
          searchSuggestions: ["phone", "smartphone", "mobile device"],
          // FrequencyCount-like results
          wordFrequencies: {
            "phone": 24,
            "display": 18,
            "camera": 32,
            "battery": 15
          }
        }
      ];
      
      const mockResponse: CrawlStatusResponse = {
        success: true,
        status: "completed",
        completed: 15,
        total: 15,
        creditsUsed: 15,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        data: mockData
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
