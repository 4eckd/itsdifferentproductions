# Supabase Setup for Its Different Productions

This directory contains SQL scripts and instructions for setting up the Supabase project for Its Different Productions.

## Setup Steps

1. Create a new Supabase project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Run the SQL scripts in the Supabase SQL Editor in the following order:
   - `schema.sql` - Creates the core database tables and RLS policies
   - `storage.sql` - Creates the storage buckets and RLS policies
   - `schema-updates.sql` - Adds additional fields and tables to enhance the schema
3. Configure authentication settings in the Supabase dashboard
4. Get your Supabase URL and anon key from the API settings
5. Update your `.env.local` file with the Supabase credentials

## Database Schema

### Core Tables

- `users` - User information (extends Supabase auth.users)
- `profiles` - User profiles with additional information
- `products` - Product information for beats, merchandise, and NFTs
- `beats` - Beat-specific information
- `merchandise` - Merchandise-specific information
- `nfts` - NFT-specific information
- `orders` - Order information
- `order_items` - Items in an order
- `cart_items` - Items in a user's cart

### Additional Tables

- `product_reviews` - User reviews for products
- `product_categories` - Categories for organizing products
- `product_category_mappings` - Junction table for product-category relationships
- `discount_codes` - Promotional discount codes
- `wishlist_items` - Items in a user's wishlist

### Schema Enhancements

The schema has been enhanced with additional fields to support:

- User preferences and contact information
- Product metadata and SEO information
- Beat-specific technical details
- Merchandise material and shipping information
- NFT royalties and blockchain metadata
- Order tracking and shipping details
- Discount code management
- User wishlists and product reviews

## Storage Buckets

The storage setup includes the following buckets:

- `product_images` - Public bucket for product display images
- `audio_files` - Protected bucket for beat audio files
- `user_uploads` - Private bucket for user-specific files
- `nft_assets` - Public bucket for NFT media files

## Authentication Settings

Configure the following authentication settings in the Supabase dashboard:

1. **Email Auth**:
   - Enable "Email" provider
   - Configure email templates for confirmation and password reset

2. **External OAuth Providers** (for future implementation):
   - Configure providers like Google, GitHub, etc.

3. **JWT Settings**:
   - Keep the default settings

## Row Level Security (RLS)

The SQL scripts set up Row Level Security (RLS) policies to ensure that:

- Users can only access their own data
- Products are publicly viewable when published
- Only admins can create and update products
- Users can only view and manage their own orders and cart items

## Environment Variables

After setting up Supabase, update your `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in the Supabase dashboard under Project Settings > API.
