'use client'

import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
} from 'react'
import { Input } from '@/shared/ui/common/input'
import { CloudDownload, FolderDown } from 'lucide-react'

type Props = {
  onChangeFile: Dispatch<SetStateAction<File | null>>
  file: File | null
}

export const CustomFileUpload = ({ file, onChangeFile }: Props) => {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFiles: any[] = Array.from(e.dataTransfer.files)
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
          <h3 className='text-2xl'>Upload your audio</h3>
        </div>
        <p className='text-sm text-gray-300'>File should be wav, mp3, m4a</p>
        <div
          onDrop={handleDrop}
          onDragOver={event => event.preventDefault()}
          className='my-4 flex h-full w-full flex-col items-center justify-center rounded-xl border-[3px] border-dashed bg-primary-light bg-clip-padding py-2'
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
        <div className='file-item'>
          <div className='file-info'>
            <p>{file.name}</p>
            <p>{file.type}</p>
          </div>
          <div className='file-actions'>
            <span onClick={handleRemoveFile}>-</span>
          </div>
        </div>
      )}
    </>
  )
}
