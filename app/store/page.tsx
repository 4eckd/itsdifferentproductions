import Link from "next/link";
import { Music, Shirt, Gem, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { DiscordBanner } from "@/components/discord-banner";

export default function StorePage() {
  return (
    <>
      <DiscordBanner />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background z-0" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl z-0" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Welcome to <span className="text-gradient">Its Different Productions</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover premium beats, exclusive merchandise, and unique NFTs from #40gang
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Star className="mr-1 h-3 w-3" /> Premium Quality
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Worldwide Shipping
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Secure Payments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
            Shop by <span className="text-gradient">Category</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Beats Category */}
            <BackgroundGradient className="h-full" borderRadius="xl">
              <div className="bg-background rounded-xl p-6 sm:p-8 h-full flex flex-col">
                <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit">
                  <Music className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Beats</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  Purchase or license a beat for use in your audio streams.
                </p>
                <Link href="/store/beats" className="w-full mt-auto">
                  <Button className="w-full group" size="lg">
                    Browse Beats
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </BackgroundGradient>

            {/* Merchandise Category */}
            <BackgroundGradient className="h-full" borderRadius="xl">
              <div className="bg-background rounded-xl p-6 sm:p-8 h-full flex flex-col">
                <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit">
                  <Shirt className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Merchandise</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  Exclusive clothing and accessories from Its Different Productions.
                </p>
                <Link href="/store/merch" className="w-full mt-auto">
                  <Button className="w-full group" size="lg">
                    Shop Merch
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </BackgroundGradient>

            {/* NFTs Category */}
            <BackgroundGradient className="h-full" borderRadius="xl">
              <div className="bg-background rounded-xl p-6 sm:p-8 h-full flex flex-col">
                <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit">
                  <Gem className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">NFTs</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  Unique digital collectibles and exclusive content.
                </p>
                <Link href="/store/nfts" className="w-full mt-auto">
                  <Button className="w-full group" size="lg">
                    Explore NFTs
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <Button variant="outline" className="group mt-4 sm:mt-0">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for featured products */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group"
              >
                <div className="aspect-square relative bg-muted overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
                    Product Image
                  </div>
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    Featured Product {item}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Premium quality product with unique design
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-bold text-lg">$99.99</div>
                    <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
