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
        Schema::create('animal_areas', function (Blueprint $table) {
            $table->integer('qtd_animal');
            $table->unsignedInteger('id_animal');
            $table->unsignedInteger('id_area');
            $table->primary(['id_animal', 'id_area']);
            $table->foreign('id_animal')->references('id')->on('animais');
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
        Schema::dropIfExists('animal_areas');
    }
};
