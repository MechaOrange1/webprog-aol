<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // 6 subject untuk rekomendasi (tampilan card)
        $recommendedSubjects = Subject::latest()->take(6)->get();

        // SEMUA subject untuk SEARCH
        $allSubjects = Subject::select('id', 'title', 'description')->get();

        // Subject yang sudah di-enroll user
        $enrolledSubjects = $user
            ? $user->enrollments()->with('subject')->get()->pluck('subject')
            : collect();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'recommendedSubjects' => $recommendedSubjects,
            'allSubjects' => $allSubjects,
            'enrolledSubjects' => $enrolledSubjects,
        ]);
    }
}
