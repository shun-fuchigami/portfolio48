<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->insert([
            [
                'owner_id' => 1,
                'name' => "方南キッカーズ",
                'desc' => "方南町で活動している女子サッカーチームです。
                今年設立したばかりの若いチームです。

                真剣に楽しめるチームを目指してます！


                活動頻度:週1回 土日どちらか
                年齢層:20代〜30代多め",
                'area' => "杉並区周辺",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'owner_id' => 2,
                'name' => "世田谷FC",
                'desc' => "世田谷区の20代・30代中心のチームです。
                ※世田谷区民以外も大歓迎！

                土日の正午からゆるく活動中",
                'area' => "二子玉川緑地運動場",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'owner_id' => 4,
                'name' => "綱島FC",
                'desc' => "男女混合のサッカーチームです。
                月2回ほど人数の集まり具合に合わせてサッカー・フットサルをしています。

                メンバーのほとんどが学生時代サッカー未経験なので、どんな方でも気兼ねなく参加できます！

                参加頻度のノルマなどは無いので、年数回だけふらっと参加するなどもOK。
                緩く楽しくボールを蹴りたい方は是非綱島FCへ!",
                'area' => "横浜市周辺のグラウンドや体育館",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'owner_id' => 3,
                'name' => "川崎ジュニアサッカークラブ",
                'desc' => "幼稚園(年中・年長)〜小学校6年生までを対象としたサッカークラブです。

                元Jリーガー選手の方がコーチをしてくださっており、お子様のスキルに合わせてグループ編成を行い、無理なく活動ができるよう心がけております。

                お陰様でメンバーが100人を超え、活気のある活動が出来ております。

                体験練習も随時募集中です。
                気になる方はお電話ください。
                090-123-4567
                担当：相沢",
                'area' => "丸子橋第2広場",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'owner_id' => 5,
                'name' => "足立社会人SC",
                'desc' => "足立区周辺の社会人が集まって設立されたチームです。
                現在地域リーグ優勝目指して、積極的に活動を行なっております。

                メンバ参加希望の方は募集ページの募集要項をご確認ください。",
                'area' => "足立区周辺",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'owner_id' => 3,
                'name' => "川崎社会人蹴球会",
                'desc' => "元Jリーガー選手数名所属の社会人サッカークラブです。
                サッカー経験者多数在籍中。

                系列チーム「川﨑ジュニアサッカークラブ」と一緒に活動中です。

                090-123-4567

                担当：相沢",
                'area' => "丸子橋第2広場",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
