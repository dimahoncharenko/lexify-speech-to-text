export const fetchRecords = async () => {
  try {
    const res = await fetch('/api/records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const receivedRecords = await res.json()
    return receivedRecords.records
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      throw err
    }
  }
}

export const transcriptAudio = async (
  payload: FormData,
  signal?: AbortSignal,
) => {
  try {
    const requestOptions = { method: 'POST', body: payload, signal }

    const res = await fetch('/api/speech-to-text', requestOptions)
    const receivedTranscription = await res.json()

    return receivedTranscription.transcription
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      throw err
    }
  }
}

export const checkIfSubscribed = async (payload: FormData) => {
  try {
    const res = await fetch('/api/subscription/check', {
      method: 'POST',
      body: payload,
    })

    return await res.json()
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      throw err
    }
  }
}
