
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

// Inspired by the Java TextAnalyzer class
interface TextAnalysis {
  phoneNumbers: string[];
  emailAddresses: string[];
  urls: string[];
}

// Inspired by the Java VocabularyBuilder (SpellChecker) class
interface SpellCorrection {
  original: string;
  suggested: string;
}

// Inspired by the Java PrefixWordCompletion class
interface WordSuggestion {
  prefix: string;
  suggestions: string[];
}

// Inspired by the Java PatternSearchAlgorithm (FrequencyCount) class
interface WordFrequency {
  [word: string]: number;
}

export class WebCrawlerService {
  private static API_KEY_STORAGE_KEY = 'webcrawler_api_key';
  private static API_BASE_URL = 'http://localhost:8081/api'; // Spring Boot server URL
  
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
      const textAnalysis = this.analyzeText(sampleContent);
      const spellingCorrections = this.checkSpelling(sampleContent);
      const wordSuggestions = this.getSuggestions("ph");
      const wordFrequencies = this.countWordFrequencies(sampleContent);
      
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
      console.error('Error during simulated crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Crawler API' 
      };
    }
  }
  
  // Helper methods for simulation mode
  private static analyzeText(text: string): TextAnalysis {
    const phoneRegex = /\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const urlRegex = /https?:\/\/[\w-]+(\.[\w-]+)+([\\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;

    return {
      phoneNumbers: Array.from(text.matchAll(phoneRegex)).map(match => match[0]),
      emailAddresses: Array.from(text.matchAll(emailRegex)).map(match => match[0]),
      urls: Array.from(text.matchAll(urlRegex)).map(match => match[0])
    };
  }

  private static checkSpelling(text: string): SpellCorrection[] {
    const commonMisspellings: { [key: string]: string } = {
      "teh": "the",
      "thier": "their",
      "recieve": "receive",
      "wierd": "weird",
      "wich": "which",
      "accesories": "accessories",
      "connectivty": "connectivity",
      "smartfone": "smartphone",
      "batery": "battery",
      "disply": "display"
    };

    const corrections: SpellCorrection[] = [];
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (commonMisspellings[word]) {
        corrections.push({
          original: word,
          suggested: commonMisspellings[word]
        });
      }
    });

    return corrections;
  }

  private static getSuggestions(prefix: string): string[] {
    const dictionary = [
      "phone", "smartphone", "tablet", "charger", "adapter",
      "power", "battery", "screen", "display", "camera",
      "photo", "video", "audio", "speaker", "headphone",
      "bluetooth", "wifi", "connection", "data", "storage",
      "memory", "processor", "performance", "application", "app"
    ];
    
    return dictionary.filter(word => word.startsWith(prefix.toLowerCase()));
  }

  private static countWordFrequencies(text: string): WordFrequency {
    const frequencies: WordFrequency = {};
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 0);
    
    words.forEach(word => {
      frequencies[word] = (frequencies[word] || 0) + 1;
    });
    
    return frequencies;
  }
}
