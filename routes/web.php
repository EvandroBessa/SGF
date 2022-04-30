<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/filo_listar_cadastrar', [AnimalController::class, 'filo_listar_cadastrar'])->name('filolistarcadastrar');

Route::get('/', function () {
    return view('welcome');
});




