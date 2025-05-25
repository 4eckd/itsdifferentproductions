"use client";

import { useState } from "react";
import { Package, ShoppingCart, Star, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MerchandiseCategoryNav } from "@/components/store/merchandise-category-nav";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";
import { collectiblesProducts } from "@/lib/data/sample-merchandise";
import Image from "next/image";

export default function CollectiblesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProducts = collectiblesProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || product.subcategory === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Collectibles</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Memorabilia and special collectible items from Its Different Productions.
            Perfect for fans and collectors of the #40gang movement.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="mr-1 h-3 w-3" /> Authentic
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Memorabilia
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              Fan Favorites
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
                  placeholder="Search collectibles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Item Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pins">Pins</SelectItem>
                  <SelectItem value="stickers">Stickers</SelectItem>
                  <SelectItem value="patches">Patches</SelectItem>
                  <SelectItem value="keychains">Keychains</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                    {product.subcategory}
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

                {/* Colors */}
                {product.colors && (
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="secondary" className="text-xs px-2 py-0.5">
                        {color}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stock */}
                {product.stock && product.stock < 100 && (
                  <div className="text-sm text-orange-600 font-medium">
                    Only {product.stock} left in stock!
                  </div>
                )}

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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No collectibles found</h3>
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
