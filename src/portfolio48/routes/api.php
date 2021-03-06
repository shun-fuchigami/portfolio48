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

//認証不要のAPI
Route::post('/logout','App\Http\Controllers\Api\LoginController@logout' );
Route::post('/login','App\Http\Controllers\Api\LoginController@login' );
Route::post('/register','App\Http\Controllers\Api\RegisterController@register' );
Route::get('/team', 'App\Http\Controllers\Api\TeamController@getTeam' );
Route::get('/recruitment', 'App\Http\Controllers\Api\RecruitmentController@getRecruitment' );
Route::get('/recruitment/index', 'App\Http\Controllers\Api\RecruitmentController@index' );

//認証必須のAPI
Route::group(['middleware'=>'auth:sanctum'],function(){
    //ユーザ関連API
    Route::get('/user', 'App\Http\Controllers\Api\UserController@getAuthUser');
    Route::get('/user/belongs', 'App\Http\Controllers\Api\UserController@getBelongsTeam' );
    Route::get('/user/owner', 'App\Http\Controllers\Api\UserController@getOwnerTeam' );
    Route::post('/user/update', 'App\Http\Controllers\Api\UserController@updateUser' );
    Route::post('/user/password/update', 'App\Http\Controllers\Api\UserController@updatePassword' );

    //チーム関連API
    Route::post('/team/create', 'App\Http\Controllers\Api\TeamController@create' );
    Route::post('/team/owner/change', 'App\Http\Controllers\Api\TeamController@ownerChange' );
    Route::post('/team/leave', 'App\Http\Controllers\Api\UserController@leaveMyTeam' );
    Route::get('/team/members', 'App\Http\Controllers\Api\TeamController@getTeamMembers' );
    Route::post('/team/member/kick', 'App\Http\Controllers\Api\TeamController@memberKick' );

    //募集関連API
    Route::post('/recruitment/create', 'App\Http\Controllers\Api\RecruitmentController@create' );
    Route::post('/recruitment/app', 'App\Http\Controllers\Api\RecruitmentController@app' );
    Route::post('/recruitment/app/deny', 'App\Http\Controllers\Api\RecruitmentController@deny' );
    Route::post('/recruitment/app/consent', 'App\Http\Controllers\Api\RecruitmentController@consent' );
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware'=>'api'], function(){
//     Route::get('user','App\Http\Controllers\Api\UserController@getUser');
// });
