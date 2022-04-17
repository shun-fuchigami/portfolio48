<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Team;
use App\Models\Recruitment;
use App\Models\Tag;

class RecruitmentController extends Controller
{

    /**
     * 全募集の取得
     */
    function index(Request $request){
        $recruitment = Recruitment::with(['teams','tags']) ->get();
        return response()->json($recruitment,200);
    }

    /**
     * 募集の取得
     */
    function getRecruitment(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
        ]);

        $request->validate([
            'recruitmentId'  =>  'required',
        ]);

        $recruitment =
            Recruitment::with(['teams','users','tags'])
                ->where('id', $request->recruitmentId)
                ->get();

        return response()->json($recruitment, Response::HTTP_OK);
    }

    /**
     * 募集の作成
     */
    public function create(Request $request){

        $validated = $request->validate([
            'teamId' => 'required',
            'title' => 'required|max:20',
            'desc' => 'required|max:300',
        ]);

        $recruitment = new Recruitment;
        $recruitment -> team_id = $request -> teamId;
        $recruitment -> title = $request -> title;
        $recruitment -> desc = $request -> desc;
        $recruitment -> save();

        $tags = $request -> tags;
        $tagIds = [];

            foreach ($tags as $newTag ) {
                $oldTag = Tag::where('name',$newTag)->first();
                if(is_null($oldTag)){
                    $tag = new Tag;
                    $tag -> name = $newTag;
                    $tag -> save();

                    $tagId = $tag -> id;
                    $tagIds[] = $tagId;
                }else{
                    $tagIds[] = $oldTag->id;
                }
            }

        $recruitment -> tags() -> sync($tagIds);
        return response()->json($recruitment,200);
    }


    /**
     * 応募者の紐付け
     */
    function app(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $request->validate([
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

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
        return response()->json($recruitment, Response::HTTP_OK);
    }

    function consent(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $request->validate([
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

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

        return response()->json($team, Response::HTTP_OK);
    }

    function deny(Request $request){
        $reqest = array_merge($request->all(), [
            'recruitmentId' => $request->recruitmentId,
            'userId' => $request->userId,
        ]);

        $request->validate([
            'recruitmentId'  =>  'required',
            'userId'  =>  'required',
        ]);

        $recruitment = Recruitment::find($request->recruitmentId);

        $team = $recruitment->teams;

        $recruitment-> users() -> detach($request->userId);
        return response()->json($team, Response::HTTP_OK);
    }
}
