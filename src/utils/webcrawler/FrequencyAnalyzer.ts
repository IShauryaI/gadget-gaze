
import { WordFrequency } from './types';

export class FrequencyAnalyzer {
  /**
   * Counts word frequencies in the provided text
   */
  static countWordFrequencies(text: string): WordFrequency {
    const frequencies: WordFrequency = {};
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 0);
    
    words.forEach(word => {
      frequencies[word] = (frequencies[word] || 0) + 1;
    });
    
    return frequencies;
  }
}
