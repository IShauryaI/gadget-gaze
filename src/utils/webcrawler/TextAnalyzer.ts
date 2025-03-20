
import { TextAnalysis } from './types';

export class TextAnalyzer {
  /**
   * Analyzes text to extract phone numbers, email addresses, and URLs
   */
  static analyzeText(text: string): TextAnalysis {
    const phoneRegex = /\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const urlRegex = /https?:\/\/[\w-]+(\.[\w-]+)+([\\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;

    return {
      phoneNumbers: Array.from(text.matchAll(phoneRegex)).map(match => match[0]),
      emailAddresses: Array.from(text.matchAll(emailRegex)).map(match => match[0]),
      urls: Array.from(text.matchAll(urlRegex)).map(match => match[0])
    };
  }
}
