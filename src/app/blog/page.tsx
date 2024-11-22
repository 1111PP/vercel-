'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, Button, message } from 'antd'
import {
  CalendarOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons'

export default function Page() {
  const [blogData, setBlogData] = useState<any>(null)
  const router = useRouter()

  const fetchBlogData = async () => {
    try {
      const data = await getData()
      console.log(data)
      setBlogData(data)
    } catch (error) {
      console.error('Failed to fetch blog data:', error)
    }
  }
  const handleClick = (id: number) => {
    router.push(`/blog/edit/${id}`)
  }

  useEffect(() => {
    fetchBlogData()
  }, [])
  const delPost = (id: string) => {
    return fetch(`/api/blog`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
  }
  const handleDel = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const res = await delPost(id)
    if (res.ok) {
      fetchBlogData()
      message.success('删除成功')
    }
  }
  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    router.push(`/blog/edit/${id}`)
  }
  if (!blogData) return <div>Loading...</div>

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className=" flex justify-between font-bold mb-8 text-center">
            <div className="text-4xl bg-clip-text text-transparent  bg-gradient-to-r from-blue-600 to-purple-600">
              All Posts
            </div>
            <button
              className="text-2xl border border-solid p-2 rounded-[10px]  
 bg-clip-text text-transparent   bg-gradient-to-r from-blue-600 to-purple-600
            hover:border-blue-600" //
              onClick={() => router.push('/blog/new')}
            >
              Wirte
            </button>
          </h1>

          <div className="space-y-6">
            {blogData.map((item: any) => (
              <Card
                key={item.id}
                onClick={() => handleClick(item.id)}
                hoverable
                className="overflow-hidden  mb-[10px] transition-all hover:shadow-lg group"
              >
                <div className="flex justify-between  md:flex-row md:items-center">
                  <div className=" flex-7 w-full md:w-3/4">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex items-center text-gray-500">
                      <CalendarOutlined className="mr-2" />
                      {item.date}
                    </div>
                  </div>
                  <div className=" flex items-center gap-5 text-[20px]">
                    <FormOutlined
                      className="hidden group-hover:block hover:text-blue-600"
                      onClick={(e: React.MouseEvent) => handleEdit(e, item.id)}
                    />
                    <DeleteOutlined
                      className="hidden group-hover:block hover:text-red-600"
                      onClick={(e: React.MouseEvent) => handleDel(e, item.id)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog/', {
    method: 'GET',
    cache: 'no-store',
  })
  const { data } = await res.json()
  console.log('getData', data)
  return data
}
