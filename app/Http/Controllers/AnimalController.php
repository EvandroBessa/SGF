<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Especie;
use App\Models\Categoria;
use App\Models\Animal;
use Illuminate\Support\Facades\DB;

class AnimalController extends Controller
{
    public function filo_listar_cadastrar(){
        return view("/filo_listar_cadastrar");
    }


    public function animal_img($id){
        $an_img =Animal:: select('animais.imagem')
        ->where('animais.id',$id)->get();

        return response()->json($an_img);
    }



    public function especie_listar()
    {
        $especies = Especie::all();
        return response()->json($especies);

    }
public function animal_province(){

    // SELECT COUNT(*) AS total, provincia FROM socios s, pastas p, caixas c, provincias pv
    //                                             WHERE YEAR(datadigitalizacao) = '${year}' and s.pastaid = p.PastaId and p.CaixaId = c.CaixaId
    //                                             and c.ProvinciaId = pv.ProvinciaId and c.NomeDigitalizador = '${username}'
    //                                             GROUP BY PROVINCIA

    $Animal_p =Animal:: join ('animal_areas','animal_areas.id_animal','=','animais.id')
    ->join('areas_conservacoes','areas_conservacoes.id','=','animal_areas.id_area')
    ->join('municipios','municipios.id','=','areas_conservacoes.id_municipio')
    ->join('provincias','provincias.id','=','municipios.id_provincia')
    ->select('provincias.nome_provincia',DB::raw('COUNT(*) AS Total '))
    ->groupBy('provincias.nome_provincia')->get();

    return response()->json($Animal_p);
}
    public function cont_animal(){
        // $animais =Animal::all();

        // return response()->json($animais);
        // $valor = 2500;
        // DB::select("SELECT juros FROM parcelas WHERE $valor BETWEEN valor_min AND valor_max");

        $animais= DB::select("SELECT ('Total Cadastrados') Designacao, count(*) as Total  FROM animais
        UNION ALL select ('Adicionados nas Areas de Conservaçao') Designacao,  count(*) as Total from animais,animal_areas WHERE animais.id =animal_areas.id_animal");

        // select ('Total Verificado') Designacao, count(*) as total from socios where EstadoDocumento = 'VALIDADO'
        //       UNION ALL select ('Total Digitalizado') Designacao, count(*) as total from socios

        // $animais = Animal::get(['animais.nome_vulgar'])->count();
        return response()->json($animais);
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
        $animal->imagem = $request->imagem;

        $animal-> save();
        return response()->json($animal);
    }

}
