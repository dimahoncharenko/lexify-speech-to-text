import { NextRequest, NextResponse } from 'next/server'
import { stripeClient } from '@/shared/config/stripe'
import Stripe from 'stripe'

export const POST = async (req: NextRequest) => {
  const data = await req.json()

  const orderAmount = 19900 // In cents (199$);
  let paymentIntent: Stripe.PaymentIntent

  try {
    paymentIntent = await stripeClient.paymentIntents.create({
      currency: 'usd',
      amount: orderAmount,
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: data.userId,
      },
    })

    // Send publishable key and PaymentIntent client_secret to client.
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (e) {
    let message = e
    if (typeof e === 'string') {
      message = e
    } else if (e instanceof Error) {
      message = e.message
    }

    return new Response(
      JSON.stringify({
        status: 400,
        error: message,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    )
  }
}
