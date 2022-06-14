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
        Schema::create('funcionario_parques', function (Blueprint $table) {
            $table->unsignedInteger('id_funcionario');
            $table->unsignedInteger('id_parque');
            $table->primary(['id_funcionario', 'id_parque']);
            $table->foreign('id_funcionario')->references('id')->on('funcionarios');
            $table->foreign('id_parque')->references('id')->on('parques');
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
        Schema::dropIfExists('funcionario_parques');
    }
};
