'use client'

import { WalletConnect, WalletStatus } from '@/components/ui/wallet-connect'
import { useWallet } from '@/contexts/wallet-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, ExternalLink, Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function WalletTestPage() {
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
    getBalance,
  } = useWallet()

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard')
    }
  }

  const refreshBalance = async () => {
    await getBalance()
    toast.success('Balance refreshed')
  }

  const getChainName = (id: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      137: 'Polygon',
      80001: 'Mumbai Testnet',
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
    }
    return chains[id] || `Chain ${id}`
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Wallet Connect <span className="text-gradient">Testing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test the wallet connection functionality and explore Web3 features.
          </p>
        </div>

        {/* Wallet Connect Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connect Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Connect Button
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the button below to connect your MetaMask wallet.
              </p>
              <WalletConnect />
            </CardContent>
          </Card>

          {/* Wallet Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isConnected ? (
                <WalletStatus />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No wallet connected. Connect your wallet to see status.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        {isConnected && (
          <Card>
            <CardHeader>
              <CardTitle>Wallet Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Wallet Address</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                    {address}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Network */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Network</label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Chain ID: {chainId}
                  </Badge>
                  <Badge variant="secondary">
                    {getChainName(chainId!)}
                  </Badge>
                </div>
              </div>

              {/* Balance */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Balance</label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {balance || '0.0000'} ETH
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshBalance}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => switchChain(1)}
                    disabled={chainId === 1}
                  >
                    Switch to Mainnet
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => switchChain(5)}
                    disabled={chainId === 5}
                  >
                    Switch to Goerli
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={disconnect}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Connection State */}
        <Card>
          <CardHeader>
            <CardTitle>Connection State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                <p className="text-sm font-medium">Connected</p>
                <p className="text-xs text-muted-foreground">{isConnected ? 'Yes' : 'No'}</p>
              </div>
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${isConnecting ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                <p className="text-sm font-medium">Connecting</p>
                <p className="text-xs text-muted-foreground">{isConnecting ? 'Yes' : 'No'}</p>
              </div>
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${address ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <p className="text-sm font-medium">Address</p>
                <p className="text-xs text-muted-foreground">{address ? 'Set' : 'None'}</p>
              </div>
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${error ? 'bg-red-500' : 'bg-gray-300'}`} />
                <p className="text-sm font-medium">Error</p>
                <p className="text-xs text-muted-foreground">{error ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">To test wallet connection:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Make sure you have MetaMask installed in your browser</li>
                <li>Click the "Connect Wallet" button above</li>
                <li>Approve the connection in MetaMask</li>
                <li>Your wallet details will appear automatically</li>
                <li>Try switching networks or refreshing your balance</li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Automatic wallet detection and connection</li>
                <li>Real-time balance updates</li>
                <li>Network switching capabilities</li>
                <li>Address copying and Etherscan integration</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
