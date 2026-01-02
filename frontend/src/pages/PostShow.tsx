import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPost, type PostDetailItem } from '../api/posts'
import { formatDate } from '../utils/date'

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

  if (error) return <div style={{ color: 'crimson', padding: '40px' }}>{error}</div>
  if (!post) return <div style={{ padding: '40px' }}>Loading…</div>

  const category = post.topics.length > 0 ? post.topics[0].name : 'Uncategorized'

  return (
    <article style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '40px',
    }}>
      <div style={{ marginBottom: '30px' }}>
        <Link 
          to="/"
          style={{
            fontSize: '14px',
            color: '#666',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {post.featured_image && (
        <div style={{
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          marginBottom: '40px',
        }}>
          <img
            src={post.featured_image}
            alt={post.featured_image_caption ?? post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <header style={{ marginBottom: '30px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#999',
          marginBottom: '15px',
        }}>
          {category}
        </div>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 700,
          margin: '0 0 20px 0',
          lineHeight: '1.2',
          color: '#333',
        }}>
          {post.title}
        </h1>
        <div style={{
          fontSize: '13px',
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Posted On {formatDate(post.published_at)}
        </div>
      </header>

      {post.summary && (
        <p style={{
          fontSize: '18px',
          lineHeight: '1.7',
          color: '#666',
          marginBottom: '40px',
        }}>
          {post.summary}
        </p>
      )}

      <div style={{
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#333',
      }}>
        {/* Canvas stores body as text (often HTML/Markdown depending on your editor settings).
            For now we display it as plain text to keep this barebones and safe. */}
        <pre style={{
          whiteSpace: 'pre-wrap',
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
        }}>
          {post.body ?? ''}
        </pre>
      </div>
    </article>
  )
}

