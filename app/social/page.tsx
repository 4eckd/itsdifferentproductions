import { SocialMediaLinks } from "@/components/social-media-links";
import { DiscordBanner } from "@/components/discord-banner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, MessageSquare, Music, Zap } from "lucide-react";

export default function SocialPage() {
  return (
    <>
      <DiscordBanner />
      <div className="container py-12">
        {/* Hero Section */}
        <section className="py-8 md:py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with <span className="text-gradient">#40gang</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our community across all platforms for exclusive content, behind-the-scenes access, 
              and direct connection with Its Different Productions.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="mr-1 h-3 w-3" /> 50K+ Community
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Heart className="mr-1 h-3 w-3" /> Daily Updates
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="mr-1 h-3 w-3" /> Exclusive Content
              </Badge>
            </div>
          </div>
        </section>

        {/* Main Platforms */}
        <section className="py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Main Platforms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow us on our primary platforms for the latest music, updates, and community interaction.
            </p>
          </div>
          <SocialMediaLinks 
            variant="grid" 
            showFollowers={true} 
            showMainOnly={true}
            className="mb-12"
          />
        </section>

        {/* Community Stats */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-2 p-3 bg-[#5865F2]/10 rounded-full w-fit">
                  <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                </div>
                <CardTitle className="text-2xl font-bold">2.1K</CardTitle>
                <CardDescription>Discord Members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Active community with daily discussions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-2 p-3 bg-black/10 rounded-full w-fit">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold">8.7K</CardTitle>
                <CardDescription>TikTok Followers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Short-form content and viral moments
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-2 p-3 bg-[#FF5500]/10 rounded-full w-fit">
                  <svg className="h-6 w-6 text-[#FF5500]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.104.101.104.053 0 .094-.046.101-.104l.262-2.105-.262-2.154c-.007-.054-.048-.1-.101-.1zm1.49.876c-.058 0-.104.053-.104.117l-.176 1.072.176 1.024c0 .063.046.117.104.117.059 0 .104-.054.104-.117l.2-1.024-.2-1.072c0-.064-.045-.117-.104-.117z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold">15.2K</CardTitle>
                <CardDescription>SoundCloud Plays</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monthly listeners and track plays
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-2 p-3 bg-[#1DB954]/10 rounded-full w-fit">
                  <Music className="h-6 w-6 text-[#1DB954]" />
                </div>
                <CardTitle className="text-2xl font-bold">3.4K</CardTitle>
                <CardDescription>Spotify Listeners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monthly active listeners
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Platforms */}
        <section className="py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Platforms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with us everywhere for the complete Its Different Productions experience.
            </p>
          </div>
          <SocialMediaLinks 
            variant="detailed" 
            showFollowers={true}
            className="max-w-4xl mx-auto"
          />
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join the <span className="text-gradient">#40gang</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with Discord for the most active community, then follow us everywhere else 
              for the complete experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 bg-[#5865F2] hover:bg-[#4752c4]"
                asChild
              >
                <a 
                  href="https://discord.gg/m3WwmkMHAx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Discord Community
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <a 
                  href="https://tiktok.com/@itsdifferentproductions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Follow on TikTok
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
