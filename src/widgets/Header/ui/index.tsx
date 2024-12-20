import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <header className='bg-[#afd2da]'>
      <div className='container flex flex-row justify-between py-2'>
        <Image src='/logo.png' alt='Lexify logo' width={100} height={64} />
        <UserButton showName />
      </div>
    </header>
  )
}
