<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'ノグチ ミスズ',
                'email' => 'misuzu_noguchi@xximu.okx',
                'intro' => '杉並区周辺で活動している女子サッカーチームを運営しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'ナカオ マサヒロ',
                'email' => 'masahiro7565@xrlc.aab',
                'intro' => '世田谷区でゆるく活動しているサッカーチームを運営しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'アイザワ スズネ',
                'email' => 'suzune6162@mzpupfn.pm',
                'intro' => '川崎でサッカーチームをジュニア部門と社会人部門の2チーム運営しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ササモリ ミク',
                'email' => 'bjzhykkvzmumiku5078@blkjwbn.ny',
                'intro' => '横浜市周辺で活動する男女混合サッカーチームの綱島FCを運営しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'オガサワラ コウセイ',
                'email' => 'qmihqiipkousei875@abhlkipndm.cyjqo.iu',
                'intro' => '地域リーグ優勝を目指す「足立社会人SC」を運営しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'タケシタ タツオ',
                'email' => 'tatsuo3816@klelajub.fg',
                'intro' => 'サッカー未経験ですが、最近サッカーを始めました。
                楽しくサッカーができるチームを探しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'オクノ アンリ',
                'email' => 'anri6927@bzyb.hmnti.ct',
                'intro' => '小学生の頃、女子サッカーをしていました。
                運動不足解消のためボールを蹴れるチームを探しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'マキ タモツ',
                'email' => 'tamotsu660@rvgn.ifoo.lg',
                'intro' => '小学校〜大学までサッカーを続けていました。
                社会人でも真剣にサッカーができる環境をさがしています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ウエキ ブンペイ',
                'email' => 'bumpei83532@zmxa.jaa',
                'intro' => 'ポジションはGKです。大学生までサッカー部に所属していました。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ヤマムラ カズオ',
                'email' => 'kazuoyamamura@cagdhsteo.za',
                'intro' => '高校までサッカーをしていました。ワイワイサッカーができるようなチームを探しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ヤザキ マリ',
                'email' => 'mari87384@whhh.vgp',
                'intro' => '息子がサッカーを始めたがっており、ジュニアのサッカーチームを探しています。',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ゴトウ アヤネ',
                'intro' => '幼稚園でサッカーをしていた息子がいます。
                もうすぐ小学生になるにあたってジュニアサッカーチームを探しています。',
                'email' => 'ayane0170@vtnpf.mth',
                'password' => Hash::make('password'), // password
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
