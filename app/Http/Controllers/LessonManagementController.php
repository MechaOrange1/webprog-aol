<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonManagementController extends Controller
{
    public function create(Subject $subject)
    {
        return Inertia::render('Admin/Lessons/Create', [
            'subject' => $subject,
        ]);
    }

    public function store(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'required|url',
            'sequence' => 'required|integer',
        ]);

        $subject->lessons()->create($validated);

        return redirect()->route('admin.subjects.edit', $subject->id)->with('success', 'Lesson created successfully.');
    }

    public function edit(Lesson $lesson)
    {
        return Inertia::render('Admin/Lessons/Edit', [
            'lesson' => $lesson,
            'subject' => $lesson->subject,
        ]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'required|url',
            'sequence' => 'required|integer',
        ]);

        $lesson->update($validated);

        return redirect()->route('admin.subjects.edit', $lesson->subject_id)->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Lesson $lesson)
    {
        $subjectId = $lesson->subject_id;
        $lesson->delete();
        return redirect()->route('admin.subjects.edit', $subjectId)->with('success', 'Lesson deleted successfully.');
    }
}
