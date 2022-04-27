<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'intro',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function hasTeams(){
        return $this -> hasMany('App\Models\Team','owner_id');
    }

    function teams(){
        return $this -> belongsToMany('App\Models\Team','team_user', 'user_id', 'team_id') -> withTimestamps();
    }

    function positions(){
        return $this -> belongsToMany('App\Models\Position','position_user', 'user_id', 'position_id') -> withTimestamps();
    }

    function recruitments(){
        return $this->belongsToMany('App\Models\Recruitment','recruitment_user', 'user_id', 'recruitment_id')->withTimestamps();
    }

}
