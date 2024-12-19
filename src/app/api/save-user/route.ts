import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/shared/config/db'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  return NextResponse.json({ request_body: body })
}
