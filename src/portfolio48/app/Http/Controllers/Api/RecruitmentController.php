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
    public function create(Request $request){

        $validated = $request->validate([
            'title' => 'required|max:20',
            'desc' => 'required|max:1000',
            'tag' => 'max:20',
        ]);

        $tag = new Tag;
        $tag -> name = $request->tag;

        $Recruitmentam = new Recruitment;
        $Recruitmentam -> title = $request->title;
        $Recruitmentam -> desc = $request->desc;
        $Recruitmentam -> save();

        return response()->json('募集作成が完了しました。', Response::HTTP_OK);
    }

}
