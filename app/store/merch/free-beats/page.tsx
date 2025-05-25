"use client";

import { useState } from "react";
import { Download, Star, Heart, Filter, Music, Gift, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MerchandiseCategoryNav } from "@/components/store/merchandise-category-nav";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";
import { freeBeatsProducts } from "@/lib/data/sample-merchandise";
import Image from "next/image";

export default function FreeBeatsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProducts = freeBeatsProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || product.subcategory === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "downloads":
          return b.reviews - a.reviews; // Using reviews as download count
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
            <Gift className="h-8 w-8 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Free Beats</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complimentary music downloads and samples from Its Different Productions.
            Perfect for upcoming artists and creators to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1 bg-green-500/10 text-green-600">
              <Gift className="mr-1 h-3 w-3" /> 100% Free
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Download className="mr-1 h-3 w-3" /> Instant Download
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              No Registration Required
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
                  placeholder="Search free beats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Beat Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="samples">Sample Packs</SelectItem>
                  <SelectItem value="trap">Trap Beats</SelectItem>
                  <SelectItem value="hip-hop">Hip Hop</SelectItem>
                  <SelectItem value="rnb">R&B</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
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
              className="border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-green-500/50 bg-card relative"
            >
              {/* Free Badge */}
              <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                FREE
              </div>

              {/* Product Image */}
              <div className="aspect-square relative bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2 border-green-500/50 text-green-600">
                    {product.subcategory}
                  </Badge>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {product.description}
                  </p>
                </div>

                {/* Rating and Downloads */}
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
                    {product.rating} ({product.reviews} downloads)
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    MP3 Format
                  </Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    Non-Commercial Use
                  </Badge>
                </div>

                {/* Download Button */}
                <div className="pt-2">
                  <Button size="sm" className="w-full group/btn bg-green-500 hover:bg-green-600">
                    <Download className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Free Download
                  </Button>
                </div>

                {/* Attribution Notice */}
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <Music className="h-3 w-3 inline mr-1" />
                  Credit: Its Different Productions
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No free beats found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Want More <span className="text-gradient">Premium Beats</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Check out our premium beat collection with exclusive licensing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <a href="/store/beats">
                Browse Premium Beats
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="/store/merch/beat-licensing">
                View Licensing Options
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Vocalist Auditions Banner */}
      <VocalistCTABanner />
    </div>
  );
}
