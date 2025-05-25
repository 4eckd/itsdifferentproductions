'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { 
  Mic, 
  Music, 
  Globe, 
  Star, 
  Users, 
  ArrowRight, 
  Play, 
  Heart,
  Sparkles,
  Volume2,
  Languages,
  Award,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const musicGenres = [
  'Hip-Hop', 'R&B', 'Pop', 'Rock', 'Jazz', 'Blues', 'Country', 'Electronic', 
  'Reggae', 'Latin', 'Afrobeat', 'K-Pop', 'Indie', 'Folk', 'Gospel', 'Trap'
]

const languages = [
  'English', 'Spanish', 'French', 'Portuguese', 'Italian', 'German', 'Japanese',
  'Korean', 'Mandarin', 'Arabic', 'Hindi', 'Russian', 'Dutch', 'Swedish'
]

const benefits = [
  { icon: Award, title: 'Professional Production', desc: 'Work with industry-standard equipment and producers' },
  { icon: Globe, title: 'Global Reach', desc: 'Your voice heard worldwide through our distribution network' },
  { icon: Star, title: 'Royalty Sharing', desc: 'Fair compensation and ongoing royalties for your contributions' },
  { icon: Users, title: 'Collaborative Community', desc: 'Join a network of talented artists and producers' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Quick feedback and professional development process' },
  { icon: Heart, title: 'Creative Freedom', desc: 'Express your unique style while collaborating on amazing projects' }
]

export function VocalistAuditions() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Open Auditions Now
            </span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            🎤 <span className="text-gradient">Your Voice</span> Could Be Next
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            We're seeking talented vocalists from around the world! Whether you sing in English, Spanish, 
            Japanese, or any language - whether you're into Hip-Hop, R&B, Pop, or any genre - we want to hear from you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Globe className="h-3 w-3 mr-1" />
              All Languages Welcome
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Music className="h-3 w-3 mr-1" />
              Every Genre Accepted
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Users className="h-3 w-3 mr-1" />
              All Skill Levels
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              Rolling Auditions
            </Badge>
          </motion.div>
        </div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <BackgroundGradient className="max-w-4xl mx-auto" borderRadius="2xl">
            <Card className="bg-background/95 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                  <Mic className="h-8 w-8 text-primary" />
                  Ready to Audition?
                  <Volume2 className="h-8 w-8 text-primary" />
                </CardTitle>
                <p className="text-lg text-muted-foreground mt-4">
                  Join the Its Different Productions family and let your voice be heard worldwide
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Languages Supported</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-sm text-muted-foreground">Genres Welcome</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Submission Open</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Fair Opportunity</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                    <Link href="/collaborate">
                      <Mic className="h-5 w-5 mr-2" />
                      Submit Your Audition
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 group" asChild>
                    <Link href="/contact">
                      <Users className="h-5 w-5 mr-2" />
                      Ask Questions First
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Demo Audio Section */}
                <div className="bg-muted/50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
                    <Play className="h-5 w-5" />
                    Hear What We're Looking For
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Listen to examples of the type of collaborations we create
                  </p>
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="group"
                  >
                    {isPlaying ? (
                      <>
                        <div className="animate-pulse h-4 w-4 bg-primary rounded-full mr-2" />
                        Playing Demo...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        Play Demo Track
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            What We Offer <span className="text-gradient">Our Vocalists</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Genres & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Genres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  Genres We Love
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  We welcome all musical styles and genres
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {musicGenres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    + Many More!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  Languages We Support
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sing in your native language or any language you're comfortable with
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    + All Others!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Simple Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Passion for music and singing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Access to basic recording equipment (phone is fine!)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Willingness to collaborate and learn</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Open to feedback and creative direction</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Professional attitude and reliability</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>No experience required!</strong> We believe in nurturing talent at every level. 
                  Whether you're a bedroom singer or a seasoned performer, we want to hear your unique voice.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
