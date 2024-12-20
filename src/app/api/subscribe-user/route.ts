import prisma from '@/shared/config/db'
import { auth } from '@clerk/nextjs/server'

export const POST = async () => {
  try {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()

    await prisma.user.update({
      where: {
        userId: `${userId}`,
      },
      data: {
        paid: true,
      },
    })

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
