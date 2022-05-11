<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\ConfirmsPasswords;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Team;
use App\Models\Position;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ConfirmsPasswords;


    /**
     * ログインユーザの取得API
     */
    public function getAuthUser(Request $request){
        $userId = $request->user()->id;
        $user = User::with(['positions'])
            ->where('id', $userId)
            ->get();

        return response()->json($user,200);
    }

    /**
     * ユーザの登録情報変更API
     */
    public function updateUser(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required|exists:users',
            'email' => 'required|email',
            'name' => 'required|max:20',
            'intro' => 'required|max:100',
            'positions' => 'required',
            'password' => 'required|confirmed|current_password:web',
        ]);

        /**
         * Id,入力値チェック
         */
        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::find($request->id);

        /**
         * emailに変更があるかチェック
         * 変更がある場合は一意の値か確認
         */
        if( $request->email !== $user->email){
            $validator = Validator::make($request->all(),[
                'email' => 'required|email|unique:users',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        $user->email = $request->email;
        $user->name = $request->name;
        $user->intro = $request->intro;
        $user->save();

        $positions = $request -> positions;
        $positionIds = Position::createPositionsIdList($positions);

        $user -> positions() -> sync($positionIds);
        return response()->json(['message'=>['ユーザ情報更新が完了しました。']], Response::HTTP_OK);

    }

    /**
     * ユーザのパスワード変更API
     */
    public function updatePassword(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required|exists:users',
            'prevPassword' => 'required|current_password:web',
            'password' => 'required|confirmed',
        ]);

        /**
         * Id,入力値チェック
         */
        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::find($request->id);

        /**
         * passwordに変更があるかチェック
         */
        if( $request->password === $user->password){
            return response()->json(['message' => ['変更前と変更後のパスワードが同じです。']], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user -> password = Hash::make($request->password);
        $user->save();

        return response()->json(['message'=>['パスワード更新が完了しました。']], Response::HTTP_OK);
    }


    /**
     * 所属チーム取得API
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
     * オーナーチーム取得API
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
     * 所属チームの脱退API
     */
    public function leaveMyTeam(Request $request){
        $reqest = array_merge($request->all(), [
            'teamId' => $request->teamId,
            'userId' => $request->userId,
        ]);

        $validator = Validator::make($request->all(), [
            'teamId'  =>  'required',
            'userId'  =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $teamId = $request -> teamId;

        $user = User::find( $request -> userId );
        $user -> teams() ->detach($teamId);

        return response()->json(['message'=>["チーム脱退が完了しました。"]], Response::HTTP_OK);
    }

}

