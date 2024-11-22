'use client'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { GithubOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="flex !h-[100px] sticky z-[999] top-0 !bg-white w-full items-center justify-between shadow-md">
        <div
          className="z-[999] font-bold text-2xl "
          style={{ marginLeft: '30px' }}
        >
          MyBlog
        </div>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="posts">
            <Link href="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="new">
            <Link href="/posts/new">New Post</Link>
          </Menu.Item>
        </Menu>
      </header>
      <Content className="mt-16 min-h-[calc(100vh-64px-70px)]">
        {children}
      </Content>
      <Footer className="text-center bg-gray-50">
        <div className="flex justify-center items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <GithubOutlined className="text-2xl hover:text-blue-500 transition-colors" /> */}
          </a>
        </div>
        <div className="mt-4 text-gray-500">
          MyBlog ©{new Date().getFullYear()} Created with ❤️
        </div>
      </Footer>
    </div>
  )
}
