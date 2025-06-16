import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'
import { ArrowLeft, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: {
    template: '%s | FUSED GAMING Investor Portal',
    default: 'FUSED GAMING - Investor Portal',
  },
  description: 'FUSED GAMING $5M Series A investment opportunity. Revolutionary creator economy platform.',
  keywords: ['investment', 'funding', 'creator economy', 'web3', 'series a', 'fused gaming'],
  authors: [{ name: 'FUSED GAMING Team' }],
  openGraph: {
    title: 'FUSED GAMING - $5M Series A Investment Opportunity',
    description: 'Revolutionary creator economy platform combining Web3 with traditional e-commerce.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUSED GAMING - Investment Opportunity',
    description: 'Revolutionary creator economy platform. $5M Series A funding round.',
  },
}

interface InvestorLayoutProps {
  children: React.ReactNode
}

export default function InvestorLayout({ children }: InvestorLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        {/* Investor Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <Link href="/investor" className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">FG</span>
                  </div>
                  <span className="font-bold text-lg">FUSED GAMING</span>
                </Link>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Investor Portal
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/investor/pitch" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Pitch Deck
                </Link>
                <Link 
                  href="/investor/financials" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Financials
                </Link>
                <Link 
                  href="/investor/demo" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Demo
                </Link>
                <Link 
                  href="/investor/contact" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Platform</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/investor/contact">
                    Invest Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Investor Footer */}
        <footer className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-3">
                <h3 className="font-semibold">FUSED GAMING</h3>
                <p className="text-sm text-muted-foreground">
                  Revolutionary creator economy platform combining Web3 with traditional e-commerce.
                </p>
              </div>

              {/* Investment Info */}
              <div className="space-y-3">
                <h3 className="font-semibold">Investment</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/investor/pitch" className="hover:text-primary">
                      Pitch Deck
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor/financials" className="hover:text-primary">
                      Financial Projections
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor/demo" className="hover:text-primary">
                      Platform Demo
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-3">
                <h3 className="font-semibold">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/investor/team" className="hover:text-primary">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor/roadmap" className="hover:text-primary">
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor/legal" className="hover:text-primary">
                      Legal Documents
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <h3 className="font-semibold">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/investor/contact" className="hover:text-primary">
                      Investment Inquiry
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:investors@fusedgaming.com" className="hover:text-primary">
                      investors@fusedgaming.com
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Platform Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p className="text-sm text-muted-foreground">
                  © 2025 FUSED GAMING. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-primary">
                    Terms of Service
                  </Link>
                  <span>Series A Funding Round</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
