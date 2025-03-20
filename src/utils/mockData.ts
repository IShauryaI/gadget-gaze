
export interface Phone {
  id: string;
  brand: string;
  model: string;
  price: number;
  releaseYear: number;
  image: string;
  rating: number;
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    camera: string;
    features: string[];
  };
  searchCount: number;
  mentions: number;
}

export const phones: Phone[] = [
  {
    id: "iphone15pro",
    brand: "Apple",
    model: "iPhone 15 Pro",
    price: 999,
    releaseYear: 2023,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=iPhone+15+Pro",
    rating: 4.8,
    specs: {
      display: "6.1-inch Super Retina XDR OLED, 120Hz",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "128GB/256GB/512GB/1TB",
      battery: "3,274 mAh",
      camera: "48MP main + 12MP ultrawide + 12MP telephoto",
      features: ["5G", "Face ID", "USB-C", "Titanium frame"]
    },
    searchCount: 845,
    mentions: 1240
  },
  {
    id: "samsungs24ultra",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1199,
    releaseYear: 2024,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Galaxy+S24+Ultra",
    rating: 4.7,
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB/512GB/1TB",
      battery: "5,000 mAh",
      camera: "200MP main + 12MP ultrawide + 10MP telephoto + 50MP periscope",
      features: ["5G", "S Pen", "Titanium frame", "Galaxy AI"]
    },
    searchCount: 758,
    mentions: 980
  },
  {
    id: "pixel8pro",
    brand: "Google",
    model: "Pixel 8 Pro",
    price: 999,
    releaseYear: 2023,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Pixel+8+Pro",
    rating: 4.6,
    specs: {
      display: "6.7-inch LTPO OLED, 120Hz",
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "128GB/256GB/512GB/1TB",
      battery: "5,050 mAh",
      camera: "50MP main + 48MP ultrawide + 48MP telephoto",
      features: ["5G", "Titan M2 security", "7 years of updates", "Google AI"]
    },
    searchCount: 532,
    mentions: 760
  },
  {
    id: "xiaomi14ultra",
    brand: "Xiaomi",
    model: "14 Ultra",
    price: 1299,
    releaseYear: 2024,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Xiaomi+14+Ultra",
    rating: 4.5,
    specs: {
      display: "6.73-inch LTPO AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB/1TB",
      battery: "5,300 mAh",
      camera: "50MP main + 50MP ultrawide + 50MP telephoto + 50MP periscope",
      features: ["5G", "Leica optics", "90W fast charging", "IP68"]
    },
    searchCount: 425,
    mentions: 630
  },
  {
    id: "oneplus12",
    brand: "OnePlus",
    model: "12",
    price: 799,
    releaseYear: 2024,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=OnePlus+12",
    rating: 4.5,
    specs: {
      display: "6.82-inch LTPO AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB/16GB",
      storage: "256GB/512GB",
      battery: "5,400 mAh",
      camera: "50MP main + 48MP ultrawide + 64MP telephoto",
      features: ["5G", "100W fast charging", "50W wireless charging", "Hasselblad tuning"]
    },
    searchCount: 380,
    mentions: 540
  },
  {
    id: "motorolaedge40ultra",
    brand: "Motorola",
    model: "Edge 40 Ultra",
    price: 799,
    releaseYear: 2023,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Motorola+Edge+40+Ultra",
    rating: 4.3,
    specs: {
      display: "6.67-inch pOLED, 165Hz",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "512GB",
      battery: "4,600 mAh",
      camera: "50MP main + 50MP ultrawide + 12MP telephoto",
      features: ["5G", "125W fast charging", "IP68", "Curved display"]
    },
    searchCount: 280,
    mentions: 420
  },
  {
    id: "nothingphone2",
    brand: "Nothing",
    model: "Phone (2)",
    price: 699,
    releaseYear: 2023,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Nothing+Phone+2",
    rating: 4.2,
    specs: {
      display: "6.7-inch LTPO OLED, 120Hz",
      processor: "Snapdragon 8+ Gen 1",
      ram: "8GB/12GB",
      storage: "128GB/256GB/512GB",
      battery: "4,700 mAh",
      camera: "50MP main + 50MP ultrawide",
      features: ["5G", "Glyph interface", "45W fast charging", "Clean UI"]
    },
    searchCount: 320,
    mentions: 480
  },
  {
    id: "asuszenfone10ultra",
    brand: "Asus",
    model: "Zenfone 10 Ultra",
    price: 899,
    releaseYear: 2024,
    image: "https://placehold.co/600x800/f5f5f7/999999?text=Asus+Zenfone+10+Ultra",
    rating: 4.4,
    specs: {
      display: "6.78-inch AMOLED, 144Hz",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "256GB/512GB",
      battery: "5,500 mAh",
      camera: "50MP main + 32MP ultrawide + 64MP telephoto",
      features: ["5G", "65W fast charging", "Gaming features", "IP68"]
    },
    searchCount: 220,
    mentions: 350
  }
];

export const popularFeatures = [
  { name: "5G", count: 1240 },
  { name: "AMOLED display", count: 980 },
  { name: "Fast charging", count: 920 },
  { name: "AI features", count: 850 },
  { name: "High refresh rate", count: 780 },
  { name: "Wireless charging", count: 690 },
  { name: "IP68 water resistance", count: 640 },
  { name: "Premium build", count: 580 }
];

export const popularSearches = [
  "iPhone 15 vs Pixel 8",
  "Best camera phone 2024",
  "Fastest charging phone",
  "S24 Ultra vs iPhone 15 Pro Max",
  "Phones under $800",
  "Best gaming smartphone"
];

export const recentSearches = [
  "OnePlus 12",
  "Xiaomi 14 Ultra camera",
  "iPhone 15 Pro battery life",
  "Samsung S24 vs S23"
];

export const getTrendingPhones = () => {
  // Return phones sorted by search count (most searched first)
  return [...phones].sort((a, b) => b.searchCount - a.searchCount).slice(0, 6);
};

export const getMostMentionedPhones = () => {
  // Return phones sorted by mentions (most mentioned first)
  return [...phones].sort((a, b) => b.mentions - a.mentions).slice(0, 6);
};

export const getPhoneById = (id: string) => {
  return phones.find(phone => phone.id === id);
};

export const getPhonesByBrand = (brand: string) => {
  return phones.filter(phone => phone.brand.toLowerCase() === brand.toLowerCase());
};

export const getPhonesByFeature = (feature: string) => {
  return phones.filter(phone => 
    phone.specs.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase())
    )
  );
};
