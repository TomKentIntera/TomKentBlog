import { getJson } from './http'

export type PostListItem = {
  id: string
  slug: string
  title: string
  summary: string | null
  published_at: string | null
  featured_image: string | null
  featured_image_caption: string | null
  read_time: string
  author: { name: string; username: string | null; avatar: string | null } | null
  tags: { slug: string; name: string }[]
  topics: { slug: string; name: string }[]
}

export type PostsIndexResponse = {
  data: PostListItem[]
  meta: { current_page: number; per_page: number; total: number; last_page: number }
}

export type PostDetailItem = PostListItem & {
  body: string | null
  meta: unknown
}

export type PostShowResponse = {
  data: PostDetailItem
}

export async function fetchPosts(perPage = 10): Promise<PostsIndexResponse> {
  const q = new URLSearchParams({ per_page: String(perPage) })
  return await getJson<PostsIndexResponse>(`/api/posts?${q.toString()}`)
}

export async function fetchPost(slug: string): Promise<PostShowResponse> {
  return await getJson<PostShowResponse>(`/api/posts/${encodeURIComponent(slug)}`)
}

