import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Play, 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp,
  DollarSign,
  Lightbulb,
  Shield,
  Globe
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interactive Pitch Deck - FUSED GAMING',
  description: 'Complete business presentation for FUSED GAMING $5M Series A funding round.',
}

export default function PitchDeckPage() {
  const slides = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'Company overview and investment opportunity',
      icon: Lightbulb,
      href: '/investor/pitch/executive-summary'
    },
    {
      id: 'market-opportunity',
      title: 'Market Opportunity',
      description: '$43B+ digital music market analysis',
      icon: Globe,
      href: '/investor/pitch/market-opportunity'
    },
    {
      id: 'problem-solution',
      title: 'Problem & Solution',
      description: 'Addressing the creator monetization gap',
      icon: Target,
      href: '/investor/pitch/problem-solution'
    },
    {
      id: 'business-model',
      title: 'Business Model',
      description: 'Revenue streams and monetization strategy',
      icon: DollarSign,
      href: '/investor/pitch/business-model'
    },
    {
      id: 'financial-projections',
      title: 'Financial Projections',
      description: 'Revenue forecasts and growth metrics',
      icon: BarChart3,
      href: '/investor/pitch/financial-projections'
    },
    {
      id: 'team',
      title: 'Team & Advisors',
      description: 'Leadership and strategic advisors',
      icon: Users,
      href: '/investor/pitch/team'
    },
    {
      id: 'competitive-advantage',
      title: 'Competitive Advantage',
      description: 'Market positioning and differentiators',
      icon: Shield,
      href: '/investor/pitch/competitive-advantage'
    },
    {
      id: 'roadmap',
      title: 'Roadmap & Milestones',
      description: 'Product development and growth plan',
      icon: TrendingUp,
      href: '/investor/pitch/roadmap'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Series A Funding Round
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FUSED GAMING
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Interactive Pitch Deck
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive business presentation showcasing the $5M investment opportunity 
            in the revolutionary creator economy platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/investor/pitch/executive-summary">
                Start Presentation <Play className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/investor/financials">
                View Financials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Investment Highlights</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Key metrics and opportunities that make FUSED GAMING an attractive investment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">$5M</div>
              <div className="text-sm text-muted-foreground">Target Raise</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">30K</div>
              <div className="text-sm text-muted-foreground">Existing Users</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">$43B+</div>
              <div className="text-sm text-muted-foreground">Market Size</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">30%</div>
              <div className="text-sm text-muted-foreground">Untapped Potential</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Slide Navigation */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Presentation Sections</h2>
          <p className="text-lg text-muted-foreground">
            Navigate through our comprehensive business presentation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {slides.map((slide, index) => {
            const Icon = slide.icon
            return (
              <Card key={slide.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{slide.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {slide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full" variant="outline">
                    <Link href={slide.href}>
                      View Section <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Financial Deep Dive
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Detailed revenue projections and financial modeling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/investor/financials">
                  View Financials
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Platform Demo
              </CardTitle>
              <CardDescription>
                Experience our creator economy platform firsthand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/investor/demo">
                  Try Demo
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Schedule Meeting
              </CardTitle>
              <CardDescription>
                Connect with our team to discuss investment opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/investor/contact">
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
