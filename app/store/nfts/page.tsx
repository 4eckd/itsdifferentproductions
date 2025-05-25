import { Gem, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";

export default function NFTsPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-4">NFT Collection</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Unique digital collectibles and exclusive content
        </p>
      </section>

      {/* NFT Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* NFT Items */}
          {[1, 2, 3, 4, 5, 6].map((nft) => (
            <BackgroundGradient key={nft} className="rounded-xl p-1">
              <div className="bg-background rounded-lg overflow-hidden">
                <div className="aspect-square relative bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Gem className="h-16 w-16" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">NFT #{nft}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Limited edition digital collectible from Its Different Productions
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Price</p>
                      <p className="font-bold">0.{nft} ETH</p>
                    </div>

                    <Button>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on OpenSea
                    </Button>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          ))}
        </div>
      </section>

      {/* Vocalist Auditions Banner */}
      <VocalistCTABanner />
    </div>
  );
}
