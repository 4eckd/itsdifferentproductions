import { Music, Zap, Spade, Star, Package, Headphones, Download } from "lucide-react";

export interface MerchandiseCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  slug: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export const MERCHANDISE_CATEGORIES: MerchandiseCategory[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Tech accessories, audio equipment, and electronic gear",
    icon: Zap,
    slug: "electronics",
    featured: true,
  },
  {
    id: "playing-cards",
    name: "Playing Cards",
    description: "Custom card decks and collectible playing cards",
    icon: Spade,
    slug: "playing-cards",
    featured: true,
  },
  {
    id: "rares",
    name: "Rares",
    description: "Limited edition items and exclusive pieces",
    icon: Star,
    slug: "rares",
    featured: true,
  },
  {
    id: "collectibles",
    name: "Collectibles",
    description: "Memorabilia and special collectible items",
    icon: Package,
    slug: "collectibles",
  },
  {
    id: "beats",
    name: "Beats",
    description: "Premium beats and music production",
    icon: Music,
    slug: "beats",
    featured: true,
  },
  {
    id: "beat-licensing",
    name: "Beat Licensing",
    description: "Professional licensing options for beats",
    icon: Headphones,
    slug: "beat-licensing",
  },
  {
    id: "free-beats",
    name: "Free Beats",
    description: "Complimentary music downloads and samples",
    icon: Download,
    slug: "free-beats",
    featured: true,
  },
];

export const FEATURED_CATEGORIES = MERCHANDISE_CATEGORIES.filter(cat => cat.featured);

export const getCategoryBySlug = (slug: string): MerchandiseCategory | undefined => {
  return MERCHANDISE_CATEGORIES.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): MerchandiseCategory | undefined => {
  return MERCHANDISE_CATEGORIES.find(cat => cat.id === id);
};
