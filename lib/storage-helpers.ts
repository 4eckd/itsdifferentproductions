import { supabase } from '@/lib/supabase';

/**
 * Upload a file to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket to upload to
 * @param path The path within the bucket (e.g., userId/fileName)
 * @returns The public URL of the uploaded file or null if upload failed
 */
export async function uploadFile(
  file: File,
  bucket: 'product_images' | 'audio_files' | 'user_uploads' | 'nft_assets',
  path: string
): Promise<string | null> {
  try {
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    // Get the public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return null;
  }
}

/**
 * Delete a file from Supabase Storage
 * @param bucket The storage bucket containing the file
 * @param path The path of the file to delete
 * @returns True if deletion was successful, false otherwise
 */
export async function deleteFile(
  bucket: 'product_images' | 'audio_files' | 'user_uploads' | 'nft_assets',
  path: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteFile:', error);
    return false;
  }
}

/**
 * Get a list of files in a folder
 * @param bucket The storage bucket to list files from
 * @param folder The folder path to list files from
 * @returns Array of file objects or null if listing failed
 */
export async function listFiles(
  bucket: 'product_images' | 'audio_files' | 'user_uploads' | 'nft_assets',
  folder: string
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);
    
    if (error) {
      console.error('Error listing files:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in listFiles:', error);
    return null;
  }
}

/**
 * Generate a unique file path for uploading
 * @param userId The user ID
 * @param fileName The original file name
 * @returns A unique file path
 */
export function generateFilePath(userId: string, fileName: string): string {
  const timestamp = Date.now();
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  return `${userId}/${timestamp}-${cleanFileName}`;
}
