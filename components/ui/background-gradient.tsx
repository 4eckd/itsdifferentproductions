"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface BackgroundGradientProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientClassName?: string;
  interactive?: boolean;
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  gradientClassName,
  interactive = true,
  borderRadius = "xl",
}: BackgroundGradientProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Map border radius values to Tailwind classes
  const borderRadiusMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div
      className={cn("relative p-[3px] group transition-all duration-300", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blurred gradient background */}
      <div
        className={cn(
          "absolute inset-0 z-[1] opacity-60 group-hover:opacity-80 blur-xl transition-all duration-500",
          borderRadiusMap[borderRadius],
          gradientClassName || "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
        )}
        style={
          interactive && isHovered
            ? {
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--tw-gradient-stops))`,
              }
            : {}
        }
      />

      {/* Sharp gradient border */}
      <div
        className={cn(
          "absolute inset-0 z-[1] transition-all duration-300",
          borderRadiusMap[borderRadius],
          gradientClassName || "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
        )}
        style={
          interactive && isHovered
            ? {
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--tw-gradient-stops))`,
              }
            : {}
        }
      />

      {/* Content container */}
      <div
        className={cn(
          "relative z-10 h-full",
          borderRadiusMap[borderRadius],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
