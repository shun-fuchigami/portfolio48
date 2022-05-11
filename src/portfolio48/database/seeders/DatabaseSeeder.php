<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            UserTableSeeder::class,
            TeamTableSeeder::class,
            RecruitmentTableSeeder::class,
            TagTableSeeder::class,
            Recruitment_TagTableSeeder::class,
            Recruitment_UserTableSeeder::class,
            Team_UserTableSeeder::class,
            PositionTableSeeder::class,
            Position_UserTableSeeder::class,
        ]);
    }
}
