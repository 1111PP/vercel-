import { AntdRegistry } from '@ant-design/nextjs-registry'
import './globals.css'
import PageLayout from '@/web/components/PageLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
