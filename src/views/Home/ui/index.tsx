'use client'

import { useContext, useEffect, useState } from 'react'
import { StripeContext } from '@/shared/lib/stripe-context'
import { TranscribeButton } from '@/shared/ui/transcribe-button'
import { CustomFileUpload } from '@/widgets/CustomFileUpload'
import { Header } from '@/widgets/Header'
import { PaymentWindow } from '@/widgets/PaymentWindow'

import { PaymentWarning } from './PaymentWarning'

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState('')
  const [records, setRecords] = useState<unknown[]>([])
  const { stripePromise } = useContext(StripeContext)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/records', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const receivedRecords = await res.json()

      setRecords(receivedRecords.records)
    })()
  }, [transcription])

  const handleSubmit = async () => {
    if (!file) return

    try {
      const body = new FormData()
      body.append('files', file)

      const requestOptions = { method: 'POST', body }

      setIsLoading(true)

      const res = await fetch('/api/speech-to-text', requestOptions)
      const receivedTranscription = await res.json()

      setTranscription(receivedTranscription.transcription)

      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className='container max-w-[390px] p-2'>
        <CustomFileUpload file={file} onChangeFile={setFile} />

        {transcription && <p>{transcription}</p>}
      </form>

      <div className='container max-w-[390px] p-2'>
        {records.length >= 2 ? (
          <PaymentWarning>
            <PaymentWindow stripePromise={stripePromise} />
          </PaymentWarning>
        ) : (
          <TranscribeButton onClick={() => handleSubmit()} disabled={isLoading}>
            Transcribe
          </TranscribeButton>
        )}
      </div>
    </>
  )
}
