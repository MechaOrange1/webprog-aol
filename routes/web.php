<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Subjects
    Route::get('/subjects', [App\Http\Controllers\SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/subjects/{subject}', [App\Http\Controllers\SubjectController::class, 'show'])->name('subjects.show');

    // Student Actions
    Route::middleware('student')->group(function () {
        Route::post('/subjects/{subject}/enroll', [App\Http\Controllers\SubjectController::class, 'enroll'])->name('subjects.enroll');
        Route::post('/lessons/{lesson}/complete', [App\Http\Controllers\LessonController::class, 'complete'])->name('lessons.complete');
        Route::post('/quizzes/{quiz}/submit', [App\Http\Controllers\QuizController::class, 'submit'])->name('quizzes.submit');
        Route::get('/student-dashboard', [App\Http\Controllers\StudentDashboardController::class, 'index'])->name('student-dashboard');
    });

    // Lessons (View only, completion is protected)
    Route::get('/lessons/{lesson}', [App\Http\Controllers\LessonController::class, 'show'])->name('lessons.show');

    // Quizzes (View only, submission is protected)
    Route::get('/quizzes/{quiz}', [App\Http\Controllers\QuizController::class, 'show'])->name('quizzes.show');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('subjects', App\Http\Controllers\SubjectManagementController::class);

        // Lessons
        Route::get('/subjects/{subject}/lessons/create', [App\Http\Controllers\LessonManagementController::class, 'create'])->name('lessons.create');
        Route::post('/subjects/{subject}/lessons', [App\Http\Controllers\LessonManagementController::class, 'store'])->name('lessons.store');
        Route::get('/lessons/{lesson}/edit', [App\Http\Controllers\LessonManagementController::class, 'edit'])->name('lessons.edit');
        Route::put('/lessons/{lesson}', [App\Http\Controllers\LessonManagementController::class, 'update'])->name('lessons.update');
        Route::delete('/lessons/{lesson}', [App\Http\Controllers\LessonManagementController::class, 'destroy'])->name('lessons.destroy');

        // Quizzes
        Route::get('/subjects/{subject}/quizzes/create', [App\Http\Controllers\QuizManagementController::class, 'create'])->name('quizzes.create');
        Route::post('/subjects/{subject}/quizzes', [App\Http\Controllers\QuizManagementController::class, 'store'])->name('quizzes.store');
        Route::get('/quizzes/{quiz}/edit', [App\Http\Controllers\QuizManagementController::class, 'edit'])->name('quizzes.edit');
        Route::put('/quizzes/{quiz}', [App\Http\Controllers\QuizManagementController::class, 'update'])->name('quizzes.update');
        Route::delete('/quizzes/{quiz}', [App\Http\Controllers\QuizManagementController::class, 'destroy'])->name('quizzes.destroy');

        // Questions
        Route::get('/quizzes/{quiz}/questions/create', [App\Http\Controllers\QuestionManagementController::class, 'create'])->name('questions.create');
        Route::post('/quizzes/{quiz}/questions', [App\Http\Controllers\QuestionManagementController::class, 'store'])->name('questions.store');
    });
});

require __DIR__ . '/auth.php';
