import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VocalistAuditions } from "@/components/vocalist-auditions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  CheckCircle,
  MessageCircle,
  Download,
  Upload
} from "lucide-react";
import Link from "next/link";

const successStories = [
  {
    name: "Maria Santos",
    language: "Spanish",
    genre: "Latin Pop",
    story: "Started as a bedroom singer, now featured on 3 chart-topping tracks",
    image: "/vocalist1.jpg"
  },
  {
    name: "Kenji Tanaka", 
    language: "Japanese",
    genre: "J-Pop/Electronic",
    story: "Discovered through our auditions, now has 500K+ streams",
    image: "/vocalist2.jpg"
  },
  {
    name: "Alex Johnson",
    language: "English", 
    genre: "Hip-Hop/R&B",
    story: "Went from open mic nights to international collaborations",
    image: "/vocalist3.jpg"
  }
]

const auditionTips = [
  {
    icon: Mic,
    title: "Record in a Quiet Space",
    description: "Find the quietest room in your home. Even a closet full of clothes can work as a makeshift vocal booth!"
  },
  {
    icon: Volume2,
    title: "Check Your Audio Quality", 
    description: "Use headphones to listen back. Make sure your voice is clear and not too quiet or distorted."
  },
  {
    icon: Heart,
    title: "Show Your Personality",
    description: "We want to hear what makes YOU unique. Don't try to sound like someone else - be authentically you!"
  },
  {
    icon: Music,
    title: "Choose Songs You Love",
    description: "Pick 1-2 songs that showcase your range and style. Originals are welcome, but covers work great too!"
  }
]

export default function AuditionsPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Open Auditions
            </Badge>
            <h1 className="text-5xl font-bold">
              🎤 Vocalist <span className="text-gradient">Auditions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join Its Different Productions as a featured vocalist. We're seeking talent in all languages, 
              every genre, and all skill levels. Your voice could be the next one heard worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button size="lg" asChild>
                <Link href="#audition-form">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Your Audition
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#requirements">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  View Requirements
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Languages Supported</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Genres Welcome</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Submissions Open</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Fair Opportunity</div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Success <span className="text-gradient">Stories</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet some of the talented vocalists who started their journey with us
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{story.name}</CardTitle>
                    <div className="flex justify-center gap-2">
                      <Badge variant="secondary">{story.language}</Badge>
                      <Badge variant="outline">{story.genre}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Audition Tips */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Audition <span className="text-gradient">Tips</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple tips to help you submit your best audition
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {auditionTips.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{tip.title}</h3>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* What We're Looking For */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                What We're <span className="text-gradient">Looking For</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Any Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    English, Spanish, Japanese, Korean, French, Portuguese, Arabic, Hindi - 
                    we celebrate diversity and want to hear your native language!
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Music className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Every Genre</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hip-Hop, R&B, Pop, Rock, Jazz, Electronic, Latin, Afrobeat, K-Pop, 
                    Country, Gospel - if you can sing it, we want to hear it!
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>All Skill Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Bedroom singers, shower performers, open mic veterans, or seasoned pros - 
                    we believe every voice has potential and deserves to be heard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section id="requirements" className="bg-muted/30 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Simple <span className="text-gradient">Requirements</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We keep it simple - here's all you need to get started
                </p>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Passion for Music</h3>
                        <p className="text-sm text-muted-foreground">
                          Love singing and want to share your voice with the world
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Basic Recording Setup</h3>
                        <p className="text-sm text-muted-foreground">
                          Smartphone, computer mic, or any recording device - professional equipment not required!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">1-2 Song Samples</h3>
                        <p className="text-sm text-muted-foreground">
                          Covers or originals - whatever showcases your unique voice and style
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Collaborative Spirit</h3>
                        <p className="text-sm text-muted-foreground">
                          Open to feedback, direction, and working with our production team
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Professional Attitude</h3>
                        <p className="text-sm text-muted-foreground">
                          Reliable communication and commitment to the creative process
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                          No Experience Required!
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          We believe in nurturing talent at every level. Whether you're just starting out 
                          or have years of experience, we want to hear your unique voice and help you grow.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Audition Form Section */}
        <section id="audition-form">
          <VocalistAuditions />
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does the audition process take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We review all submissions within 2-3 weeks. If we're interested in working with you, 
                    we'll reach out for a follow-up conversation and potential collaboration.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do I need professional recording equipment?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Not at all! Many successful auditions come from smartphone recordings. 
                    We care more about your voice and potential than perfect audio quality.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I submit in languages other than English?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely! We actively encourage submissions in all languages. 
                    We're building a global community and want to celebrate linguistic diversity.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens if I'm selected?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Selected vocalists join our roster for collaborative projects, receive fair royalty splits, 
                    and get access to professional production, distribution, and promotional support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
