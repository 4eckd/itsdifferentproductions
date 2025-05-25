import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CollaborationForm } from "@/components/forms/collaboration-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Code, 
  Palette, 
  Music, 
  DollarSign, 
  Megaphone,
  Shield,
  BookOpen,
  Handshake,
  Heart,
  Star,
  Zap,
  Target,
  Globe,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function CollaboratePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Open Collaboration
            </Badge>
            <h1 className="text-5xl font-bold">
              Build the Future of <span className="text-gradient">Creative Commerce</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our mission to create a platform that empowers artists, developers, and creators. 
              Whether you're a coder, designer, musician, investor, or have other skills to contribute, 
              we want to collaborate with you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button size="lg" asChild>
                <Link href="#collaboration-form">
                  Start Collaborating
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  Learn About Our Mission
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Collaborate Section */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Collaborate With Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're building something different - a platform that truly serves creators and the community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Open Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Transparent development with community contributions and shared ownership of the platform's future.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Cutting Edge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Modern tech stack with Web3 integration, AI features, and the latest development practices.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Real Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Directly supporting independent creators and building tools that make a difference in their lives.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Global Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join a worldwide network of creators, developers, and innovators working together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Collaboration Types */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How You Can Contribute</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We welcome collaborators from all backgrounds and skill levels. Here are some ways you can get involved.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Code className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Developers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Frontend, backend, Web3, mobile development, and DevOps expertise needed.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">Web3</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Palette className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Designers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    UI/UX design, graphic design, branding, and user experience optimization.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">UI/UX</Badge>
                    <Badge variant="secondary" className="text-xs">Figma</Badge>
                    <Badge variant="secondary" className="text-xs">Branding</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Music className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Artists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Music producers, audio engineers, content creators, and creative professionals.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Production</Badge>
                    <Badge variant="secondary" className="text-xs">Audio</Badge>
                    <Badge variant="secondary" className="text-xs">Content</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle>Investors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Angel investors, VCs, and sponsors interested in creator economy and Web3.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Funding</Badge>
                    <Badge variant="secondary" className="text-xs">Strategy</Badge>
                    <Badge variant="secondary" className="text-xs">Growth</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Megaphone className="h-8 w-8 text-red-500 mb-2" />
                  <CardTitle>Marketers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Digital marketing, community management, social media, and growth hacking.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Social</Badge>
                    <Badge variant="secondary" className="text-xs">Growth</Badge>
                    <Badge variant="secondary" className="text-xs">Community</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-8 w-8 text-orange-500 mb-2" />
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Security auditing, penetration testing, and Web3 security expertise.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Auditing</Badge>
                    <Badge variant="secondary" className="text-xs">Web3</Badge>
                    <Badge variant="secondary" className="text-xs">Testing</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-indigo-500 mb-2" />
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Technical writing, documentation, tutorials, and educational content creation.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Writing</Badge>
                    <Badge variant="secondary" className="text-xs">Docs</Badge>
                    <Badge variant="secondary" className="text-xs">Education</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Handshake className="h-8 w-8 text-teal-500 mb-2" />
                  <CardTitle>Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Business development, partnerships, legal advice, and strategic planning.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Strategy</Badge>
                    <Badge variant="secondary" className="text-xs">Legal</Badge>
                    <Badge variant="secondary" className="text-xs">Partnerships</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Support Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Help us build the future of creative commerce by contributing to our development fund.
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Support Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your donations directly fund platform development, security audits, and community resources.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-lg">h4shed.sol</p>
                  <p className="text-sm text-muted-foreground mt-1">Solana Donation Address</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  All contributions are used transparently for development, documentation, and community building.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Collaboration Form */}
        <section id="collaboration-form" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and let's start building something amazing together.
              </p>
            </div>
            
            <CollaborationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
