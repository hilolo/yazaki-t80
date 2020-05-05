<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIndivcostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indivcosts', function (Blueprint $table) {
            $table->Increments('id');
            $table->string('category');
            $table->string('client');
            $table->string('projet');
            $table->float('amount', 8, 2);
            $table->string('reason');
            $table->boolean('responsibility');
            $table->integer('cost_id')->unsigned();
            $table->foreign('cost_id')->references('id')->on('costs');
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
        Schema::dropIfExists('indivcosts');
    }
}
