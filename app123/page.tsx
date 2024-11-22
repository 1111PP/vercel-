import { Button, Card } from 'antd'
import Link from 'next/link'
import { getLatestPosts } from '@/lib/posts'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'

export default async function Home() {
  const posts = await getLatestPosts(3)

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            欢迎来到我的博客
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            分享技术见解，记录学习心得
          </p>
          <Link href="/posts">
            <Button
              type="primary"
              size="large"
              className="rounded-full px-8"
            >
              开始阅读
            </Button>
          </Link>
        </div>

        {/* Latest Posts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">最新文章</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
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
                    href={`/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    阅读更多 →
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
