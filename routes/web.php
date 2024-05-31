<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\OfferController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Redireccionar la raíz al listado de ofertas
Route::redirect('/', '/offers');


// Grupo de rutas para la gestión de ofertas, promocode, dashboard
// que requieren autenticación y verificación de email
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
        ->name('dashboard');
    Route::resource('offer', OfferController::class);
    Route::resource('promocode', PromoCodeController::class);
    Route::get('/offers', [OfferController::class, 'index'])->name('offer.index');
    Route::post('/offers/{offer}/generate-code', [OfferController::class, 'generateCode'])->name('offers.generateCode');
    Route::get('/my-promo-codes', [PromoCodeController::class, 'index'])->name('promocode.index');
    Route::post('/my-promo-codes/{promoCode}/redeem', [PromoCodeController::class, 'redeem'])->name('promocode.redeem');
});


// Grupo de rutas para la gestión del perfil del usuario, requiere autenticación
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
