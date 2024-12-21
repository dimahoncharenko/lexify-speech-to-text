'use client'

import { useContext, useEffect, useState } from 'react'
import { Record } from '@/entities/record/model/types'
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
import { Transcription } from '@/widgets/Transcription'
import { useAuth } from '@clerk/nextjs'

import { Hero } from './Hero'
import { PaymentWarning } from './PaymentWarning'

export const HomeView = () => {
  const { userId } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState('')
  const [records, setRecords] = useState<Record[]>([])
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
    <div className='container'>
      <Hero />
      <div className='mt-12 max-w-[404px] px-2'>
        <form onSubmit={handleSubmit}>
          <CustomFileUpload file={file} onChangeFile={setFile} />
        </form>

        <div className='pt-10'>
          {records.length >= 2 && !isSubscribed ? (
            <PaymentWarning>
              <PaymentWindow stripePromise={stripePromise} />
            </PaymentWarning>
          ) : (
            <TranscribeButton
              isLoading={isLoading}
              onClick={() => handleSubmit()}
              disabled={isLoading}
            >
              Transcribe
            </TranscribeButton>
          )}
        </div>
        {transcription && <Transcription transcription={transcription} />}
      </div>
    </div>
  )
}
