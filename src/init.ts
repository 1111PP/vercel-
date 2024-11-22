import { init as initDatabase } from '@/backend/database'

export async function initializeServices() {
  try {
    await initDatabase()
    console.log('所有服务初始化完成')
  } catch (error) {
    console.error('服务初始化失败：', error)
    throw error
  }
}
