<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\Recruitment;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;


class TeamController extends Controller
{
    /**
     * チーム作成API
     */
    public function create(Request $request){

        $validator = Validator::make($request->all(), [
            'userId'  =>  'required',
            'name' => 'required|unique:teams|max:20',
            'desc' => 'max:300',
            'area' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $userId = $request -> userId;

        $team = new Team;
        $team -> name = $request->name;
        $team -> desc = $request->desc;
        $team -> area = $request->area;
        $team -> owner_id = $request->userId;
        $team -> save();

        return response()->json(['message'=>["チーム登録が完了しました。"]], Response::HTTP_OK);
    }

    /**
     * チーム取得API
     */
    public function getTeam(Request $request){
        $reqest = array_merge($request->all(), [
            'teamId' => $request->teamId,
        ]);

        $request->validate([
            'teamId'  =>  'required',
        ]);

        $team = Team::with(['recruitments'])->where('id', $request->teamId)->get();
        return response()->json($team, Response::HTTP_OK);
    }

    /**
     * チームメンバ取得API
     */
    public function getTeamMembers(Request $request){
        $reqest = array_merge($request->all(), [
            'teamId' => $request->teamId,
        ]);

        $request->validate([
            'teamId'  =>  'required',
        ]);

        $team = Team::with(['users.positions','ownerUser.positions'])->where('id', $request->teamId)->get();
        return response()->json($team, Response::HTTP_OK);
    }

    /**
     * オーナーの変更API
     */
    public function ownerChange(Request $request){
        $request->validate([
            'teamId'  =>  'required',
            'userId'  =>  'required',
        ]);

        $team = Team::find($request->teamId);
        //前オーナーIDを退避
        $prevOwner = $team -> owner_id;
        $team -> owner_id = $request->userId;
        $team -> save();

        // ユーザIDの洗い替え処理
        $userIds = [];
        $users = $team -> users;
        foreach($users as $user){
            if($user->id !== $request->userId){
                $userIds[] = $user -> id;
            }
        }
        $userIds[] = $prevOwner;
        $team -> users() -> sync($userIds);
        return response()->json($team, Response::HTTP_OK);
    }

    /**
     * メンバーの追放API
     */
    public function memberKick(Request $request){
        $request->validate([
            'teamId'  =>  'required',
            'userId'  =>  'required',
        ]);

        $team = Team::find($request->teamId);
        $team -> users() -> detach($request->userId);
        return response()->json($team, Response::HTTP_OK);
    }
}
