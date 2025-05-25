export interface MerchandiseProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
  stock?: number;
}

// Electronics Category
export const electronicsProducts: MerchandiseProduct[] = [
  {
    id: 101,
    name: "IDP Studio Headphones",
    description: "Professional-grade studio headphones with crystal clear sound",
    price: 199.99,
    image: "/merch1.jpg",
    category: "electronics",
    subcategory: "audio",
    colors: ["Black", "White"],
    rating: 4.9,
    reviews: 45,
    isNew: true,
    isFeatured: true,
    stock: 25,
  },
  {
    id: 102,
    name: "40Gang Bluetooth Speaker",
    description: "Portable wireless speaker with premium bass and IDP branding",
    price: 89.99,
    image: "/merch2.jpg",
    category: "electronics",
    subcategory: "audio",
    colors: ["Black", "Blue"],
    rating: 4.7,
    reviews: 32,
    stock: 40,
  },
  {
    id: 103,
    name: "Producer's USB Drive",
    description: "High-speed 64GB USB drive with exclusive beat samples",
    price: 34.99,
    image: "/merch3.jpg",
    category: "electronics",
    subcategory: "storage",
    colors: ["Black", "Silver"],
    rating: 4.8,
    reviews: 28,
    isNew: true,
    stock: 100,
  },
];

// Playing Cards Category
export const playingCardsProducts: MerchandiseProduct[] = [
  {
    id: 201,
    name: "40Gang Custom Deck",
    description: "Limited edition playing cards featuring exclusive artwork",
    price: 24.99,
    image: "/merch4.jpg",
    category: "playing-cards",
    subcategory: "custom",
    colors: ["Black/Gold", "White/Silver"],
    rating: 4.9,
    reviews: 67,
    isLimited: true,
    isFeatured: true,
    stock: 150,
  },
  {
    id: 202,
    name: "Producer's Poker Set",
    description: "Professional poker set with IDP branded chips and cards",
    price: 79.99,
    image: "/merch5.jpg",
    category: "playing-cards",
    subcategory: "poker",
    colors: ["Black", "Red"],
    rating: 4.8,
    reviews: 23,
    stock: 30,
  },
];

// Rares Category
export const raresProducts: MerchandiseProduct[] = [
  {
    id: 301,
    name: "Signed Vinyl Record",
    description: "Hand-signed vinyl record by Its Different Productions artists",
    price: 149.99,
    image: "/merch6.jpg",
    category: "rares",
    subcategory: "signed",
    rating: 5.0,
    reviews: 12,
    isLimited: true,
    isFeatured: true,
    stock: 5,
  },
  {
    id: 302,
    name: "Platinum Producer Chain",
    description: "Limited edition platinum chain with custom IDP pendant",
    price: 299.99,
    image: "/merch7.jpg",
    category: "rares",
    subcategory: "jewelry",
    colors: ["Platinum", "Gold"],
    rating: 4.9,
    reviews: 8,
    isLimited: true,
    stock: 10,
  },
];

// Collectibles Category
export const collectiblesProducts: MerchandiseProduct[] = [
  {
    id: 401,
    name: "IDP Commemorative Pin Set",
    description: "Collectible enamel pins featuring iconic IDP designs",
    price: 19.99,
    image: "/merch8.jpg",
    category: "collectibles",
    subcategory: "pins",
    colors: ["Multi-color"],
    rating: 4.7,
    reviews: 89,
    stock: 200,
  },
  {
    id: 402,
    name: "40Gang Sticker Pack",
    description: "Premium vinyl stickers perfect for laptops and gear",
    price: 12.99,
    image: "/merch9.jpg",
    category: "collectibles",
    subcategory: "stickers",
    colors: ["Multi-color"],
    rating: 4.6,
    reviews: 156,
    stock: 500,
  },
];

// Beat Licensing Products
export const beatLicensingProducts: MerchandiseProduct[] = [
  {
    id: 501,
    name: "Basic License Package",
    description: "Standard licensing for non-commercial use",
    price: 29.99,
    image: "/merch1.jpg",
    category: "beat-licensing",
    subcategory: "basic",
    rating: 4.8,
    reviews: 234,
    stock: 999,
  },
  {
    id: 502,
    name: "Premium License Package",
    description: "Commercial licensing with stems and unlimited use",
    price: 99.99,
    image: "/merch2.jpg",
    category: "beat-licensing",
    subcategory: "premium",
    rating: 4.9,
    reviews: 145,
    stock: 999,
  },
  {
    id: 503,
    name: "Exclusive Rights Package",
    description: "Full exclusive rights with complete ownership transfer",
    price: 499.99,
    image: "/merch3.jpg",
    category: "beat-licensing",
    subcategory: "exclusive",
    rating: 5.0,
    reviews: 67,
    stock: 999,
  },
];

// Free Beats Products
export const freeBeatsProducts: MerchandiseProduct[] = [
  {
    id: 601,
    name: "Sample Pack Vol. 1",
    description: "Free sample pack with 20 high-quality loops",
    price: 0,
    image: "/merch4.jpg",
    category: "free-beats",
    subcategory: "samples",
    rating: 4.7,
    reviews: 1234,
    stock: 999,
  },
  {
    id: 602,
    name: "Trap Starter Kit",
    description: "Free trap beats and samples for upcoming artists",
    price: 0,
    image: "/merch5.jpg",
    category: "free-beats",
    subcategory: "trap",
    rating: 4.8,
    reviews: 987,
    stock: 999,
  },
];

// Combined products by category
export const productsByCategory = {
  electronics: electronicsProducts,
  "playing-cards": playingCardsProducts,
  rares: raresProducts,
  collectibles: collectiblesProducts,
  "beat-licensing": beatLicensingProducts,
  "free-beats": freeBeatsProducts,
};

// All products combined
export const allMerchandiseProducts = [
  ...electronicsProducts,
  ...playingCardsProducts,
  ...raresProducts,
  ...collectiblesProducts,
  ...beatLicensingProducts,
  ...freeBeatsProducts,
];
