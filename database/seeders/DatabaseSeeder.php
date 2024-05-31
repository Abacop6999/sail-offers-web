<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Offer;
use App\Models\PromoCode;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Crear un user en la base de datos
        $user = User::factory()->create([
            'name' => 'Dan',
            'email' => 'dan@example.com',
            'password' => bcrypt('O2331.P'),
            'email_verified_at' => now(),
        ]);

       // Crear 11 ofertas y 11 códigos promocionales
       Offer::factory()
            ->count(11)
            ->has(PromoCode::factory()->count(1)->state(['user_id' => $user->id]), 'codes')
            ->create();
    }
}
