import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let { id } = await request.json()

  const mockId = Math.floor(Math.random() * 10)
  console.log('接口被请求了 id:', id)

  const data = mockdata()

  return NextResponse.json({
    code: 200,
    msg: 'success',
    data: data[+mockId],
  })
}
const mockdata = () =>
  new Array(1000).fill(10).map((_, i) => ({
    id: i,
    name: `name-${i}`,
    age: 0 + i,
    email: `email-${i}@example.com`,
  }))
