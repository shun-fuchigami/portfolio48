<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Team_UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('team_user')->insert([
            [
                'team_id' => 5,
                'user_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_id' => 4,
                'user_id' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
