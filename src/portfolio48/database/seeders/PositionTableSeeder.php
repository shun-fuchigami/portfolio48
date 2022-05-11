<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PositionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('positions')->insert([
            [
                'name' => "未選択",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "監督",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "オーナー",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "マネージャー",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "GK",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "CB",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "LSB",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "RSB",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "DMF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "CMF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "OMF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "LMF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "RMF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "LWG",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "RWG",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "ST",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "CF",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
