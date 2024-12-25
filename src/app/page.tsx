import { HomeView } from '@/views/Home'
import { Header } from '@/widgets/Header'
import { SignedIn } from '@clerk/nextjs'

export default function Home() {
  return (
    <SignedIn>
      <div className='flex w-full flex-col'>
        <Header />
        <HomeView />
      </div>
    </SignedIn>
  )
}
