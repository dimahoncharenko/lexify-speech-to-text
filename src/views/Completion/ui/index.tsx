'use client'

import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StripeContext } from '@/shared/lib/stripe-context'

export const CompletionView = () => {
  const [messageBody, setMessageBody] = useState<React.ReactNode>('')
  const { stripePromise } = useContext(StripeContext)

  useEffect(() => {
    if (!stripePromise) return

    stripePromise.then(async stripe => {
      const url = new URL(globalThis.location.href)
      const clientSecret = url.searchParams.get('payment_intent_client_secret')

      if (!stripe) {
        return setMessageBody(
          `> Whoops, something went wrong. Please try again`,
        )
      }

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        `${clientSecret}`,
      )

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{' '}
            <p>
              Check it out:{' '}
              <a
                href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
                target='_blank'
                rel='noreferrer'
              >
                {paymentIntent.id}
              </a>
            </p>
          </>
        ),
      )
    })
  }, [stripePromise])

  return (
    <div className='container flex h-screen flex-col items-center'>
      <div className='relative size-[256px]'>
        <Image src='/gifs/succeded.gif' fill unoptimized alt='' />
      </div>
      <h1>Thank you!</h1>
      <Link href='/'>{`Let's get back you home!`}</Link>
      <div
        id='messages'
        role='alert'
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </div>
  )
}
