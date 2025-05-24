"use client";

import { cn } from "@/lib/utils";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Music,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Social media platform data
const socialPlatforms = [
  {
    name: "Discord",
    handle: "@itsdifferentproductions",
    url: "https://discord.gg/m3WwmkMHAx",
    icon: MessageSquare,
    color: "#5865F2",
    description: "Join our community for exclusive updates and events",
    followers: "2.1K",
    isMain: true,
  },
  {
    name: "TikTok",
    handle: "@itsdifferentproductions",
    url: "https://tiktok.com/@itsdifferentproductions",
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "#000000",
    description: "Short-form content and behind-the-scenes",
    followers: "8.7K",
    isMain: true,
  },
  {
    name: "SoundCloud",
    handle: "itsdifferentproductions",
    url: "https://soundcloud.com/itsdifferentproductions",
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.104.101.104.053 0 .094-.046.101-.104l.262-2.105-.262-2.154c-.007-.054-.048-.1-.101-.1zm1.49.876c-.058 0-.104.053-.104.117l-.176 1.072.176 1.024c0 .063.046.117.104.117.059 0 .104-.054.104-.117l.2-1.024-.2-1.072c0-.064-.045-.117-.104-.117zm1.49.2c-.058 0-.104.058-.104.128l-.176.844.176.802c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-.802-.2-.844c0-.07-.045-.128-.104-.128zm1.49-.058c-.058 0-.104.058-.104.128l-.176.902.176.844c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-.844-.2-.902c0-.07-.045-.128-.104-.128zm1.49-.234c-.058 0-.104.058-.104.128l-.176 1.136.176 1.078c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.078-.2-1.136c0-.07-.045-.128-.104-.128zm1.49-.117c-.058 0-.104.058-.104.128l-.176 1.253.176 1.195c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.195-.2-1.253c0-.07-.045-.128-.104-.128zm1.49-.176c-.058 0-.104.058-.104.128l-.176 1.429.176 1.371c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.371-.2-1.429c0-.07-.045-.128-.104-.128zm1.49-.234c-.058 0-.104.058-.104.128l-.176 1.663.176 1.605c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.605-.2-1.663c0-.07-.045-.128-.104-.128zm1.49-.293c-.058 0-.104.058-.104.128l-.176 1.956.176 1.898c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.898-.2-1.956c0-.07-.045-.128-.104-.128zm1.49-.41c-.058 0-.104.058-.104.128l-.176 2.366.176 2.308c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-2.308-.2-2.366c0-.07-.045-.128-.104-.128zm1.49-.644c-.058 0-.104.058-.104.128l-.176 3.01.176 2.952c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-2.952-.2-3.01c0-.07-.045-.128-.104-.128zm1.49-.41c-.058 0-.104.058-.104.128l-.176 3.42.176 3.362c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-3.362-.2-3.42c0-.07-.045-.128-.104-.128zm1.49.176c-.058 0-.104.058-.104.128l-.176 3.244.176 3.186c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-3.186-.2-3.244c0-.07-.045-.128-.104-.128zm1.49.41c-.058 0-.104.058-.104.128l-.176 2.834.176 2.776c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-2.776-.2-2.834c0-.07-.045-.128-.104-.128zm1.49.644c-.058 0-.104.058-.104.128l-.176 2.19.176 2.132c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-2.132-.2-2.19c0-.07-.045-.128-.104-.128zm1.49.41c-.058 0-.104.058-.104.128l-.176 1.78.176 1.722c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.722-.2-1.78c0-.07-.045-.128-.104-.128zm1.49.234c-.058 0-.104.058-.104.128l-.176 1.546.176 1.488c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.488-.2-1.546c0-.07-.045-.128-.104-.128zm1.49.176c-.058 0-.104.058-.104.128l-.176 1.37.176 1.312c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.312-.2-1.37c0-.07-.045-.128-.104-.128zm1.49.117c-.058 0-.104.058-.104.128l-.176 1.253.176 1.195c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.195-.2-1.253c0-.07-.045-.128-.104-.128zm1.49.058c-.058 0-.104.058-.104.128l-.176 1.195.176 1.137c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.137-.2-1.195c0-.07-.045-.128-.104-.128zm1.49.117c-.058 0-.104.058-.104.128l-.176 1.078.176 1.02c0 .07.046.128.104.128.059 0 .104-.058.104-.128l.2-1.02-.2-1.078c0-.07-.045-.128-.104-.128z" />
      </svg>
    ),
    color: "#FF5500",
    description: "Stream our latest beats and tracks",
    followers: "15.2K",
    isMain: true,
  },
  {
    name: "Spotify",
    handle: "Its Different Productions",
    url: "https://open.spotify.com/artist/itsdifferentproductions",
    icon: Music,
    color: "#1DB954",
    description: "Listen to our music on Spotify",
    followers: "3.4K",
    isMain: true,
  },
  {
    name: "Instagram",
    handle: "@itsdifferentproductions",
    url: "https://instagram.com/itsdifferentproductions",
    icon: Instagram,
    color: "#E4405F",
    description: "Behind-the-scenes content and updates",
    followers: "12.8K",
    isMain: false,
  },
  {
    name: "Twitter/X",
    handle: "@itsdifferentprod",
    url: "https://twitter.com/itsdifferentproductions",
    icon: Twitter,
    color: "#1DA1F2",
    description: "Latest news and announcements",
    followers: "5.6K",
    isMain: false,
  },
  {
    name: "Facebook",
    handle: "Its Different Productions",
    url: "https://facebook.com/itsdifferentproductions",
    icon: Facebook,
    color: "#1877F2",
    description: "Community updates and events",
    followers: "4.2K",
    isMain: false,
  },
  {
    name: "LinkedIn",
    handle: "Its Different Productions",
    url: "https://linkedin.com/company/itsdifferentproductions",
    icon: Linkedin,
    color: "#0A66C2",
    description: "Professional updates and partnerships",
    followers: "892",
    isMain: false,
  },
  {
    name: "Telegram",
    handle: "@itsdifferentproductions",
    url: "https://t.me/itsdifferentproductions",
    icon: MessageCircle,
    color: "#0088CC",
    description: "Direct communication and updates",
    followers: "1.3K",
    isMain: false,
  },
];

