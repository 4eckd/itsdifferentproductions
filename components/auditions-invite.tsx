"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Bot, Star, ArrowRight, Volume2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuditionsInvite() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the popup before
    const hasSeenAuditionsInvite = localStorage.getItem("hasSeenAuditionsInvite");
    
    if (!hasSeenAuditionsInvite) {
      // Show the popup after 8 seconds (slightly later than Discord popup)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Remember that the user has seen the invite
    localStorage.setItem("hasSeenAuditionsInvite", "true");
  };

  const handleJoinAuditions = () => {
    // Navigate to auditions page
    window.location.href = "/ai-auditions";
    handleDismiss();
  };

  const handleLearnMore = () => {
    // Navigate to regular auditions page
    window.location.href = "/auditions";
    handleDismiss();
  };

  // Don't render anything if the user has dismissed the popup
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 left-5 z-50 max-w-sm"
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="relative overflow-hidden rounded-xl border bg-background shadow-lg">
            {/* A.I. Auditions themed header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <span className="font-semibold">A.I. Auditions</span>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
                  <Mic className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    🎤 A.I. Vocals Casting Call
                    <Star className="h-4 w-4 text-yellow-500" />
                  </h4>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium animate-pulse">
                      LIVE
                    </span>
                    <span className="text-xs text-muted-foreground">Open Auditions</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                🌟 <strong>WANTED:</strong> Vocalists for revolutionary A.I. app with monetization opportunities! 
                All languages & genres welcome.
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">💰 $500-$5,000 per voice model</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">🌍 50+ languages accepted</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">📈 Ongoing royalty sharing</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleJoinAuditions}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Apply for A.I. Auditions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleLearnMore}
                    className="flex-1 text-xs"
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Learn More
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDismiss}
                    className="flex-1 text-xs"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>

            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-xl pointer-events-none">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
