"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      {/* Newsletter Section */}
      <div className="container py-16 sm:py-20">
        <BackgroundGradient
          className="w-full rounded-2xl overflow-hidden"
          borderRadius="2xl"
          gradientClassName="bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-pink-500/80"
        >
          <div className="bg-background/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Join Our Community</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Subscribe to our newsletter and get exclusive access to new beats, merchandise drops, and special offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-12 w-full rounded-full border border-input bg-background/80 backdrop-blur-sm px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
                <Button type="submit" className="sm:w-auto rounded-full px-6">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </BackgroundGradient>
      </div>

      {/* Main Footer Content */}
      <div className="bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <Link href="/store" className="inline-block mb-4">
                <span className="text-xl sm:text-2xl font-bold text-gradient">
                  Its Different Productions©
                </span>
              </Link>
              <p className="text-muted-foreground max-w-md">
                idp: a #40gang Media Corporation providing beats, merchandise, and NFTs for fans worldwide. Powered by Fused Gaming.
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a href="mailto:info@itsdifferentproductions.com" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span>info@itsdifferentproductions.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span>+1 (916) 850-0327</span>
                </a>
                <div className="flex items-start text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 mr-3 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span>548 Market St, San Francisco, CA 94014</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/itsdifferentproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/yaboybankz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 lg:mt-0">
              <h3 className="text-base font-semibold mb-5">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/store/beats"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Beats
                    <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/store/merch" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Merchandise
                  </Link>
                </li>
                <li>
                  <Link href="/store/nfts" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    NFTs
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Featured Products
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="mt-8 lg:mt-0">
              <h3 className="text-base font-semibold mb-5">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3 text-primary" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border/50">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Its Different Productions© | All rights reserved.
          </p>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Returns</Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
