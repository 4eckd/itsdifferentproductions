import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Users,
  Building,
  Send
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - FUSED GAMING Investment',
  description: 'Get in touch with the FUSED GAMING team to discuss investment opportunities and schedule meetings.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Investment Inquiry
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to join the creator economy revolution? Get in touch with our team to discuss 
            investment opportunities and schedule a detailed presentation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Investment Inquiry Form
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" placeholder="Investment Firm LLC" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title/Position</Label>
                  <Input id="title" placeholder="Managing Partner" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentRange">Investment Range</Label>
                  <select 
                    id="investmentRange" 
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select investment range</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-2.5m">$1M - $2.5M</option>
                    <option value="2.5m+">$2.5M+</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Investment Timeline</Label>
                  <select 
                    id="timeline" 
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (1-30 days)</option>
                    <option value="short">Short-term (1-3 months)</option>
                    <option value="medium">Medium-term (3-6 months)</option>
                    <option value="long">Long-term (6+ months)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your investment interests and any specific questions you have about FUSED GAMING..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Investment Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
                <CardDescription>
                  Reach out to our investment team directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">investors@fusedgaming.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunity</CardTitle>
                <CardDescription>
                  Key details about our Series A funding round
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Target Raise</p>
                    <p className="text-sm text-muted-foreground">$5M Series A</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Current Users</p>
                    <p className="text-sm text-muted-foreground">30,000+ Web3 Community</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Market Size</p>
                    <p className="text-sm text-muted-foreground">$43B+ Digital Music Market</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p className="text-sm text-muted-foreground">Closing Q3 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Meeting */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Schedule a Meeting</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Book a 30-minute call to discuss the opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full" size="lg">
                  <a href="https://calendly.com/fusedgaming/investor-meeting" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Meeting
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions from potential investors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">What is the minimum investment?</h4>
                <p className="text-sm text-muted-foreground">
                  We're accepting investments starting from $100K for our Series A round.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">When will the round close?</h4>
                <p className="text-sm text-muted-foreground">
                  We're targeting to close our Series A by Q3 2025, with rolling closes available.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">What documents are available?</h4>
                <p className="text-sm text-muted-foreground">
                  We provide pitch deck, financial projections, legal documents, and due diligence materials.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">How can I access the platform demo?</h4>
                <p className="text-sm text-muted-foreground">
                  Visit our live demo at itsdifferentproductions.com or schedule a guided walkthrough.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
