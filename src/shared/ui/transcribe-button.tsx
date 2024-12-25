import Image from 'next/image'

import { cn } from '../lib/utils'
import { Button, ButtonProps } from './common/button'

type Props = ButtonProps & { isLoading?: boolean }

export const TranscribeButton = ({ isLoading, ...props }: Props) => {
  return (
    <Button
      {...props}
      className={cn(
        'inline-flex w-full items-center rounded-lg bg-secondary py-6 text-xl text-white hover:bg-yellow-700',
        props.className,
      )}
    >
      {isLoading && (
        <Image
          src='/gifs/audio-editing.gif'
          alt=''
          width={34}
          height={34}
          unoptimized
        />
      )}
      Transcribe
    </Button>
  )
}
