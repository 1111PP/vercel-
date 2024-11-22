'use client'

import { Button, Form, Input, Card } from 'antd'
import { useRouter } from 'next/navigation'
import { EditOutlined } from '@ant-design/icons'

export default function NewPostPage() {
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        router.push('/posts')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <EditOutlined className="text-4xl text-blue-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">创作新文章</h1>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input
                size="large"
                placeholder="输入文章标题"
              />
            </Form.Item>

            <Form.Item
              label="摘要"
              name="summary"
              rules={[{ required: true, message: '请输入文章摘要' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="简短的文章摘要"
                className="resize-none"
              />
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
              <Input.TextArea
                rows={15}
                placeholder="使用 Markdown 格式编写文章内容"
                className="font-mono"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="h-12"
              >
                发布文章
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
