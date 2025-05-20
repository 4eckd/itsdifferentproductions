import { Shirt, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MerchPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-4">Merchandise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Exclusive clothing and accessories from Its Different Productions
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Product Items */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
            <div key={product} className="border rounded-lg overflow-hidden group">
              <div className="aspect-square relative bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <Shirt className="h-12 w-12" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium">Product Name {product}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  T-Shirt • Available in multiple sizes
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold">$29.99</span>
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
