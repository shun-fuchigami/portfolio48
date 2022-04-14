<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;

class UserController extends Controller
{
    public function getAuthUser(Request $request){
        $loginUser = auth('api')->user();
        return response()->json($loginUser,200);
    }

    

}

