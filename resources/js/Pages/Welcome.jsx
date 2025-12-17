import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                    <h1 className="text-3xl font-bold mb-4">Education Platform - Final Project</h1>
                    <p className="mb-6">Basic implementation of the backend logic with minimal frontend.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-semibold mb-2">Navigation</h2>
                            <ul className="list-disc list-inside">
                                {auth.user ? (
                                    <>
                                        <li><Link href={route('dashboard')} className="text-blue-500 underline">Dashboard</Link></li>
                                        <li><Link href={route('student-dashboard')} className="text-blue-500 underline">Student Dashboard</Link></li>
                                        <li><Link href={route('subjects.index')} className="text-blue-500 underline">Browse Subjects</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href={route('login')} className="text-blue-500 underline">Log in</Link></li>
                                        <li><Link href={route('register')} className="text-blue-500 underline">Register</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
