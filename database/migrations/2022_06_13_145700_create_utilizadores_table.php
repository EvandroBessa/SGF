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
        Schema::create('utilizadores', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome_utilizador");
            $table->string("palavra_pass");
            $table->string("email")->unique();
            $table->unsignedInteger('id_funcionario');
            $table->unsignedInteger('id_papel');
            $table->foreign('id_funcionario')->references('id')->on('funcionarios')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_papel')->references('id')->on('papeis')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('utilizadores');
    }
};
