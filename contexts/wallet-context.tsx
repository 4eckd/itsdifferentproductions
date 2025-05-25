'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { toast } from 'sonner'

// Types for wallet connection
export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: number | null
  balance: string | null
  isConnecting: boolean
  error: string | null
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
  switchChain: (chainId: number) => Promise<void>
  getBalance: () => Promise<void>
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Wallet provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    isConnecting: false,
    error: null,
  })

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  }

  // Connect wallet function
  const connect = async () => {
    if (!isMetaMaskInstalled()) {
      setWalletState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to continue.',
      }))
      toast.error('MetaMask is not installed')
      return
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      })

      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        error: null,
      }))

      toast.success('Wallet connected successfully!')
      
      // Get balance after connection
      await getBalance()
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }))
      toast.error('Failed to connect wallet')
    }
  }

  // Disconnect wallet function
  const disconnect = () => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
      isConnecting: false,
      error: null,
    })
    toast.success('Wallet disconnected')
  }

  // Switch chain function
  const switchChain = async (targetChainId: number) => {
    if (!isMetaMaskInstalled() || !walletState.isConnected) {
      toast.error('Wallet not connected')
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })

      setWalletState(prev => ({
        ...prev,
        chainId: targetChainId,
      }))

      toast.success('Chain switched successfully!')
    } catch (error: any) {
      if (error.code === 4902) {
        toast.error('Chain not added to MetaMask')
      } else {
        toast.error('Failed to switch chain')
      }
    }
  }

  // Get wallet balance
  const getBalance = async () => {
    if (!isMetaMaskInstalled() || !walletState.address) {
      return
    }

    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [walletState.address, 'latest'],
      })

      // Convert from wei to ETH
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      setWalletState(prev => ({
        ...prev,
        balance: balanceInEth,
      }))
    } catch (error) {
      console.error('Failed to get balance:', error)
    }
  }

  // Listen for account and chain changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setWalletState(prev => ({
          ...prev,
          address: accounts[0],
        }))
        getBalance()
      }
    }

    const handleChainChanged = (chainId: string) => {
      setWalletState(prev => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }))
    }

    // Add event listeners
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })

        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({
            method: 'eth_chainId',
          })

          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0],
            chainId: parseInt(chainId, 16),
          }))

          await getBalance()
        }
      } catch (error) {
        console.error('Failed to check connection:', error)
      }
    }

    checkConnection()

    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const contextValue: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    switchChain,
    getBalance,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

// Hook to use wallet context
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Declare global ethereum object for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
