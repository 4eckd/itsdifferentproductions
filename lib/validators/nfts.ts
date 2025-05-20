import { z } from "zod";

// Maximum file sizes
const MAX_MEDIA_FILE_SIZE = 50 * 1024 * 1024; // 50MB for media files (images, videos, audio)

// Accepted file types
const ACCEPTED_MEDIA_TYPES = [
  // Images
  "image/jpeg", 
  "image/png", 
  "image/webp", 
  "image/gif",
  // Videos
  "video/mp4", 
  "video/webm",
  // Audio
  "audio/mpeg", 
  "audio/wav"
];

// Helper function to validate file size and type
const validateFile = (
  file: File | null | undefined,
  maxSize: number,
  acceptedTypes: string[],
  errorMessages: { size: string; type: string }
) => {
  if (!file) return true;
  
  if (file.size > maxSize) {
    return { message: errorMessages.size };
  }
  
  if (!acceptedTypes.includes(file.type)) {
    return { message: errorMessages.type };
  }
  
  return true;
};

// Available blockchain options
const BLOCKCHAIN_OPTIONS = [
  "ethereum",
  "polygon",
  "solana",
  "binance-smart-chain",
  "avalanche",
  "other"
] as const;

export const nftSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  blockchain: z.enum(BLOCKCHAIN_OPTIONS, {
    errorMap: () => ({ message: "Please select a valid blockchain" }),
  }).optional(),
  contractAddress: z.string().optional(),
  editionSize: z.coerce.number().int().min(1, "Edition size must be at least 1"),
  editionNumber: z.coerce.number().int().min(1, "Edition number must be at least 1"),
  mediaFile: z
    .instanceof(File, { message: "Media file is required" })
    .refine(
      file => validateFile(
        file,
        MAX_MEDIA_FILE_SIZE,
        ACCEPTED_MEDIA_TYPES,
        {
          size: `File must be less than ${MAX_MEDIA_FILE_SIZE / 1024 / 1024}MB`,
          type: "File must be in a supported format (JPEG, PNG, GIF, MP4, WebM, MP3, WAV)"
        }
      ),
      {
        message: "Invalid media file",
      }
    ),
  perks: z.string().optional(),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(Boolean)),
  isTokenized: z.boolean().default(false),
  tokenId: z.string().optional(),
});

export type NFTFormValues = z.infer<typeof nftSchema>;
