'use client'

import { useContext, useEffect, useState, useTransition } from 'react'
import { useCheckUnsavedChanges } from '@/shared/hooks/use-check-unsaved-changes'
import { checkIfSubscribed, transcriptAudio } from '@/shared/lib/requests'
import { StripeContext } from '@/shared/lib/stripe-context'
import { SidebarContext } from '@/shared/lib/trascription-context'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/common/button'
import { AudioPlayer } from '@/widgets/AudioPlayer'
import { CustomFileUpload } from '@/widgets/CustomFileUpload'
import { PaymentWindow } from '@/widgets/PaymentWindow'
import { Transcription } from '@/widgets/Transcription'
import { useAuth } from '@clerk/nextjs'
import { Check, FileMusic, Loader2, LucideAudioLines, X } from 'lucide-react'

import { DeleteWarning } from './DeleteWarning'
import { Hero } from './Hero'
import { PaymentWarning } from './PaymentWarning'
import classes from './player.module.css'

export const HomeView = () => {
  const { userId } = useAuth()
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { stripePromise } = useContext(StripeContext)
  const {
    selected,
    records,
    setSelected,
    addRecord,
    setOptimisticRecord,
    currentTranscription,
    setCurrentTranscription,
  } = useContext(SidebarContext)
  const [_, changeOptimistically] = useTransition()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [__, setUnsavedChanges] = useCheckUnsavedChanges()

  useEffect(() => {
    // When component is unmount and the client still waiting for server response, then abort the operation

    return () => {
      abortController?.abort('Interrupted by user.')
    }
  }, [abortController])

  useEffect(() => {
    if (files.length) {
      setUnsavedChanges(true)
    } else {
      setUnsavedChanges(false)
    }
  }, [files.length])

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const payload = new FormData()
      payload.append('userId', userId)
      const isSubscribed = await checkIfSubscribed(payload)
      setIsSubscribed(isSubscribed)
    })()
  }, [userId, records.length])

  const handleSubmit = async (file: File) => {
    try {
      const abort = new AbortController()
      setAbortController(abort)

      changeOptimistically(() => {
        setOptimisticRecord({
          content: 'Processing...',
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
          userId: `${userId}`,
          id: 0x999,
          file_name: `${file.name}`,
        })
      })
      setIsLoading(true)

      const body = new FormData()
      body.append('files', files[0])

      const res = await transcriptAudio(body, abort.signal)
      addRecord(res)
      setCurrentTranscription(res.content)
      setSelected(null)

      setIsLoading(false)
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === 'signal is aborted without reason'
      ) {
        console.error('Aborted')
      }
    }
  }

  const abortTranscribing = (index: number) => {
    abortController?.abort()
    handleRemoveFile(index)
    setIsLoading(false)
  }

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className='container px-4'>
      <Hero />
      <div className='mt-12'>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='flex-1'>
            <CustomFileUpload files={files} onChangeFiles={setFiles} />
          </div>
          <div className='max-h-[50vh] flex-1 overflow-y-auto rounded-lg border-t border-t-primary-light bg-white py-4 shadow-md'>
            {files.length > 0 ? (
              <>
                {files.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className='max-w-[380px] border-b border-b-primary-light px-2 py-4 xl:max-w-[650px]'
                    >
                      <div className='mb-3 grid grid-cols-[32px_auto_min-content_min-content] items-center gap-3'>
                        <LucideAudioLines className='size-8 rounded-full bg-white p-[2px]' />
                        <p
                          className='overflow-hidden text-ellipsis whitespace-pre'
                          title={file.name}
                        >
                          {file.name}
                        </p>
                        {isLoading ? (
                          <DeleteWarning
                            handleDelete={() => abortTranscribing(index)}
                          />
                        ) : (
                          <Button
                            variant='ghost'
                            size='none'
                            title='Remove file'
                            className='ml-auto'
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X className='cursor cursor-pointer rounded-full bg-red-600 text-white transition-colors' />
                          </Button>
                        )}
                        {records && records.length >= 2 && !isSubscribed ? (
                          <PaymentWarning disabled={isLoading || !files.length}>
                            <PaymentWindow stripePromise={stripePromise} />
                          </PaymentWarning>
                        ) : (
                          <Button
                            variant='ghost'
                            size='none'
                            title='Transcript file'
                            onClick={() => handleSubmit(file)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className='animate-spin rounded-full bg-accent text-white' />
                            ) : (
                              <Check className='cursor cursor-pointer rounded-full bg-accent text-white transition-colors' />
                            )}
                          </Button>
                        )}
                      </div>

                      <AudioPlayer
                        source={URL.createObjectURL(file)}
                        classNames={{
                          wrapper: 'flex w-full',
                          audio: 'w-full gap-2 py-2',
                          durationTime: 'font-mono',
                          currentTime: 'font-mono',
                          progressBar: cn(
                            'before:pointer-cursor relative z-10 mr-2 h-[5px] w-full appearance-none rounded-[10px] bg-[#ffe3d4] accent-accent outline-none before:absolute before:left-0 before:top-0 before:block before:h-[5px] before:w-[var(--seek-before-width)] before:rounded-bl-[10px] before:rounded-tl-[10px] before:bg-[#ffc2a1]',
                            classes.progressBar,
                          ),
                          progressBarWrapper: 'w-full',
                        }}
                      />
                    </div>
                  )
                })}
              </>
            ) : (
              <div className='flex h-full flex-col items-center justify-center'>
                <FileMusic
                  size={128}
                  strokeWidth={1}
                  className='text-gray-400'
                />
                <p className='text-gray-400'>Missing audio file</p>
              </div>
            )}
          </div>
        </div>
        {currentTranscription && !selected && (
          <Transcription transcription={currentTranscription} />
        )}
        {selected && <Transcription transcription={selected.content} />}
      </div>
    </div>
  )
}
