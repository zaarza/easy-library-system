<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [
        'id'    
    ];

    protected $fillable = [
        'title', 'publisher', 'writter', 'year', 'code', 'location', 'is_holded'    
    ];
}
