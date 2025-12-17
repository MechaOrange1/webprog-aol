import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ auth, lesson, subject }) {
    const { data, setData, put, processing, errors } = useForm({
        title: lesson.title,
        content: lesson.content || '',
        video_url: lesson.video_url,
        sequence: lesson.sequence
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.lessons.update', lesson.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Lesson: {lesson.title}</h2>}
        >
            <Head title={`Edit ${lesson.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Sequence/Order</label>
                                <input
                                    type="number"
                                    value={data.sequence}
                                    onChange={(e) => setData('sequence', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.sequence && <div className="text-red-500 text-xs mt-1">{errors.sequence}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Video URL</label>
                                <input
                                    type="text"
                                    value={data.video_url}
                                    onChange={(e) => setData('video_url', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.video_url && <div className="text-red-500 text-xs mt-1">{errors.video_url}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="5"
                                />
                                {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Update Lesson
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this lesson?')) {
                                                router.delete(route('admin.lessons.destroy', lesson.id));
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete Lesson
                                    </button>
                                </div>
                                <Link
                                    href={route('admin.subjects.edit', subject.id)}
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
