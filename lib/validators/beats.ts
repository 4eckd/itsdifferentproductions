import { z } from "zod";

// Maximum file sizes
const MAX_AUDIO_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Accepted file types
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav"];
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

export const beatSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  genre: z.string().min(1, "Genre is required"),
  bpm: z.coerce.number().int().min(40, "BPM must be at least 40").max(300, "BPM must be at most 300"),
  key: z.string().min(1, "Key is required"),
  licenseType: z.enum(["basic", "premium", "exclusive"], {
    errorMap: () => ({ message: "Please select a license type" }),
  }),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(Boolean)),
  audioFile: z
    .instanceof(File, { message: "Audio file is required" })
    .refine(
      file => validateFile(
        file,
        MAX_AUDIO_FILE_SIZE,
        ACCEPTED_AUDIO_TYPES,
        {
          size: `File must be less than ${MAX_AUDIO_FILE_SIZE / 1024 / 1024}MB`,
          type: "File must be MP3 or WAV format"
        }
      ),
      {
        message: "Invalid audio file",
      }
    ),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      file => validateFile(
        file,
        MAX_IMAGE_FILE_SIZE,
        ACCEPTED_IMAGE_TYPES,
        {
          size: `Image must be less than ${MAX_IMAGE_FILE_SIZE / 1024 / 1024}MB`,
          type: "Image must be JPEG, PNG, or WebP format"
        }
      ),
      {
        message: "Invalid image file",
      }
    ),
});

export type BeatFormValues = z.infer<typeof beatSchema>;
