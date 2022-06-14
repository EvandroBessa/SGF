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
        Schema::create('funcionario_areas', function (Blueprint $table) {
            $table->unsignedInteger('id_funcionario');
            $table->unsignedInteger('id_area');
            $table->primary(['id_funcionario', 'id_area']);
            $table->foreign('id_funcionario')->references('id')->on('funcionarios');
            $table->foreign('id_area')->references('id')->on('areas_conservacoes');
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
        Schema::dropIfExists('funcionario_areas');
    }
};
