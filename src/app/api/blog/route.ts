import db from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

interface ParamsTYPE {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: ParamsTYPE) {
  const id = params?.id
  let data: any[] = []
  if (id) {
    data = db.data.posts.filter((item) => item.id === id)
  } else {
    data = db.data.posts
  }
  console.log('GET /blog/ route', data)

  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()
  const res = await db.update((data) => {
    data.posts = data.posts.filter((item) => item.id !== id)
  })
  return NextResponse.json({ data: res })
}
