<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePromoCodeRequest;
use App\Http\Requests\UpdatePromoCodeRequest;
use App\Http\Resources\PromoCodeResource;
use App\Models\PromoCode;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PromoCodeController extends Controller
{
    /**
     * Muestra un listado de los códigos promocionales del usuario.
     */
    public function index()
    {

        $user = Auth::user();

        $query = PromoCode::query()->where('user_id', $user->id);

        if (request("code")) {
            $query->where("code", "like", "%" . request("code") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $codes = $query->with('offer')->paginate(10)->onEachSide(1);

        return Inertia::render("PromoCode/Index", [
            "promocode" => PromoCodeResource::collection($codes),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Canjea un código promocional específico.
     */
    public function redeem(PromoCode $promoCode)
    {
        try {

            $promoCode->update(['status' => 'canjeado']);

            session()->flash('flash', [
                'success' => 'Código canjeado con éxito.',
                'generatedCode' => $promoCode->code,
            ]);

            return back();
        } catch (\Exception $e) {
            \Log::error('Error al canjear el código de promoción: ' . $e->getMessage());

            return redirect()->route('promocode.index')->with('error', 'No se pudo canjear el código. Por favor, inténtalo de nuevo.');
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromoCodeRequest $request)
    {
        //
    }
    /**
     * Display the specified resource.
     */
    public function show(PromoCode $promoCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PromoCode $promoCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromoCodeRequest $request, PromoCode $promoCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromoCode $promoCode)
    {
        //
    }
}
