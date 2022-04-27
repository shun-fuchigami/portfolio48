<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    function recruitment(){
        return   $this->belongsToMany('App\Models\Recruitment','recruitment_tag', 'recruitment_id', 'tag_id')->withTimestamps();
    }

    /**
     * リクエストで受けとったタグを含めたid配列を返す
     */
    public static function createTagsIdList($tags){

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

    }

}
