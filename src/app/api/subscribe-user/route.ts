import { NextRequest } from 'next/server'
import prisma from '@/shared/config/db'
import { auth } from '@clerk/nextjs/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId, redirectToSignIn } = await auth()
    const body = await req.json()

    if (!userId) return redirectToSignIn()

    await prisma.user.update({
      where: {
        userId: '',
      },
      data: {
        paid: true,
      },
    })

    console.log(body)

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err,
      }),
      { status: 500 },
    )
  }
}
