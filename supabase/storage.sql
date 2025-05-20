-- Create storage buckets for Its Different Productions

-- Product images bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product_images',
  'product_images',
  true,
  5242880, -- 5MB
  '{image/jpeg,image/png,image/webp}'
)
ON CONFLICT (id) DO NOTHING;

-- Audio files bucket (protected)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio_files',
  'audio_files',
  false,
  52428800, -- 50MB
  '{audio/mpeg,audio/wav}'
)
ON CONFLICT (id) DO NOTHING;

-- User uploads bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES (
  'user_uploads',
  'user_uploads',
  false,
  10485760 -- 10MB
)
ON CONFLICT (id) DO NOTHING;

-- NFT assets bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'nft_assets',
  'nft_assets',
  true,
  52428800, -- 50MB
  '{image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,audio/mpeg,audio/wav}'
)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for storage buckets

-- Product images policies
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product_images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product_images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Audio files policies
CREATE POLICY "Audio files are accessible to authenticated users"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'audio_files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can upload audio files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'audio_files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own audio files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'audio_files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'audio_files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- User uploads policies
CREATE POLICY "Users can view their own uploads"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'user_uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user_uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'user_uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'user_uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- NFT assets policies
CREATE POLICY "NFT assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'nft_assets');

CREATE POLICY "Authenticated users can upload NFT assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'nft_assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own NFT assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'nft_assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own NFT assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'nft_assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
