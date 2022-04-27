<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    function users(){
        return $this->belongsToMany('App\Models\User', 'position_user', 'position_id','user_id')->withTimestamps();
    }

    /**
     * リクエストで受けとったポジションを含めたid配列を返す
     */
    public static function createPositionsIdList($positions){

        $positionIds = [];

        foreach ($positions as $newPosition ) {
            $oldPosition = Position::where('name',$newPosition)->first();
            if(is_null($oldPosition)){
                $position = new Position;
                $position -> name = $newPosition;
                $position -> save();

                $positionId = $position -> id;
                $positionIds[] = $positionId;
            }else{
                $positionIds[] = $oldPosition->id;
            }
        }
        return $positionIds;
    }

}
