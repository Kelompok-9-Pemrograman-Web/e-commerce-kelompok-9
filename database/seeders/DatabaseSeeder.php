<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(AdminUserSeeder::class);

        // User::factory()->create([
        //     'name' => 'admin1',
        //     'email' => 'admin1@example.com',
        //     'password' => Hash::make('password123'),
        //     'role' => 'admin'
        // ]);
    }
}
