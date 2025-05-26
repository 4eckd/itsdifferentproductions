'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { toast } from 'sonner'
import { useAuth } from './auth-context'
import { addToCart as addToCartDB, getUserCart, removeFromCart as removeFromCartDB, updateCartItemQuantity } from '@/lib/database-helpers'

// Types for cart functionality
export interface CartItem {
  id: string
  product_id: string
  quantity: number
  added_at: string
  product: {
    id: string
    name: string
    description: string
    price: number
    category: 'beat' | 'merch' | 'nft'
    status: string
    metadata: any
  }
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
  error: string | null
}

export interface CartContextType extends CartState {
  addToCart: (productId: string, quantity?: number) => Promise<boolean>
  removeFromCart: (itemId: string) => Promise<boolean>
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>
  clearCart: () => Promise<boolean>
  refreshCart: () => Promise<void>
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
  })
  const [isOpen, setIsOpen] = useState(false)

  // Calculate totals from items
  const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    return { totalItems, totalPrice }
  }

  // Refresh cart from database
  const refreshCart = async () => {
    if (!user) {
      setCartState(prev => ({
        ...prev,
        items: [],
        totalItems: 0,
        totalPrice: 0,
        error: null,
      }))
      return
    }

    setCartState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const cartData = await getUserCart(user.id)

      if (cartData) {
        const { totalItems, totalPrice } = calculateTotals(cartData as any)
        setCartState(prev => ({
          ...prev,
          items: cartData as any,
          totalItems,
          totalPrice,
          isLoading: false,
          error: null,
        }))
      } else {
        setCartState(prev => ({
          ...prev,
          items: [],
          totalItems: 0,
          totalPrice: 0,
          isLoading: false,
          error: 'Failed to load cart',
        }))
      }
    } catch (error) {
      console.error('Error refreshing cart:', error)
      setCartState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load cart',
      }))
    }
  }

  // Add item to cart
  const addToCart = async (productId: string, quantity = 1): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return false
    }

    setCartState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const success = await addToCartDB(user.id, productId, quantity)

      if (success) {
        await refreshCart()
        toast.success('Item added to cart')
        return true
      } else {
        setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to add item to cart' }))
        toast.error('Failed to add item to cart')
        return false
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to add item to cart' }))
      toast.error('Failed to add item to cart')
      return false
    }
  }

  // Remove item from cart
  const removeFromCart = async (itemId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to manage cart')
      return false
    }

    setCartState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const success = await removeFromCartDB(itemId)

      if (success) {
        await refreshCart()
        toast.success('Item removed from cart')
        return true
      } else {
        setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to remove item' }))
        toast.error('Failed to remove item from cart')
        return false
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to remove item' }))
      toast.error('Failed to remove item from cart')
      return false
    }
  }

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to manage cart')
      return false
    }

    if (quantity <= 0) {
      return await removeFromCart(itemId)
    }

    setCartState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const success = await updateCartItemQuantity(itemId, quantity)

      if (success) {
        await refreshCart()
        return true
      } else {
        setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to update quantity' }))
        toast.error('Failed to update quantity')
        return false
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to update quantity' }))
      toast.error('Failed to update quantity')
      return false
    }
  }

  // Clear entire cart
  const clearCart = async (): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to manage cart')
      return false
    }

    setCartState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Remove all items one by one
      const removePromises = cartState.items.map(item => removeFromCartDB(item.id))
      const results = await Promise.all(removePromises)

      if (results.every(result => result)) {
        await refreshCart()
        toast.success('Cart cleared')
        return true
      } else {
        setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to clear cart' }))
        toast.error('Failed to clear cart')
        return false
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      setCartState(prev => ({ ...prev, isLoading: false, error: 'Failed to clear cart' }))
      toast.error('Failed to clear cart')
      return false
    }
  }

  // Load cart when user changes
  useEffect(() => {
    refreshCart()
  }, [user])

  const contextValue: CartContextType = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    isOpen,
    setIsOpen,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
