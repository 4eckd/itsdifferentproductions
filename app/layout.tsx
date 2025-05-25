import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { ColorThemeProvider } from '@/contexts/theme-context'
import { WalletProvider } from '@/contexts/wallet-context'
import { Toaster } from '@/components/ui/sonner'
import { DiscordInvite } from '@/components/discord-invite'

export const metadata: Metadata = {
  title: 'Its Different Productions',
  description: 'A #40gang Media Corporation.',
  generator: 'jlucus.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
            <AuthProvider>
              <WalletProvider>
                {children}
                <Toaster />
                <DiscordInvite />
              </WalletProvider>
            </AuthProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
