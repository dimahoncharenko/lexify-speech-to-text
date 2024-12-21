import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/common/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/common/dialog'
import { useAuth } from '@clerk/nextjs'
import { Elements } from '@stripe/react-stripe-js'
import { Stripe } from '@stripe/stripe-js'

import CheckoutForm from './CheckoutForm'

type Props = {
  stripePromise: Promise<Stripe | null> | null
}

export const PaymentWindow = ({ stripePromise }: Props) => {
  const { userId } = useAuth()
  const [clientSecret, setClientSecret] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (!userId) return

    fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    })
      .then(res => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
  }, [userId])

  return (
    <>
      <Dialog onOpenChange={setIsOpened} open={isOpened}>
        <DialogTrigger asChild>
          <Button className='bg-secondary text-white'>
            {`Done deal! Let’s roll! 💪`}
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button className='bg-secondary text-white'>
            {`Okay… but I’m not exactly thrilled about it.`}
          </Button>
        </DialogTrigger>
        <DialogContent className='container'>
          <DialogTitle className='text-2xl'>
            LEXIFY PRO Annual Subscription - Only $199/year!
          </DialogTitle>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
