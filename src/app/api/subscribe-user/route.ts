import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import prisma from '@/shared/config/db'
import { stripeClient } from '@/shared/config/stripe'
import { auth } from '@clerk/nextjs/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId, redirectToSignIn } = await auth()
    const body = await req.json()

    const headersObject = await headers()
    const sig = headersObject.get('stripe-signature')

    if (!userId) return redirectToSignIn()

    let event
    try {
      event = stripeClient.webhooks.constructEvent(
        body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch (err) {
      console.error('Error verifying webhook signature:', err)
      return new Response(JSON.stringify({ error: err }), { status: 400 })
    }

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
