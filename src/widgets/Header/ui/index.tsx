import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { UserName } from './user-name'

export const Header = () => {
  return (
    <header className='bg-primary'>
      <div className='container flex flex-row justify-between px-2 py-2 xl:px-8'>
        <Link href='/'>
          <Image src='/logo.png' alt='Lexify logo' width={100} height={64} />
        </Link>

        <div className='inline-flex items-center gap-2'>
          <UserName />
          <UserButton
            appearance={{
              variables: {
                colorTextSecondary: 'gray',
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
