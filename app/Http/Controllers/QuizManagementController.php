<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizManagementController extends Controller
{
    public function create(Subject $subject)
    {
        return Inertia::render('Admin/Quizzes/Create', [
            'subject' => $subject,
        ]);
    }

    public function store(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'time_limit' => 'required|integer|min:1',
        ]);

        $subject->quizzes()->create($validated);

        return redirect()->route('admin.subjects.edit', $subject->id)->with('success', 'Quiz created successfully.');
    }

    public function edit(Quiz $quiz)
    {
        $quiz->load('questions.options');
        return Inertia::render('Admin/Quizzes/Edit', [
            'quiz' => $quiz,
            'subject' => $quiz->subject,
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'time_limit' => 'required|integer|min:1',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.subjects.edit', $quiz->subject_id)->with('success', 'Quiz updated successfully.');
    }

    public function destroy(Quiz $quiz)
    {
        $subjectId = $quiz->subject_id;
        $quiz->delete();
        return redirect()->route('admin.subjects.edit', $subjectId)->with('success', 'Quiz deleted successfully.');
    }
}
