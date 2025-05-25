"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MERCHANDISE_CATEGORIES, FEATURED_CATEGORIES } from "@/lib/constants/merchandise-categories";

interface MerchandiseCategoryNavProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  showFeaturedOnly?: boolean;
}

export function MerchandiseCategoryNav({ 
  className, 
  variant = "horizontal",
  showFeaturedOnly = false 
}: MerchandiseCategoryNavProps) {
  const pathname = usePathname();
  
  const categories = showFeaturedOnly ? FEATURED_CATEGORIES : MERCHANDISE_CATEGORIES;

  const isActive = (categorySlug: string) => {
    if (categorySlug === "beats") {
      return pathname === "/store/beats";
    }
    return pathname === `/store/merch/${categorySlug}` || pathname === `/store/merch/${categorySlug}/`;
  };

  const getHref = (categorySlug: string) => {
    if (categorySlug === "beats") {
      return "/store/beats";
    }
    return `/store/merch/${categorySlug}`;
  };

  if (variant === "vertical") {
    return (
      <div className={cn("space-y-2", className)}>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        {categories.map((category) => {
          const active = isActive(category.slug);
          const Icon = category.icon;
          
          return (
            <Link key={category.id} href={getHref(category.slug)}>
              <Button
                variant={active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start relative",
                  active && "bg-primary text-primary-foreground"
                )}
                size="sm"
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
                {category.comingSoon && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Soon
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const active = isActive(category.slug);
        const Icon = category.icon;
        
        return (
          <Link key={category.id} href={getHref(category.slug)}>
            <Button
              variant={active ? "default" : "outline"}
              size="sm"
              className={cn(
                "relative transition-all duration-200",
                active && "shadow-md"
              )}
              disabled={category.comingSoon}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.name}
              {category.comingSoon && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              )}
              {active && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-md"
                  layoutId="category-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
