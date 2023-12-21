<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => 'admin',
            'name' => 'Admin',
            'phone_number' => 0,
            'role_id' => 1,    
        ]);
        
        User::factory(10)->create();
    }
}
