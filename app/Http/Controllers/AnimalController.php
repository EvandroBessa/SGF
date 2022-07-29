<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Especie;
use App\Models\Categoria;
use App\Models\Animal;

class AnimalController extends Controller
{
    public function filo_listar_cadastrar(){
        return view("/filo_listar_cadastrar");
    }


    public function especie_listar()
    {
        $especies = Especie::all();
        return response()->json($especies);
       
    }


    public function salvar_animal(Request $request)
    {

        // $regras =([
        //     'nome_cientifico'=>'required|max:200',
        //     'nome_vulgar' => 'required|max:200',
        //     'especie' => 'required'
        // ]);
        // $mensagens =([
        //     'required'=>'O Campo :attribute não Pode estar vazio',
        //     'max'=>'O Campo :attribute excedeu o tamanho máximo de caracteres',
        //     //'nomedepartamento.required'=>'O Campo Nome do Departamento não Pode estar vazio',
        //     //'val_municipio.required' => 'O campo Municipio não pode estar vazio'
        // ]);

        // $validar = $request->validate($regras,$mensagens);
        $animal = new Animal;
        
        $animal->nome_cientifico = $request->nome_cientifico;
        $animal->nome_vulgar = $request->nome_vulgar;
        $animal->id_especie = $request->especie;

        $animal-> save();
        return redirect('/animalcadastro')->with('animal','Animal Cadastrado com Sucesso');
    }

}
