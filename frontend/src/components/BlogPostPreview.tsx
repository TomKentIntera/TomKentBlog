import { Link } from 'react-router-dom'
import type { PostListItem } from '../api/posts'
import { Button } from './Button'

export function BlogPostPreview({ post }: { post: PostListItem }) {
  return (
    <li
      style={{
        border: '1px solid #ddd',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        display: 'grid',
      }}
    >
      <PostPreviewImage post={post} />

      <div style={{ padding: 14, display: 'grid', gap: 10 }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <PostTitle post={post} />
          <PostMeta post={post} />
        </div>

        <PostSynopsis post={post} />

        <div>
          <ReadMoreButton post={post} />
        </div>
      </div>
    </li>
  )
}

export function PostTitle({ post }: { post: Pick<PostListItem, 'title' | 'slug'> }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      style={{ fontWeight: 800, fontSize: 18, color: 'inherit', textDecoration: 'none' }}
    >
      {post.title}
    </Link>
  )
}

export function PostPreviewImage({
  post,
}: {
  post: Pick<PostListItem, 'featured_image' | 'featured_image_caption' | 'title' | 'slug'>
}) {
  if (!post.featured_image) return null

  return (
    <Link to={`/posts/${post.slug}`} style={{ display: 'block' }}>
      <img
        src={post.featured_image}
        alt={post.featured_image_caption ?? post.title}
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
  )
}

export function PostSynopsis({ post }: { post: Pick<PostListItem, 'summary'> }) {
  return post.summary ? (
    <p style={{ margin: 0, lineHeight: 1.5 }}>{post.summary}</p>
  ) : (
    <p style={{ margin: 0, opacity: 0.7, lineHeight: 1.5 }}>No synopsis available.</p>
  )
}

export function ReadMoreButton({ post }: { post: Pick<PostListItem, 'slug' | 'title'> }) {
  return (
    <Button to={`/posts/${post.slug}`} aria-label={`Read more: ${post.title}`}>
      Read more
    </Button>
  )
}

function PostMeta({
  post,
}: {
  post: Pick<PostListItem, 'published_at' | 'read_time' | 'author'>
}) {
  return (
    <div style={{ opacity: 0.7, fontSize: 13 }}>
      {post.published_at ?? 'Unpublished'} · {post.read_time}
      {post.author ? ` · ${post.author.name}` : ''}
    </div>
  )
}

