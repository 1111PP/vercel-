import { AntdRegistry } from '@ant-design/nextjs-registry'
import './globals.css'
import PageLayout from '@/web/components/PageLayout'
import { initializeServices } from '@/init'

let initialized = false

export default async function RootLayout({ children }: any) {
  // if (!initialized) {
  //   const initRes = await initializeServices()
  //   initialized = true
  // }

  return (
    <html lang="zh">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
