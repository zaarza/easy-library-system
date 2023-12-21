<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function login(UserLoginRequest $request) {
        $data = $request->validated();

        // Invalid username or password
        $user = User::where([
            'username' => $data['username'],
        ])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => "Invalid username or password."
            ], 401);
        }

        $token = $user->createToken('token');

        return response()->json([
            'message' => 'Login success.',
            'token' => $token->plainTextToken,
        ], 200);
    }
}
