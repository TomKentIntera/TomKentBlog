import { useEffect, useState } from 'react'
import { fetchPosts, type PostListItem } from '../api/posts'
import { BlogPostPreview } from '../components/BlogPostPreview'

export function PostsIndex() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchPosts()
      .then((res) => {
        if (!cancelled) setPosts(res.data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (error) return <div style={{ color: 'crimson' }}>{error}</div>
  if (!posts) return <div>Loading…</div>

  const sorted = [...posts].sort((a, b) => {
    const aKey = a.published_at ?? ''
    const bKey = b.published_at ?? ''
    return bKey.localeCompare(aKey)
  })

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Recent posts</h1>
      {sorted.length === 0 ? (
        <p>No published posts yet.</p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {sorted.map((p) => (
            <BlogPostPreview key={p.id} post={p} />
          ))}
        </ul>
      )}
    </div>
  )
}

