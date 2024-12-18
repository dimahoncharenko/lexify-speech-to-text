import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'
import { openaiClient } from '@/shared/config/OPENAI'
import { auth } from '@clerk/nextjs/server'

const pump = promisify(pipeline)

export const POST = async (req: NextRequest) => {
  try {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()

    const data = await req.formData()
    const file = data.getAll('files')[0] as File

    // Create a temp file
    const filePath = `./public/${file.name}`
    // @ts-expect-error incorrectly typed file object
    await pump(file.stream(), fs.createWriteStream(filePath))

    // Pass it to the API
    const response = await openaiClient.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    })

    // Then remove it
    fs.unlinkSync(filePath)

    // Create a record with associated user
    const res = await prisma.record.create({
      data: {
        content: response.text,
        userId,
      },
    })

    console.log('After processing: ', res)

    return NextResponse.json({
      transcription: response.text,
      status: 200,
    })
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
    })
  }
}
