<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Team;
use App\Models\Recruitment;
use App\Models\Tag;

class TagController extends Controller
{
    public function create(Request $request){

        $validated = $request->validate([
            'name' => 'required|unique:tags|max:20',
        ]);

        $tag = new Tag;
        $tag -> name = $request->name;
        $tag -> save();

        return response()->json('タグ登録が完了しました。', Response::HTTP_OK);
    }
}
