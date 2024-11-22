import { getPool } from '@/backend/database'
import { NextResponse, NextRequest } from 'next/server'
export async function GET(request: NextRequest) {
  //   const pool = getPool()
  //   const [rows] = await pool.query('SELECT * FROM nextjs_blog')
  return NextResponse.json({ data: 'hello' })

  //   return NextResponse.json({ data: rows })
}
