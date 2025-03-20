
import { CrawlResponse } from './types';
import { TextAnalyzer } from './TextAnalyzer';
import { SpellChecker } from './SpellChecker';
import { WordCompletion } from './WordCompletion';
import { FrequencyAnalyzer } from './FrequencyAnalyzer';

export class WebCrawlerService {
  private static API_KEY_STORAGE_KEY = 'webcrawler_api_key';
  private static API_BASE_URL = 'http://localhost:8081/api'; // Spring Boot server URL
  
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
      
      // Check if URL is from known base
      if (!this.isFromKnownBase(url) && !url.includes('example.com')) {
        // For demo purposes, we'll allow example.com
        console.warn('URL is not from known base, but proceeding for demo purposes');
      }

      // Make actual API call to the Spring Boot backend
      const response = await fetch(`${this.API_BASE_URL}/crawler/crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || `Server responded with status: ${response.status}`
        };
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Crawler API' 
      };
    }
  }

  // Fallback method to use simulated data for development/testing purposes
  static async simulateCrawl(url: string): Promise<CrawlResponse> {
    try {
      console.log('Simulating crawl for URL:', url);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate sample content
      const sampleContent = `
        This is a sample smartphone page from ${url}. 
        Contact us at support@example.com or call us at 555-123-4567.
        Visit our website at https://example.com/about for more information.
        The display has 120Hz refresh rate with teh best colors.
        Battery life is exceptional at 4500mAh.
        Thier customer service is excellent.
        The phone features a 50MP camera with 4K video recording.
      `;
      
      // Apply various analysis algorithms
      const textAnalysis = TextAnalyzer.analyzeText(sampleContent);
      const spellingCorrections = SpellChecker.checkSpelling(sampleContent);
      const wordSuggestions = WordCompletion.getSuggestions("ph");
      const wordFrequencies = FrequencyAnalyzer.countWordFrequencies(sampleContent);
      
      // Create the mock data structure
      const mockData = [
        {
          url: url,
          title: "Sample Smartphone Page",
          content: sampleContent,
          metadata: {
            description: "Detailed information about the latest smartphones",
            keywords: ["phone", "smartphone", "mobile", "gadget"]
          },
          analysis: textAnalysis,
          spellingCorrections: spellingCorrections,
          searchSuggestions: wordSuggestions,
          wordFrequencies: wordFrequencies
        }
      ];
      
      const mockResponse: CrawlResponse = {
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
      console.error('Error during simulated crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Crawler API' 
      };
    }
  }
}
