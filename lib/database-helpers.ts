import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

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
