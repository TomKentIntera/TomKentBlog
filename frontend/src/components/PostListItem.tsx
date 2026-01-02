import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { PostListItem } from '../api/posts'
import { formatDate } from '../utils/date'

export function PostListItem({ post }: { post: PostListItem }) {
  const category = post.topics.length > 0 ? post.topics[0].name : 'Uncategorized'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <article style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '30px',
      paddingBottom: '40px',
      marginBottom: '40px',
      borderBottom: '1px solid #e5e5e5',
    }}>
      {post.featured_image && (
        <Link 
          to={`/posts/${post.slug}`}
          style={{
            flexShrink: 0,
            width: isMobile ? '100%' : '280px',
            height: isMobile ? '250px' : '200px',
            overflow: 'hidden',
            display: 'block',
          }}
        >
          <img
            src={post.featured_image}
            alt={post.featured_image_caption ?? post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </Link>
      )}
      
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#999',
          marginBottom: '8px',
        }}>
          {category}
        </div>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 12px 0',
          lineHeight: '1.3',
        }}>
          <Link 
            to={`/posts/${post.slug}`}
            style={{ 
              color: '#333', 
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#666'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#333'
            }}
          >
            {post.title}
          </Link>
        </h2>
        
        <div style={{
          fontSize: '13px',
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '15px',
        }}>
          {formatDate(post.published_at)}
        </div>
        
        {post.summary && (
          <p style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#666',
            margin: '0 0 20px 0',
          }}>
            {post.summary}
          </p>
        )}
        
        <Link
          to={`/posts/${post.slug}`}
          style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#333',
            textDecoration: 'none',
            borderBottom: '2px solid #333',
            paddingBottom: '3px',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#666'
            e.currentTarget.style.borderColor = '#666'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#333'
            e.currentTarget.style.borderColor = '#333'
          }}
        >
          CONTINUE READING
        </Link>
      </div>
    </article>
  )
}

