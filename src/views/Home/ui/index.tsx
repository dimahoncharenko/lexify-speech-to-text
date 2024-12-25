'use client'

import { useContext, useEffect, useState } from 'react'
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
import { Check, FileMusic, LucideAudioLines, X } from 'lucide-react'

import { Hero } from './Hero'
import { PaymentWarning } from './PaymentWarning'
import classes from './player.module.css'

export const HomeView = () => {
  const { userId } = useAuth()

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
  const [isSubscribed, setIsSubscribed] = useState(false)

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
      setOptimisticRecord({
        content: 'Processing...',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        userId: `${userId}`,
        id: 0x999,
        file_name: `${file.name}`,
      })
      setIsLoading(true)

      const body = new FormData()
      body.append('files', files[0])

      const res = await transcriptAudio(body)
      addRecord(res)
      setCurrentTranscription(res.content)
      setSelected(null)

      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className='container'>
      <Hero />
      <div className='mt-12 px-2'>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='flex-1'>
            <CustomFileUpload files={files} onChangeFiles={setFiles} />
          </div>
          <div className='max-h-[50vh] flex-1 overflow-y-scroll rounded-lg bg-white p-4 shadow-md'>
            {files.length > 0 ? (
              <>
                {files.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className='my-2 max-w-[380px] xl:max-w-[650px]'
                    >
                      <div className='flex gap-2'>
                        <LucideAudioLines className='rounded-full bg-white p-[2px] text-xl' />
                        <p
                          className='overflow-hidden text-ellipsis whitespace-pre'
                          title={file.name}
                        >
                          {file.name}
                        </p>
                        <Button
                          variant='ghost'
                          size='none'
                          title='Remove file'
                          className='ml-auto'
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className='cursor cursor-pointer rounded-full bg-red-600 text-white transition-colors' />
                        </Button>
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
                          >
                            <Check className='cursor cursor-pointer rounded-full bg-accent text-white transition-colors' />
                          </Button>
                        )}
                      </div>

                      <AudioPlayer
                        source={URL.createObjectURL(file)}
                        classNames={{
                          wrapper: 'flex w-full items-center',
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
