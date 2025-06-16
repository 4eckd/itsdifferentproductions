import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart } from '@/components/investor/bar-chart'
import { PieChart } from '@/components/investor/pie-chart'
import { Download, TrendingUp, DollarSign, Users, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Financial Projections - FUSED GAMING',
  description: 'Detailed financial projections and revenue forecasts for FUSED GAMING Series A funding round.',
}

export default function FinancialsPage() {
  // Sample financial data - in real implementation, this would come from your data source
  const revenueProjections = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [{
      label: 'Revenue',
      data: [500000, 2500000, 8500000, 18000000, 35000000],
      color: 'hsl(var(--primary))'
    }]
  }

  const customerGrowth = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [{
      label: 'Total Customers',
      data: [500, 1500, 3500, 7500, 15000],
      color: 'hsl(var(--secondary))'
    }]
  }

  const fundingAllocation = {
    labels: ['Product Development', 'Marketing & Sales', 'Operations', 'Team Expansion', 'Legal & Compliance'],
    data: [2000000, 1500000, 750000, 500000, 250000]
  }

  const revenueStreams = {
    labels: ['Transaction Fees', 'Subscription Revenue', 'Premium Features', 'NFT Marketplace', 'Partnerships'],
    data: [12000000, 8000000, 6000000, 5000000, 4000000]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Financial Projections
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Revenue Forecasts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive financial modeling and growth projections for FUSED GAMING's $5M Series A funding round
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="text-lg px-8">
              <Download className="mr-2 h-5 w-5" />
              Download Financial Model
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/investor/contact">
                Schedule Deep Dive
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">5-Year Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$64.5M</div>
              <p className="text-xs text-muted-foreground">Cumulative projected revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Year 3 ARR</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8.5M</div>
              <p className="text-xs text-muted-foreground">Annual recurring revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,400</div>
              <p className="text-xs text-muted-foreground">Lifetime value per customer</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Break-even</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Month 18</div>
              <p className="text-xs text-muted-foreground">Projected break-even point</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Financial Charts */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue Growth</TabsTrigger>
            <TabsTrigger value="customers">Customer Growth</TabsTrigger>
            <TabsTrigger value="funding">Funding Use</TabsTrigger>
            <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>5-Year Revenue Projections</CardTitle>
                <CardDescription>
                  Projected annual revenue growth based on customer acquisition and retention models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  labels={revenueProjections.labels}
                  datasets={revenueProjections.datasets}
                  title="Annual Revenue Growth"
                  height={400}
                  formatValue={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth Trajectory</CardTitle>
                <CardDescription>
                  Projected customer acquisition based on market penetration and growth strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  labels={customerGrowth.labels}
                  datasets={customerGrowth.datasets}
                  title="Total Customer Growth"
                  height={400}
                  formatValue={(value) => `${(value / 1000).toFixed(1)}K customers`}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="funding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>$5M Funding Allocation</CardTitle>
                <CardDescription>
                  Strategic allocation of Series A funding across key business areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  labels={fundingAllocation.labels}
                  data={fundingAllocation.data}
                  title="Funding Distribution"
                  height={400}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="streams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Stream Breakdown (Year 5)</CardTitle>
                <CardDescription>
                  Diversified revenue streams contributing to $35M annual revenue target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  labels={revenueStreams.labels}
                  data={revenueStreams.data}
                  title="Revenue by Stream"
                  height={400}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Financial Assumptions */}
      <section className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Key Financial Assumptions</CardTitle>
            <CardDescription>
              Core assumptions underlying our financial projections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Customer Acquisition</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monthly growth rate: 15-25%</li>
                  <li>• Customer acquisition cost: $50-150</li>
                  <li>• Conversion rate: 3-8%</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Revenue Model</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Transaction fees: 3-5%</li>
                  <li>• Subscription: $29-99/month</li>
                  <li>• Premium features: $5-50/month</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Market Penetration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Target market: 100M+ creators</li>
                  <li>• Addressable market: $43B+</li>
                  <li>• Market share goal: 0.5% by Year 5</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
