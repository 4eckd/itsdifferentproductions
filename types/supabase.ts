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
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          role?: 'customer' | 'admin'
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          role?: 'customer' | 'admin'
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
        }
        Insert: {
          id: string
          username?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          shipping_address?: Json | null
          billing_address?: Json | null
        }
        Update: {
          id?: string
          username?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          shipping_address?: Json | null
          billing_address?: Json | null
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
