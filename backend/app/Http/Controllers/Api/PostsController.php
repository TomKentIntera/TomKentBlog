<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Canvas\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->integer('per_page', 10);
        $perPage = max(1, min(50, $perPage));

        $posts = Post::query()
            ->published()
            ->with(['user', 'tags', 'topic'])
            ->orderByDesc('published_at')
            ->paginate($perPage);

        return response()->json([
            'data' => $posts->getCollection()->map(fn (Post $post) => $this->toListItem($post))->values(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'last_page' => $posts->lastPage(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        /** @var Post $post */
        $post = Post::query()
            ->published()
            ->where('slug', $slug)
            ->with(['user', 'tags', 'topic'])
            ->orderByDesc('published_at')
            ->firstOrFail();

        return response()->json([
            'data' => $this->toDetailItem($post),
        ]);
    }

    private function toListItem(Post $post): array
    {
        return [
            'id' => $post->id,
            'slug' => $post->slug,
            'title' => $post->title,
            'summary' => $post->summary,
            'published_at' => $post->published_at?->toDateString(),
            'featured_image' => $post->featured_image,
            'featured_image_caption' => $post->featured_image_caption,
            'read_time' => $post->read_time,
            'author' => $post->relationLoaded('user') && $post->user
                ? [
                    'name' => $post->user->name,
                    'username' => $post->user->username,
                    'avatar' => $post->user->avatar,
                ]
                : null,
            'tags' => $post->relationLoaded('tags')
                ? $post->tags->map(fn ($tag) => ['slug' => $tag->slug, 'name' => $tag->name])->values()
                : [],
            'topics' => $post->relationLoaded('topic')
                ? $post->topic->map(fn ($topic) => ['slug' => $topic->slug, 'name' => $topic->name])->values()
                : [],
        ];
    }

    private function toDetailItem(Post $post): array
    {
        return [
            ...$this->toListItem($post),
            'body' => $post->body,
            'meta' => $post->meta,
        ];
    }
}

