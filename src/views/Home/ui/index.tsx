'use client'

import { useContext, useEffect, useState } from 'react'
import {
  checkIfSubscribed,
  fetchRecords,
  transcriptAudio,
} from '@/shared/lib/requests'
import { StripeContext } from '@/shared/lib/stripe-context'
import { TranscribeButton } from '@/shared/ui/transcribe-button'
import { CustomFileUpload } from '@/widgets/CustomFileUpload'
import { Header } from '@/widgets/Header'
import { PaymentWindow } from '@/widgets/PaymentWindow'
import { useAuth } from '@clerk/nextjs'

import { PaymentWarning } from './PaymentWarning'

export const HomeView = () => {
  const { userId } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState('')
  const [records, setRecords] = useState<unknown[]>([])
  const { stripePromise } = useContext(StripeContext)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const records = await fetchRecords()
      setRecords(records)

      const payload = new FormData()
      payload.append('userId', userId)
      const isSubscribed = await checkIfSubscribed(payload)
      setIsSubscribed(isSubscribed)
    })()
  }, [userId, transcription])

  const handleSubmit = async () => {
    if (!file) return

    try {
      setIsLoading(true)

      const body = new FormData()
      body.append('files', file)

      const res = await transcriptAudio(body)
      setTranscription(res)

      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className='container mt-12 max-w-[404px] p-2'
      >
        <CustomFileUpload file={file} onChangeFile={setFile} />

        {transcription && <p>{transcription}</p>}
      </form>

      <div className='container max-w-[404px] p-2'>
        {records.length >= 2 && !isSubscribed ? (
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
