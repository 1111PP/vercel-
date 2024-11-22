import { Card } from 'antd'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { CalendarOutlined } from '@ant-design/icons'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              所有文章
            </span>
          </h1>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
              >
                <Card
                  hoverable
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="w-full md:w-3/4">
                      <h2 className="text-2xl font-bold mb-3 text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.summary}
                      </p>
                      <div className="flex items-center text-gray-500">
                        <CalendarOutlined className="mr-2" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/4">
                      <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
