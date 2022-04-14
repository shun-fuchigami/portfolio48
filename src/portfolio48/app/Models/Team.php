<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $table = 'teams';
    protected $guarded = ['id'];

    function getUsers(){
        return $this->belongsToMany('App\Models\User', 'team_user', 'team_id', 'user_id')->withTimestamps();
    }

    function getRecruitments(){
        return $this->belongsToMany('App\Models\Recruitment','recruitment_user', 'team_id','recruitment_id')->withTimestamps();
    }

}
