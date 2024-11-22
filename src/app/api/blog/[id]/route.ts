import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
interface ParamsTYPE {
  params: { id: string }
}
export async function POST(request: NextRequest, { params }: ParamsTYPE) {
  let { id } = params
  console.log('id', id, typeof id)

  const target = db.data.posts.find((item: any) => item.id === id)
  console.log('target', target)

  return NextResponse.json({
    code: 200,
    msg: 'success',
    data: {
      postData: target,
    },
  })
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()
  console.log('id', id)
  const res = await db.update((data) => {
    data.posts = data.posts.filter((item) => item.id !== id)
  })
  return NextResponse.json({
    code: 200,
    msg: 'success',
  })
}
