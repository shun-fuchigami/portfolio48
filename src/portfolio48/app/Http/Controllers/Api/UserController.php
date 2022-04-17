<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Team;

class UserController extends Controller
{
    public function getAuthUser(Request $request){
        $loginUser = auth('api')->user();
        return response()->json($loginUser,200);
    }

    /**
     * 所属チーム取得
     */
    public function getBelongsTeam(Request $request){
        $reqest = array_merge($request->all(), [
            'userId' => $request->userId,
        ]);

        $request->validate([
            'userId'  =>  'required',
        ]);

        $user = User::find( $request -> userId );
        $myTeam = $user -> teams;


        return response()->json($myTeam,200);
    }

    /**
     * オーナーチーム取得
     */
    public function getOwnerTeam(Request $request){
        $reqest = array_merge($request->all(), [
            'userId' => $request->userId,
        ]);

        $request->validate([
            'userId'  =>  'required',
        ]);

        $user = User::find( $request -> userId );
        $myTeam = $user -> hasTeams;

        return response()->json($myTeam,200);
    }

    /**
     * 所属チームの脱退
     */
    public function leaveMyTeam(Request $request){
        $reqest = array_merge($request->all(), [
            'teamId' => $request->teamId,
            'userId' => $request->userId,
        ]);

        $request->validate([
            'teamId'  =>  'required',
            'userId'  =>  'required',
        ]);

        $teamId = $request -> teamId;

        $user = User::find( $request -> userId );
        $user -> teams() ->detach($teamId);

        return response()->json(200);
    }



}

