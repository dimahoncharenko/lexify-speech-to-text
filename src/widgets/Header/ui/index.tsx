import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <header className='bg-[#afd2da]'>
      <div className='container flex flex-row justify-between py-2'>
        <Link href='/'>
          <Image src='/logo.png' alt='Lexify logo' width={100} height={64} />
        </Link>
        <UserButton showName />
      </div>
    </header>
  )
}
