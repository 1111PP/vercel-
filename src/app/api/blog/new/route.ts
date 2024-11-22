import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
export async function POST(request: NextRequest) {
  const newPost = await request.json()
  const id = newPost?.id
  if (id) {
    // 更新
    await db.update(({ posts }) => {
      let target = posts.find((post: any) => post.id === id)
      if (target) {
        Object.assign(target, newPost)
      }
    })
  } else {
    // 新增
    await db.update(({ posts }) =>
      posts.unshift({
        ...newPost,
        id: db.data.posts.length.toString(),
      })
    )
  }

  return NextResponse.json({ message: 'Success' })
}

export async function GET(request: NextRequest) {}
