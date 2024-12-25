'use client'

import { CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/common/button'
import { FastForward, Pause, Play, Rewind } from 'lucide-react'

import { formatDuration } from '../lib'

type Props = {
  source: string
  classNames?: Partial<{
    wrapper: string
    audio: string
    rewind: string
    forward: string
    playpause: string
    currentTime: string
    durationTime: string
    progressBar: string
    progressBarWrapper: string
  }>
}

export const AudioPlayer = ({ source, classNames }: Props) => {
  const audioPlayer = useRef<HTMLAudioElement | null>(null)
  const progressBar = useRef<HTMLInputElement | null>(null)
  const animationRef = useRef<number>(0)

  const [isPaused, setIsPaused] = useState(true)
  const [metadata, setMetadata] = useState({
    duration: 0,
    currentTime: 0,
  })

  useLayoutEffect(() => {
    if (audioPlayer?.current?.duration && progressBar.current) {
      progressBar.current.max = `${audioPlayer.current.duration}`

      setMetadata(prev => ({
        ...prev,
        duration: Math.floor(audioPlayer!.current!.duration),
      }))
    }
  }, [audioPlayer?.current?.duration])

  useLayoutEffect(() => {
    if (audioPlayer.current && !isPaused) {
      audioPlayer.current.play()
    } else {
      audioPlayer.current?.pause()
    }
  }, [audioPlayer.current, isPaused])

  const togglePlayer = () => {
    const prevValue = isPaused

    setIsPaused(() => !prevValue)

    if (prevValue) {
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime.toString()
      changePlayerTime(progressBar.current)
    }

    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const handleRewind = (seconds: number) => {
    if (progressBar.current) {
      progressBar.current.value = Math.max(
        Number(progressBar.current.value) - seconds,
        0,
      ).toString()
      handleProgressChange()
    }
  }

  const handleForward = (seconds: number) => {
    if (progressBar.current) {
      progressBar.current.value = Math.max(
        Number(progressBar.current.value) + seconds,
        0,
      ).toString()
      handleProgressChange()
    }
  }

  const changePlayerTime = (source: HTMLInputElement) => {
    source.style.setProperty(
      '--seek-before-width',
      `${(Number(source.value) / metadata.duration) * 100}%`,
    )
    setMetadata(prev => ({
      ...prev,
      currentTime: Number(progressBar.current!.value),
    }))
  }

  const handleProgressChange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value)
      changePlayerTime(progressBar.current)
    }
  }

  return (
    <div className={cn('flex flex-col', classNames?.wrapper)}>
      <audio ref={audioPlayer} className='hidden' preload='metadata'>
        <source src={source} />
      </audio>

      {/* Player itself */}
      <div className={cn('flex', classNames?.audio)}>
        {/* Current time */}
        <span className={cn(classNames?.currentTime)}>
          {!isNaN(metadata.currentTime) && formatDuration(metadata.currentTime)}
        </span>

        {/* Progress bar */}
        <div className={cn(classNames?.progressBarWrapper)}>
          <input
            ref={progressBar}
            style={
              {
                '--seek-before-width': '0px',
              } as CSSProperties
            }
            type='range'
            defaultValue={0}
            className={cn(classNames?.progressBar)}
            onChange={handleProgressChange}
          ></input>
        </div>

        {/* Duration */}
        <span className={cn(classNames?.durationTime)}>
          {!isNaN(metadata.duration) && formatDuration(metadata.duration)}
        </span>
      </div>

      {/* Controls */}
      <div className='flex gap-1'>
        <Button
          className={cn(classNames?.rewind)}
          onClick={() => handleRewind(15)}
        >
          <Rewind />
        </Button>
        <Button className={cn(classNames?.playpause)} onClick={togglePlayer}>
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <Button
          className={cn(classNames?.forward)}
          onClick={() => handleForward(15)}
        >
          <FastForward />
        </Button>
      </div>
    </div>
  )
}
