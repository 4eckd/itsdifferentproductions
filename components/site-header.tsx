"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Music, Shirt, Gem, Menu, X, Home, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSelector } from "@/components/theme-selector";
import { WalletConnect } from "@/components/ui/wallet-connect";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    {
      name: "Home",
      href: "/store",
      icon: Home,
    },
    {
      name: "Beats",
      href: "/store/beats",
      icon: Music,
    },
    {
      name: "Merch",
      href: "/store/merch",
      icon: Shirt,
    },
    {
      name: "NFTs",
      href: "/store/nfts",
      icon: Gem,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/store"
          className="flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <span className="text-xl sm:text-2xl font-bold text-gradient">
            IDP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => {
            const isActive =
              item.href === "/store"
                ? pathname === "/store"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </span>
                {isActive && (
                  <motion.span
                    className="absolute -bottom-[26px] left-0 h-[3px] w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Wallet Connect - Desktop */}
          <div className="hidden sm:block">
            <WalletConnect variant="outline" size="sm" />
          </div>

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Search Button - Desktop */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Cart Button */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
            <span className="sr-only">Shopping cart</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-background md:hidden overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex-1 overflow-y-auto">
                <div className="container py-6 space-y-4">
                  {/* Search Input - Mobile */}
                  <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search products..."
                      className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive =
                        item.href === "/store"
                          ? pathname === "/store"
                          : pathname?.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted text-foreground/80 hover:text-foreground"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Wallet Connect - Mobile */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="px-4 mb-4">
                      <WalletConnect variant="default" size="default" className="w-full" />
                    </div>
                  </div>

                  {/* Additional Links */}
                  <div className="space-y-1">
                    <Link
                      href="/auditions"
                      className="flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors hover:bg-muted text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🎤 Vocalist Auditions
                    </Link>
                    <Link
                      href="/collaborate"
                      className="flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors hover:bg-muted text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Collaborate With Us
                    </Link>
                    <Link
                      href="/social"
                      className="flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors hover:bg-muted text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Social Media
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors hover:bg-muted text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center py-4 px-4 rounded-lg text-base font-medium transition-colors hover:bg-muted text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t py-4 bg-muted/30">
                <div className="container flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} IDP</span>
                  <div className="flex items-center gap-2">
                    <ThemeSelector />
                    <Button variant="outline" size="sm">Sign In</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
