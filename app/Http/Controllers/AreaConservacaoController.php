<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Municipio;
use App\Models\Area_Conservacao;
use Illuminate\Support\Facades\Log;

class AreaConservacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()

    {
        $areas = Area_Conservacao:: join('municipios', 'municipios.id','=','Areas_Conservacoes.id_municipio')
                                ->join('provincias', 'provincias.id','=','municipios.id_provincia')
                                ->get (['Areas_Conservacoes.nome_area','Areas_Conservacoes.id','municipios.nome_municipio','provincias.nome_provincia']);
        return $areas;
        // return response()->json($areas);
    }


    public function mlistar()
    {

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $moradas = Municipio::all();
        return $moradas;

        // return view ('areaccadastro');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // echo("sssssssssssssssssss: ".$request);
        // Log::info('quero saber o que e: ' .$request->all());

        // dd($request->all());

        //$teste = $request->get('rel');

        // Log::info('quero saber o que e: ' .$teste);

        $areacconservacao = new Area_Conservacao;
        $areacconservacao->nome_area = $request->nome_area;
        $areacconservacao->id_municipio = $request->id_municipio;

        // $areaconservacao-> save();
        // return redirect('/areaccadastro');


        $areacconservacao-> save();

         return $areacconservacao;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
