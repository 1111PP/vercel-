import { NextResponse } from 'next/server'
import { RateLimiter } from 'limiter'
const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: 'min',
  fireImmediately: false,
})
// 每分钟允许 3 次请求（即 tokensPerInterval: 3，interval: 'min'）。
// fireImmediately: true 表示在没有可用请求令牌（3次）的情况下,第4次会消耗下一轮的1个次数来完成请求，第5次请求直接拒绝

export async function GET() {
  // 消耗一个请求令牌
  const remainingRequests = await limiter.removeTokens(1)

  if (remainingRequests < 0) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Too Many Requests' }),
      { status: 429, headers: { 'content-type': 'application/json' } }
    )
  }

  return NextResponse.json({ data: '你好！' })
}
