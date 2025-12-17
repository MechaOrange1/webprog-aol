import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, subject, lessons, quizzes, isEnrolled, completedLessons = [] }) {
    const { post, processing } = useForm();

    const handleEnroll = () => {
        post(route('subjects.enroll', subject.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{subject.title}</h2>}
        >
            <Head title={subject.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <img
                                    src={subject.thumbnail_url || 'https://placehold.co/800x400?text=No+Image'}
                                    alt={subject.title}
                                    className="w-full h-64 object-cover rounded"
                                />
                            </div>

                            <h3>Description</h3>
                            <p className="mb-4">{subject.description}</p>

                            <div className="mb-6">
                                {isEnrolled ? (
                                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Enrolled</span>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>

                            <hr className="my-4" />

                            <h3>Lessons</h3>
                            <ul>
                                {lessons.map((lesson) => (
                                    <li key={lesson.id} className="mb-2">
                                        <Link href={route('lessons.show', lesson.id)} className="text-blue-500 hover:underline">
                                            {lesson.sequence}. {lesson.title}
                                        </Link>
                                        {completedLessons.includes(lesson.id) && (
                                            <span className="ml-2 text-green-600 text-sm">✓ Completed</span>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-4" />

                            <h3>Quizzes</h3>
                            <ul>
                                {quizzes.map((quiz) => (
                                    <li key={quiz.id} className="mb-2">
                                        <Link href={route('quizzes.show', quiz.id)} className="text-blue-500 hover:underline">
                                            {quiz.title} (Time limit: {quiz.time_limit} mins)
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-4" />
                            <Link href={route('subjects.index')} className="text-gray-500 hover:underline">Back to Subjects</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
