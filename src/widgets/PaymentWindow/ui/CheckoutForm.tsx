import { FormEvent, useState } from 'react'
import { Button } from '@/shared/ui/common/button'
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsLoading(false)
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <LinkAuthenticationElement id='link-authentication-element' />
      <PaymentElement id='payment-element' />
      <Button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        className='mt-4 w-full bg-secondary text-white'
      >
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </Button>

      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}
