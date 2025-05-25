"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURED_CATEGORIES } from "@/lib/constants/merchandise-categories";

export function MerchandiseDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = pathname?.startsWith("/store/merch");

  const getHref = (categorySlug: string) => {
    if (categorySlug === "beats") {
      return "/store/beats";
    }
    return `/store/merch/${categorySlug}`;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/store/merch"
        className={cn(
          "relative flex items-center text-sm font-medium transition-colors hover:text-foreground",
          isActive ? "text-foreground" : "text-foreground/60"
        )}
      >
        <span className="flex items-center gap-1.5">
          <Shirt className="h-4 w-4" />
          Merch
          <ChevronDown className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </span>
        {isActive && (
          <motion.span
            className="absolute -bottom-[26px] left-0 h-[3px] w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            layoutId="navbar-indicator"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <div className="mb-2">
                <Link
                  href="/store/merch"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  All Merchandise
                </Link>
              </div>
              <div className="border-t pt-2">
                <div className="text-xs font-medium text-muted-foreground px-3 py-1 mb-1">
                  Categories
                </div>
                {FEATURED_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const href = getHref(category.slug);
                  const isActiveCategory = pathname === href;
                  
                  return (
                    <Link
                      key={category.id}
                      href={href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                        isActiveCategory 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground/80 hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {category.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
