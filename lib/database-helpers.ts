import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Types for database operations
export type ProductCategory = 'beat' | 'merch' | 'nft';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type LicenseType = 'basic' | 'premium' | 'exclusive';

/**
 * Get a user's profile
 * @param userId The user ID
 * @returns The user's profile or null if not found
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

/**
 * Update a user's profile
 * @param userId The user ID
 * @param profile The profile data to update
 * @returns True if update was successful, false otherwise
 */
export async function updateUserProfile(userId: string, profile: any) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return false;
  }
}

/**
 * Create a new product
 * @param product The product data
 * @param user The current user
 * @returns The created product ID or null if creation failed
 */
export async function createProduct(product: any, user: User) {
  try {
    // Check if user is an admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || userData?.role !== 'admin') {
      console.error('User is not authorized to create products');
      return null;
    }

    // Create the product
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error in createProduct:', error);
    return null;
  }
}

/**
 * Get products by category
 * @param category The product category
 * @param limit The maximum number of products to return
 * @param offset The offset for pagination
 * @returns Array of products or null if fetching failed
 */
export async function getProductsByCategory(
  category: 'beat' | 'merch' | 'nft',
  limit = 10,
  offset = 0
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching products:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    return null;
  }
}

/**
 * Get a product by ID
 * @param productId The product ID
 * @returns The product or null if not found
 */
export async function getProductById(productId: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

/**
 * Add an item to the user's cart
 * @param userId The user ID
 * @param productId The product ID
 * @param quantity The quantity to add
 * @returns True if addition was successful, false otherwise
 */
export async function addToCart(userId: string, productId: string, quantity = 1) {
  try {
    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking cart:', checkError);
      return false;
    }

    if (existingItem) {
      // Update quantity if item exists
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);

      if (updateError) {
        console.error('Error updating cart item:', updateError);
        return false;
      }
    } else {
      // Insert new item if it doesn't exist
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
        });

      if (insertError) {
        console.error('Error adding to cart:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in addToCart:', error);
    return false;
  }
}

/**
 * Add a product to the user's wishlist
 * @param userId The user ID
 * @param productId The product ID
 * @returns True if addition was successful, false otherwise
 */
export async function addToWishlist(userId: string, productId: string) {
  try {
    // Check if item already exists in wishlist
    const { data: existingItem, error: checkError } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking wishlist:', checkError);
      return false;
    }

    if (existingItem) {
      // Item already exists in wishlist
      return true;
    } else {
      // Insert new item if it doesn't exist
      const { error: insertError } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: userId,
          product_id: productId,
        });

      if (insertError) {
        console.error('Error adding to wishlist:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    return false;
  }
}

/**
 * Remove a product from the user's wishlist
 * @param userId The user ID
 * @param productId The product ID
 * @returns True if removal was successful, false otherwise
 */
export async function removeFromWishlist(userId: string, productId: string) {
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    return false;
  }
}

/**
 * Get a user's cart
 * @param userId The user ID
 * @returns Array of cart items with product details or null if fetching failed
 */
export async function getUserCart(userId: string) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        added_at,
        product:products (
          id,
          name,
          description,
          price,
          category,
          status,
          metadata
        )
      `)
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Error fetching cart:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserCart:', error);
    return null;
  }
}

/**
 * Remove an item from the user's cart
 * @param itemId The cart item ID
 * @returns True if removal was successful, false otherwise
 */
export async function removeFromCart(itemId: string) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    return false;
  }
}

/**
 * Update the quantity of a cart item
 * @param itemId The cart item ID
 * @param quantity The new quantity
 * @returns True if update was successful, false otherwise
 */
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      console.error('Error updating cart item quantity:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCartItemQuantity:', error);
    return false;
  }
}

/**
 * Get a user's wishlist
 * @param userId The user ID
 * @returns Array of wishlist items with product details or null if fetching failed
 */
export async function getUserWishlist(userId: string) {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        id,
        added_at,
        products (
          id,
          name,
          description,
          price,
          category,
          status,
          metadata
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching wishlist:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserWishlist:', error);
    return null;
  }
}

/**
 * Add a review for a product
 * @param userId The user ID
 * @param productId The product ID
 * @param rating The rating (1-5)
 * @param reviewText The review text
 * @returns True if addition was successful, false otherwise
 */
export async function addProductReview(
  userId: string,
  productId: string,
  rating: number,
  reviewText: string
) {
  try {
    // Check if user has already reviewed this product
    const { data: existingReview, error: checkError } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking reviews:', checkError);
      return false;
    }

    if (existingReview) {
      // Update existing review
      const { error: updateError } = await supabase
        .from('product_reviews')
        .update({
          rating,
          review_text: reviewText,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingReview.id);

      if (updateError) {
        console.error('Error updating review:', updateError);
        return false;
      }
    } else {
      // Insert new review
      const { error: insertError } = await supabase
        .from('product_reviews')
        .insert({
          user_id: userId,
          product_id: productId,
          rating,
          review_text: reviewText,
        });

      if (insertError) {
        console.error('Error adding review:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in addProductReview:', error);
    return false;
  }
}

/**
 * Get reviews for a product
 * @param productId The product ID
 * @returns Array of reviews or null if fetching failed
 */
export async function getProductReviews(productId: string) {
  try {
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        id,
        rating,
        review_text,
        created_at,
        updated_at,
        helpful_count,
        users (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProductReviews:', error);
    return null;
  }
}

/**
 * Apply a discount code to calculate the discounted price
 * @param code The discount code
 * @param originalAmount The original amount
 * @returns The discounted amount or null if code is invalid
 */
export async function applyDiscountCode(code: string, originalAmount: number) {
  try {
    const { data: discountCode, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching discount code:', error);
      return null;
    }

    // Check if code is valid
    const now = new Date();
    if (
      (discountCode.start_date && new Date(discountCode.start_date) > now) ||
      (discountCode.end_date && new Date(discountCode.end_date) < now) ||
      (discountCode.usage_limit && discountCode.usage_count >= discountCode.usage_limit) ||
      (discountCode.min_purchase_amount && originalAmount < discountCode.min_purchase_amount)
    ) {
      return null;
    }

    // Calculate discount
    let discountAmount = 0;
    if (discountCode.discount_type === 'percentage') {
      discountAmount = originalAmount * (discountCode.discount_value / 100);
    } else {
      discountAmount = discountCode.discount_value;
    }

    // Apply max discount if specified
    if (discountCode.max_discount_amount && discountAmount > discountCode.max_discount_amount) {
      discountAmount = discountCode.max_discount_amount;
    }

    // Ensure discount doesn't exceed original amount
    if (discountAmount > originalAmount) {
      discountAmount = originalAmount;
    }

    return originalAmount - discountAmount;
  } catch (error) {
    console.error('Error in applyDiscountCode:', error);
    return null;
  }
}
