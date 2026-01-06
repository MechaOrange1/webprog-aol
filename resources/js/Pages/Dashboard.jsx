import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import "../../css/HeaderGradient.css"; // Pastikan path sesuai folder css

export default function Dashboard({
    auth,
    recommendedSubjects = [],
    allSubjects = [],
}) {
    const [searchQuery, setSearchQuery] = useState("");

    // ================= TIME BASED GREETING =================
    const hour = new Date().getHours();
    const getGreeting = () => {
        if (hour >= 5 && hour < 11) return "🌞 Good Morning";
        if (hour >= 11 && hour < 15) return "☀️ Good Afternoon";
        if (hour >= 15 && hour < 18) return "🌤️ Good Evening";
        return "🌙 Good Night";
    };

    // ================= GRADIENT HEADER BERDASARKAN JAM =================
    const getHeaderTheme = () => {
        if (hour >= 5 && hour < 11)
            return {
                gradient: "from-[#56ccf2] via-[#2f80ed] to-[#f2c94c]",
                blob: "bg-white/20",
            };
        if (hour >= 11 && hour < 15)
            return {
                gradient: "from-[#145da0] via-[#4f8ea6] to-[#ffd21f]",
                blob: "bg-white/15",
            };
        if (hour >= 15 && hour < 18)
            return {
                gradient: "from-[#ff7e5f] via-[#feb47b] to-[#ffd194]",
                blob: "bg-white/20",
            };
        return {
            gradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
            blob: "bg-white/10",
        };
    };

    const theme = getHeaderTheme();

    // ================= SEARCH =================
    const filteredSubjects = searchQuery
        ? allSubjects.filter((s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Dashboard</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/img/PintarEduCharacterLogo.png"
                />
            </Head>

            {/* ================= HEADER ================= */}
            <section className="relative overflow-hidden">
                {/* GRADIENT SESUAI JAM + ANIMASI */}
                <div
                    className={`absolute inset-0 header-gradient bg-gradient-to-br ${theme.gradient}`}
                />

                {/* BLOBS STATIC */}
                <div
                    className={`absolute -top-32 -left-32 w-[28rem] h-[28rem] ${theme.blob} rounded-full blur-3xl`}
                />
                <div
                    className={`absolute top-1/3 -right-40 w-[32rem] h-[32rem] ${theme.blob} rounded-full blur-3xl`}
                />

                {/* CONTENT */}
                <div className="relative max-w-7xl mx-auto px-6 py-28 text-white">
                    <p className="text-lg opacity-90">{getGreeting()},</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                        {auth.user.name}
                    </h1>
                    <p className="mt-4 opacity-90 max-w-2xl">
                        Temukan materi baru, lanjutkan pembelajaran, dan bangun
                        konsistensi belajarmu hari ini.
                    </p>

                    {/* SEARCH */}
                    <div className="relative mt-10 max-w-3xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari mata pelajaran atau materi pembelajaran..."
                            className="w-full px-6 py-4 rounded-xl text-gray-800 shadow-xl focus:ring-4 focus:ring-white/40 outline-none"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                            🔍
                        </span>

                        {searchQuery && (
                            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50">
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject) => (
                                        <Link
                                            key={subject.id}
                                            href={route(
                                                "subjects.show",
                                                subject.id
                                            )}
                                            className="block px-6 py-4 hover:bg-gray-100 transition"
                                        >
                                            <p className="font-medium text-gray-900">
                                                {subject.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {subject.description}
                                            </p>
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

            {/* ================= QUICK MENU ================= */}
            <section className="-mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <QuickLink
                                title="⭐ Recommendations"
                                desc="Langsung ke materi pilihan"
                                href="#recommended"
                            />
                            <QuickLink
                                title="🎓 Student Dashboard"
                                desc="Lihat progres & aktivitas belajarmu"
                                href={route("student-dashboard")}
                            />
                            <QuickLink
                                title="📚 All Subjects"
                                desc="Jelajahi seluruh materi pembelajaran"
                                href={route("subjects.index")}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= RECOMMENDED ================= */}
            <section
                id="recommended"
                className="bg-[#f0f2f5] py-24 scroll-mt-24"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Rekomendasi untuk Anda
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Pilihan materi terbaik berdasarkan aktivitas
                                belajarmu
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recommendedSubjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    className="group bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
                                >
                                    <div className="relative h-52 overflow-hidden bg-gray-200">
                                        <img
                                            src={subject.thumbnail_url}
                                            alt={subject.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) =>
                                            (e.target.src =
                                                "https://placehold.co/600x400?text=Pintar+Education")
                                            }
                                        />
                                        {subject.level && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-[#145da0] text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase shadow-sm">
                                                    {subject.level}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#ffd21f] text-[#145da0] text-[10px] font-black px-3 py-1 rounded-lg uppercase shadow-sm">
                                                Recommended
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-7 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#145da0] transition-colors">
                                            {subject.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                            {subject.description}
                                        </p>
                                        <Link
                                            href={route(
                                                "subjects.show",
                                                subject.id
                                            )}
                                            className="mt-auto inline-flex items-center justify-center w-full py-3 rounded-2xl font-bold bg-[#145da0] text-white hover:bg-[#0d4a80] transition shadow-md"
                                        >
                                            Lihat Materi →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

/* ================= COMPONENT ================= */
function QuickLink({ title, desc, href }) {
    return (
        <Link
            href={href}
            className="bg-gray-50 rounded-xl border p-6 shadow-md hover:shadow-lg transition"
        >
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </Link>
    );
}
