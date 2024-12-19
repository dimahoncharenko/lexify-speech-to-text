import { NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { auth } from '@clerk/nextjs/server'

export const GET = async () => {
  const { userId } = await auth()

  try {
    const records = await prisma.record.findMany({
      where: { userId: `${userId}` },
      orderBy: { createdAt: 'desc' },
    })

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
