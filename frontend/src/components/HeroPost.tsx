import { Link } from 'react-router-dom'
import type { PostListItem } from '../api/posts'
import { formatDate } from '../utils/date'

export function HeroPost({ post }: { post: PostListItem }) {
  const category = post.topics.length > 0 ? post.topics[0].name : 'Uncategorized'
  
  return (
    <article style={{
      position: 'relative',
      marginBottom: '60px',
    }}>
      {post.featured_image && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          marginBottom: '30px',
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
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            padding: '40px',
            color: '#fff',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px',
              opacity: 0.9,
            }}>
              {category}
            </div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 700,
              margin: '0 0 15px 0',
              lineHeight: '1.2',
            }}>
              <Link 
                to={`/posts/${post.slug}`}
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            </h1>
            {post.summary && (
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                margin: 0,
                opacity: 0.95,
                maxWidth: '700px',
              }}>
                {post.summary}
              </p>
            )}
          </div>
        </div>
      )}
      
      {!post.featured_image && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#999',
            marginBottom: '10px',
          }}>
            {category}
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            margin: '0 0 15px 0',
            lineHeight: '1.2',
            color: '#333',
          }}>
            <Link 
              to={`/posts/${post.slug}`}
              style={{ color: '#333', textDecoration: 'none' }}
            >
              {post.title}
            </Link>
          </h1>
          {post.summary && (
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
              color: '#666',
              maxWidth: '700px',
            }}>
              {post.summary}
            </p>
          )}
        </div>
      )}
      
      <div style={{
        fontSize: '13px',
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Posted On {formatDate(post.published_at)}
      </div>
    </article>
  )
}

