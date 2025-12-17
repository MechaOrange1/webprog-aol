import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, lesson, isCompleted }) {
    const { post, processing } = useForm();

    const handleComplete = () => {
        post(route('lessons.complete', lesson.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{lesson.title}</h2>}
        >
            <Head title={lesson.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3>Video Tutorial</h3>
                            <div className="mb-4">
                                {/* Placeholder for video player since video_url might be just a string */}
                                <p>Video URL: <a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{lesson.video_url}</a></p>
                            </div>

                            <h3>Content</h3>
                            <p className="mb-6">{lesson.content}</p>

                            <div className="mb-6">
                                {isCompleted ? (
                                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Lesson Completed</span>
                                ) : (
                                    <button
                                        onClick={handleComplete}
                                        disabled={processing}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Mark as Complete
                                    </button>
                                )}
                            </div>

                            <hr className="my-4" />

                            <Link href={route('subjects.show', lesson.subject.id)} className="text-blue-500 hover:underline">
                                Back to {lesson.subject.title}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
