import { useEffect, useState } from 'react'
import { fetchPosts, type PostListItem } from '../api/posts'
import { HeroPost } from '../components/HeroPost'
import { PostListItem as PostListItemComponent } from '../components/PostListItem'

export function PostsIndex() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchPosts(20) // Fetch more posts for the list
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

  if (error) return <div style={{ color: 'crimson', padding: '40px' }}>{error}</div>
  if (!posts) return <div style={{ padding: '40px' }}>Loading…</div>

  const sorted = [...posts].sort((a, b) => {
    const aKey = a.published_at ?? ''
    const bKey = b.published_at ?? ''
    return bKey.localeCompare(aKey)
  })

  if (sorted.length === 0) {
    return (
      <div style={{ padding: '40px', maxWidth: 800, margin: '0 auto' }}>
        <p>No published posts yet.</p>
      </div>
    )
  }

  const [heroPost, ...restPosts] = sorted

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '0 40px 60px',
    }}>
      {heroPost && <HeroPost post={heroPost} />}
      
      {restPosts.length > 0 && (
        <div>
          {restPosts.map((post) => (
            <PostListItemComponent key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

