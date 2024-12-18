import { NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { currentUser } from '@clerk/nextjs/server'

export const GET = async () => {
  const user = await currentUser()

  console.log(user)

  try {
    const records = await prisma.record.findMany({})

    return NextResponse.json({
      records,
      status: 200,
    })
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
    })
  }
}
