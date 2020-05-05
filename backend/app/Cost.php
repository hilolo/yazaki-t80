<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Indivcost;

class Cost extends Model
{
    protected $table = 'costs';

   
    public function users()
    {
        return $this->belongsTo('App\User','user_id','id');
    }


    
    public function indivcosts()
    {
        return $this->hasmany(Indivcost::class);
    }

}
