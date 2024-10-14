<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Se utiliza para generar datos de prueba para el modelo Offer.
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'image' => fake()->imageUrl(),
            'description' => fake()->realText(),
            'discount' => fake()->randomFloat(2, 0, 100), 
        ];
    }
}
