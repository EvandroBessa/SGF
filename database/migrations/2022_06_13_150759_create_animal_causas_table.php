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
        Schema::create('animal_causas', function (Blueprint $table) {

            $table->unsignedInteger('id_animal');
            $table->unsignedInteger('id_causas');
            $table->primary(['id_animal', 'id_causas']);
            $table->foreign('id_animal')->references('id')->on('animais');
            $table->foreign('id_causas')->references('id')->on('principais_causas');
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
        Schema::dropIfExists('animal_causas');
    }
};
