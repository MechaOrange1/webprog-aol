<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load(['enrollments.subject', 'quizResults.quiz', 'lessonProgress.lesson']);

        return Inertia::render('StudentDashboard', [
            'enrollments' => $user->enrollments,
            'quizResults' => $user->quizResults,
            'recentProgress' => $user->lessonProgress,
        ]);
    }
}
