<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Recruitment_UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recruitment_user')->insert([
            [
                'recruitment_id' => 3,
                'user_id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'recruitment_id' => 3,
                'user_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'recruitment_id' => 5,
                'user_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'recruitment_id' => 4,
                'user_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
