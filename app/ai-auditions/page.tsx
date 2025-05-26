"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  Bot,
  Home
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AIAuditionsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black z-0" />
      <div className="absolute top-1/4 left-0 md:-left-20 w-64 md:w-72 h-64 md:h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 md:-right-20 w-64 md:w-72 h-64 md:h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full filter blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  🤖 A.I. Auditions
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 bg-red-500/20 backdrop-blur-sm border-red-500/50 text-red-300">
              <Bot className="h-3 w-3 mr-1" />
              URGENT RECRUITMENT
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="text-red-400">WANTED:</span> <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">OPEN AUDITIONS</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              A.I. App with <span className="text-green-400">Monetization</span>
            </h2>

            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-8 border border-purple-500/20 mb-12 max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
                <strong className="text-white">Interested in joining the IDP team?</strong> We have immediate requests for talent acquisition for our vocals A.I. app where selected artists and musical instruments will be trained into an app.
              </p>
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                If your audition is selected, you will be extended an <strong className="text-green-400">offer (contract) in writing</strong> offering you access to <strong className="text-yellow-400">money making opportunities</strong> in our early stage revolutionary app.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge variant="secondary" className="px-4 py-2 bg-green-500/20 text-green-300 border-green-500/30">
                <Sparkles className="mr-1 h-3 w-3" /> Revolutionary Technology
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                <Award className="mr-1 h-3 w-3" /> Written Contracts
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Bot className="mr-1 h-3 w-3" /> A.I. Training
              </Badge>
            </div>
          </motion.div>
        </section>

        {/* Main CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <BackgroundGradient className="max-w-4xl mx-auto" borderRadius="2xl">
            <Card className="bg-black/95 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 text-white">
                  <Bot className="h-8 w-8 text-purple-400" />
                  Ready to Audition?
                  <Star className="h-8 w-8 text-yellow-400" />
                </CardTitle>
                <p className="text-lg text-gray-400 mt-4">
                  Submit your demo and join the A.I. revolution
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    asChild
                  >
                    <a href="mailto:hello@itsdifferentproductions.com?subject=Audition for Talent Name">
                      <Bot className="h-5 w-5 mr-2" />
                      Send Demo
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 group border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                    asChild
                  >
                    <Link href="/store">
                      <Globe className="h-5 w-5 mr-2" />
                      Enter Main Website
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Email Instructions */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 text-center border border-blue-500/20">
                  <h4 className="font-semibold mb-3 text-white">
                    📧 Email Instructions
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>To:</strong> hello@itsdifferentproductions.com</p>
                    <p><strong>Subject:</strong> "Audition for [Your Talent Name]"</p>
                    <p><strong>Attach:</strong> Your demo file (vocals or instrument)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.section>

        {/* Solicited Categories with Glowing Elements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">What We're Looking For</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Click on any category below to submit your audition directly
            </p>
          </div>

          {/* Priority Languages */}
          <div className="mb-12">
            <h4 className="text-xl font-bold text-white mb-6 text-center">
              🎤 <span className="text-green-400">Priority Languages</span> (Available Now)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'English', timeline: '1 mo', priority: 'high' },
                { name: 'Spanish', timeline: '1 mo', priority: 'high' },
                { name: 'Japanese', timeline: '1 mo', priority: 'high' }
              ].map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
                  <div className="relative bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
                    <div className="text-center mb-4">
                      <h5 className="text-xl font-bold text-white mb-2">{language.name}</h5>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        ⚡ {language.timeline}
                      </Badge>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 group/btn"
                      asChild
                    >
                      <a href={`mailto:hello@itsdifferentproductions.com?subject=Audition for ${language.name} Vocalist`}>
                        <Bot className="h-4 w-4 mr-2" />
                        Submit {language.name} Demo
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Development Languages */}
          <div className="mb-12">
            <h4 className="text-xl font-bold text-white mb-6 text-center">
              🌍 <span className="text-yellow-400">Development Languages</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'Korean', timeline: '2 mo' },
                { name: 'French', timeline: '2 mo' },
                { name: 'Italian', timeline: '2 mo' },
                { name: 'Portuguese', timeline: '3 mo' }
              ].map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                  <div className="relative bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300">
                    <div className="text-center mb-3">
                      <h5 className="text-lg font-semibold text-white mb-1">{language.name}</h5>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                        {language.timeline}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 group/btn"
                      asChild
                    >
                      <a href={`mailto:hello@itsdifferentproductions.com?subject=Audition for ${language.name} Vocalist`}>
                        Submit Demo
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center text-gray-500 text-sm"
        >
          <p className="mb-4">
            © {new Date().getFullYear()} Its Different Productions™ - Pioneering A.I. Voice Technology
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/store" className="hover:text-purple-400 transition-colors">
              Enter Store
            </Link>
            <Link href="/auditions" className="hover:text-purple-400 transition-colors">
              Traditional Auditions
            </Link>
            <Link href="/contact" className="hover:text-purple-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
