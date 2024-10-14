<?php

namespace Tests\Feature;

use App\Models\PromoCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromoCodeControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Verificar si se muestra correctamente el listado de códigos promocionales del usuario.
     */
    public function test_index_method_displays_user_promo_codes(): void
    {
        // Crear un usuario y autenticarlo
        $user = User::factory()->create();
        $this->actingAs($user);

        // Crear un código promocional asociado al usuario
        $userPromoCode = PromoCode::factory()->create(['user_id' => $user->id]);

        // Hacer una solicitud al método 'index' del controlador
        $response = $this->get(route('promocode.index'));

        // Verificar que la respuesta es exitosa (código 200)
        $response->assertStatus(200);

        // Verificar que la vista muestra los códigos promocionales del usuario
        $response->assertSee($userPromoCode->code);
    }

    /**
     * Verificar si se puede canjear un código promocional correctamente.
     */
    public function test_redeem_method_successfully_redeems_promo_code(): void
    {
        // Crear un usuario y autenticarlo
        $user = User::factory()->create();
        $this->actingAs($user);

        // Crear un código promocional para el usuario autenticado
        $promoCode = PromoCode::factory()->create(['user_id' => $user->id]);

        // Hacer una solicitud al método 'redeem' del controlador
        $response = $this->post(route('promocode.redeem', $promoCode));

        // Verificar que se redirige de vuelta a la página anterior después de canjear el código
        $response->assertRedirect();

        // Verificar que el código promocional se ha canjeado correctamente actualizando su estado
        $this->assertDatabaseHas('promo_codes', [
            'id' => $promoCode->id,
            'status' => 'canjeado',
        ]);
    }
}
