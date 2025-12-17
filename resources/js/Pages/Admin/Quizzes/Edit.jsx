import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ auth, quiz, subject }) {
    const { data, setData, put, processing, errors } = useForm({
        title: quiz.title,
        time_limit: quiz.time_limit,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.quizzes.update', quiz.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Quiz: {quiz.title}</h2>}
        >
            <Head title={`Edit ${quiz.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Quiz Details Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Time Limit (Minutes)</label>
                                <input
                                    type="number"
                                    value={data.time_limit}
                                    onChange={(e) => setData('time_limit', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.time_limit && <div className="text-red-500 text-xs mt-1">{errors.time_limit}</div>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Update Quiz
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this quiz?')) {
                                                router.delete(route('admin.quizzes.destroy', quiz.id));
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete Quiz
                                    </button>
                                </div>
                                <Link
                                    href={route('admin.subjects.edit', subject.id)}
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Back to Subject
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Question Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Questions</h3>
                            <Link
                                href={route('admin.questions.create', quiz.id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                Add Question
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {quiz.questions && quiz.questions.length > 0 ? (
                                quiz.questions.map((question, index) => (
                                    <li key={question.id} className="py-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <span className="font-bold text-gray-600 mr-2">Q{index + 1}:</span>
                                                <span>{question.question_text}</span>
                                            </div>
                                            <div>
                                                {/* Future: Add Edit/Delete for questions */}
                                                <span className="text-gray-400 text-xs">Edit/Delete Coming Soon</span>
                                            </div>
                                        </div>
                                        <ul className="ml-8 mt-2 list-circle text-sm text-gray-600">
                                            {question.options.map(opt => (
                                                <li key={opt.id} className={opt.is_correct ? 'text-green-600 font-bold' : ''}>
                                                    {opt.option_text} {opt.is_correct && '(Correct)'}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))
                            ) : (
                                <li className="py-4 text-center text-gray-500">No questions added yet.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
