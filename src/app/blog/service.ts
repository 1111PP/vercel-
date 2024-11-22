export const delPost = async (params: { id: string }) => {
  const { id } = params
  const res = await fetch('/blog', {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  })
  const r = await res.json()
  return r
}
