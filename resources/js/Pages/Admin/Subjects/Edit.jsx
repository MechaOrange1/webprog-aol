import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, subject }) {
    const { data, setData, put, processing, errors } = useForm({
        title: subject.title,
        description: subject.description,
        level: subject.level,
        price: subject.price,
        thumbnail_url: subject.thumbnail_url || ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.subjects.update', subject.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Subject: {subject.title}</h2>}
        >
            <Head title={`Edit ${subject.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Subject Edit Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Subject Details</h3>
                        </div>
                        <form onSubmit={submit}>
                            {/* Same fields as create, but populated */}
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
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                                    <select
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                    {errors.level && <div className="text-red-500 text-xs mt-1">{errors.level}</div>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
                                <input
                                    type="text"
                                    value={data.thumbnail_url}
                                    onChange={(e) => setData('thumbnail_url', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="https://"
                                />
                                {errors.thumbnail_url && <div className="text-red-500 text-xs mt-1">{errors.thumbnail_url}</div>}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Subject
                                </button>

                                <Link
                                    href={route('admin.subjects.index')}
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Lessons Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Lessons</h3>
                            <Link
                                href={route('admin.lessons.create', subject.id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                Add Lesson
                            </Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sequence</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subject.lessons && subject.lessons.length > 0 ? (
                                    subject.lessons.map((lesson) => (
                                        <tr key={lesson.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.sequence}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lesson.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link href={route('admin.lessons.edit', lesson.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this lesson?')) {
                                                            // Inertia delete
                                                            console.log('Delete logic to be implemented via router.delete or form');
                                                            // We'll fix this in the next step to use proper routing
                                                            alert('Use the edit page to delete for now, or implement direct delete.');
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No lessons found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Quizzes Management */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Quizzes</h3>
                            <Link
                                href={route('admin.quizzes.create', subject.id)}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                Add Quiz
                            </Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Limit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subject.quizzes && subject.quizzes.length > 0 ? (
                                    subject.quizzes.map((quiz) => (
                                        <tr key={quiz.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.time_limit} mins</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link href={route('admin.quizzes.edit', quiz.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit (Add Questions)</Link>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No quizzes found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
