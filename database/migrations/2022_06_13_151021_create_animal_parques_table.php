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
        Schema::create('animal_parques', function (Blueprint $table) {
            $table->integer('qtd_animal');
            $table->unsignedInteger('id_animal');
            $table->unsignedInteger('id_parque');
            $table->primary(['id_animal', 'id_parque']);
            $table->foreign('id_animal')->references('id')->on('animais');
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
        Schema::dropIfExists('animal_parques');
    }
};
