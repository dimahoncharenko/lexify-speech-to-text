import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { openaiClient } from '@/shared/config/OPENAI'
import { auth } from '@clerk/nextjs/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()

    const data = await req.formData()
    const file = data.getAll('files')[0] as File

    // Pass it to the API
    const response = await openaiClient.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    })

    // Create a record with associated user
    const record = await prisma.record.create({
      data: {
        content: response.text,
        userId,
        file_name: file.name,
      },
    })

    return NextResponse.json({
      transcription: record,
      status: 200,
    })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Something went wrong.',
      }),
      { status: 500 },
    )
  }
}
