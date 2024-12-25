const supportedFileTypes = [
  /audio\/x-m4a/,
  /audio\/mpeg/,
  /audio\/mp3/,
  /audio\/mp4/,
  /^[^/]+\/webm$/,
  /^[^/]+\/mpga$/,
]

export const isSupportedFile = (file: File) => {
  for (const type of supportedFileTypes) {
    if (file.type.match(type)) {
      return true
    }
  }

  return false
}
