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
        Schema::create('especies', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome_especie");
            $table->unsignedInteger('id_genero');
            $table->foreign('id_genero')->references('id')->on('generos')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('especies');
    }
};
