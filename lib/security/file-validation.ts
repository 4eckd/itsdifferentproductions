/**
 * Enhanced file validation and security utilities
 * Provides comprehensive validation for file uploads including:
 * - File type validation (MIME type and magic bytes)
 * - File size validation
 * - Image dimension validation
 * - Content security scanning
 * - Filename sanitization
 */

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  AUDIO: 50 * 1024 * 1024, // 50MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

// Image dimension limits
export const IMAGE_DIMENSION_LIMITS = {
  MIN_WIDTH: 100,
  MIN_HEIGHT: 100,
  MAX_WIDTH: 4096,
  MAX_HEIGHT: 4096,
  MAX_ASPECT_RATIO: 10, // width/height or height/width
} as const;

// Allowed MIME types
export const ALLOWED_MIME_TYPES = {
  IMAGES: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
  AUDIO: [
    'audio/mpeg', // MP3
    'audio/wav',
    'audio/x-wav',
    'audio/flac',
    'audio/aac',
  ],
  VIDEO: [
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ],
  DOCUMENTS: [
    'application/pdf',
    'text/plain',
  ],
} as const;

// Magic bytes for file type verification
const MAGIC_BYTES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
  'audio/mpeg': [0xFF, 0xFB], // MP3
  'audio/wav': [0x52, 0x49, 0x46, 0x46], // WAV
  'video/mp4': [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // MP4
  'application/pdf': [0x25, 0x50, 0x44, 0x46],
} as const;

// Dangerous file extensions to block
const BLOCKED_EXTENSIONS = [
  'exe', 'bat', 'cmd', 'com', 'pif', 'scr', 'vbs', 'js', 'jar',
  'php', 'asp', 'aspx', 'jsp', 'py', 'rb', 'pl', 'sh', 'ps1',
] as const;

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata?: {
    dimensions?: { width: number; height: number };
    duration?: number;
    actualMimeType?: string;
  };
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  const sanitized = filename
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\.\./g, '_')
    .replace(/^\.+/, '')
    .trim();

  // Ensure filename is not empty and has reasonable length
  if (!sanitized || sanitized.length === 0) {
    return `file_${Date.now()}`;
  }

  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop();
    const name = sanitized.substring(0, 200);
    return ext ? `${name}.${ext}` : name;
  }

  return sanitized;
}

/**
 * Check if file extension is blocked
 */
export function isBlockedExtension(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? BLOCKED_EXTENSIONS.includes(extension as any) : false;
}

/**
 * Verify file type using magic bytes
 */
export async function verifyFileType(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);

      for (const [mimeType, magicBytes] of Object.entries(MAGIC_BYTES)) {
        if (magicBytes.every((byte, index) => uint8Array[index] === byte)) {
          resolve(mimeType);
          return;
        }
      }
      resolve(null);
    };
    reader.readAsArrayBuffer(file.slice(0, 32)); // Read first 32 bytes
  });
}

/**
 * Get image dimensions
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Validate image file
 */
