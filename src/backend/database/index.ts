import mysql from 'mysql2/promise'

// 声明一个全局连接池变量
let pool: mysql.Pool

// 初始化数据库连接
export async function init() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'mydb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })

    // 测试连接
    const connection = await pool.getConnection()
    console.log('数据库连接成功！')
    connection.release()
  } catch (error) {
    console.error('数据库连接失败：', error)
    throw error
  }
}

// 获取连接池实例
export function getPool() {
  if (!pool) {
    throw new Error('数据库未初始化，请先调用 init()')
  }
  return pool
}
