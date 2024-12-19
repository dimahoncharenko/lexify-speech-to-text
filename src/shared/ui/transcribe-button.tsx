import { cn } from '../lib/utils'
import { Button, ButtonProps } from './common/button'

export const TranscribeButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'mt-5 w-full rounded-lg bg-secondary text-white',
        props.className,
      )}
    >
      Transcribe
    </Button>
  )
}
