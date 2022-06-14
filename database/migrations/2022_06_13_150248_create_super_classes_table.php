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
        Schema::create('super_classes', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome_super_classe");
            $table->unsignedInteger('id_sub_filo');
            $table->foreign('id_sub_filo')->references('id')->on('sub_filos')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('super_classes');
    }
};
