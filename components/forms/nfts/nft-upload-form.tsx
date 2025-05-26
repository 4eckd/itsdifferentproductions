"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Gem, Upload, X, Loader2 } from "lucide-react";

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
import { nftSchema, NFTFormValues } from "@/lib/validators/nfts";
import { uploadFile, generateFilePath } from "@/lib/storage-helpers";

const BLOCKCHAIN_OPTIONS = [
  { value: "ethereum", label: "Ethereum" },
  { value: "polygon", label: "Polygon" },
  { value: "solana", label: "Solana" },
  { value: "binance", label: "Binance Smart Chain" },
];

export function NFTUploadForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      blockchain: "ethereum" as const,
      contractAddress: "",
      editionSize: 1,
      editionNumber: 1,
      perks: "",
      tags: "",
      isTokenized: false,
      tokenId: "",
      mediaFile: undefined,
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

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error("You must be logged in to create NFTs");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload media file to Supabase Storage
      const mediaFileName = generateFilePath(user.id, data.mediaFile.name);
      const mediaUrl = await uploadFile(data.mediaFile, "nft_assets", mediaFileName);

      if (!mediaUrl) {
        throw new Error("Error uploading media file");
      }

      // 2. Create product record
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: data.title,
          description: data.description,
          price: data.price,
          category: "nft",
          status: "published",
          metadata: {
            blockchain: data.blockchain,
            contractAddress: data.contractAddress,
            perks: data.perks,
            tags: data.tags,
            mediaUrl,
            isTokenized: data.isTokenized,
            tokenId: data.tokenId,
          },
        })
        .select()
        .single();

      if (productError) {
        throw new Error(`Error creating product: ${productError.message}`);
      }

      // 3. Create NFT record
      const { error: nftError } = await supabase
        .from("nfts")
        .insert({
          id: product.id,
          token_id: data.tokenId || null,
          blockchain: data.blockchain,
          contract_address: data.contractAddress || null,
          edition_size: data.editionSize,
          edition_number: data.editionNumber,
          media_url: mediaUrl,
          perks: data.perks || null,
        });

      if (nftError) {
        throw new Error(`Error creating NFT: ${nftError.message}`);
      }

      toast.success("NFT created successfully!");
      router.push("/store/nfts");
    } catch (error) {
      console.error("Error creating NFT:", error);
      toast.error(error instanceof Error ? error.message : "Error creating NFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create NFT</h1>
        <p className="text-muted-foreground">
          Upload your digital artwork and create a unique NFT collectible.
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
                    <Input placeholder="Enter NFT title" {...field} />
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
                      placeholder="Describe your NFT"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (ETH)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        placeholder="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blockchain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blockchain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BLOCKCHAIN_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Edition Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Edition Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="editionSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edition Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of copies that will exist
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="editionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edition Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      This copy's number in the edition
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Media Upload */}
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
                        (form.formState.errors as any).mediaFile
                          ? "border-destructive bg-destructive/10"
                          : "border-input bg-background hover:bg-accent/40"
                      }`}
                    >
                      {mediaPreview ? (
                        <div className="relative w-full h-full">
                          {mediaType?.startsWith("image/") ? (
                            <img
                              src={mediaPreview}
                              alt="Media preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          ) : mediaType?.startsWith("video/") ? (
                            <video
                              src={mediaPreview}
                              controls
                              className="w-full h-full object-contain rounded-lg"
                            />
                          ) : mediaType?.startsWith("audio/") ? (
                            <div className="flex flex-col items-center justify-center h-full">
                              <Gem className="h-16 w-16 mb-4 text-muted-foreground" />
                              <audio
                                src={mediaPreview}
                                controls
                                className="w-full max-w-[300px]"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Gem className="h-16 w-16 text-muted-foreground" />
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
                            Images, Videos, or Audio (max. 50MB)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPEG, PNG, GIF, MP4, WebM, MP3, WAV
                          </p>
                        </div>
                      )}
                      <input
                        id="media-upload"
                        type="file"
                        accept="image/*,video/*,audio/*"
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </label>
                  </div>
                </div>
              </FormControl>
              {(form.formState.errors as any).mediaFile && (
                <FormMessage>
                  {(form.formState.errors as any).mediaFile.message}
                </FormMessage>
              )}
            </FormItem>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Additional Information</h2>

            <FormField
              control={form.control}
              name="perks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perks & Utilities (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe any special perks or utilities this NFT provides..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Special benefits, access, or utilities that come with owning this NFT
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
                      placeholder="art, music, collectible, exclusive"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags to help categorize your NFT
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Address (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0x..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Smart contract address if already deployed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="isTokenized"
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
                        Already Tokenized
                      </FormLabel>
                      <FormDescription>
                        Check if this NFT is already minted on the blockchain
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {form.watch("isTokenized") && (
              <FormField
                control={form.control}
                name="tokenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter token ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
                  Creating NFT...
                </>
              ) : (
                <>
                  <Gem className="mr-2 h-4 w-4" />
                  Create NFT
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
