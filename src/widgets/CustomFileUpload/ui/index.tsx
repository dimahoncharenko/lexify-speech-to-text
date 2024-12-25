'use client'

import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui/common/input'
import { CloudDownload, FolderDown } from 'lucide-react'

import { isSupportedFile } from '../lib'

type Props = {
  onChangeFiles: Dispatch<SetStateAction<File[]>>
  files: File[]
}

export const CustomFileUpload = ({ files, onChangeFiles }: Props) => {
  const [error, setError] = useState<Error | null>(null)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFiles: File[] = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles)
      if (newFiles[0] && isSupportedFile(newFiles[0])) {
        setError(null)
        onChangeFiles(prev => [...prev, ...newFiles])
      } else {
        setError(new Error('Unsupported file type.'))
      }
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
      if (newFiles[0] && isSupportedFile(newFiles[0])) {
        setError(null)
        onChangeFiles(prev => [...prev, ...newFiles])
      } else {
        setError(new Error('Unsupported file type.'))
      }
    }
  }

  useEffect(() => {
    onChangeFiles(files)
  }, [files.length])

  return (
    <div className='flex h-full w-full flex-col items-center rounded-lg bg-white p-4 shadow-md'>
      <div className='flex items-center justify-center gap-2'>
        <CloudDownload size={32} />
        <h3 className='mt-2 text-3xl'>Upload your audio</h3>
      </div>
      <p className='text-sm text-gray-300'>File should be wav, mp3, m4a</p>
      <div
        onDrop={handleDrop}
        onDragOver={event => event.preventDefault()}
        className={cn(
          'my-4 flex h-full w-full flex-col items-center justify-center rounded-xl border-[3px] border-dashed bg-slate-50 bg-clip-padding py-14',
          error && 'border-red-600',
        )}
      >
        <FolderDown
          size={56}
          className={cn('text-gray-500', error && 'text-red-800')}
        />
        {error ? (
          <p className='py-1 text-sm font-light text-red-800'>
            {error.message}
          </p>
        ) : (
          <p className='py-1 text-sm font-light text-gray-400'>
            Drag & Drop your file here
          </p>
        )}
      </div>
      <label
        htmlFor='browse'
        className='cursor-pointer text-gray-500 hover:underline'
      >
        Or pick a file
      </label>
      <Input
        id='browse'
        type='file'
        className='hidden'
        onChange={handleFileChange}
        multiple
        accept='.m4a, .wav, .mp3, .mp4, .mpeg, .mpga, .webm'
      />
    </div>
  )
}
