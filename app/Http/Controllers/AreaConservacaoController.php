<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\Animal;
use App\Models\Area_Conservacao;
use App\Models\AnimalArea;
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
                                ->get (['Areas_Conservacoes.nome_area','Areas_Conservacoes.id','Areas_Conservacoes.tipo','municipios.nome_municipio','provincias.nome_provincia']);
        return $areas;
        // return response()->json($areas);
    }


    public function especie_animal(Request $request)
    {

        $id= $request->id_especie;
        $Animais = Animal:: join('especies', 'especies.id','=','animais.id_especie')
        ->where('especies.id',$id)
        ->get (['animais.id','animais.nome_vulgar','animais.nome_cientifico']);
        return $Animais;

    }


    public function  add_area_animal(Request $request)
    {
        $animalarea = new AnimalArea;
        $animalarea->id_animal  = $request->id_animal ;
        $animalarea->id_area = $request->id;
        $animalarea->qtd_animal  = $request->quantidade;

        $animalarea-> save();

        return response()->json($animalarea);


    }





    public function mlistar(Request $request)
    {
        $id= $request->id_provincia;
        $municipios = Municipio:: join('provincias', 'provincias.id','=','municipios.id_provincia')
        ->where('provincias.id',$id)
        ->get (['municipios.id','municipios.nome_municipio']);
        return $municipios;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $moradas = Provincia::all();
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

        $areacconservacao = new Area_Conservacao;
        $areacconservacao->nome_area = $request->nome_area;
        $areacconservacao->id_municipio = $request->id_municipio;
        $areacconservacao->tipo = $request->tipo;

        $areacconservacao-> save();

        return response()->json($areacconservacao);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showArea($id)
    {
        $areas = Area_Conservacao:: join('municipios', 'municipios.id','=','Areas_Conservacoes.id_municipio')
                                ->join('provincias', 'provincias.id','=','municipios.id_provincia')
                                ->where('provincias.id',$id)
                                ->get (['Areas_Conservacoes.nome_area','Areas_Conservacoes.id','Areas_Conservacoes.tipo']);
        return $areas;
    }

    public function show($id)
    {
        $Animais = Animal:: join('animal_areas', 'animal_areas.id_animal','=','animais.id')
        ->join('areas_conservacoes', 'areas_conservacoes.id','=','animal_areas.id_area')
        ->where('areas_conservacoes.id',$id)
        ->get (['animais.id','animais.nome_vulgar','animais.nome_cientifico','animais.tempo_vida']);
        return $Animais;
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
    public function update(Request $request)
    {
        $areaconservacao = Area_Conservacao::find($request->id);
        $areaconservacao->nome_area = $request->nome_area;
        $areaconservacao->id_municipio = $request->id_municipio;

        $areaconservacao->update();
        return response()->json($areaconservacao);
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
