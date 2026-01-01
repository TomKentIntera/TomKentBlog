export function apiBaseUrl(): string {
  // If unset, use relative URLs (same origin).
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as T
}

