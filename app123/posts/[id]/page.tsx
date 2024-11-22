import { getPostById } from '@/lib/posts'
import { notFound } from 'next/navigation'
import MarkdownIt from 'markdown-it'
import { CalendarOutlined } from '@ant-design/icons'

const md = new MarkdownIt()

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  const htmlContent = md.render(post.content)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-8">
            <CalendarOutlined className="mr-2" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </article>
    </div>
  )
}
