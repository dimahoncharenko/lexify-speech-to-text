import { SignedOut } from '@clerk/nextjs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <SignedOut>{children}</SignedOut>
    </div>
  )
}