export async function validateImageFile(file: File): Promise<FileValidationResult> {
  const result: FileValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    metadata: {},
  };

  // Check file size
  if (file.size > FILE_SIZE_LIMITS.IMAGE) {
    result.errors.push(`Image size must be less than ${FILE_SIZE_LIMITS.IMAGE / 1024 / 1024}MB`);
    result.isValid = false;
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.IMAGES.includes(file.type as any)) {
    result.errors.push('Invalid image format. Only JPEG, PNG, WebP, and GIF are allowed');
    result.isValid = false;
  }

  // Check blocked extensions
  if (isBlockedExtension(file.name)) {
    result.errors.push('File extension is not allowed');
    result.isValid = false;
  }

  // Verify actual file type
  try {
    const actualMimeType = await verifyFileType(file);
    if (actualMimeType && actualMimeType !== file.type) {
      result.warnings.push('File type mismatch detected');
      result.metadata!.actualMimeType = actualMimeType;
    }
  } catch (error) {
    result.warnings.push('Could not verify file type');
  }

  // Check image dimensions
  if (ALLOWED_MIME_TYPES.IMAGES.includes(file.type as any)) {
    try {
      const dimensions = await getImageDimensions(file);
      result.metadata!.dimensions = dimensions;

      if (dimensions.width < IMAGE_DIMENSION_LIMITS.MIN_WIDTH || 
          dimensions.height < IMAGE_DIMENSION_LIMITS.MIN_HEIGHT) {
        result.errors.push(
          `Image must be at least ${IMAGE_DIMENSION_LIMITS.MIN_WIDTH}x${IMAGE_DIMENSION_LIMITS.MIN_HEIGHT} pixels`
        );
        result.isValid = false;
      }

      if (dimensions.width > IMAGE_DIMENSION_LIMITS.MAX_WIDTH || 
          dimensions.height > IMAGE_DIMENSION_LIMITS.MAX_HEIGHT) {
        result.errors.push(
          `Image must not exceed ${IMAGE_DIMENSION_LIMITS.MAX_WIDTH}x${IMAGE_DIMENSION_LIMITS.MAX_HEIGHT} pixels`
        );
        result.isValid = false;
      }

      // Check aspect ratio
      const aspectRatio = Math.max(dimensions.width / dimensions.height, dimensions.height / dimensions.width);
      if (aspectRatio > IMAGE_DIMENSION_LIMITS.MAX_ASPECT_RATIO) {
        result.warnings.push('Image has an unusual aspect ratio');
      }
    } catch (error) {
      result.errors.push('Could not read image dimensions');
      result.isValid = false;
    }
  }

  return result;
}

/**
 * Validate audio file
 */
export async function validateAudioFile(file: File): Promise<FileValidationResult> {
  const result: FileValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    metadata: {},
  };

  // Check file size
  if (file.size > FILE_SIZE_LIMITS.AUDIO) {
    result.errors.push(`Audio size must be less than ${FILE_SIZE_LIMITS.AUDIO / 1024 / 1024}MB`);
    result.isValid = false;
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.AUDIO.includes(file.type as any)) {
    result.errors.push('Invalid audio format. Only MP3, WAV, FLAC, and AAC are allowed');
    result.isValid = false;
  }

  // Check blocked extensions
  if (isBlockedExtension(file.name)) {
    result.errors.push('File extension is not allowed');
    result.isValid = false;
  }

  // Verify actual file type
  try {
    const actualMimeType = await verifyFileType(file);
    if (actualMimeType && actualMimeType !== file.type) {
      result.warnings.push('File type mismatch detected');
      result.metadata!.actualMimeType = actualMimeType;
    }
  } catch (error) {
    result.warnings.push('Could not verify file type');
  }

  return result;
}

/**
 * Validate video file
 */
export async function validateVideoFile(file: File): Promise<FileValidationResult> {
  const result: FileValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    metadata: {},
  };

  // Check file size
  if (file.size > FILE_SIZE_LIMITS.VIDEO) {
    result.errors.push(`Video size must be less than ${FILE_SIZE_LIMITS.VIDEO / 1024 / 1024}MB`);
    result.isValid = false;
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.VIDEO.includes(file.type as any)) {
    result.errors.push('Invalid video format. Only MP4, WebM, and QuickTime are allowed');
    result.isValid = false;
  }

  // Check blocked extensions
  if (isBlockedExtension(file.name)) {
    result.errors.push('File extension is not allowed');
    result.isValid = false;
  }

  return result;
}

/**
 * General file validation function
 */
export async function validateFile(file: File, type: 'image' | 'audio' | 'video'): Promise<FileValidationResult> {
  switch (type) {
    case 'image':
      return validateImageFile(file);
    case 'audio':
      return validateAudioFile(file);
    case 'video':
      return validateVideoFile(file);
    default:
      return {
        isValid: false,
        errors: ['Unknown file type'],
        warnings: [],
      };
  }
}
