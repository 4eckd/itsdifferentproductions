"use client";

import { useState } from "react";
import { Palette, Eye, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useColorTheme, useTheme } from "@/contexts/theme-context";
import { ColorTheme } from "@/contexts/theme-context";

const themeShowcase = [
  {
    name: "Default",
    value: "default" as ColorTheme,
    description: "Classic neutral theme with perfect balance",
    category: "Classic",
    lightColor: "#ffffff",
    darkColor: "#1a1a1a",
    accent: "#000000"
  },
  {
    name: "Pure White",
    value: "white" as ColorTheme,
    description: "Ultra-clean minimal white aesthetic",
    category: "Minimal",
    lightColor: "#ffffff",
    darkColor: "#f8f9fa",
    accent: "#000000"
  },
  {
    name: "Midnight",
    value: "midnight" as ColorTheme,
    description: "Deep sophisticated dark theme",
    category: "Dark",
    lightColor: "#1e293b",
    darkColor: "#0f172a",
    accent: "#3b82f6"
  },
  {
    name: "Ocean",
    value: "ocean" as ColorTheme,
    description: "Calming blue-teal ocean vibes",
    category: "Nature",
    lightColor: "#e0f2fe",
    darkColor: "#0c4a6e",
    accent: "#0891b2"
  },
  {
    name: "Sunset",
    value: "sunset" as ColorTheme,
    description: "Warm orange-pink gradient theme",
    category: "Warm",
    lightColor: "#fff7ed",
    darkColor: "#9a3412",
    accent: "#ea580c"
  },
  {
    name: "Forest",
    value: "forest" as ColorTheme,
    description: "Natural deep green forest theme",
    category: "Nature",
    lightColor: "#ecfdf5",
    darkColor: "#064e3b",
    accent: "#059669"
  },
  {
    name: "Lavender",
    value: "lavender" as ColorTheme,
    description: "Soft purple-gray elegant theme",
    category: "Elegant",
    lightColor: "#faf5ff",
    darkColor: "#581c87",
    accent: "#8b5cf6"
  },
  {
    name: "Gold",
    value: "gold" as ColorTheme,
    description: "Luxury golden premium theme",
    category: "Luxury",
    lightColor: "#fffbeb",
    darkColor: "#92400e",
    accent: "#d97706"
  },
  {
    name: "Neon",
    value: "neon" as ColorTheme,
    description: "Vibrant cyberpunk neon theme",
    category: "Futuristic",
    lightColor: "#f0fdf4",
    darkColor: "#1a1a1a",
    accent: "#00ff00"
  },
  {
    name: "Purple",
    value: "purple" as ColorTheme,
    description: "Rich royal purple theme",
    category: "Classic",
    lightColor: "#f5f3ff",
    darkColor: "#2e1065",
    accent: "#8b5cf6"
  },
  {
    name: "Blue",
    value: "blue" as ColorTheme,
    description: "Professional blue corporate theme",
    category: "Professional",
    lightColor: "#eff6ff",
    darkColor: "#172554",
    accent: "#3b82f6"
  },
  {
    name: "Green",
    value: "green" as ColorTheme,
    description: "Fresh vibrant green theme",
    category: "Nature",
    lightColor: "#f0fdf4",
    darkColor: "#14532d",
    accent: "#22c55e"
  },
  {
    name: "Amber",
    value: "amber" as ColorTheme,
    description: "Warm amber sunshine theme",
    category: "Warm",
    lightColor: "#fffbeb",
    darkColor: "#78350f",
    accent: "#f59e0b"
  },
  {
    name: "Red",
    value: "red" as ColorTheme,
    description: "Bold passionate red theme",
    category: "Bold",
    lightColor: "#fef2f2",
    darkColor: "#7f1d1d",
    accent: "#ef4444"
  },
  {
    name: "Cyan",
    value: "cyan" as ColorTheme,
    description: "Cool refreshing cyan theme",
    category: "Cool",
    lightColor: "#ecfeff",
    darkColor: "#164e63",
    accent: "#06b6d4"
  },
  {
    name: "Pink",
    value: "pink" as ColorTheme,
    description: "Playful vibrant pink theme",
    category: "Playful",
    lightColor: "#fdf2f8",
    darkColor: "#831843",
    accent: "#ec4899"
  },
];

const categories = ["All", "Classic", "Minimal", "Dark", "Nature", "Warm", "Elegant", "Luxury", "Futuristic", "Professional", "Bold", "Cool", "Playful"];

export default function ThemesPage() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewTheme, setPreviewTheme] = useState<ColorTheme | null>(null);

  const filteredThemes = selectedCategory === "All"
    ? themeShowcase
    : themeShowcase.filter(t => t.category === selectedCategory);

  const handleThemePreview = (themeValue: ColorTheme) => {
    setPreviewTheme(themeValue);
    setColorTheme(themeValue);
  };

  const resetPreview = () => {
    setPreviewTheme(null);
  };

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Theme Gallery</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover and customize your perfect color theme. From minimal whites to vibrant neons,
          find the aesthetic that matches your style.
        </p>

        {previewTheme && (
          <div className="mb-6">
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Eye className="h-4 w-4 mr-2" />
              Previewing: {themeShowcase.find(t => t.value === previewTheme)?.name}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetPreview}
              className="ml-2"
            >
              Reset
            </Button>
          </div>
        )}
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Theme Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredThemes.map((themeItem) => (
            <Card
              key={themeItem.value}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                colorTheme === themeItem.value ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleThemePreview(themeItem.value)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{themeItem.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {themeItem.category}
                  </Badge>
                </div>

                {/* Color Preview */}
                <div className="flex gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: themeItem.lightColor }}
                    title="Light mode"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: themeItem.darkColor }}
                    title="Dark mode"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: themeItem.accent }}
                    title="Accent color"
                  />
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {themeItem.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {theme === 'light' ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    {theme === 'light' ? 'Light' : 'Dark'} Mode
                  </div>

                  {colorTheme === themeItem.value && (
                    <Badge variant="default" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Theme Information */}
      <section className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>About Color Themes</CardTitle>
            <CardDescription>
              Customize your Its Different Productions experience with our carefully crafted color themes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🎨 16 Unique Themes</h3>
                <p className="text-sm text-muted-foreground">
                  From minimal whites to vibrant neons, each theme is carefully designed for optimal readability and aesthetics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🌓 Light & Dark Modes</h3>
                <p className="text-sm text-muted-foreground">
                  Every theme supports both light and dark modes, automatically adapting to your system preferences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💾 Persistent Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Your theme preference is saved locally and will be remembered across sessions and devices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Found Your Perfect Theme?</h2>
        <p className="text-muted-foreground mb-6">
          Your selected theme will be applied across the entire platform, including the store, dashboard, and admin panels.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="/store">Explore Store</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard">Visit Dashboard</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
