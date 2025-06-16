import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  ExternalLink, 
  ShoppingCart, 
  Music, 
  Image as ImageIcon,
  Wallet,
  Users,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Platform Demo - FUSED GAMING',
  description: 'Experience the FUSED GAMING creator economy platform firsthand. Interactive demo showcasing key features.',
}

export default function DemoPage() {
  const demoFeatures = [
    {
      title: 'Creator Storefronts',
      description: 'Customizable online stores for creators to sell beats, merchandise, and NFTs',
      icon: ShoppingCart,
      demoUrl: '/store',
      category: 'E-commerce'
    },
    {
      title: 'Beat Marketplace',
      description: 'Advanced music marketplace with preview, licensing, and instant downloads',
      icon: Music,
      demoUrl: '/store/beats',
      category: 'Music'
    },
    {
      title: 'NFT Gallery',
      description: 'Web3-enabled NFT marketplace with minting and trading capabilities',
      icon: ImageIcon,
      demoUrl: '/store/nfts',
      category: 'Web3'
    },
    {
      title: 'Wallet Integration',
      description: 'Seamless Web3 wallet connectivity for crypto payments and NFT transactions',
      icon: Wallet,
      demoUrl: '/wallet-test',
      category: 'Web3'
    },
    {
      title: 'Creator Dashboard',
      description: 'Comprehensive analytics and management tools for creators',
      icon: BarChart3,
      demoUrl: '/dashboard',
      category: 'Analytics'
    },
    {
      title: 'Collaboration Hub',
      description: 'Platform for creators to connect, collaborate, and find opportunities',
      icon: Users,
      demoUrl: '/collaborate',
      category: 'Community'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Interactive Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Platform Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the FUSED GAMING creator economy platform firsthand. 
            Explore our live demo showcasing key features and functionality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/" target="_blank">
                <ExternalLink className="mr-2 h-5 w-5" />
                Open Live Platform
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/investor/contact">
                Schedule Guided Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Navigate through different sections of our platform to see how creators and customers interact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full" variant="outline">
                    <Link href={feature.demoUrl} target="_blank">
                      <Play className="mr-2 h-4 w-4" />
                      Try Feature
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Demo Scenarios */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Demo Scenarios</h2>
          <p className="text-lg text-muted-foreground">
            Follow these guided scenarios to understand the platform workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="mr-2 h-5 w-5" />
                Creator Journey
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Experience the platform from a creator's perspective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Set Up Your Store</h4>
                <p className="text-sm opacity-90">Create a personalized storefront with custom branding</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">2. Upload Content</h4>
                <p className="text-sm opacity-90">Add beats, merchandise, or NFTs to your catalog</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">3. Manage Sales</h4>
                <p className="text-sm opacity-90">Track orders, analytics, and customer interactions</p>
              </div>
              <Button asChild variant="secondary" className="w-full mt-4">
                <Link href="/dashboard" target="_blank">
                  Start Creator Demo
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Customer Journey
              </CardTitle>
              <CardDescription>
                Explore the platform as a customer discovering and purchasing content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Browse Marketplace</h4>
                <p className="text-sm text-muted-foreground">Discover beats, merchandise, and NFTs from creators</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">2. Preview & Purchase</h4>
                <p className="text-sm text-muted-foreground">Listen to previews and make secure purchases</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">3. Web3 Integration</h4>
                <p className="text-sm text-muted-foreground">Connect wallet and purchase NFTs with crypto</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/store" target="_blank">
                  Start Customer Demo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Technical Highlights</CardTitle>
            <CardDescription>
              Key technical features that power the FUSED GAMING platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Next.js 15 + React 19</h4>
                <p className="text-sm text-muted-foreground">
                  Modern, performant web framework with server-side rendering and optimal user experience
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Supabase Backend</h4>
                <p className="text-sm text-muted-foreground">
                  Scalable PostgreSQL database with real-time features and row-level security
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Web3 Integration</h4>
                <p className="text-sm text-muted-foreground">
                  MetaMask wallet connectivity for NFT transactions and crypto payments
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Multi-Theme Support</h4>
                <p className="text-sm text-muted-foreground">
                  6 customizable color themes with dark/light mode support
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Mobile Responsive</h4>
                <p className="text-sm text-muted-foreground">
                  Optimized for all devices with touch-friendly interactions
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Real-time Features</h4>
                <p className="text-sm text-muted-foreground">
                  Live notifications, real-time collaboration, and instant updates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest in the Future?</h2>
            <p className="text-lg mb-6 opacity-90">
              Experience the platform that's revolutionizing the creator economy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/investor/contact">
                  Schedule Investment Meeting
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/investor/pitch">
                  View Full Pitch Deck
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
