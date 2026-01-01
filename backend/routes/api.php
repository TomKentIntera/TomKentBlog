<?php

use App\Http\Controllers\Api\PostsController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostsController::class, 'index']);
Route::get('/posts/{slug}', [PostsController::class, 'show']);

