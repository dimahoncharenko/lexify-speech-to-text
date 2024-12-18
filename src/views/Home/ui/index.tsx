'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from '@/shared/common/input'
import { Header } from '@/widgets/Header'

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState('')
  const [records, setRecords] = useState<unknown[]>([])

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

  console.log(records)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className='container'>
        <Input type='file' onChange={handleChange} />

        <button type='submit' disabled={isLoading}>
          Transcribe
        </button>

        {transcription && <p>{transcription}</p>}
      </form>
    </>
  )
}
