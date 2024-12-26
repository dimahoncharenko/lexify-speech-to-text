import Image from 'next/image'
import Link from 'next/link'
import { Spark } from '@/shared/ui/spark'
import { UserButton } from '@clerk/nextjs'

import { UserName } from './user-name'

export const Header = () => {
  return (
    <header className='fixed w-full bg-primary'>
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

      <div className='absolute left-20 hidden h-[318px] w-[181px] xl:block'>
        <Image src='/images/bigger-toys.png' alt='Left toy' fill />
        {[
          { id: 1, size: 50, className: 'top-10' },
          { id: 2, size: 30, className: 'left-10 top-32' },
          { id: 3, size: 57, className: '-left-2 top-28' },
          { id: 4, size: 70, className: 'left-10 top-28' },
        ].map(obj => (
          <Spark key={obj.id} size={obj.size} className={obj.className} />
        ))}
      </div>

      <div className='absolute right-20 hidden h-[262px] w-[120px] xl:block'>
        <Image
          style={{
            transform: 'rotateY(180deg)',
          }}
          src='/images/toys.png'
          alt='Right toy'
          fill
        />
        {[
          { id: 1, size: 40, className: 'top-16 right-6' },
          { id: 2, size: 20, className: 'left-10 top-32' },
          { id: 3, size: 47, className: '-left-4 top-28' },
          { id: 4, size: 60, className: 'left-1 top-32' },
        ].map(obj => (
          <Spark key={obj.id} size={obj.size} className={obj.className} />
        ))}
      </div>
    </header>
  )
}
