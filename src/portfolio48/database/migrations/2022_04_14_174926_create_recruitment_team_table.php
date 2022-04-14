<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecruitmentTeamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recruitment_team', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('recruitment_id');
        $table->unsignedBigInteger('team_id');
        $table
            ->foreign('recruitment_id')
            ->references('id')
            ->on('recruitments')
            ->onDelete('cascade');
        $table
            ->foreign('team_id')
            ->references('id')
            ->on('teams')
            ->onDelete('cascade');
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
        Schema::dropIfExists('recruitment_team');
    }
}
