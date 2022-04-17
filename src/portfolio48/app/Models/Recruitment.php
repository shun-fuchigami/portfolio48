<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruitment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    function teams(){
        return $this->belongsTo('App\Models\Team','team_id');
    }

    function users(){
        return $this->belongsToMany('App\Models\User', 'recruitment_user', 'recruitment_id','user_id')->withTimestamps();
    }

    function tags(){
        return $this->belongsToMany('App\Models\Tag','recruitment_tag', 'recruitment_id','tag_id')->withTimestamps();
    }

}
