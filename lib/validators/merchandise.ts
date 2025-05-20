import { z } from "zod";

// Maximum file sizes
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Accepted file types
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

// Available merchandise types
const MERCH_TYPES = [
  "t-shirt",
  "hoodie",
  "hat",
  "sweatshirt",
  "jacket",
  "pants",
  "shorts",
  "accessory",
  "other"
] as const;

// Available sizes
const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "one-size"
] as const;

export const merchandiseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  type: z.enum(MERCH_TYPES, {
    errorMap: () => ({ message: "Please select a valid merchandise type" }),
  }),
  sizes: z.array(z.enum(SIZES)).min(1, "At least one size must be selected"),
  colors: z.array(z.string()).min(1, "At least one color must be selected"),
  inventoryCount: z.coerce.number().int().min(0, "Inventory count must be a non-negative number"),
  weight: z.coerce.number().min(0, "Weight must be a non-negative number").optional(),
  dimensions: z.object({
    length: z.coerce.number().min(0, "Length must be a non-negative number"),
    width: z.coerce.number().min(0, "Width must be a non-negative number"),
    height: z.coerce.number().min(0, "Height must be a non-negative number"),
  }).optional(),
  images: z.array(z.instanceof(File))
    .min(1, "At least one product image is required")
    .max(5, "Maximum of 5 product images allowed")
    .refine(
      files => files.every(file => 
        validateFile(
          file,
          MAX_IMAGE_FILE_SIZE,
          ACCEPTED_IMAGE_TYPES,
          {
            size: `Image must be less than ${MAX_IMAGE_FILE_SIZE / 1024 / 1024}MB`,
            type: "Image must be JPEG, PNG, or WebP format"
          }
        ) === true
      ),
      {
        message: "One or more images are invalid",
      }
    ),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(Boolean)),
});

export type MerchandiseFormValues = z.infer<typeof merchandiseSchema>;
