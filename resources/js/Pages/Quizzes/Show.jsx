import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Show({ auth, quiz }) {

    const { data, setData, post, processing } = useForm({
        answers: {}
    });

    const [timeLeft, setTimeLeft] = useState(quiz.time_limit * 60);

    const handleOptionChange = (questionId, optionId) => {
        setData('answers', {
            ...data.answers,
            [questionId]: optionId
        });
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(route('quizzes.submit', quiz.id));
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(); 
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const answeredCount = Object.keys(data.answers).length;
    const totalQuestions = quiz.questions?.length || 0;
    const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    if (!quiz) return null;


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={quiz.title} />

            <div>
                <Link
                    href={route("subjects.index")}
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#145da0] transition-all group"
                >
                    <span className="mr-3 bg-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-[#145da0] group-hover:text-white transition-all transform group-hover:-translate-x-1">
                        ←
                    </span> 
                    Back to Management
                </Link>
            </div>

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white rounded-t-[2rem] p-6 shadow-sm border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-[#145da0]">{quiz.title}</h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Time Remaining: 
                                <span className={`font-bold ml-1 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </p>
                        </div>

                    <div className="text-right">
                            <span className="text-[#145da0] font-bold text-xs uppercase tracking-wider">
                                Progress: {Math.round(progressPercentage)}%
                            </span>
                            <div className="w-32 h-2 bg-[#f0f2f5] rounded-full mt-1 border border-gray-100 overflow-hidden">
                                <div 
                                    className="h-full bg-[#ffd21f] transition-all duration-500 ease-out" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white shadow-xl p-8 md:p-12">
                        <form onSubmit={handleSubmit}>
                            {quiz.questions.map((question, index) => (
                                <div key={question.id} className="mb-12 animate-fade-in">
                                    <div className="flex gap-4 mb-6">
                                        <span className="flex-shrink-0 w-10 h-10 bg-[#145da0] text-white rounded-xl flex items-center justify-center font-bold">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                                            {question.question_text}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 ml-14">
                                        {question.options.map((option) => (
                                            <label 
                                                key={option.id}
                                                className={`
                                                    relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                    ${data.answers[question.id] === option.id 
                                                        ? 'border-[#145da0] bg-[#145da0]/5 ring-1 ring-[#145da0]' 
                                                        : 'border-[#f9f9f9] bg-[#f9f9f9] hover:border-[#d9d9d9]'}
                                                `}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={option.id}
                                                    className="hidden"
                                                    onChange={() => handleOptionChange(question.id, option.id)}
                                                />

                                                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                                                    ${data.answers[question.id] === option.id ? 'border-[#145da0]' : 'border-gray-300'}`}>
                                                    {data.answers[question.id] === option.id && <div className="w-2.5 h-2.5 bg-[#145da0] rounded-full" />}
                                                </div>

                                                <span className={`font-medium ${data.answers[question.id] === option.id ? 'text-[#145da0]' : 'text-gray-700'}`}>
                                                    {option.option_text}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                                <Link href={route('subjects.show', quiz.subject.id)} className="text-gray-500 font-semibold hover:text-[#145da0] transition">
                                    ← Back to Subject
                                </Link>
                                
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#145da0] text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-[#0d4a80] transform active:scale-95 transition-all"
                                >
                                    Finish & Submit Quiz
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="h-6 bg-white rounded-b-[2rem] shadow-sm"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
