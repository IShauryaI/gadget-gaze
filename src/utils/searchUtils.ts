
import { phones, Phone } from './mockData';

// Function to calculate Levenshtein distance (edit distance)
export function getEditDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

// Function to check if a search term is misspelled and suggest corrections
export function checkSpelling(term: string): { isCorrect: boolean; suggestion: string | null } {
  // List of correct terms (brand and model names)
  const correctTerms: string[] = phones.flatMap(phone => [
    phone.brand.toLowerCase(),
    phone.model.toLowerCase(),
    `${phone.brand} ${phone.model}`.toLowerCase()
  ]);

  // Check if the term exactly matches any correct term
  if (correctTerms.includes(term.toLowerCase())) {
    return { isCorrect: true, suggestion: null };
  }

  // Find closest match
  let closestMatch = '';
  let minDistance = Infinity;

  for (const correctTerm of correctTerms) {
    const distance = getEditDistance(term.toLowerCase(), correctTerm);
    // Consider it a potential match if edit distance is small relative to the length of the term
    const threshold = Math.max(2, Math.floor(correctTerm.length * 0.3));
    
    if (distance < minDistance && distance <= threshold) {
      minDistance = distance;
      closestMatch = correctTerm;
    }
  }

  if (closestMatch) {
    // Format the suggestion with proper capitalization
    const formattedSuggestion = closestMatch
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return { isCorrect: false, suggestion: formattedSuggestion };
  }

  return { isCorrect: false, suggestion: null };
}

// Function to get autocomplete suggestions
export function getAutocompleteSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions: string[] = [];

  // Add brand and model suggestions
  phones.forEach(phone => {
    const fullName = `${phone.brand} ${phone.model}`;
    if (fullName.toLowerCase().includes(lowerQuery)) {
      suggestions.push(fullName);
    } else if (phone.brand.toLowerCase().includes(lowerQuery)) {
      suggestions.push(phone.brand);
    } else if (phone.model.toLowerCase().includes(lowerQuery)) {
      suggestions.push(`${phone.brand} ${phone.model}`);
    }
  });

  // Add feature suggestions
  phones.forEach(phone => {
    phone.specs.features.forEach(feature => {
      if (feature.toLowerCase().includes(lowerQuery) && !suggestions.includes(feature)) {
        suggestions.push(feature);
      }
    });
  });

  // Remove duplicates and sort
  return [...new Set(suggestions)].slice(0, 5);
}

// Filter phones based on a search query
export function searchPhones(query: string): Phone[] {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(' ').filter(term => term.length > 0);
  
  // Simple inverted index implementation
  return phones.filter(phone => {
    const searchableText = [
      phone.brand.toLowerCase(),
      phone.model.toLowerCase(),
      phone.specs.processor.toLowerCase(),
      phone.specs.display.toLowerCase(),
      phone.specs.camera.toLowerCase(),
      ...phone.specs.features.map(f => f.toLowerCase())
    ].join(' ');
    
    // Check if all terms are found in the searchable text
    return terms.every(term => searchableText.includes(term));
  });
}

// Get detailed comparison between phones
export function comparePhones(phoneId1: string, phoneId2: string): { 
  phone1: Phone | null; 
  phone2: Phone | null; 
  comparison: Record<string, { value1: string; value2: string; winner: 1 | 2 | 0 }> 
} {
  const phone1 = phones.find(p => p.id === phoneId1) || null;
  const phone2 = phones.find(p => p.id === phoneId2) || null;
  
  if (!phone1 || !phone2) {
    return { phone1, phone2, comparison: {} };
  }
  
  // Generate comparison object
  const comparison: Record<string, { value1: string; value2: string; winner: 1 | 2 | 0 }> = {
    price: {
      value1: `$${phone1.price}`,
      value2: `$${phone2.price}`,
      winner: phone1.price < phone2.price ? 1 : (phone2.price < phone1.price ? 2 : 0)
    },
    display: {
      value1: phone1.specs.display,
      value2: phone2.specs.display,
      // Simple heuristic: higher refresh rate or bigger display is better
      winner: determineDisplayWinner(phone1.specs.display, phone2.specs.display)
    },
    processor: {
      value1: phone1.specs.processor,
      value2: phone2.specs.processor,
      // Simple heuristic: newer gen generally better
      winner: determineProcessorWinner(phone1.specs.processor, phone2.specs.processor)
    },
    ram: {
      value1: phone1.specs.ram,
      value2: phone2.specs.ram,
      winner: compareRam(phone1.specs.ram, phone2.specs.ram)
    },
    battery: {
      value1: phone1.specs.battery,
      value2: phone2.specs.battery,
      winner: compareBattery(phone1.specs.battery, phone2.specs.battery)
    },
    camera: {
      value1: phone1.specs.camera,
      value2: phone2.specs.camera,
      // Simple heuristic: higher MP counts are better
      winner: determineCameraWinner(phone1.specs.camera, phone2.specs.camera)
    },
    rating: {
      value1: phone1.rating.toString(),
      value2: phone2.rating.toString(),
      winner: phone1.rating > phone2.rating ? 1 : (phone2.rating > phone1.rating ? 2 : 0)
    },
    popularity: {
      value1: phone1.searchCount.toString(),
      value2: phone2.searchCount.toString(),
      winner: phone1.searchCount > phone2.searchCount ? 1 : (phone2.searchCount > phone1.searchCount ? 2 : 0)
    }
  };
  
  return { phone1, phone2, comparison };
}

