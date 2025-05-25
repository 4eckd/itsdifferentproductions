import { Shirt, ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";
import { MerchandiseCategoryNav } from "@/components/store/merchandise-category-nav";
import Image from "next/image";

// Merchandise product data using the provided images
const merchProducts = [
  {
    id: 1,
    name: "IDP Classic Hoodie",
    description: "Premium quality hoodie with Its Different Productions branding",
    price: 59.99,
    image: "/merch1.jpg",
    category: "Hoodie",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    rating: 4.8,
    reviews: 24,
    isNew: true,
  },
  {
    id: 2,
    name: "40Gang Signature Tee",
    description: "Comfortable cotton t-shirt featuring exclusive 40gang design",
    price: 29.99,
    image: "/merch2.jpg",
    category: "T-Shirt",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    rating: 4.9,
    reviews: 18,
    isNew: false,
  },
  {
    id: 3,
    name: "IDP Snapback Cap",
    description: "Adjustable snapback cap with embroidered logo",
    price: 34.99,
    image: "/merch3.jpg",
    category: "Hat",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "White"],
    rating: 4.7,
    reviews: 31,
    isNew: true,
  },
  {
    id: 4,
    name: "Producer Essentials Hoodie",
    description: "Limited edition hoodie for music producers and creators",
    price: 64.99,
    image: "/merch4.jpg",
    category: "Hoodie",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    rating: 4.9,
    reviews: 12,
    isNew: true,
  },
  {
    id: 5,
    name: "Studio Sessions Tee",
    description: "Vintage-style t-shirt celebrating late night studio sessions",
    price: 27.99,
    image: "/merch5.jpg",
    category: "T-Shirt",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Vintage Gray"],
    rating: 4.6,
    reviews: 22,
    isNew: false,
  },
  {
    id: 6,
    name: "Beat Maker Zip Hoodie",
    description: "Full-zip hoodie with premium materials and unique design",
    price: 69.99,
    image: "/merch6.jpg",
    category: "Hoodie",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray"],
    rating: 4.8,
    reviews: 15,
    isNew: false,
  },
  {
    id: 7,
    name: "IDP Logo Crewneck",
    description: "Classic crewneck sweatshirt with embroidered logo",
    price: 49.99,
    image: "/merch7.jpg",
    category: "Sweatshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    rating: 4.7,
    reviews: 19,
    isNew: false,
  },
  {
    id: 8,
    name: "Limited Edition Varsity Jacket",
    description: "Exclusive varsity jacket with premium leather sleeves",
    price: 129.99,
    image: "/merch8.jpg",
    category: "Jacket",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black/White", "Navy/Gray"],
    rating: 5.0,
    reviews: 8,
    isNew: true,
  },
  {
    id: 9,
    name: "40Gang Oversized Hoodie",
    description: "Trendy oversized fit hoodie with bold graphics",
    price: 74.99,
    image: "/merch9.jpg",
    category: "Hoodie",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    rating: 4.9,
    reviews: 27,
    isNew: true,
  },
];

export default function MerchPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Exclusive <span className="text-gradient">Merchandise</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Premium clothing and accessories from Its Different Productions.
            Represent the #40gang with style and quality.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="mr-1 h-3 w-3" /> Premium Quality
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Limited Edition
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Free Shipping $50+
            </Badge>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground mb-6">
            Explore our diverse collection of premium merchandise
          </p>
        </div>
        <MerchandiseCategoryNav className="justify-center" />
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {merchProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card"
            >
              {/* Product Image */}
              <div className="aspect-square relative bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {product.isNew && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {product.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1">
                  {product.sizes.slice(0, 4).map((size) => (
                    <Badge key={size} variant="secondary" className="text-xs px-2 py-0.5">
                      {size}
                    </Badge>
                  ))}
                  {product.sizes.length > 4 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      +{product.sizes.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-bold">${product.price}</span>
                  </div>
                  <Button size="sm" className="group/btn">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vocalist Auditions Banner */}
      <VocalistCTABanner />

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Join the <span className="text-gradient">#40gang</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get exclusive access to limited drops, early releases, and special discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <a
                href="https://discord.gg/m3WwmkMHAx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord Community
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="/social">
                Follow on Social Media
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
