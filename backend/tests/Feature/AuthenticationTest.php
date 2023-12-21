<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login()
    {
        $user = User::factory()->create();
        $response = $this->post('/api/users/login', [
            'username' => $user->username,
            'password' => 'password'    
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertOk();
        $this->assertNotNull($response->decodeResponseJson()['token']);
    }
}
