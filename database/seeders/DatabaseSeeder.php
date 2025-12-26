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

        // 3. Create School Subjects and Content
        $schoolSubjects = [
            [
                'title' => 'Matematika',
                'description' => 'Belajar matematika dasar hingga lanjutan untuk tingkat SMA, SMP, dan SD',
                'level' => 'SMA',
                'price' => 150000,
                'thumbnail_url' => '/img/mathematics.png',
            ],
            [
                'title' => 'Bahasa Indonesia',
                'description' => 'Materi pembelajaran bahasa Indonesia untuk semua jenjang pendidikan',
                'level' => 'SMP',
                'price' => 120000,
                'thumbnail_url' => '/img/indonesian.png',
            ],
            [
                'title' => 'Bahasa Inggris',
                'description' => 'Pelajari bahasa Inggris dari dasar hingga mahir',
                'level' => 'SMA',
                'price' => 180000,
                'thumbnail_url' => '/img/english.png',
            ],
            [
                'title' => 'Ilmu Pengetahuan Alam (IPA)',
                'description' => 'Konsep dasar sains untuk memahami alam semesta',
                'level' => 'SMP',
                'price' => 140000,
                'thumbnail_url' => '/img/science.png',
            ],
            [
                'title' => 'Ilmu Pengetahuan Sosial (IPS)',
                'description' => 'Memahami sejarah, geografi, ekonomi, dan sosiologi',
                'level' => 'SMA',
                'price' => 130000,
                'thumbnail_url' => '/img/social.png',
            ],
            [
                'title' => 'Fisika',
                'description' => 'Materi fisika untuk siswa SMA dengan konsep yang mudah dipahami',
                'level' => 'SMA',
                'price' => 160000,
                'thumbnail_url' => '/img/physics.png',
            ],
            [
                'title' => 'Kimia',
                'description' => 'Belajar kimia dari atom hingga reaksi kimia',
                'level' => 'SMA',
                'price' => 155000,
                'thumbnail_url' => '/img/chemistry.png',
            ],
            [
                'title' => 'Biologi',
                'description' => 'Mempelajari kehidupan makhluk hidup dan ekosistem',
                'level' => 'SMA',
                'price' => 145000,
                'thumbnail_url' => '/img/biology.png',
            ],
        ];

        $subjects = collect($schoolSubjects)->map(function ($subjectData) {
            return Subject::create($subjectData);
        });

        // Create Lessons and Quizzes for each subject
        $subjects->each(function ($subject) {

            // Create Lessons for each subject (5 lessons per subject)
            $lessonTitles = [
                'Pengenalan dan Konsep Dasar',
                'Materi Pokok Bagian 1', 
                'Materi Pokok Bagian 2',
                'Latihan dan Soal',
                'Rangkuman dan Evaluasi'
            ];

            foreach ($lessonTitles as $index => $title) {
                Lesson::create([
                    'subject_id' => $subject->id,
                    'title' => $title,
                    'content' => "Konten pembelajaran untuk {$subject->title} - {$title}",
                    'video_url' => "https://example.com/video/{$subject->id}/" . ($index + 1),
                    'sequence' => $index + 1,
                ]);
            }

            // Create Quizzes for each subject (2 quizzes per subject)
            Quiz::factory(2)->create([
                'subject_id' => $subject->id,
            ])->each(function ($quiz) {

                // Create Questions for each quiz (3 questions per quiz)
                Question::factory(3)->create(['quiz_id' => $quiz->id])->each(function ($question) {

                    // Create Options for each question (1 correct, 3 incorrect)
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
