export default async function Page(props: any) {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'GET',
    cache: 'force-cache', // 使用缓存的静态数据
    headers: {
      'Content-Type': 'application/json', // 设置请求头为 JSON
    },
  })
  const { data } = await res.json()
  console.log('data', data)

  // Render data...
  return (
    <div>
      <h1>Page</h1>
      <h2>{data.title}</h2>
    </div>
  )
}
