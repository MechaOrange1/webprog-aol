import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, subjects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subjects</h2>}
        >
            <Head title="Subjects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>All Subjects</h1>
                            <ul>
                                {subjects.map((subject) => (
                                    <li key={subject.id} className="mb-4 border p-4 rounded bg-gray-50 flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={subject.thumbnail_url || 'https://placehold.co/150x150?text=No+Image'}
                                                alt={subject.title}
                                                className="w-32 h-32 object-cover rounded"
                                            />
                                        </div>
                                        <div>
                                            <h3>
                                                <Link href={route('subjects.show', subject.id)} className="text-blue-500 hover:underline">
                                                    {subject.title}
                                                </Link>
                                            </h3>
                                            <p>{subject.description}</p>
                                            <p>Level: {subject.level} | Price: {subject.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-4" />
                            <Link href={route('dashboard')} className="text-gray-500 hover:underline">Back to Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
