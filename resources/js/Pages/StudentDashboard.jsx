import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function StudentDashboard({
    auth,
    enrollments = [],
    quizResults = [],
    recentProgress = [],
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />
            

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 space-y-10">
                    {/* ================= HEADER ================= */}
                    <section className="bg-white rounded-2xl shadow p-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            🎓 Student Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Pantau progres belajar dan pencapaianmu
                        </p>
                    </section>

                    {/* ================= STATS ================= */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <StatCard
                            title="Enrolled Subjects"
                            value={enrollments.length}
                            icon="📚"
                        />
                        <StatCard
                            title="Quiz Taken"
                            value={quizResults.length}
                            icon="📝"
                        />
                        <StatCard
                            title="Lessons Completed"
                            value={recentProgress.length}
                            icon="✅"
                        />
                    </section>

                    {/* ================= MAIN CONTENT ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* ===== ENROLLED SUBJECTS ===== */}
                        <section className="lg:col-span-2 bg-white rounded-2xl shadow">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">
                                    My Enrolled Subjects
                                </h3>

                                {enrollments.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {enrollments.map((enrollment) => (
                                            <div
                                                key={enrollment.id}
                                                className="border rounded-xl p-5 hover:shadow-md transition flex flex-col"
                                            >
                                                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                                                    {enrollment.subject.title}
                                                </h4>

                                                <p className="text-sm text-gray-500 mb-4">
                                                    Enrolled on{" "}
                                                    {new Date(
                                                        enrollment.enrolled_at
                                                    ).toLocaleDateString()}
                                                </p>

                                                <Link
                                                    href={route(
                                                        "subjects.show",
                                                        enrollment.subject.id
                                                    )}
                                                    className="mt-auto inline-flex items-center justify-center py-2 rounded-lg bg-[#145da0] text-white font-semibold hover:bg-[#0d4a80] transition"
                                                >
                                                    Continue Learning →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        You are not enrolled in any subjects.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* ===== RIGHT SIDEBAR ===== */}
                        <div className="space-y-6">
                            {/* QUIZ RESULTS */}
                            <section className="bg-white rounded-2xl shadow">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Recent Quiz Results
                                    </h3>

                                    {quizResults.length > 0 ? (
                                        <ul className="space-y-3">
                                            {quizResults.map((result) => (
                                                <li
                                                    key={result.id}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <span className="font-medium truncate max-w-[65%]">
                                                        {result.quiz.title}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">
                                                        {result.score}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            No quiz results yet.
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* RECENT PROGRESS */}
                            <section className="bg-white rounded-2xl shadow">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Recent Progress
                                    </h3>

                                    {recentProgress.length > 0 ? (
                                        <ul className="space-y-2 text-sm">
                                            {recentProgress.map((progress) => (
                                                <li
                                                    key={progress.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-green-500">
                                                        ✔
                                                    </span>
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

/* ================= COMPONENT ================= */

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
