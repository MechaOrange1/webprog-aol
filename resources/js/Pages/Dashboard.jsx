import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({
    auth,
    recommendedSubjects = [],
    allSubjects = [],
}) {
    const [searchQuery, setSearchQuery] = useState("");

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "🌞 Good Morning";
        if (hour >= 11 && hour < 15) return "☀️ Good Afternoon";
        if (hour >= 15 && hour < 18) return "🌤️ Good Evening";
        return "🌙 Good Night";
    };

    const getSubjectIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes("matematika")) return "🔢";
        if (t.includes("bahasa")) return "📝";
        if (t.includes("english") || t.includes("inggris")) return "🇺🇸";
        if (t.includes("ipa") || t.includes("sains")) return "🔬";
        if (t.includes("fisika")) return "⚡";
        if (t.includes("kimia")) return "🧪";
        if (t.includes("biologi")) return "🧬";
        return "📚";
    };

    const filteredSubjects = searchQuery
        ? allSubjects.filter((s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* HERO */}
            <section className="bg-gradient-to-r from-[#145da0] via-[#6fa3a1] to-[#ffd21f] text-white pb-44">
                <div className="max-w-7xl mx-auto px-6 pt-16 text-center">
                    <p className="text-lg opacity-90">{getGreeting()},</p>
                    <h1 className="text-4xl font-bold mt-2">
                        {auth.user.name}
                    </h1>
                    <p className="mt-4 opacity-90">
                        Temukan mata pelajaran baru dan lanjutkan belajarmu 📚
                    </p>

                    {/* SEARCH BAR */}
                    <div className="relative mt-10 max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari mata pelajaran atau materi pembelajaran..."
                            className="w-full px-8 py-5 rounded-2xl text-gray-800 shadow-xl focus:ring-4 focus:ring-blue-500 outline-none"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl">
                            🔍
                        </span>

                        {/* SEARCH RESULT */}
                        {searchQuery && (
                            <div className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl z-50 text-left">
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject) => (
                                        <Link
                                            key={subject.id}
                                            href={route(
                                                "subjects.show",
                                                subject.id
                                            )}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition"
                                        >
                                            <span className="text-2xl">
                                                {getSubjectIcon(subject.title)}
                                            </span>
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {subject.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {subject.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-gray-500">
                                        Mata pelajaran tidak ditemukan
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* QUICK MENU */}
            <section className="-mt-28 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6">
                    <MenuCard
                        title="Student Dashboard"
                        desc="Lihat progres dan pencapaianmu"
                        href={route("student-dashboard")}
                        icon="🎓"
                    />
                    <MenuCard
                        title="All Subjects"
                        desc="Jelajahi semua materi"
                        href={route("subjects.index")}
                        icon="📚"
                    />
                </div>
            </section>

            {/* RECOMMENDED */}
            <section className="mt-24 bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8">
                        Rekomendasi untuk Anda
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedSubjects.map((s) => (
                            <Link
                                key={s.id}
                                href={route("subjects.show", s.id)}
                                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                            >
                                <div className="text-3xl mb-3">
                                    {getSubjectIcon(s.title)}
                                </div>
                                <h3 className="font-bold text-lg">{s.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {s.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Siap untuk melanjutkan belajar?
                    </h2>
                    <p className="text-white mb-6">
                        Lacak progress dan lanjutkan pelajaran kapan saja
                    </p>
                    <Link
                        href={route("student-dashboard")}
                        className="inline-block bg-[#145da0] text-white px-8 py-4 rounded-xl shadow hover:bg-[#0f4c81] transition"
                    >
                        Ke Dashboard Siswa →
                    </Link>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

/* COMPONENT */
function MenuCard({ title, desc, href, icon }) {
    return (
        <Link
            href={href}
            className="w-72 bg-white rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition"
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
        </Link>
    );
}
