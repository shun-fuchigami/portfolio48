<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\Recruitment;
use App\Models\Tag;

class TeamController extends Controller
{
    public function create(Request $request){

        $validated = $request->validate([
            'userId'  =>  'required',
            'name' => 'required|unique:teams|max:20',
            'desc' => 'max:300',
            'area' => 'required|max:100',
        ]);

        $userId = $request -> userId;

        $team = new Team;
        $team -> name = $request->name;
        $team -> desc = $request->desc;
        $team -> area = $request->area;
        $team -> save();

        $team -> getUsers()->attach($userId);

        return response()->json('チーム登録が完了しました。', Response::HTTP_OK);
    }
}
