<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->string("email")->unique();
            $table->date("data_nascimento");
            $table->string("bi")->unique();
            $table->string("genero");
            $table->string("imagem");
            $table->unsignedInteger('id_departamento');
            $table->unsignedInteger('id_cargo');
            $table->unsignedInteger('id_municipio');
            $table->foreign('id_departamento')->references('id')->on('departamentos')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_cargo')->references('id')->on('cargos')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_municipio')->references('id')->on('municipios')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('funcionarios');
    }
};
