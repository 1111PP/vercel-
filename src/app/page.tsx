'use client'
import { Button, Card } from 'antd'
import Link from 'next/link'
import { CalendarOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
export default async function Home() {
  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getData()
    //   console.log('data', data)
    //   setPosts(data)
    // }
    // fetchData()
  }, [])
  const [posts, setPosts] = useState<any>([])
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            welcome to my blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            share technical insights and record learning experiences
          </p>
          <Link href="/blog">
            <Button
              type="primary"
              size="large"
              className="rounded-full px-8"
            >
              reading
            </Button>
          </Link>
        </div>

        {/* Latest Posts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">latest posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts &&
              posts.map((post: any) => (
                <Card
                  key={post.id}
                  hoverable
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  cover={
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100" />
                  }
                >
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center">
                      <CalendarOutlined className="mr-2" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/blo/${post.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      read more →
                    </Link>
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
