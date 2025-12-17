<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionManagementController extends Controller
{
    public function create(Quiz $quiz)
    {
        return Inertia::render('Admin/Questions/Create', [
            'quiz' => $quiz,
        ]);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'option_1' => 'required|string',
            'option_2' => 'required|string',
            'option_3' => 'required|string',
            'option_4' => 'required|string',
            'correct_option' => 'required|in:1,2,3,4',
        ]);

        $question = $quiz->questions()->create([
            'question_text' => $validated['question_text'],
            'type' => 'multiple_choice',
        ]);

        $options = [
            ['option_text' => $validated['option_1'], 'is_correct' => $validated['correct_option'] == 1],
            ['option_text' => $validated['option_2'], 'is_correct' => $validated['correct_option'] == 2],
            ['option_text' => $validated['option_3'], 'is_correct' => $validated['correct_option'] == 3],
            ['option_text' => $validated['option_4'], 'is_correct' => $validated['correct_option'] == 4],
        ];

        foreach ($options as $option) {
            $question->options()->create($option);
        }

        return redirect()->route('admin.quizzes.edit', $quiz->id)->with('success', 'Question added successfully.');
    }
}
