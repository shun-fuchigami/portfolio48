<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            [
                'name' => "女子サッカー",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "新チームメンバー募集",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "初心者歓迎",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "年齢・性別不問",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "参加・不参加自由",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "男女混合",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "横浜市周辺",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "幼稚園児(年中・年長)",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "小学生",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "社会人サッカー",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "地域リーグ参加",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "足立区",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "経験者募集",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "性別・年齢不問",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "経験者優遇",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
