import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart3, DollarSign, Users, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FUSED GAMING - $5M Series A Investment Opportunity',
  description: 'Revolutionary creator economy platform combining Web3 with traditional e-commerce. Join our $5M Series A funding round.',
  keywords: ['investment', 'funding', 'creator economy', 'web3', 'series a'],
}

export default function InvestorLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FUSED GAMING
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            $5M Series A Investment Opportunity
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Revolutionary creator economy platform empowering 1 in 10 fans to purchase from creators 
            through integrated digital and traditional payment systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/investor/pitch">
                View Pitch Deck <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/investor/demo">
                Platform Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Raise</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5M</div>
              <p className="text-xs text-muted-foreground">Series A Funding</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Existing Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30K</div>
              <p className="text-xs text-muted-foreground">Web3 Community</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Customers</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5K</div>
              <p className="text-xs text-muted-foreground">By Year 3</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Size</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$43B+</div>
              <p className="text-xs text-muted-foreground">Digital Music Market</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">The Opportunity</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bridging the gap between creator potential and monetization reality
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">The Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                1 in 10 fans would purchase from creators if they had online stores, 
                but only 1 in 100 creators have stores, leaving 30% earning potential untapped.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                FUSED GAMING provides creators with tools and infrastructure to build 
                successful businesses integrating digital and traditional payment systems.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Market Position</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                First platform combining Web3 with traditional e-commerce, 
                targeting influencers, artists, musicians, and live streamers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Our Presentation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Interactive Pitch Deck</CardTitle>
              <CardDescription>
                Complete business presentation with financial projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/investor/pitch">View Pitch Deck</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Financial Projections</CardTitle>
              <CardDescription>
                Detailed revenue forecasts and growth metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/investor/financials">View Financials</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Platform Demo</CardTitle>
              <CardDescription>
                Live demonstration of our creator economy platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/investor/demo">Try Demo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join us in revolutionizing the creator economy
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/investor/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
