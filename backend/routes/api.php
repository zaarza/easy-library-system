<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/users/login', [AuthenticationController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/user', [UserController::class, 'me']);
  Route::get('/user/validate', [UserController::class, 'validateToken']);

  Route::controller(BookController::class)->group(function () {
    Route::get('/books', 'get');
    Route::post('/books', 'post');
    Route::delete('/books/{book}', 'delete');
    Route::put('/books/{book}', 'put');
  });
});