import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Its Different Productions',
  description: 'A Media Corporation',
  generator: 'jlucus.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
