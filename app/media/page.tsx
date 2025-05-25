"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Video,
  Music,
  Headphones,
  Eye,
  Heart,
  Share2,
  Download,
  Filter,
  Search,
  Grid3X3,
  List
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio';
  url: string;
  thumbnail?: string;
  duration?: string;
  genre?: string;
  artist?: string;
  views: number;
  likes: number;
  created_at: string;
  tags?: string[];
}

// Mock data for demonstration - in production this would come from Supabase
const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Midnight Vibes - Official Music Video",
    description: "A smooth R&B track with atmospheric visuals showcasing the night life aesthetic.",
    type: "video",
    url: "/videos/midnight-vibes.mp4",
    thumbnail: "/images/video-thumbnails/midnight-vibes.jpg",
    duration: "3:45",
    genre: "R&B",
    artist: "Its Different Productions",
    views: 12500,
    likes: 890,
    created_at: "2024-01-15",
    tags: ["R&B", "Night", "Atmospheric", "Smooth"]
  },
  {
    id: "2",
    title: "Trap Symphony Beat",
    description: "Hard-hitting trap beat with orchestral elements. Perfect for rap vocals.",
    type: "audio",
    url: "/audio/trap-symphony.mp3",
    thumbnail: "/images/beat-covers/trap-symphony.jpg",
    duration: "2:30",
    genre: "Trap",
    artist: "Its Different Productions",
    views: 8900,
    likes: 567,
    created_at: "2024-01-10",
    tags: ["Trap", "Orchestral", "Hard", "Rap"]
  },
  {
    id: "3",
    title: "Studio Sessions - Behind the Scenes",
    description: "Take a look inside our creative process as we craft the next hit.",
    type: "video",
    url: "/videos/studio-sessions.mp4",
    thumbnail: "/images/video-thumbnails/studio-sessions.jpg",
    duration: "8:12",
    genre: "Documentary",
    artist: "Its Different Productions",
    views: 5600,
    likes: 234,
    created_at: "2024-01-08",
    tags: ["Behind the Scenes", "Studio", "Process", "Creative"]
  },
  {
    id: "4",
    title: "Chill Lo-Fi Instrumental",
    description: "Relaxing lo-fi beat perfect for studying, working, or just chilling out.",
    type: "audio",
    url: "/audio/chill-lofi.mp3",
    thumbnail: "/images/beat-covers/chill-lofi.jpg",
    duration: "4:20",
    genre: "Lo-Fi",
    artist: "Its Different Productions",
    views: 15600,
    likes: 1200,
    created_at: "2024-01-05",
    tags: ["Lo-Fi", "Chill", "Study", "Relaxing"]
  },
  {
    id: "5",
    title: "Collaboration Showcase",
    description: "Featuring various artists who have worked with Its Different Productions.",
    type: "video",
    url: "/videos/collaboration-showcase.mp4",
    thumbnail: "/images/video-thumbnails/collaboration.jpg",
    duration: "6:30",
    genre: "Showcase",
    artist: "Various Artists",
    views: 9800,
    likes: 445,
    created_at: "2024-01-03",
    tags: ["Collaboration", "Artists", "Showcase", "Community"]
  },
  {
    id: "6",
    title: "Boom Bap Classic",
    description: "Old school boom bap beat with crispy drums and soulful samples.",
    type: "audio",
    url: "/audio/boom-bap-classic.mp3",
    thumbnail: "/images/beat-covers/boom-bap.jpg",
    duration: "3:15",
    genre: "Boom Bap",
    artist: "Its Different Productions",
    views: 7200,
    likes: 389,
    created_at: "2024-01-01",
    tags: ["Boom Bap", "Classic", "Soul", "Old School"]
  }
];

