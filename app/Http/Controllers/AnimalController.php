<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function filo_listar_cadastrar(){
        return view("/filo_listar_cadastrar");
    }
}
