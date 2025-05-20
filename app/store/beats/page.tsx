import { Music, Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BeatsPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-4">Beats</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Premium beats for artists, producers, and content creators
        </p>
      </section>

      {/* Beats List */}
      <section className="py-8">
        <div className="grid grid-cols-1 gap-4">
          {/* Beat Item */}
          {[1, 2, 3, 4, 5].map((beat) => (
            <div key={beat} className="border rounded-lg p-4 flex items-center">
              <div className="h-16 w-16 bg-primary/10 rounded-md flex items-center justify-center mr-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium">Beat Title {beat}</h3>
                <p className="text-sm text-muted-foreground">
                  Genre • BPM: 120 • Key: C Minor
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Play className="h-5 w-5" />
                  <span className="sr-only">Play</span>
                </Button>
                
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Buy $29.99
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
