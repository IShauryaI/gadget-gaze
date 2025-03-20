
import { SpellCorrection } from './types';

export class SpellChecker {
  private static commonMisspellings: { [key: string]: string } = {
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

  /**
   * Checks text for spelling errors and suggests corrections
   */
  static checkSpelling(text: string): SpellCorrection[] {
    const corrections: SpellCorrection[] = [];
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (this.commonMisspellings[word]) {
        corrections.push({
          original: word,
          suggested: this.commonMisspellings[word]
        });
      }
    });

    return corrections;
  }
}
