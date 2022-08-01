<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ParqueController;
use App\Http\Controllers\AreaConservacaoController;
use App\Http\Controllers\AdminparqueController;
use App\Http\Controllers\ContaController;

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


// colocando filtro nos formulários
//Route::When('*','csrf',array('POST'));


//Rotas do director
Route::get('/welcome/{a}', [WelcomeController::class, 'index'])->name('welcome');
Route::post('/acadastro', [WelcomeController::class, 'store']);

// Rotas do Administrador de parque
Route::get('/adminparque',[AdminparqueController::class, 'index'])->name('adminparque');


//Rotas do Departamento
Route::get('/departamento_cadastro', [DepartamentoController::class, 'create'])->name('departamentocadastro');
Route::post('/departamento_cadastro', [DepartamentoController::class, 'store'])->name('departamentocadastro');
Route::get('/departamento_listar', [DepartamentoController::class, 'index'])->name('departamentolistar');
Route::get('/departamento_perfil/{id}', [DepartamentoController::class, 'ver'])->name('departamentoperfil');
Route::get('/departamento_listar_actualizar', [DepartamentoController::class, 'actualizar'])->name('departamentolistaractualizar');
Route::get('/departamento_actualizar/{id}', [DepartamentoController::class, 'edit'])->name('departamentoactualizar');
Route::put('/departamento_actualizar/{id}', [DepartamentoController::class, 'update'])->name('departamentoactualizar');;

//Rotas do parques
Route::get('/parque_cadastro', [ParqueController::class, 'create']);
Route::post('/parque_cadastro', [ParqueController::class, 'store']);
Route::get('/parquelistar', [ParqueController::class, 'index']);

//Rotas das Áreas de conservação


Route::get('/areaccadastro', [AreaConservacaoController::class, 'create'])->name('municipioslistar');
Route::post('/areaccadastrando', [AreaConservacaoController::class, 'store']);
Route::get('/arealistar', [AreaConservacaoController::class, 'index'])->name('arealistar');
// Route::get('/municipioslistar', [AreaConservacaoController::class, 'mlistar'])->name('municipioslistar');
Route::post('/cadastroarea', [AreaConservacaoController::class, 'mlistar'])->name('cadastro_area');
 Route::get('/area-animal/{id}', [AreaConservacaoController::class, 'show']);
Route::post('/updatearea', [AreaConservacaoController::class, 'update']);

//Rotas do Funcionário
Route::get('/funcionario_cadastro', [FuncionarioController::class, 'create'])->name('funcionariocadastro');
Route::post('/funcionario_cadastro', [FuncionarioController::class, 'store'])->name('funcionariocadastro');
Route::get('/funcionario_listar', [FuncionarioController::class, 'index'])->name('funcionariolistar');
Route::get('/funcionario_perfil', [FuncionarioController::class, 'perfil'])->name('funcionarioperfil');
Route::get('/funcionario_listar_actualizar', [FuncionarioController::class, 'actualizar'])->name('funcionariolistaractualizar');
Route::get('/funcionario_actualizar/{id}', [FuncionarioController::class, 'edit'])->name('funcionarioactualizar');
Route::post('/funcionario_actualizar/{id}', [FuncionarioController::class, 'update'])->name('funcionarioactualizar');

//Rotas do Animal
Route::get('/animalcadastro', [AnimalController::class, 'formulario_animal'])->name('animalcadastro');
Route::post('/animalcadastro', [AnimalController::class, 'salvar_animal'])->name('animalpcadastro');
Route::get('/animal_listar', [AnimalController::class, 'listar_animal'])->name('animallistar');


//rotas de gestão de filos
Route::get('/filo_cadastro', [AnimalController::class, 'filo_cadastro'])->name('filocadastro');
Route::get('/filo_listar_cadastrar', [AnimalController::class, 'filo_listar_cadastrar'])->name('filolistarcadastrar');
Route::post('/filo_cadastro', [AnimalController::class, 'filo_salvar'])->name('filosalvar');


