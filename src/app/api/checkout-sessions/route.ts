import { NextRequest, NextResponse } from 'next/server'
import { stripeClient } from '@/shared/config/stripe'
import { ENV_KEYS } from '@/shared/constants/env'

export async function POST(req: NextRequest) {
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'PRO SUBSCRIPTION OF LEXIFY',
          },
          unit_amount: 19900, // Price in cents ($199)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${`${ENV_KEYS.DOMAIN}}`}/success`,
    cancel_url: `${`${ENV_KEYS.DOMAIN}`}/cancel`,
  })

  return NextResponse.json({ id: session.id })
}
