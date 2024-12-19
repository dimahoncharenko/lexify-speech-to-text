import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

import { StripeProvider } from '@/shared/lib/stripe-context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StripeProvider>{children}</StripeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
