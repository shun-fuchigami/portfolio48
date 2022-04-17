<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * ログイン
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        // バリデーション
        $this->validateLogin($request);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Success
            $user = Auth::user();
            // ※古いトークン削除&新しいトークン生成
            $user->tokens()->where('name', 'token-name')->delete();
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json('ログインに成功しました。', Response::HTTP_OK);
        }
        return response()->json('一致するユーザが見つかりません。', Response::HTTP_BAD_REQUEST);

    }


    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json('ログアウトしました。', Response::HTTP_OK);
    }
}
