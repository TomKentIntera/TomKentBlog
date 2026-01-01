import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPost, type PostDetailItem } from '../api/posts'

export function PostShow() {
  const { slug } = useParams()
  const [post, setPost] = useState<PostDetailItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    fetchPost(slug)
      .then((res) => {
        if (!cancelled) setPost(res.data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (error) return <div style={{ color: 'crimson' }}>{error}</div>
  if (!post) return <div>Loading…</div>

  return (
    <article style={{ display: 'grid', gap: 12 }}>
      <div>
        <Link to="/">← Back</Link>
      </div>
      <header>
        <h1 style={{ margin: 0 }}>{post.title}</h1>
        <div style={{ opacity: 0.7, marginTop: 4 }}>
          {post.published_at ?? 'Unpublished'} · {post.read_time}
          {post.author ? ` · ${post.author.name}` : ''}
        </div>
      </header>
      {post.summary ? <p style={{ fontSize: 18 }}>{post.summary}</p> : null}

      {/* Canvas stores body as text (often HTML/Markdown depending on your editor settings).
          For now we display it as plain text to keep this barebones and safe. */}
      <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{post.body ?? ''}</pre>
    </article>
  )
}