//rotas de gestão de sub-filos
Route::get('/sub_filo_cadastro', [AnimalController::class, 'sub_filo_cadastro'])->name('subfilocadastro');
Route::get('/sub_filo_listar_cadastrar', [AnimalController::class, 'sub_filo_listar_cadastrar'])->name('subfilolistarcadastrar');
Route::post('/sub_filo_cadastro', [AnimalController::class, 'sub_filo_salvar'])->name('subfilosalvar');


//rotas de gestão de super-classe
Route::get('/super_classe_cadastro', [AnimalController::class, 'super_classe_cadastro'])->name('superclassecadastro');
Route::get('/super_classe_listar_cadastrar', [AnimalController::class, 'super_classe_listar_cadastrar'])->name('superclasselistarcadastrar');
Route::post('/super_classe_cadastro', [AnimalController::class, 'super_classe_salvar'])->name('superclassesalvar');


//rotas de gestão de classe
Route::get('/classe_cadastro', [AnimalController::class, 'classe_cadastro'])->name('classecadastro');
Route::get('/classe_listar_cadastrar', [AnimalController::class, 'classe_listar_cadastrar'])->name('classelistarcadastrar');
Route::post('/classe_cadastro', [AnimalController::class, 'classe_salvar'])->name('classesalvar');


//rotas de gestão de ordem
Route::get('/ordem_cadastro', [AnimalController::class, 'ordem_cadastro'])->name('ordemcadastro');
Route::get('/ordem_listar_cadastrar', [AnimalController::class, 'ordem_listar_cadastrar'])->name('ordemlistarcadastrar');
Route::post('/ordem_cadastro', [AnimalController::class, 'ordem_salvar'])->name('ordemsalvar');


//rotas de gestão de familia
Route::get('/familia_cadastro', [AnimalController::class, 'familia_cadastro'])->name('familiacadastro');
Route::get('/familia_listar_cadastrar', [AnimalController::class, 'familia_listar_cadastrar'])->name('familialistarcadastrar');
Route::post('/familia_cadastro', [AnimalController::class, 'familia_salvar'])->name('familiasalvar');


//rotas de gestão de genero
Route::get('/genero_cadastro', [AnimalController::class, 'genero_cadastro'])->name('generocadastro');
Route::get('/genero_listar_cadastrar', [AnimalController::class, 'genero_listar_cadastrar'])->name('generolistarcadastrar');
Route::post('/genero_cadastro', [AnimalController::class, 'genero_salvar'])->name('generosalvar');


//rotas de gestão de especie
Route::get('/especielistar', [AnimalController::class, 'especie_listar']);
Route::get('/especie_cadastro', [AnimalController::class, 'especie_cadastro'])->name('especiecadastro');
Route::get('/especie_listar_cadastrar', [AnimalController::class, 'especie_listar_cadastrar'])->name('especielistarcadastrar');
Route::post('/especie_cadastro', [AnimalController::class, 'especie_salvar'])->name('especiesalvar');


// Verifica
Route::post('/verifica', [AnimalController::class, 'verifica'])->name('verifica');



//Rotas de conta de utilizadores

Route::get('/conta_listar_cadastrar', [ContaController::class, 'listar_cadastrar'])->name('contalistarcadastrar');
Route::get('/conta_registo/{id}', [ContaController::class, 'index'])->name('contaregisto');
Route::post('/conta_registo', [ContaController::class, 'store'])->name('contaregisto');
Route::get('/conta_listar', [ContaController::class, 'conta_listar'])->name('contalistar');







//Rotas de Login
//Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/entrar', [LoginController::class, 'storlogin'])->name('entrar');
Route::get('/', [LoginController::class, 'index'])->name('inicio');

//Rotas de Logout
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');


//Rotas de registo
Route::post('/registo', [LoginController::class, 'store'])->name('registo');


//os routas abaixo precism ser verificadas
Route::get('/buscarprovincia', [DepartamentoController::class, 'getProvinciaAll']);
Route::get('/buscarmunicipio/{id}', [DepartamentoController::class, 'getMunicipioAll']);



//Route::get('/', function () {
    //return view('/logit');
//})->name('login');




Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');



