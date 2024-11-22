'use client'

import React, { useEffect, useState } from 'react'
import { Input, Button, message } from 'antd'
import { useRouter, usePathname } from 'next/navigation'

enum modeEnum {
  NEW = '0',
  EDIT = '1',
}

const modelMap = {
  [modeEnum.NEW]: 'Create New Post',
  [modeEnum.EDIT]: 'Edit Post',
}

const { TextArea } = Input

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    cache: 'no-store',
    method: 'POST',
  })
  const { data } = await res.json()
  return data
}

interface Props {
  params: { id?: string }
}

export default function NewPost(props: any) {
  const currModel = props.params?.id ? modeEnum.EDIT : modeEnum.NEW
  const pathname = usePathname()
  const [postId, setPostId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !content) {
      message.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/blog/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          title,
          content,
          summary,
          date: new Date().toLocaleString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      message.success('Post created successfully')
      router.push('/blog')
    } catch (error) {
      message.error('Failed to create post')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(modelMap[currModel], 'currModel')

      if (currModel === modeEnum.EDIT) {
        const editId = pathname.split('/').slice(-1)[0]
        setPostId(editId)
        if (!editId) {
          message.error('未找到该文章')
          return router.push('/blog')
        }
        const { postData: data } = await getData(editId)
        // console.log('data', data)

        const { title, summary, content } = data
        setTitle(title)
        setSummary(summary)
        setContent(content)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mt-5 font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        {modelMap[currModel]}
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            size="large"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <TextArea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter post summary"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={10}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={() => router.push('/blog')}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="bg-blue-600"
          >
            {currModel === modeEnum.NEW ? 'Publish' : 'Change'}
          </Button>
        </div>
      </div>
    </div>
  )
}
