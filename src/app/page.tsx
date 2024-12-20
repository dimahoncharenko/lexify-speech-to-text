import { HomeView } from '@/views/Home'
import { SignedIn } from '@clerk/nextjs'

export default function Home() {
  return (
    <SignedIn>
      <HomeView />
    </SignedIn>
  )
}
