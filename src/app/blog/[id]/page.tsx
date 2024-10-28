'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
async function getData() {
  console.log('请求数据')

  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'POST',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json', // 设置请求头为 JSON
    },
    body: JSON.stringify({ id: '1' }),
  })
  const r = await res.json()

  return r
}
export default async function page() {
  const pathname = usePathname()
  console.log(pathname)
  //   const r = await getData()
  return <div>详情页面</div>
}
