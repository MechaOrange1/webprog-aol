<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubjectController extends Controller
{
public function index()
{
    $user = Auth::user();

    $subjects = Subject::all()->map(function ($subject) use ($user) {
        return [
            'id' => $subject->id,
            'title' => $subject->title,
            'description' => $subject->description,
            'thumbnail_url' => $subject->thumbnail_url,
            'level' => $subject->level,
            'price' => $subject->price,
            'is_enrolled' => $user ? $user->enrollments()->where('subject_id', $subject->id)->exists() : false,
        ];
    });

    return Inertia::render('Subjects/Index', [
        'subjects' => $subjects,
    ]);
}

    public function show(Subject $subject)
    {
        $user = Auth::user();
        $isEnrolled = $user ? $user->enrollments()->where('subject_id', $subject->id)->exists() : false;

        // Eager load progress if enrolled
        $completedLessons = [];
        if ($isEnrolled) {
            $completedLessons = $user->lessonProgress()
                ->whereIn('lesson_id', $subject->lessons()->pluck('id'))
                ->where('is_completed', true)
                ->pluck('lesson_id')
                ->toArray();
        }

        return Inertia::render('Subjects/Show', [
            'subject' => $subject,
            'lessons' => $subject->lessons()->orderBy('sequence')->get(),
            'quizzes' => $subject->quizzes,
            'isEnrolled' => $isEnrolled,
            'completedLessons' => $completedLessons,
        ]);
    }

    public function enroll(Request $request, Subject $subject)
    {
        $user = $request->user();

        if (!$user->enrollments()->where('subject_id', $subject->id)->exists()) {
            Enrollment::create([
                'user_id' => $user->id,
                'subject_id' => $subject->id,
                'enrolled_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Enrolled successfully!');
    }
}
