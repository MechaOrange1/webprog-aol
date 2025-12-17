import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, quiz }) {
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        correct_option: '1',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.questions.store', quiz.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Question to: {quiz.title}</h2>}
        >
            <Head title={`Add Question - ${quiz.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Question Text</label>
                                <textarea
                                    value={data.question_text}
                                    onChange={(e) => setData('question_text', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                />
                                {errors.question_text && <div className="text-red-500 text-xs mt-1">{errors.question_text}</div>}
                            </div>

                            <p className="block text-gray-700 text-sm font-bold mb-2">Options (Select the correct answer)</p>

                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="flex items-center mb-4">
                                    <input
                                        type="radio"
                                        name="correct_option"
                                        value={num}
                                        checked={data.correct_option == num}
                                        onChange={(e) => setData('correct_option', e.target.value)}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            value={data[`option_${num}`]}
                                            onChange={(e) => setData(`option_${num}`, e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder={`Option ${num}`}
                                        />
                                        {errors[`option_${num}`] && <div className="text-red-500 text-xs mt-1">{errors[`option_${num}`]}</div>}
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Question
                                </button>
                                <Link
                                    href={route('admin.quizzes.edit', quiz.id)}
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
