import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { auth } from '@clerk/nextjs/server'

export const POST = async (req: NextRequest) => {
  try {
    const userId = (await req.formData()).get('userId')

    if (!userId)
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
      })

    await prisma.user.update({
      where: {
        userId: `${userId}`,
      },
      data: {
        paid: true,
      },
    })

    return NextResponse.json(true)
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 })
  }
}
