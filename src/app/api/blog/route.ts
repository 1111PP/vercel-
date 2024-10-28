import { NextRequest, NextResponse } from 'next/server'
interface ParamsTYPE {
  params: { id: string }
}
export async function GET(request: NextRequest) {
  return NextResponse.json({
    code: 200,
    msg: 'success',
    data: {
      title: '博客列表',
    },
  })
}
