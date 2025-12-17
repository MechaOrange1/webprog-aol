<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    public function show(Lesson $lesson)
    {
        $lesson->load('subject');
        $user = Auth::user();

        $isCompleted = false;
        if ($user) {
            $isCompleted = $user->lessonProgress()
                ->where('lesson_id', $lesson->id)
                ->where('is_completed', true)
                ->exists();
        }

        return Inertia::render('Lessons/Show', [
            'lesson' => $lesson,
            'isCompleted' => $isCompleted,
        ]);
    }

    public function complete(Request $request, Lesson $lesson)
    {
        $user = $request->user();

        LessonProgress::updateOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $lesson->id],
            ['is_completed' => true, 'updated_at' => now()]
        );

        return redirect()->back()->with('success', 'Lesson marked as complete!');
    }
}
