"use client";

import { useState } from "react";
import { X, Mic, Bot, Star, ArrowRight, Volume2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function AuditionsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container relative py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Icon and main content */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-white" />
                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold uppercase tracking-wide">🎤 A.I. Vocals Casting Call</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    LIVE
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  <strong>WANTED:</strong> Vocalists for revolutionary A.I. app • $500-$5,000 per voice model • All languages welcome
                </p>
              </div>
              <div className="block sm:hidden">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold">🎤 A.I. Auditions</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    LIVE
                  </span>
                </div>
                <p className="text-xs opacity-90">
                  Vocalists wanted • $500-$5K • All languages
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <Button
              asChild
              size="sm"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold hidden sm:inline-flex"
            >
              <Link href="/ai-auditions">
                <Bot className="h-4 w-4 mr-2" />
                Apply Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hidden sm:inline-flex"
            >
              <Link href="/auditions">
                <Volume2 className="h-4 w-4 mr-2" />
                Learn More
              </Link>
            </Button>
            
            {/* Mobile button */}
            <Button
              asChild
              size="sm"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold sm:hidden"
            >
              <Link href="/ai-auditions">
                <Bot className="h-4 w-4 mr-1" />
                Apply
              </Link>
            </Button>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile expanded info */}
        <div className="block sm:hidden mt-3 pt-3 border-t border-white/20">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs opacity-75">Payment</div>
              <div className="text-sm font-semibold">$500-$5K</div>
            </div>
            <div>
              <div className="text-xs opacity-75">Languages</div>
              <div className="text-sm font-semibold">50+</div>
            </div>
            <div>
              <div className="text-xs opacity-75">Royalties</div>
              <div className="text-sm font-semibold">10-25%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
    </motion.div>
  );
}
