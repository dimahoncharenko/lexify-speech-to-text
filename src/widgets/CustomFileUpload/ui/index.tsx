'use client'

import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
} from 'react'
import Image from 'next/image'
import { Input } from '@/shared/ui/common/input'
import {
  CloudDownload,
  FileAudio,
  FolderDown,
  LucideAudioLines,
  X,
} from 'lucide-react'

type Props = {
  onChangeFile: Dispatch<SetStateAction<File | null>>
  file: File | null
}

export const CustomFileUpload = ({ file, onChangeFile }: Props) => {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFiles: File[] = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles)
      onChangeFile(newFiles[0])
    }
  }

  const handleRemoveFile = () => {
    onChangeFile(null)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
      onChangeFile(newFiles[0])
    }
  }

  useEffect(() => {
    onChangeFile(file)
  }, [file])

  return (
    <>
      <div className='flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md'>
        <div className='flex items-center justify-center gap-2'>
          <CloudDownload size={32} />
          <h3 className='mt-2 text-3xl'>Upload your audio</h3>
        </div>
        <p className='text-sm text-gray-300'>File should be wav, mp3, m4a</p>
        <div
          onDrop={handleDrop}
          onDragOver={event => event.preventDefault()}
          className='my-4 flex h-full w-full flex-col items-center justify-center rounded-xl border-[3px] border-dashed bg-slate-50 bg-clip-padding py-14'
        >
          <FolderDown size={56} className='text-gray-500' />
          <p className='py-1 text-sm font-light text-gray-400'>
            Drag & Drop your file here
          </p>
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
          accept='.m4a, .wav, .mp3'
        />
      </div>
      {file && (
        <div className='my-2'>
          <div className='flex gap-2'>
            <LucideAudioLines className='rounded-full bg-white p-[2px]' />
            <p>{file.name}</p>

            <X
              className='cursor cursor-pointer rounded-full bg-slate-300 text-slate-200'
              onClick={handleRemoveFile}
            />
          </div>
        </div>
      )}
    </>
  )
}
