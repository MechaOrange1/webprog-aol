<?php

namespace Database\Seeders;

use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizResult;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        // 2. Create Students
        $students = User::factory(10)->create(['role' => 'student']);

        // 3. Create Subjects and Content
        $subjects = Subject::factory(5)->create()->each(function ($subject) {

            // Create Lessons for each subject
            Lesson::factory(10)->create(['subject_id' => $subject->id]);

            // Create Quizzes for each subject
            Quiz::factory(2)->create(['subject_id' => $subject->id])->each(function ($quiz) {

                // Create Questions for each quiz
                Question::factory(5)->create(['quiz_id' => $quiz->id])->each(function ($question) {

                    // Create Options for each question
                    Option::factory()->create([
                        'question_id' => $question->id,
                        'is_correct' => true,
                    ]);
                    Option::factory(3)->create([
                        'question_id' => $question->id,
                        'is_correct' => false,
                    ]);
                });
            });
        });

        // 4. Enrollments and Progress
        $students->each(function ($student) use ($subjects) {
            // Enroll in 1-3 random subjects
            $enrolledSubjects = $subjects->random(rand(1, 3));

            $enrolledSubjects->each(function ($subject) use ($student) {
                // Create Enrollment
                Enrollment::factory()->create([
                    'user_id' => $student->id,
                    'subject_id' => $subject->id,
                ]);

                // Create Lesson Progress for some lessons
                $subject->lessons->random(rand(1, 5))->each(function ($lesson) use ($student) {
                    LessonProgress::factory()->create([
                        'user_id' => $student->id,
                        'lesson_id' => $lesson->id,
                    ]);
                });

                // Create Quiz Results for some quizzes
                $subject->quizzes->each(function ($quiz) use ($student) {
                    if (fake()->boolean(70)) { // 70% chance to have taken the quiz
                        QuizResult::factory()->create([
                            'user_id' => $student->id,
                            'quiz_id' => $quiz->id,
                        ]);
                    }
                });
            });
        });
    }
}
