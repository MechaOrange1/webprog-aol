import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, totalSubjects, totalStudents }) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            {/* ================= HEADER ================= */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#145da0] via-[#4f8ea6] to-[#ffd21f]" />

                <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
                    <h1 className="text-4xl font-extrabold">
                        👋 Welcome, {auth.user.name}
                    </h1>
                    <p className="mt-3 opacity-90 max-w-xl">
                        Kelola materi, pantau pengguna, dan atur sistem
                        pembelajaran dengan mudah.
                    </p>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <section className="-mt-12 relative z-10 pb-16">
                <div className="max-w-7xl mx-auto px-6 space-y-8">
                    {/* ================= STATS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard
                            title="Total Subjects"
                            value={totalSubjects}
                            icon="📚"
                            color="text-indigo-600"
                        />
                        <StatCard
                            title="Total Students"
                            value={totalStudents}
                            icon="🎓"
                            color="text-emerald-600"
                        />
                    </div>

                    {/* ================= QUICK ACTIONS ================= */}
                    <div className="bg-white rounded-2xl shadow p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            🚀 Quick Actions
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ActionCard
                                title="Manage Subjects"
                                desc="Lihat, edit, dan hapus seluruh mata pelajaran"
                                icon="🛠️"
                                href={route("admin.subjects.index")}
                                color="from-indigo-500 to-indigo-600"
                            />

                            <ActionCard
                                title="Create New Subject"
                                desc="Tambahkan materi pembelajaran baru"
                                icon="➕"
                                href={route("admin.subjects.create")}
                                color="from-emerald-500 to-emerald-600"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 hover:shadow-lg transition">
            <div className="text-4xl">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            </div>
        </div>
    );
}

function ActionCard({ title, desc, icon, href, color }) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br text-white shadow hover:shadow-xl transition"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`}
            />

            <div className="relative z-10">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm opacity-90">{desc}</p>
            </div>

            <div className="absolute bottom-4 right-4 text-xl opacity-70 group-hover:translate-x-1 transition">
                →
            </div>
        </Link>
    );
}
