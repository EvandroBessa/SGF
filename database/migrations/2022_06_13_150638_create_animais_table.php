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
        Schema::create('animais', function (Blueprint $table) {

            $table->increments('id');
            $table->string("nome_vulgar");
            $table->string("nome_cientifico");
            $table->string("tempo_vida");
            $table->string("tempo_reproducao");
            $table->string("locomucao");
            $table->string("imagem");
            $table->integer('qtd_animal');
            $table->unsignedInteger('id_categoria');
            $table->unsignedInteger('id_especie');
            $table->foreign('id_categoria')->references('id')->on('categorias')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_especie')->references('id')->on('especies')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('animais');
    }
};
