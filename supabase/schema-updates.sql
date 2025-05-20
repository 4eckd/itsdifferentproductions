-- Schema updates for Its Different Productions

-- Add additional fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS phone_text TEXT,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email": true, "push": false}'::jsonb,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Add additional fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS preferred_payment_method TEXT,
ADD COLUMN IF NOT EXISTS crypto_wallet_addresses JSONB;

-- Add additional fields to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- Add additional fields to beats table
ALTER TABLE public.beats
ADD COLUMN IF NOT EXISTS sample_used BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sample_cleared BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stems_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS mood TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS instruments TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS waveform_data JSONB;

-- Add additional fields to merchandise table
ALTER TABLE public.merchandise
ADD COLUMN IF NOT EXISTS material TEXT,
ADD COLUMN IF NOT EXISTS care_instructions TEXT,
ADD COLUMN IF NOT EXISTS shipping_dimensions JSONB,
ADD COLUMN IF NOT EXISTS production_time INTEGER, -- in days
ADD COLUMN IF NOT EXISTS is_preorder BOOLEAN DEFAULT false;

-- Add additional fields to nfts table
ALTER TABLE public.nfts
ADD COLUMN IF NOT EXISTS royalty_percentage INTEGER DEFAULT 0 CHECK (royalty_percentage >= 0 AND royalty_percentage <= 100),
ADD COLUMN IF NOT EXISTS utility_description TEXT,
ADD COLUMN IF NOT EXISTS collection_name TEXT,
ADD COLUMN IF NOT EXISTS metadata_uri TEXT,
ADD COLUMN IF NOT EXISTS blockchain_metadata JSONB;

-- Add additional fields to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS tracking_number TEXT,
ADD COLUMN IF NOT EXISTS shipping_method TEXT,
ADD COLUMN IF NOT EXISTS estimated_delivery_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS transaction_hash TEXT; -- For crypto payments

-- Create a new table for product reviews
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  helpful_count INTEGER DEFAULT 0,
  UNIQUE(product_id, user_id)
);

-- Create a new table for product categories and tags
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a junction table for product-category relationships
CREATE TABLE IF NOT EXISTS public.product_category_mappings (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.product_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Create a table for discount codes
CREATE TABLE IF NOT EXISTS public.discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
  min_purchase_amount DECIMAL(10, 2) DEFAULT 0,
  max_discount_amount DECIMAL(10, 2),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for user wishlists
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security on new tables
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for product reviews
CREATE POLICY "Product reviews are viewable by everyone" ON public.product_reviews
  FOR SELECT USING (true);
  
CREATE POLICY "Users can create their own reviews" ON public.product_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own reviews" ON public.product_reviews
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete their own reviews" ON public.product_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for wishlist items
CREATE POLICY "Users can view their own wishlist items" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can add to their own wishlist" ON public.wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can delete from their own wishlist" ON public.wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON public.wishlist_items(user_id);
