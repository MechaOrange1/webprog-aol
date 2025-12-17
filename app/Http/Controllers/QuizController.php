<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizResult;
use App\Models\Option;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function show(Quiz $quiz)
    {
        $quiz->load(['subject', 'questions.options']);

        return Inertia::render('Quizzes/Show', [
            'quiz' => $quiz,
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $data = $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'required|exists:options,id',
        ]);

        $score = 0;
        $totalQuestions = $quiz->questions()->count();

        foreach ($data['answers'] as $questionId => $optionId) {
            $option = Option::find($optionId);
            if ($option && $option->is_correct) {
                $score++;
            }
        }

        // Create result
        QuizResult::create([
            'user_id' => $request->user()->id,
            'quiz_id' => $quiz->id,
            'score' => $score, // Storing raw score, could be percentage
            'attempted_at' => now(),
        ]);

        return redirect()->route('student-dashboard')->with('success', "Quiz submitted! Score: $score/$totalQuestions");
    }
}
