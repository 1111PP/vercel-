import { AntdRegistry } from '@ant-design/nextjs-registry'
import './globals.css'
import PageLayout from './components/PageLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <PageLayout>{children}</PageLayout>
        </AntdRegistry>
      </body>
    </html>
  )
}