export default function MediaPage() {
  const { user } = useAuth();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>(mockMediaItems);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  // Filter and sort media items
  useEffect(() => {
    let filtered = mediaItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.artist?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesGenre = genreFilter === "all" || item.genre?.toLowerCase() === genreFilter.toLowerCase();

      return matchesSearch && matchesType && matchesGenre;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "most-viewed":
          return b.views - a.views;
        case "most-liked":
          return b.likes - a.likes;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [mediaItems, searchTerm, typeFilter, genreFilter, sortBy]);

  const handlePlay = (itemId: string) => {
    setCurrentlyPlaying(currentlyPlaying === itemId ? null : itemId);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getUniqueGenres = () => {
    const genres = mediaItems.map(item => item.genre).filter(Boolean);
    return [...new Set(genres)];
  };

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Video className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Media Gallery</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore our collection of music videos, beats, behind-the-scenes content, and audio samples.
          Discover the creative process behind Its Different Productions.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Video className="h-4 w-4 mr-2" />
            {mediaItems.filter(item => item.type === 'video').length} Videos
          </Badge>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Music className="h-4 w-4 mr-2" />
            {mediaItems.filter(item => item.type === 'audio').length} Audio Tracks
          </Badge>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Eye className="h-4 w-4 mr-2" />
            {mediaItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()} Total Views
          </Badge>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>

              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {getUniqueGenres().map((genre) => (
                    <SelectItem key={genre} value={genre?.toLowerCase() || ""}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="most-liked">Most Liked</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Media Grid/List */}
      <section className="py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading media...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Media Found</h3>
            <p className="text-muted-foreground mb-6">
              {mediaItems.length === 0
                ? "No media has been uploaded yet."
                : "No media matches your current filters."}
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                isPlaying={currentlyPlaying === item.id}
                onPlay={() => handlePlay(item.id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Playlists */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaylistCard
            title="Latest Beats"
            description="Our newest beat productions"
            itemCount={12}
            thumbnail="/images/playlists/latest-beats.jpg"
            href="/media/playlists/latest-beats"
          />
          <PlaylistCard
            title="Music Videos"
            description="Official music videos and visuals"
            itemCount={8}
            thumbnail="/images/playlists/music-videos.jpg"
            href="/media/playlists/music-videos"
          />
          <PlaylistCard
            title="Behind the Scenes"
            description="Studio sessions and creative process"
            itemCount={15}
            thumbnail="/images/playlists/behind-scenes.jpg"
            href="/media/playlists/behind-scenes"
          />
        </div>
      </section>
    </div>
  );
}

interface MediaCardProps {
  item: MediaItem;
  isPlaying: boolean;
  onPlay: () => void;
  viewMode: "grid" | "list";
}

function MediaCard({ item, isPlaying, onPlay, viewMode }: MediaCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                {item.type === 'video' ? (
                  <Video className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <Music className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="absolute inset-0 m-auto w-8 h-8 rounded-full"
                onClick={onPlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{item.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>{item.artist}</span>
                <span>{item.duration}</span>
                <Badge variant="outline" className="text-xs">
                  {item.genre}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{formatViews(item.views)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <span>{item.likes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <BackgroundGradient className="rounded-xl p-1">
      <Card className="bg-background rounded-lg overflow-hidden h-full">
        <div className="relative aspect-video bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            {item.type === 'video' ? (
              <Video className="h-16 w-16 text-muted-foreground" />
            ) : (
              <Music className="h-16 w-16 text-muted-foreground" />
            )}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg"
              onClick={onPlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {item.duration}
            </Badge>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className="text-xs">
              {item.type === 'video' ? (
                <>
                  <Video className="h-3 w-3 mr-1" />
                  Video
                </>
              ) : (
                <>
                  <Music className="h-3 w-3 mr-1" />
                  Audio
                </>
              )}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>{item.artist}</span>
            <Badge variant="outline" className="text-xs">
              {item.genre}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{formatViews(item.views)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{item.likes}</span>
              </div>
            </div>

            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </BackgroundGradient>
  );
}

interface PlaylistCardProps {
  title: string;
  description: string;
  itemCount: number;
  thumbnail: string;
  href: string;
}

function PlaylistCard({ title, description, itemCount, thumbnail, href }: PlaylistCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative aspect-video bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Music className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <Badge variant="secondary">{itemCount} items</Badge>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

// Helper function to format views
function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}
