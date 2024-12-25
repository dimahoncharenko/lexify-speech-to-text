import { Metadata } from 'next'
import { SidebarTrigger } from '@/shared/ui/common/sidebar'
import { HomeView } from '@/views/Home'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar'
import { SignedIn } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Welcome to Lexify - Voice to Text SaaS',
  description: 'A simple, cost-effective, and scalable voice-to-text platform.',
}

export default function Home() {
  return (
    <SignedIn>
      <Sidebar />
      <SidebarTrigger className='absolute top-0 text-white' size='lg' />
      <div className='flex w-full flex-col'>
        <Header />
        <HomeView />
      </div>
    </SignedIn>
  )
}
