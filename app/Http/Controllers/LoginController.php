<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\Funcionarios;
use App\Models\Papeis;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(session('senha')){
            return view('login')->with('x','utilizador Inválido');
        }
        return view('login');
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

    }

    public function storlogin(Request $request)
    {



        $dados =[
            'email'=>$request->email,
            'password'=> $request->password,
        ];

        if(!filter_var($request->email, filter:FILTER_VALIDATE_EMAIL)){
            $login['success']= false;
            $login['message']= 'Email Invalido';
            $login ['data'] = $dados;
            echo json_encode($login);
        }


        if(Auth::attempt($dados)) {
            //dd(Auth()->user());
            // $papel= Papeis ::where('id',Auth()->user()->id_papel)->first();

            // $res->user
            $dados = [
            'user' => Auth()->user(),
            ];
            $login['success']= true;
            $login['message']= 'Nada Bom';
            $login ['data'] = $dados;

            echo json_encode($login);
            return;

            //return view('welcome',$dados);
            // if($papel->nome_papel == 'administrador máximo'){
            //     //return redirect(route('director'));
            //     //return redirect(route ('director',$dados));
            //     return view('welcome',$dados);

            // }elseif($papel->nome_papel == 'operador'){
            //     return view('director',$dados);

            // }elseif($papel->nome_papel =='técnico de departamento'){
            //     return view('director',$dados);

            // }elseif($papel->nome_papel =='Administrador'){
            //     return view('director',$dados);
            // }else{
            //     $id=0;
            //     return redirect(route('inicio',$id))->with('senha','utilizador Inválido');
            // }
            //$user->tipo == 'gestor';

        }else{
            $login['success']= false;
            $login['message']= 'Utilizador nao autenticado';
            $login ['data'] = $dados;

            echo json_encode($login);
            return ;
        }
    }


    public function logout(){
        if(Auth::check() === true){
            Auth::logout();
            Session::flush();
            return redirect(route('inicio'));
        }else{
            return redirect(route('inicio'));
        }
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
