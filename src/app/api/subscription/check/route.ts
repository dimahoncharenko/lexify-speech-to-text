import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData()
    const userId = body.get('userId')

    if (!userId)
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
      })

    const candidate = await prisma.user.count({
      where: {
        userId: `${userId}`,
        paid: true,
      },
    })

    return NextResponse.json(!!candidate)
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 })
  }
}
