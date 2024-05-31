<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Offer;
use App\Models\User;

/**
 * Modelo que representa un código promocional en la aplicación.
 * 
 */
class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'offer_id',
        'code',
        'status',
    ];

    /**
    * Relación muchos a uno con el modelo User.
    * Un código promocional pertenece a un usuario.
    */
     public function user()
     {
         return $this->belongsTo(User::class);
     }

    /**
    * Relación muchos a uno con el modelo Offer.
    * Un código promocional pertenece a una oferta.
    */
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
