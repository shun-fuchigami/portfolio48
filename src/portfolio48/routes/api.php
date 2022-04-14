<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/logout','App\Http\Controllers\Api\LoginController@logout' );
Route::post('/login','App\Http\Controllers\Api\LoginController@login' );
Route::post('/register','App\Http\Controllers\Api\RegisterController@register' );

Route::group(['middleware'=>'auth:sanctum'],function(){
    Route::get('/user', function (Request $request) {return $request->user();});
    Route::post('/team/create', 'App\Http\Controllers\Api\TeamController@create' );
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware'=>'api'], function(){
//     Route::get('user','App\Http\Controllers\Api\UserController@getUser');
// });
