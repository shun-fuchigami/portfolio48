<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    function getRecruitment(){
        return   $this->belongsToMany('App\Models\Recruitment','recruitment_tag', 'recruitment_id', 'tag_id')->withTimestamps();
    }
}
