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
import { DialogClose } from '@radix-ui/react-dialog'
import { Check } from 'lucide-react'

type Props = {
  children: React.ReactNode
  disabled?: boolean
}

export const PaymentWarning = ({ children, disabled }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='none'
          title='Transcript file'
          disabled={disabled}
        >
          <Check className='cursor bg-accent cursor-pointer rounded-full text-white transition-colors hover:text-white' />
        </Button>
      </DialogTrigger>
      <DialogContent className='container'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Hold it right there!</DialogTitle>
          <DialogDescription className='text-gray-500'>
            To proceed, you gotta pay up! No cash, no deal—fork it over, pal! 💰
          </DialogDescription>
          <Image
            src='/money.svg'
            alt='Money background'
            className='h-full w-full'
            width={100}
            height={100}
          />
        </DialogHeader>

        {children}
        <DialogFooter>
          <DialogClose className='w-full'>
            <span className='focus-visible:ring-ring hover:bg-primary/90 inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
              Get lost!!
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
