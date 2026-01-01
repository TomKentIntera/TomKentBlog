import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts, type PostListItem } from '../api/posts'

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

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Posts</h1>
      {posts.length === 0 ? (
        <p>No published posts yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          {posts.map((p) => (
            <li key={p.id} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link to={`/posts/${p.slug}`} style={{ fontWeight: 700 }}>
                  {p.title}
                </Link>
                <span style={{ opacity: 0.7 }}>
                  {p.published_at ?? 'Unpublished'} · {p.read_time}
                </span>
              </div>
              {p.summary ? <p style={{ margin: '8px 0 0' }}>{p.summary}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

