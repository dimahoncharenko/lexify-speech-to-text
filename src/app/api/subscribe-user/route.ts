import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { stripeClient } from '@/shared/config/stripe'
import { ENV_KEYS } from '@/shared/constants/env'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export const POST = async (req: NextRequest) => {
  try {
    const buf = await req.text()

    const sig = (await headers()).get('stripe-signature')
    let event: Stripe.Event

    try {
      event = stripeClient.webhooks.constructEvent(
        buf,
        sig!,
        ENV_KEYS.STRIPE_WEBHOOK_SECRET!,
      )

      console.log(`Received a ${event.type} event`)
    } catch (err) {
      console.log(`❌ Error message: ${err}`)
      return NextResponse.json({ error: err })
    }
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
