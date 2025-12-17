import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-4">You're logged in as <strong>{auth.user.role}</strong>!</p>

                            <h3 className="text-lg font-bold mb-2">Where would you like to go?</h3>

                            {auth.user.role === 'admin' ? (
                                <ul className="list-disc list-inside">
                                    <li className="mb-2">
                                        <Link href={route('admin.dashboard')} className="text-blue-500 hover:underline">
                                            Go to Admin Dashboard
                                        </Link>
                                        <span className="text-gray-500 ml-2">- Manage Subjects, Lessons, and Quizzes</span>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="list-disc list-inside">
                                    <li className="mb-2">
                                        <Link href={route('student-dashboard')} className="text-blue-500 hover:underline">
                                            Go to Student Dashboard
                                        </Link>
                                        <span className="text-gray-500 ml-2">- View your enrolled courses and progress</span>
                                    </li>
                                    <li className="mb-2">
                                        <Link href={route('subjects.index')} className="text-blue-500 hover:underline">
                                            Browse All Subjects
                                        </Link>
                                        <span className="text-gray-500 ml-2">- Find new subjects to learn</span>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
