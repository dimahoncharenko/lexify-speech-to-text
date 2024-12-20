import { buffer } from 'stream/consumers'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { stripeClient } from '@/shared/config/stripe'
import { ENV_KEYS } from '@/shared/constants/env'
import { auth } from '@clerk/nextjs/server'
import Cors from 'micro-cors'
import Stripe from 'stripe'

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

export const POST = cors(async req => {
  try {
    const buf = await buffer(req)

    const sig = (await headers()).get('stripe-signature')
    let event: Stripe.Event

    try {
      event = stripeClient.webhooks.constructEvent(
        buf.toString(),
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
})
