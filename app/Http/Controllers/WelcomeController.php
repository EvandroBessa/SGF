<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\Municipio;
use App\Models\Area_Conservacao;
use Illuminate\Support\Facades\Log;

class WelcomeController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $dados = [
            'user' => Auth()->user(),

            ];

        return view ('welcome',$dados);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // $teste = $request->get('rel');
         //dd(request());

        // error_log('Some message here PPPPPPPPPPPPP: '.$request);

        // Log::info('quero saber o que e: ' .$request);

        // $areacconservacao = new Area_Conservacao;
        // $areacconservacao->nome_area = $request->nome_area;
        // $areacconservacao->id_municipio = $request->id_municipio;

        // // $areaconservacao-> save();
        // // return redirect('/areaccadastro');


        // $areacconservacao-> save();

        //  return $areacconservacao;



    $data = Area_Conservacao::insert([
        'nome_area' => $request->nome_area,
        'id_municipio' => $request->id_municipio,
    ]);


    return response()->json($data);
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
}
}
