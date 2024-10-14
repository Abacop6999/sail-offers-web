<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
use App\Models\Offer;
use App\Models\PromoCode;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * Recupera y muestra una lista paginada de ofertas.
     */
    public function index()
    {
        $query = Offer::query();

        $Offers = $query->paginate(6)->onEachSide(1);

        return Inertia::render("Offer/Index", [
            "offers" => OfferResource::collection($Offers),
            'flash' => session()->get('flash', []),
        ]);
    }

    /**
     * Genera un código promocional para la oferta especificada.
     *
     */
    public function generateCode(Offer $offer)
    {
        try {
            $code = uniqid();

            PromoCode::create([
                'user_id' => Auth::id(),
                'offer_id' => $offer->id,
                'code' => $code,
                'status' => 'no_canjeado',
            ]);

            session()->flash('flash', [
                'success' => 'Código generado con éxito.',
                'generatedCode' => $code,
            ]);

            return redirect()->route('offer.index');
        } catch (\Exception $e) {
            \Log::error('Error al generar el código de promoción: ' . $e->getMessage());

            return redirect()->route('offer.index')->with('error', 'No se pudo generar el código. Por favor, inténtalo de nuevo.');
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
    public function store(StoreOfferRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        //
    }
}
