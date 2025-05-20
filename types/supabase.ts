export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          role: 'customer' | 'admin'
          phone_text: string | null
          notification_preferences: Json | null
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          role?: 'customer' | 'admin'
          phone_text?: string | null
          notification_preferences?: Json | null
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          role?: 'customer' | 'admin'
          phone_text?: string | null
          notification_preferences?: Json | null
          last_login?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          bio: string | null
          website: string | null
          social_links: Json | null
          shipping_address: Json | null
          billing_address: Json | null
          display_name: string | null
          preferred_payment_method: string | null
          crypto_wallet_addresses: Json | null
        }
        Insert: {
          id: string
          username?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          shipping_address?: Json | null
          billing_address?: Json | null
          display_name?: string | null
          preferred_payment_method?: string | null
          crypto_wallet_addresses?: Json | null
        }
        Update: {
          id?: string
          username?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          shipping_address?: Json | null
          billing_address?: Json | null
          display_name?: string | null
          preferred_payment_method?: string | null
          crypto_wallet_addresses?: Json | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: 'beat' | 'merch' | 'nft'
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: 'beat' | 'merch' | 'nft'
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: 'beat' | 'merch' | 'nft'
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
      }
      beats: {
        Row: {
          id: string
          genre: string
          bpm: number
          key: string
          duration: number
          audio_url: string
          waveform_url: string | null
          license_type: 'basic' | 'premium' | 'exclusive'
          tags: string[]
        }
        Insert: {
          id: string
          genre: string
          bpm: number
          key: string
          duration: number
          audio_url: string
          waveform_url?: string | null
          license_type: 'basic' | 'premium' | 'exclusive'
          tags?: string[]
        }
        Update: {
          id?: string
          genre?: string
          bpm?: number
          key?: string
          duration?: number
          audio_url?: string
          waveform_url?: string | null
          license_type?: 'basic' | 'premium' | 'exclusive'
          tags?: string[]
        }
      }
      merchandise: {
        Row: {
          id: string
          type: string
          sizes: string[]
          colors: string[]
          inventory_count: number
          weight: number | null
          dimensions: Json | null
        }
        Insert: {
          id: string
          type: string
          sizes: string[]
          colors: string[]
          inventory_count: number
          weight?: number | null
          dimensions?: Json | null
        }
        Update: {
          id?: string
          type?: string
          sizes?: string[]
          colors?: string[]
          inventory_count?: number
          weight?: number | null
          dimensions?: Json | null
        }
      }
      nfts: {
        Row: {
          id: string
          token_id: string | null
          blockchain: string | null
          contract_address: string | null
          edition_size: number
          edition_number: number
          media_url: string
          perks: string | null
        }
        Insert: {
          id: string
          token_id?: string | null
          blockchain?: string | null
          contract_address?: string | null
          edition_size: number
          edition_number: number
          media_url: string
          perks?: string | null
        }
        Update: {
          id?: string
          token_id?: string | null
          blockchain?: string | null
          contract_address?: string | null
          edition_size?: number
          edition_number?: number
          media_url?: string
          perks?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          payment_intent_id: string | null
          shipping_address: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          payment_intent_id?: string | null
          shipping_address: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount?: number
          payment_intent_id?: string | null
          shipping_address?: Json
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          metadata: Json | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          metadata?: Json | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          metadata?: Json | null
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          added_at?: string
        }
      }
      product_reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          review_text: string | null
          created_at: string
          updated_at: string
          helpful_count: number
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
          helpful_count?: number
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          rating?: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
          helpful_count?: number
        }
      }
      product_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          parent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
        }
      }
      product_category_mappings: {
        Row: {
          product_id: string
          category_id: string
        }
        Insert: {
          product_id: string
          category_id: string
        }
        Update: {
          product_id?: string
          category_id?: string
        }
      }
      discount_codes: {
        Row: {
          id: string
          code: string
          description: string | null
          discount_type: 'percentage' | 'fixed_amount'
          discount_value: number
          min_purchase_amount: number
          max_discount_amount: number | null
          start_date: string
          end_date: string | null
          usage_limit: number | null
          usage_count: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          description?: string | null
          discount_type: 'percentage' | 'fixed_amount'
          discount_value: number
          min_purchase_amount?: number
          max_discount_amount?: number | null
          start_date?: string
          end_date?: string | null
          usage_limit?: number | null
          usage_count?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          description?: string | null
          discount_type?: 'percentage' | 'fixed_amount'
          discount_value?: number
          min_purchase_amount?: number
          max_discount_amount?: number | null
          start_date?: string
          end_date?: string | null
          usage_limit?: number | null
          usage_count?: number
          is_active?: boolean
          created_at?: string
        }
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          added_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
