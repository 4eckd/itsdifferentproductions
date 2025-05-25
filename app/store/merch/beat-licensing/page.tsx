"use client";

import { useState } from "react";
import { Headphones, ShoppingCart, Star, Heart, Filter, Music, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MerchandiseCategoryNav } from "@/components/store/merchandise-category-nav";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";
import { beatLicensingProducts } from "@/lib/data/sample-merchandise";
import Image from "next/image";

export default function BeatLicensingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [licenseFilter, setLicenseFilter] = useState("all");

  const filteredProducts = beatLicensingProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLicense = licenseFilter === "all" || product.subcategory === licenseFilter;
      return matchesSearch && matchesLicense;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  const getLicenseFeatures = (subcategory: string) => {
    switch (subcategory) {
      case "basic":
        return ["Non-commercial use", "MP3 download", "Basic license agreement", "Email support"];
      case "premium":
        return ["Commercial use", "WAV + stems", "Unlimited distribution", "Priority support", "Trackouts included"];
      case "exclusive":
        return ["Full exclusive rights", "Complete ownership", "All file formats", "Producer credit removal", "Custom contract"];
      default:
        return [];
    }
  };

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Beat Licensing</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Professional licensing options for Its Different Productions beats.
            Choose the perfect license for your project needs.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <Music className="mr-1 h-3 w-3" /> Professional Quality
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Instant Download
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Legal Protection
            </Badge>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6">
        <MerchandiseCategoryNav className="justify-center mb-8" />
      </section>

      {/* Filters */}
      <section className="py-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search licensing options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="License Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  <SelectItem value="basic">Basic License</SelectItem>
                  <SelectItem value="premium">Premium License</SelectItem>
                  <SelectItem value="exclusive">Exclusive Rights</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card"
            >
              {/* Product Image */}
              <div className="aspect-video relative bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-bold ${
                      product.subcategory === "exclusive" 
                        ? "bg-yellow-500 text-yellow-900" 
                        : product.subcategory === "premium"
                        ? "bg-purple-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {product.subcategory.toUpperCase()}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-xl group-hover:text-primary transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What's included:</h4>
                  <ul className="space-y-1">
                    {getLicenseFeatures(product.subcategory).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
                    {product.rating} ({product.reviews} purchases)
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold">${product.price}</span>
                  </div>
                  <Button size="sm" className="group/btn">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    License Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No licensing options found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </section>

      {/* Vocalist Auditions Banner */}
      <VocalistCTABanner />
    </div>
  );
}
