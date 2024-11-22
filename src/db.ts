import { JSONFilePreset } from 'lowdb/node'
type DataTYPE = {
  Summary: string
  title: string
  content: string
  id: string
}

// Read or create db.json
const data: { posts: DataTYPE[] } = { posts: [] }
//@ts-ignore
const db = await JSONFilePreset('db.json', data)

export default db
