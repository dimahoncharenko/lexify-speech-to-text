export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const remainingSeconds = Math.round(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}
