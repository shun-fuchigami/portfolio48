<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Team;
use App\Models\Recruitment;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;


class RecruitmentController extends Controller
{

    /**
     * 全ての募集取得API
     */
    function index(Request $request){
        $recruitment = Recruitment::with(['teams','tags']) ->get();
        return response()->json($recruitment,200);
    }

    /**
     * 募集の取得API
     */
    function getRecruitment(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
        ]);

        $request->validate([
            'recruitmentId'  =>  'required',
        ]);

        $recruitment =
            Recruitment::with(['teams','users.positions','tags'])
                ->where('id', $request->recruitmentId)
                ->get();

        return response()->json($recruitment, Response::HTTP_OK);
    }

    /**
     * 募集の作成API
     */
    public function create(Request $request){

        $validator = Validator::make($request->all(), [
            'teamId' => 'required',
            'title' => 'required|max:20',
            'desc' => 'required|max:300',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $recruitment = new Recruitment;
        $recruitment -> team_id = $request -> teamId;
        $recruitment -> title = $request -> title;
        $recruitment -> desc = $request -> desc;
        $recruitment -> save();

        $tags = $request -> tags;
        $tagIds = Tag::createTagsIdList($tags);

        $recruitment -> tags() -> sync($tagIds);
        return response()->json(['message'=>['メンバ募集作成が完了しました。']],Response::HTTP_OK);
    }


    /**
     * 募集への応募API
     */
    function app(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $validator = Validator::make($request->all(), [
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $recruitment = Recruitment::find($request->recruitmentId);

        $userIds = [];
        $users = $recruitment -> users;
        if(!empty($users)){
            foreach($users as $user){
                $userIds[] = $user->id;
            }
        }

        $userIds[] = $request->userId;
        $recruitment -> users() -> sync($userIds);
        $recruitment = Recruitment::with(['users'])->where('id',$request->recruitmentId)->get();
        return response()->json(['message'=>['応募が完了しました。']], Response::HTTP_OK);
    }

    /**
     * 応募の許可API
     */
    function consent(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $validator = Validator::make($request->all(), [
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }


        $recruitment = Recruitment::find($request->recruitmentId);

        $team = $recruitment->teams;
        $teamUsers = $team -> users;
        $teamUsersId = [];
        foreach($teamUsers as $teamUser){
            $teamUsersId[] = $teamUser->id;
        }
        $teamUsersId[] = $request->userId;

        $team -> users() -> sync($teamUsersId);
        $recruitment->users()->detach($request->userId);

        return response()->json(['message'=>['メンバ応募を許可しました。']], Response::HTTP_OK);
    }

    /**
     * 応募の拒否API
     */
    function deny(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $validator = Validator::make($request->all(), [
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $recruitment = Recruitment::find($request->recruitmentId);

        $team = $recruitment->teams;

        $recruitment-> users() -> detach($request->userId);
        return response()->json(['message'=>['メンバ応募を拒否しました。']], Response::HTTP_OK);
    }
}
