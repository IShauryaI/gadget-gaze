
export class WordCompletion {
  private static dictionary = [
    "phone", "smartphone", "tablet", "charger", "adapter",
    "power", "battery", "screen", "display", "camera",
    "photo", "video", "audio", "speaker", "headphone",
    "bluetooth", "wifi", "connection", "data", "storage",
    "memory", "processor", "performance", "application", "app"
  ];

  /**
   * Gets word suggestions based on a prefix
   */
  static getSuggestions(prefix: string): string[] {
    return this.dictionary.filter(word => 
      word.startsWith(prefix.toLowerCase())
    );
  }
}
