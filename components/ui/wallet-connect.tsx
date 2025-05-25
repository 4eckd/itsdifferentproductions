'use client'

import React from 'react'
import { Wallet, LogOut, Copy, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useWallet } from '@/contexts/wallet-context'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface WalletConnectProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  showBalance?: boolean
  showChainId?: boolean
}

export function WalletConnect({
  variant = 'default',
  size = 'default',
  className,
  showBalance = true,
  showChainId = true,
}: WalletConnectProps) {
  const {
    isConnected,
    address,
    chainId,
    balance,
    isConnecting,
    error,
    connect,
    disconnect,
    switchChain,
  } = useWallet()

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Copy address to clipboard
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard')
    }
  }

  // Get chain name
  const getChainName = (id: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      5: 'Goerli',
      137: 'Polygon',
      80001: 'Mumbai',
      56: 'BSC',
      97: 'BSC Testnet',
    }
    return chains[id] || `Chain ${id}`
  }

  // Get chain color
  const getChainColor = (id: number) => {
    const colors: Record<number, string> = {
      1: 'bg-blue-500',
      5: 'bg-yellow-500',
      137: 'bg-purple-500',
      80001: 'bg-purple-300',
      56: 'bg-yellow-600',
      97: 'bg-yellow-400',
    }
    return colors[id] || 'bg-gray-500'
  }

  // Handle chain switch
  const handleSwitchToMainnet = () => {
    switchChain(1) // Ethereum mainnet
  }

  if (!isConnected) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Button
          onClick={connect}
          disabled={isConnecting}
          variant={variant}
          size={size}
          className="gap-2"
        >
          <Wallet className="h-4 w-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={cn('gap-2', className)}>
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {formatAddress(address!)}
          </span>
          {showBalance && balance && (
            <Badge variant="secondary" className="ml-2">
              {balance} ETH
            </Badge>
          )}
          {showChainId && chainId && (
            <div
              className={cn(
                'w-2 h-2 rounded-full ml-1',
                getChainColor(chainId)
              )}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Wallet Connected</span>
            <Badge variant="outline" className="text-xs">
              <div
                className={cn(
                  'w-2 h-2 rounded-full mr-1',
                  getChainColor(chainId!)
                )}
              />
              {getChainName(chainId!)}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Address:</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-mono">
                  {formatAddress(address!)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={copyAddress}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {balance && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Balance:</span>
                <span className="text-xs font-medium">{balance} ETH</span>
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={copyAddress}
          className="cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
          className="cursor-pointer"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Etherscan
        </DropdownMenuItem>
        
        {chainId !== 1 && (
          <DropdownMenuItem
            onClick={handleSwitchToMainnet}
            className="cursor-pointer"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Switch to Mainnet
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={disconnect}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Compact wallet status component
export function WalletStatus({ className }: { className?: string }) {
  const { isConnected, address, chainId, balance } = useWallet()

  if (!isConnected) {
    return null
  }

  return (
    <Card className={cn('w-fit', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Wallet Connected
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Address:</span>
          <span className="font-mono">{address && formatAddress(address)}</span>
        </div>
        {balance && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Balance:</span>
            <span className="font-medium">{balance} ETH</span>
          </div>
        )}
        {chainId && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Network:</span>
            <Badge variant="outline" className="text-xs">
              {getChainName(chainId)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function for chain names (duplicated for WalletStatus)
function getChainName(id: number) {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    5: 'Goerli',
    137: 'Polygon',
    80001: 'Mumbai',
    56: 'BSC',
    97: 'BSC Testnet',
  }
  return chains[id] || `Chain ${id}`
}

// Helper function for address formatting (duplicated for WalletStatus)
function formatAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}
