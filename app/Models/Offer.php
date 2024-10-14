<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PromoCode;

/**
 * Modelo que representa una oferta en la aplicación.
 * 
 */
class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'discount',
    ];

    /**
     * Relación uno a muchos con el modelo PromoCode.
     * Una oferta puede tener múltiples códigos promocionales.
     */
    public function codes()
    {
        return $this->hasMany(PromoCode::class);
    }
}