// Helper functions for comparison
function determineDisplayWinner(display1: string, display2: string): 1 | 2 | 0 {
  // Simple heuristic checking for refresh rate and display size
  const refreshRate1 = extractRefreshRate(display1);
  const refreshRate2 = extractRefreshRate(display2);
  
  if (refreshRate1 > refreshRate2) return 1;
  if (refreshRate2 > refreshRate1) return 2;
  
  // If refresh rates are the same, check display size
  const size1 = extractDisplaySize(display1);
  const size2 = extractDisplaySize(display2);
  
  if (size1 > size2) return 1;
  if (size2 > size1) return 2;
  
  return 0; // Tie
}

function extractRefreshRate(displaySpec: string): number {
  const match = displaySpec.match(/(\d+)Hz/);
  return match ? parseInt(match[1], 10) : 60; // Default to 60Hz if not found
}

function extractDisplaySize(displaySpec: string): number {
  const match = displaySpec.match(/(\d+\.?\d*)-inch/);
  return match ? parseFloat(match[1]) : 0;
}

function determineProcessorWinner(proc1: string, proc2: string): 1 | 2 | 0 {
  // Very simple heuristic: higher gen number is better
  const genNum1 = extractGenerationNumber(proc1);
  const genNum2 = extractGenerationNumber(proc2);
  
  if (genNum1 > genNum2) return 1;
  if (genNum2 > genNum1) return 2;
  
  return 0; // Tie
}

function extractGenerationNumber(processor: string): number {
  // Extract generation numbers like "8 Gen 3", "A17", etc.
  const match = processor.match(/(\d+)\s*(?:Gen|Pro)?(?:\s*(\d+))?/);
  if (!match) return 0;
  
  // If format is like "8 Gen 3", combine the numbers
  if (match[2]) {
    return parseInt(match[1]) * 10 + parseInt(match[2]);
  }
  // If format is like "A17"
  return parseInt(match[1]);
}

function compareRam(ram1: string, ram2: string): 1 | 2 | 0 {
  // Extract and compare RAM sizes
  const size1 = extractRamSize(ram1);
  const size2 = extractRamSize(ram2);
  
  if (size1 > size2) return 1;
  if (size2 > size1) return 2;
  return 0; // Tie
}

function extractRamSize(ramSpec: string): number {
  const match = ramSpec.match(/(\d+)GB/);
  return match ? parseInt(match[1], 10) : 0;
}

function compareBattery(battery1: string, battery2: string): 1 | 2 | 0 {
  // Extract and compare battery capacities
  const capacity1 = extractBatteryCapacity(battery1);
  const capacity2 = extractBatteryCapacity(battery2);
  
  if (capacity1 > capacity2) return 1;
  if (capacity2 > capacity1) return 2;
  return 0; // Tie
}

function extractBatteryCapacity(batterySpec: string): number {
  const match = batterySpec.match(/(\d+)\s*mAh/);
  return match ? parseInt(match[1], 10) : 0;
}

function determineCameraWinner(camera1: string, camera2: string): 1 | 2 | 0 {
  // Extract and compare main camera megapixels
  const mp1 = extractMainCameraMp(camera1);
  const mp2 = extractMainCameraMp(camera2);
  
  if (mp1 > mp2) return 1;
  if (mp2 > mp1) return 2;
  
  // If main cameras are tied, count number of camera sensors
  const sensorCount1 = (camera1.match(/\+/g) || []).length + 1;
  const sensorCount2 = (camera2.match(/\+/g) || []).length + 1;
  
  if (sensorCount1 > sensorCount2) return 1;
  if (sensorCount2 > sensorCount1) return 2;
  
  return 0; // Tie
}

function extractMainCameraMp(cameraSpec: string): number {
  const match = cameraSpec.match(/(\d+)MP\s+main/);
  return match ? parseInt(match[1], 10) : 0;
}
