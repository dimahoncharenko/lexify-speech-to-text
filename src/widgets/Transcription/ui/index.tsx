'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/common/button'
import { CheckIcon, CopyIcon } from 'lucide-react'

type Props = {
  transcription: string
}

export const Transcription = ({ transcription }: Props) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(transcription)
    setCopied(true)
  }

  return (
    <div className='container relative mt-8 overflow-hidden rounded-md border bg-white p-2 pt-8'>
      <div className='bg-accent absolute left-0 right-0 top-0 flex justify-end px-2'>
        {copied ? (
          <Button
            onClick={() => setCopied(false)}
            variant='ghost'
            size='command'
          >
            <CheckIcon size={16} className='text-white' />
          </Button>
        ) : (
          <Button
            onClick={handleCopy}
            title='Copy'
            variant='ghost'
            size='command'
          >
            <CopyIcon size={16} className='text-white' />
          </Button>
        )}
      </div>
      <p>{transcription}</p>
    </div>
  )
}
