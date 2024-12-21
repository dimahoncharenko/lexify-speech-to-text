import { NextRequest } from 'next/server'
import prisma from '@/shared/config/db'
import { stripeClient } from '@/shared/config/stripe'
import { ENV_KEYS } from '@/shared/constants/env'
import Stripe from 'stripe'

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text()
    const sig = req.headers.get('stripe-signature')

    let event: Stripe.Event
    try {
      event = stripeClient.webhooks.constructEvent(
        rawBody,
        sig!,
        ENV_KEYS.STRIPE_WEBHOOK_SECRET!,
      )
    } catch (err) {
      console.error('Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({
          error: err,
        }),
        { status: 500 },
      )
    }

    await prisma.user.update({
      where: {
        // @ts-expect-error event.data.object isn't typed fully
        userId: event.data.object.metadata.userId,
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
