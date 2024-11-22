'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'POST',
  })
  const { data: r } = await res.json()
  console.log('请求数据', r)

  return r
}
export default function Page(props: any) {
  const { id } = props.params
  const [blogData, setBlogData] = useState<any>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchList = async () => {
      const { postData: data } = await getData(id)
      // console.log('data', data)
      setBlogData(data)
    }
    fetchList()
  }, [id])
  if (!blogData) return <div>Loading...</div>
  return (
    <div>
      <h1
        onClick={() => {
          router.push(`/blog`)
        }}
      >
        详情页面
      </h1>
      <div>
        <ul>
          {blogData &&
            Object.entries(blogData).map(([key, value]: any) => {
              return (
                <li key={key}>
                  <span>
                    {key} : {value}
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
