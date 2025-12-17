import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function StudentDashboard({ auth, enrollments, quizResults, recentProgress }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">My Enrolled Subjects</h3>
                            {enrollments.length > 0 ? (
                                <ul>
                                    {enrollments.map((enrollment) => (
                                        <li key={enrollment.id} className="mb-2">
                                            <Link href={route('subjects.show', enrollment.subject.id)} className="text-blue-500 hover:underline">
                                                {enrollment.subject.title}
                                            </Link>
                                            <span className="text-gray-500 text-sm ml-2">(Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()})</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You are not enrolled in any subjects.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Recent Quiz Results</h3>
                            {quizResults.length > 0 ? (
                                <ul>
                                    {quizResults.map((result) => (
                                        <li key={result.id} className="mb-2">
                                            <strong>{result.quiz.title}</strong>: {result.score} points
                                            <span className="text-gray-500 text-sm ml-2">({new Date(result.attempted_at).toLocaleDateString()})</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No quiz results found.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Recent Lesson Progress</h3>
                            {recentProgress.length > 0 ? (
                                <ul>
                                    {recentProgress.map((progress) => (
                                        <li key={progress.id} className="mb-2">
                                            Completed <strong>{progress.lesson.title}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No lesson progress recorded.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
