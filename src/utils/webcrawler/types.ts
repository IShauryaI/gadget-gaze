
// Define interfaces for API responses
export interface ErrorResponse {
  success: false;
  error: string;
}

export interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

export type CrawlResponse = CrawlStatusResponse | ErrorResponse;

// Text analysis interfaces
export interface TextAnalysis {
  phoneNumbers: string[];
  emailAddresses: string[];
  urls: string[];
}

export interface SpellCorrection {
  original: string;
  suggested: string;
}

export interface WordSuggestion {
  prefix: string;
  suggestions: string[];
}

export interface WordFrequency {
  [word: string]: number;
}
