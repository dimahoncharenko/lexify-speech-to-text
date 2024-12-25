import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

import { UserName } from './user-name'

export const Header = () => {
  return (
    <header className='bg-primary'>
      <div className='container flex flex-row justify-between py-2'>
        <Link href='/' className='ml-8'>
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
