<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreateRequest;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        /** @var Illuminate\Validation\Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'intro' => 'required',
            'positions' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = new User;
        $user -> name = $request->name;
        $user -> email = $request->email;
        $user -> password = Hash::make($request->password);
        $user -> intro = $request->intro;
        $user -> save();

        $positions = $request -> positions;
        $positionIds = Position::createPositionsIdList($positions);

        $user -> positions() -> sync($positionIds);
        return response()->json(['message'=>['ユーザ登録が完了しました。']], Response::HTTP_OK);
    }
}
