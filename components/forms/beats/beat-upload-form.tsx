"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Music, Upload, X, Loader2 } from "lucide-react";

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
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { beatSchema, BeatFormValues } from "@/lib/validators/beats";
import { uploadFile, generateFilePath } from "@/lib/storage-helpers";

// Musical keys for dropdown
const MUSICAL_KEYS = [
  "C Major", "C Minor",
  "C# Major", "C# Minor",
  "D Major", "D Minor",
  "D# Major", "D# Minor",
  "E Major", "E Minor",
  "F Major", "F Minor",
  "F# Major", "F# Minor",
  "G Major", "G Minor",
  "G# Major", "G# Minor",
  "A Major", "A Minor",
  "A# Major", "A# Minor",
  "B Major", "B Minor",
];

// Genre options
const GENRES = [
  "Hip Hop",
  "Trap",
  "R&B",
  "Pop",
  "Drill",
  "Afrobeat",
  "Reggaeton",
  "EDM",
  "House",
  "Lofi",
  "Jazz",
  "Rock",
  "Other",
];

export function BeatUploadForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(beatSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      genre: "",
      bpm: 0,
      key: "",
      licenseType: "basic" as const,
      tags: "",
    },
  });

  // Handle file selection for audio
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("audioFile", file, { shouldValidate: true });

      // Create audio preview URL
      const audioUrl = URL.createObjectURL(file);
      setAudioPreview(audioUrl);
    }
  };

  // Handle file selection for cover image
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file, { shouldValidate: true });

      // Create image preview URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImagePreview(imageUrl);
    }
  };

  // Clear audio file
  const clearAudioFile = () => {
    form.setValue("audioFile", undefined as any, { shouldValidate: true });
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
      setAudioPreview(null);
    }
  };

  // Clear cover image
  const clearCoverImage = () => {
    form.setValue("coverImage", undefined as any, { shouldValidate: true });
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview);
      setCoverImagePreview(null);
    }
  };

  async function onSubmit(data: any) {
    if (!user) {
      toast.error("You must be logged in to upload beats");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload audio file to Supabase Storage
      const audioFileName = generateFilePath(user.id, data.audioFile.name);
      const audioUrl = await uploadFile(data.audioFile, "audio_files", audioFileName);

      if (!audioUrl) {
        throw new Error("Error uploading audio file");
      }

      // 2. Upload cover image if provided
      let coverImageUrl = null;
      if (data.coverImage) {
        const imageFileName = generateFilePath(user.id, data.coverImage.name);
        coverImageUrl = await uploadFile(data.coverImage, "product_images", imageFileName);

        if (!coverImageUrl) {
          throw new Error("Error uploading cover image");
        }
      }

      // 3. Create product record
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: data.title,
          description: data.description,
          price: data.price,
          category: "beat",
          status: "published",
          metadata: {
            genre: data.genre,
            bpm: data.bpm,
            key: data.key,
            tags: data.tags,
            coverImageUrl,
          },
        })
        .select()
        .single();

      if (productError) {
        throw new Error(`Error creating product: ${productError.message}`);
      }

      // 4. Create beat record
      const { error: beatError } = await supabase
        .from("beats")
        .insert({
          id: product.id,
          genre: data.genre,
          bpm: data.bpm,
          key: data.key,
          duration: 0, // This would be calculated from the audio file
          audio_url: audioUrl,
          license_type: data.licenseType,
          tags: data.tags,
        });

      if (beatError) {
        throw new Error(`Error creating beat: ${beatError.message}`);
      }

      toast.success("Beat uploaded successfully!");
      router.push(`/store/beats/${product.id}`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred while uploading the beat");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 bg-background rounded-lg border shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Upload a Beat</h1>
        <p className="text-muted-foreground">
          Share your music with the world
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter beat title" {...field} />
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
                      placeholder="Describe your beat"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select license type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="exclusive">Exclusive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Technical Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENRES.map((genre) => (
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

              <FormField
                control={form.control}
                name="bpm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BPM</FormLabel>
                    <FormControl>
                      <Input type="number" min="40" max="300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MUSICAL_KEYS.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Example: trap, dark, melodic
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Files */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Files</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Audio File Upload */}
              <FormItem>
                <FormLabel>Audio File</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="audio-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                          form.formState.errors.audioFile
                            ? "border-destructive bg-destructive/10"
                            : "border-input bg-background hover:bg-accent/40"
                        }`}
                      >
                        {audioPreview ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 relative w-full">
                            <audio
                              controls
                              src={audioPreview}
                              className="w-full max-w-[250px]"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0"
                              onClick={clearAudioFile}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove file</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Music className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              MP3 or WAV (max. 50MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="audio-upload"
                          type="file"
                          accept="audio/mpeg,audio/wav"
                          className="hidden"
                          onChange={handleAudioChange}
                        />
                      </label>
                    </div>
                  </div>
                </FormControl>
                {form.formState.errors.audioFile && (
                  <FormMessage>
                    {form.formState.errors.audioFile.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Cover Image Upload */}
              <FormItem>
                <FormLabel>Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="cover-image-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                          form.formState.errors.coverImage
                            ? "border-destructive bg-destructive/10"
                            : "border-input bg-background hover:bg-accent/40"
                        }`}
                      >
                        {coverImagePreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={coverImagePreview}
                              alt="Cover preview"
                              className="w-full h-full object-contain"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0"
                              onClick={clearCoverImage}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove image</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPEG, PNG or WebP (max. 5MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="cover-image-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={handleCoverImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </FormControl>
                {form.formState.errors.coverImage && (
                  <FormMessage>
                    {form.formState.errors.coverImage.message}
                  </FormMessage>
                )}
              </FormItem>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Beat"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
