<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => Subject::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Subjects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'required|string',
            'price' => 'required|numeric',
            'thumbnail_url' => 'nullable|url',
        ]);

        Subject::create($validated);

        return redirect()->route('admin.subjects.index')->with('success', 'Subject created successfully.');
    }

    public function edit(Subject $subject)
    {
        $subject->load(['lessons', 'quizzes']);

        return Inertia::render('Admin/Subjects/Edit', [
            'subject' => $subject,
        ]);
    }

    public function update(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'required|string',
            'price' => 'required|numeric',
            'thumbnail_url' => 'nullable|url',
        ]);

        $subject->update($validated);

        return redirect()->route('admin.subjects.index')->with('success', 'Subject updated successfully.');
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return redirect()->route('admin.subjects.index')->with('success', 'Subject deleted successfully.');
    }
}
