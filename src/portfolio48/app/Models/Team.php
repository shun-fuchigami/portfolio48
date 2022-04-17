<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $table = 'teams';
    protected $guarded = ['id'];

    function users(){
        return $this->belongsToMany('App\Models\User', 'team_user', 'team_id', 'user_id')->withTimestamps();
    }

    function ownerUser(){
        return $this->belongsTo('App\Models\User','owner_id','id');
    }

    function recruitments(){
        return $this->hasMany('App\Models\Recruitment','team_id');
    }

}
