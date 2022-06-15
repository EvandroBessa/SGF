<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\Funcionarios;
use App\Models\Papeis;
use App\Models\Municipio;
use App\Models\Funcionario;
use App\Models\Departamento;
use App\Models\Cargo;
use App\Models\User;



class ContaController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $papeis = Papeis ::all();
        $funcionario = Funcionario::findOrFail($id);
        $dados = [

            'user' => Auth()->user(),
            'papelUser' => Papeis ::where('id',Auth()->user()->id_papel)->first(),
            'papeis' => $papeis,
            'id' => $id,
            'funcionario' =>$funcionario,
            ];

        return view('/conta_registo',$dados);
    }




    public function listar_cadastrar()
    {

        $funcionariolistaractualizar =DB::select('

        SELECT funcionarios.id, funcionarios.nome, funcionarios.email, cargos.nome_cargo, departamentos.nome_departamento, municipios.nome_municipio,provincias.nome_provincia
        FROM funcionarios
        INNER JOIN municipios on municipios.id = funcionarios.id_municipio
        INNER JOIN provincias on municipios.id_provincia = provincias.id
        INNER JOIN cargos on cargos.id = funcionarios.id_cargo
        INNER JOIN departamentos on departamentos.id = funcionarios.id_departamento

       ');
       $dados = [

        'user' => Auth()->user(),
        'papelUser' => Papeis ::where('id',Auth()->user()->id_papel)->first(),
        'senha' => User :: where('password',Auth()->user()->password)->first(),

        ];

        return view ('conta_listar_cadastrar',['funcionariolistaractualizar'=> $funcionariolistaractualizar], $dados);
    }




    public function conta_listar(){

        $conta_papel =DB::select('

        SELECT papeis.nome_papel, users.id, users.name, users.email
        FROM papeis
        INNER JOIN  users on users.id_papel = papeis.id


       ');

        $papeis = Papeis ::all();
        // $funcionario = Funcionario::all();
        $user1 = User ::all();
        $dados = [

            'user' => Auth()->user(),
            'papelUser' => Papeis ::where('id',Auth()->user()->id_papel)->first(),
            'papeis' => $papeis,
            'conta_papel' => $conta_papel,
            ];

        $conta['success']= true;
        $conta['message']= 'Nada Bom';
        $conta ['data'] = $dados;

        echo json_encode($conta);
        return;

        // return view("conta_listar",$dados);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            /*
            $pessoas = new Pessoas;
            $pessoas->nome = $request->nome;
            $pessoas->nome_utilizador = $request->nome_utilizador;
            $pessoas->palavra_pass = $request->palavra_pass;
            $pessoas->email = $request->email;
            $pessoas->data_nascimento = $request->data_nascimento;
            $pessoas->bi = $request->bi;
            $pessoas->genero = $request->genero;
            $pessoas->id_morada = $request->id_morada;
            $pessoas-> save();

            $user = new Users;
            $user->name = $request->nome_utilizador;
            $user->password = bcrypt($request->palavra_pass);
            $user->email = $request->email;
            $user ->save();*/

            $user = new User;

            $user->name = $request->nome_utilizador;
            $user->password = bcrypt($request->palavra_passe);
            $user->email = $request->email;

            $user->id_papel = $request->id_papel;
            $user->id_funcionario =$request->id_funcionario;


            $user ->save();
            DB::commit();



            return redirect('/conta_listar');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withInput()->withErrors([$e->getMessage()]);
        }

        return redirect('/conta_listar_cadastrar');
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
