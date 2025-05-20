"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EnterButtonProps {
  className?: string;
  destination?: string;
}

export function EnterButton({
  className,
  destination = "/store",
}: EnterButtonProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    
    // Delay navigation to allow animation to complete
    setTimeout(() => {
      router.push(destination);
    }, 600);
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
        initial={{ opacity: 0.5, scale: 0.85 }}
        animate={{ 
          opacity: isHovered ? 0.8 : 0.5,
          scale: isHovered ? 1.05 : 1,
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <Button
        className="relative z-10 px-8 py-6 text-lg font-bold text-white bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isClicked ? 0 : 1,
            y: isClicked ? -20 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          ENTER
        </motion.span>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isClicked ? 1 : 0,
            scale: isClicked ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
        </motion.div>
      </Button>
    </motion.div>
  );
}
