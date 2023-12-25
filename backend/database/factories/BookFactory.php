<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'publisher' => fake()->company(),
            'writter' => fake()->name(),
            'year' => fake()->year(),
            'code' => uniqid(),
            'location' => fake()->randomLetter() . '-' . fake()->randomNumber(),
            'is_holded' => fake()->boolean(),
        ];
    }
}