interface SocialMediaLinksProps {
  variant?: "compact" | "detailed" | "grid";
  showFollowers?: boolean;
  showMainOnly?: boolean;
  className?: string;
}

export function SocialMediaLinks({
  variant = "compact",
  showFollowers = false,
  showMainOnly = false,
  className,
}: SocialMediaLinksProps) {
  const platforms = showMainOnly 
    ? socialPlatforms.filter(platform => platform.isMain)
    : socialPlatforms;

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label={platform.name}
              style={{
                backgroundColor: `${platform.color}10`,
                color: platform.color,
              }}
            >
              <IconComponent />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={cn("space-y-4", className)}>
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <div
              key={platform.name}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-full"
                  style={{
                    backgroundColor: `${platform.color}15`,
                    color: platform.color,
                  }}
                >
                  <IconComponent />
                </div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.handle}</p>
                  <p className="text-xs text-muted-foreground">{platform.description}</p>
                  {showFollowers && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {platform.followers} followers
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hover:border-primary"
              >
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Follow
                </a>
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/50 group"
            >
              <div className="flex items-center space-x-4 mb-3">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-full group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${platform.color}15`,
                    color: platform.color,
                  }}
                >
                  <IconComponent />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{platform.handle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {platform.description}
              </p>
              {showFollowers && (
                <Badge variant="secondary" className="text-xs">
                  {platform.followers} followers
                </Badge>
              )}
            </a>
          );
        })}
      </div>
    );
  }

  return null;
}
