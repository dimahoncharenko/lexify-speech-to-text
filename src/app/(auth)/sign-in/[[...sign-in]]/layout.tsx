import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login to Lexify - Voice to Text SaaS',
  description: 'A simple, cost-effective, and scalable voice-to-text platform.',
}

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <div>{children}</div>
}
