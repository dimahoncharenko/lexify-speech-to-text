'use client'

import { useUser } from '@clerk/nextjs'

export const UserName = () => {
  const { user } = useUser()

  return <span className='text-xs text-white'>{user?.fullName}</span>
}
