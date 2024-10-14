<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class OfferControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Verificar si la página de ofertas se carga correctamente.
     */
    public function test_index_method_loads_offers_page()
    {
        // Autenticar un usuario
        $user = User::factory()->create();
        $this->actingAs($user);
        
        // Crear ofertas ficticias
        Offer::factory()->count(3)->create();

        // Hacer una solicitud a la ruta de las ofertas
        $response = $this->get(route('offer.index'));

        // Verificar que la respuesta es exitosa (código 200)
        $response->assertStatus(200);
    }

    /**
     * Verificar si se genera correctamente un código promocional para una oferta.
     */
    public function test_generate_code_method()
    {
        // Crear un usuario autenticado
        $user = User::factory()->create();
        Auth::login($user);

        // Crear una oferta
        $offer = Offer::factory()->create();

        // Hacer una solicitud para generar un código promocional
        $response = $this->post(route('offers.generateCode', $offer));

        // Verificar que se redirige correctamente después de generar el código
        $response->assertRedirect(route('offer.index'));

        // Verificar que el código promocional se ha creado en la base de datos
        $this->assertDatabaseHas('promo_codes', [
            'user_id' => $user->id,
            'offer_id' => $offer->id,
            'status' => 'no_canjeado',
        ]);
    }
}
