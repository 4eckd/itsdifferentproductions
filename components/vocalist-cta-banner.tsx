'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { 
  Mic, 
  Music, 
  Globe, 
  Star, 
  ArrowRight, 
  Sparkles,
  Volume2,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function VocalistCTABanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <BackgroundGradient borderRadius="xl">
            <Card className="bg-background/95 backdrop-blur-sm border-0">
              <CardContent className="p-8 md:p-12">
                <div className="text-center space-y-6">
                  {/* Header */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      🎤 Vocalist Auditions Open
                    </span>
                    <Sparkles className="h-4 w-4 text-purple-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold">
                    Got a <span className="text-gradient">Voice</span>? We Want to Hear It!
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join Its Different Productions as a featured vocalist. We're seeking talent in 
                    <strong> all languages</strong> and <strong>every genre</strong> - from Hip-Hop to K-Pop, 
                    English to Japanese, beginners to pros!
                  </p>

                  {/* Quick Benefits */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <Globe className="h-3 w-3 mr-1" />
                      All Languages
                    </Badge>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <Music className="h-3 w-3 mr-1" />
                      Every Genre
                    </Badge>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Fair Royalties
                    </Badge>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <Heart className="h-3 w-3 mr-1" />
                      Creative Freedom
                    </Badge>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-xs text-muted-foreground">Languages</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">∞</div>
                      <div className="text-xs text-muted-foreground">Genres</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-xs text-muted-foreground">Open</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-xs text-muted-foreground">Fair</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                      <Link href="/collaborate">
                        <Mic className="h-5 w-5 mr-2" />
                        Submit Audition
                        <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 group" asChild>
                      <Link href="/store/beats">
                        <Volume2 className="h-5 w-5 mr-2" />
                        Browse Beats
                        <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Bottom Note */}
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      <strong>No experience required!</strong> Whether you're a shower singer or a seasoned performer, 
                      we believe every voice has potential. Join our global community of artists today.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>
      </div>
    </section>
  )
}
