import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, quiz }) {
    const { data, setData, post, processing } = useForm({
        answers: {}
    });

    const handleOptionChange = (questionId, optionId) => {
        setData('answers', {
            ...data.answers,
            [questionId]: optionId
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{quiz.title}</h2>}
        >
            <Head title={quiz.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Time Limit: {quiz.time_limit} minutes</p>

                            <hr className="my-4" />

                            <form onSubmit={handleSubmit}>
                                <h3>Questions</h3>
                                <ol className="list-decimal list-inside">
                                    {quiz.questions.map((question) => (
                                        <li key={question.id} className="mb-6">
                                            <strong>{question.question_text}</strong>
                                            <div className="ml-4 mt-2">
                                                {question.options.map((option) => (
                                                    <div key={option.id} className="mb-1">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={`question_${question.id}`}
                                                                value={option.id}
                                                                onChange={() => handleOptionChange(question.id, option.id)}
                                                                className="form-radio"
                                                            />
                                                            <span className="ml-2">{option.option_text}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ol>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit Quiz
                                    </button>
                                </div>
                            </form>

                            <hr className="my-4" />

                            <Link href={route('subjects.show', quiz.subject.id)} className="text-blue-500 hover:underline">
                                Back to {quiz.subject.title}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
