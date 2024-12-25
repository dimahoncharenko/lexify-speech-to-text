import Image from 'next/image'
import { Button } from '@/shared/ui/common/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/common/dialog'
import { X } from 'lucide-react'

type Props = {
  handleDelete: () => void
}

export const DeleteWarning = ({ handleDelete }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='none'
          title='Remove file'
          className='ml-auto'
        >
          <X className='cursor cursor-pointer rounded-full bg-red-600 text-white transition-colors' />
        </Button>
      </DialogTrigger>
      <DialogContent className='container'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>
            This action will remove the file
          </DialogTitle>
          <DialogDescription className='text-gray-500'>
            This is already in progress of transcribing, are you sure you wanna
            remove it?
          </DialogDescription>
          <Button>No</Button>
          <Button onClick={handleDelete}>Yeap.</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
