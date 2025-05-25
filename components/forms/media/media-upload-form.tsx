"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Video, Music, Upload, X, Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { uploadFile, generateFilePath } from "@/lib/storage-helpers";

const mediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  type: z.enum(["video", "audio"], { required_error: "Please select media type" }),
  genre: z.string().min(1, "Genre is required"),
  artist: z.string().optional(),
  tags: z.string().optional(),
  isPublic: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  mediaFile: z.instanceof(File, { message: "Media file is required" }),
  thumbnailFile: z.instanceof(File).optional(),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

const GENRE_OPTIONS = [
  "Hip-Hop",
  "R&B",
  "Pop",
  "Rock",
  "Jazz",
  "Blues",
  "Country",
  "Electronic",
  "Reggae",
  "Latin",
  "Afrobeat",
  "K-Pop",
  "Indie",
  "Folk",
  "Gospel",
  "Trap",
  "Lo-Fi",
  "Boom Bap",
  "Documentary",
  "Behind the Scenes",
  "Tutorial",
  "Live Performance",
  "Other"
];

export function MediaUploadForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      artist: "",
      tags: "",
      isPublic: true,
      isFeatured: false,
    },
  });

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("mediaFile", file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType(file.type);

      // Auto-detect type based on file
      if (file.type.startsWith("video/")) {
        form.setValue("type", "video");
      } else if (file.type.startsWith("audio/")) {
        form.setValue("type", "audio");
      }
    }
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("thumbnailFile", file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const clearMedia = () => {
    form.setValue("mediaFile", undefined as any);
    setMediaPreview(null);
    setMediaType(null);

    // Clear the file input
    const fileInput = document.getElementById("media-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const clearThumbnail = () => {
    form.setValue("thumbnailFile", undefined as any);
    setThumbnailPreview(null);

    // Clear the file input
    const fileInput = document.getElementById("thumbnail-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: MediaFormValues) => {
    if (!user) {
      toast.error("You must be logged in to upload media");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload media file to Supabase Storage
      const mediaFileName = generateFilePath(user.id, data.mediaFile.name);
      const bucket = data.type === "video" ? "nft_assets" : "audio_files";
      const mediaUrl = await uploadFile(data.mediaFile, bucket, mediaFileName);

      if (!mediaUrl) {
        throw new Error("Error uploading media file");
      }

      // 2. Upload thumbnail if provided
      let thumbnailUrl = null;
      if (data.thumbnailFile) {
        const thumbnailFileName = generateFilePath(user.id, data.thumbnailFile.name);
        thumbnailUrl = await uploadFile(data.thumbnailFile, "product_images", thumbnailFileName);
      }

      // 3. Create media record in database
      const { error: mediaError } = await supabase
        .from("media")
        .insert({
          title: data.title,
          description: data.description,
          type: data.type,
          genre: data.genre,
          artist: data.artist || "Its Different Productions",
          tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
          media_url: mediaUrl,
          thumbnail_url: thumbnailUrl,
          is_public: data.isPublic,
          is_featured: data.isFeatured,
          uploaded_by: user.id,
          views: 0,
          likes: 0,
        });

      if (mediaError) {
        throw new Error(`Error creating media record: ${mediaError.message}`);
      }

      toast.success("Media uploaded successfully!");
      router.push("/media");
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error(error instanceof Error ? error.message : "Error uploading media");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = form.watch("type");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Media</h1>
        <p className="text-muted-foreground">
          Share your videos, music, and audio content with the community.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter media title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your media content"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2" />
                            Video
                          </div>
                        </SelectItem>
                        <SelectItem value="audio">
                          <div className="flex items-center">
                            <Music className="h-4 w-4 mr-2" />
                            Audio
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENRE_OPTIONS.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Artist or creator name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave blank to use "Its Different Productions"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hip-hop, beats, instrumental, trap"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags to help categorize your media
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Media File Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Media File</h2>

            <FormItem>
              <FormLabel>Upload Media</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="media-upload"
                      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
                        form.formState.errors.mediaFile
                          ? "border-destructive bg-destructive/10"
                          : "border-input bg-background hover:bg-accent/40"
                      }`}
                    >
                      {mediaPreview ? (
                        <div className="relative w-full h-full">
                          {mediaType?.startsWith("video/") ? (
                            <video
                              src={mediaPreview}
                              className="w-full h-full object-contain rounded-lg"
                              controls
                              muted
                            />
                          ) : mediaType?.startsWith("audio/") ? (
                            <div className="flex flex-col items-center justify-center h-full">
                              <Music className="h-16 w-16 mb-4 text-muted-foreground" />
                              <audio
                                src={mediaPreview}
                                controls
                                className="w-full max-w-[300px]"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Upload className="h-16 w-16 text-muted-foreground" />
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                            onClick={clearMedia}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove media</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Videos: MP4, WebM, MOV (max. 500MB)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Audio: MP3, WAV, FLAC (max. 100MB)
                          </p>
                        </div>
                      )}
                      <input
                        id="media-upload"
                        type="file"
                        accept="video/*,audio/*"
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </label>
                  </div>
                </div>
              </FormControl>
              {form.formState.errors.mediaFile && (
                <FormMessage>
                  {form.formState.errors.mediaFile.message}
                </FormMessage>
              )}
            </FormItem>
          </div>

          {/* Thumbnail Upload (for videos) */}
          {selectedType === "video" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Thumbnail (Optional)</h2>

              <FormItem>
                <FormLabel>Upload Thumbnail</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="thumbnail-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-input bg-background hover:bg-accent/40"
                      >
                        {thumbnailPreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-1 right-1 bg-background/80 hover:bg-background"
                              onClick={clearThumbnail}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove thumbnail</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> thumbnail
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPEG, PNG, WebP (max. 5MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailChange}
                        />
                      </label>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Custom thumbnail for your video. If not provided, a frame from the video will be used.
                </FormDescription>
              </FormItem>
            </div>
          )}

          {/* Settings */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Settings</h2>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Public
                      </FormLabel>
                      <FormDescription>
                        Make this media visible to all users
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Featured
                      </FormLabel>
                      <FormDescription>
                        Feature this media on the homepage and media gallery
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Media...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
