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
            <li
              key={p.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#fff',
                display: 'grid',
              }}
            >
              {p.featured_image ? (
                <Link to={`/posts/${p.slug}`} style={{ display: 'block' }}>
                  <img
                    src={p.featured_image}
                    alt={p.featured_image_caption ?? p.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 170,
                      objectFit: 'cover',
                      display: 'block',
                      background: '#f3f3f3',
                    }}
                  />
                </Link>
              ) : null}

              <div style={{ padding: 14, display: 'grid', gap: 10 }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <Link
                    to={`/posts/${p.slug}`}
                    style={{ fontWeight: 800, fontSize: 18, color: 'inherit', textDecoration: 'none' }}
                  >
                    {p.title}
                  </Link>
                  <div style={{ opacity: 0.7, fontSize: 13 }}>
                    {p.published_at ?? 'Unpublished'} · {p.read_time}
                    {p.author ? ` · ${p.author.name}` : ''}
                  </div>
                </div>

                {p.summary ? (
                  <p style={{ margin: 0, lineHeight: 1.5 }}>
                    {p.summary}
                  </p>
                ) : (
                  <p style={{ margin: 0, opacity: 0.7, lineHeight: 1.5 }}>
                    No synopsis available.
                  </p>
                )}

                <div>
                  <Link
                    to={`/posts/${p.slug}`}
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: 10,
                      border: '1px solid #111',
                      background: '#111',
                      color: '#fff',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                    aria-label={`View post: ${p.title}`}
                  >
                    View post
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

