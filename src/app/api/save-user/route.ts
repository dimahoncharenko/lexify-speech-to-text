import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  console.log('Triggered', body)

  return NextResponse.json({ request_body: body })
}
