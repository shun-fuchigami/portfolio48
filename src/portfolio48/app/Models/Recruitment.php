<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruitment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    function getTeams(){
        $this->belongsToMany('App\Models\Team', 'recruitment_team','recruitment_id' ,'team_id')->withTimestamps();
    }

    function getUsers(){
        $this->belongsToMany('App\Models\User', 'recruitment_user', 'recruitment_id','user_id')->withTimestamps();
    }

    function getTags(){
        $this->belongsToMany('App\Models\Tags','recruitment_tag', 'recruitment_id','tag_id')->withTimestamps();
    }

}
