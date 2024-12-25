import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up to Lexify - Voice to Text SaaS',
  description: 'A simple, cost-effective, and scalable voice-to-text platform.',
}

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
