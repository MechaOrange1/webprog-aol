import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function StudentDashboard({
    auth,
    enrollments,
    quizResults,
    recentProgress,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                    Student Dashboard
                </h2>
            }
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* ================= ENROLLED SUBJECTS ================= */}
                        <section className="lg:col-span-2 bg-white rounded-2xl shadow">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    My Enrolled Subjects
                                </h3>

                                {enrollments.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm table-fixed">
                                            <thead className="border-b">
                                                <tr className="text-gray-500">
                                                    <th className="px-3 py-2 text-left w-[50%]">
                                                        Subject
                                                    </th>
                                                    <th className="px-3 py-2 text-left w-[25%]">
                                                        Enrolled
                                                    </th>
                                                    <th className="px-3 py-2 text-left w-[25%]">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enrollments.map(
                                                    (enrollment) => (
                                                        <tr
                                                            key={enrollment.id}
                                                            className="border-b last:border-0 hover:bg-gray-50"
                                                        >
                                                            <td className="px-3 py-3 font-medium">
                                                                <p className="truncate">
                                                                    {
                                                                        enrollment
                                                                            .subject
                                                                            .title
                                                                    }
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                                                {new Date(
                                                                    enrollment.enrolled_at
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-3 py-3 whitespace-nowrap">
                                                                <Link
                                                                    href={route(
                                                                        "subjects.show",
                                                                        enrollment
                                                                            .subject
                                                                            .id
                                                                    )}
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        You are not enrolled in any subjects.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* ================= RIGHT COLUMN ================= */}
                        <div className="space-y-6">
                            {/* QUIZ RESULTS */}
                            <section className="bg-white rounded-2xl shadow">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        Recent Quiz Results
                                    </h3>

                                    {quizResults.length > 0 ? (
                                        <ul className="space-y-3">
                                            {quizResults.map((result) => (
                                                <li
                                                    key={result.id}
                                                    className="flex items-center justify-between gap-3 text-sm"
                                                >
                                                    <span className="font-medium truncate max-w-[70%]">
                                                        {result.quiz.title}
                                                    </span>
                                                    <span className="shrink-0 px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                                                        {result.score}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            No quiz results found.
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* LESSON PROGRESS */}
                            <section className="bg-white rounded-2xl shadow">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        Recent Progress
                                    </h3>

                                    {recentProgress.length > 0 ? (
                                        <ul className="space-y-2 text-sm">
                                            {recentProgress.map((progress) => (
                                                <li
                                                    key={progress.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span>✅</span>
                                                    <span className="truncate">
                                                        {progress.lesson.title}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            No lesson progress recorded.
                                        </p>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
