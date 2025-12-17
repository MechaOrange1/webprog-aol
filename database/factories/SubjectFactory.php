<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'thumbnail_url' => 'https://via.placeholder.com/640x480.png/0077dd?text=' . fake()->word(),
            'level' => fake()->randomElement(['SD', 'SMP', 'SMA']),
            'price' => fake()->randomFloat(2, 0, 1000000),
        ];
    }
}
