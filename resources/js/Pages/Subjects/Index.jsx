import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, subjects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">
                    Explore All Subjects
                </h2>
            }
        >
            <Head title="Subjects" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* TOMBOL BACK DI ATAS */}
                    <div>
                        <Link
                            href={route("dashboard")}
                            className="mb-4 inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#145da0] transition-all group"
                        >
                            <span className="mr-3 bg-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-[#145da0] group-hover:text-white transition-all transform group-hover:-translate-x-1">
                                ←
                            </span> 
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* GRID SYSTEM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
                            >
                    {/* IMAGE AREA */}
                                <div className="relative h-52 overflow-hidden bg-gray-200">
                                    <img
                                        src={subject.thumbnail_url}
                                        alt={subject.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        // Fallback jika link dari admin salah/mati
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/600x400?text=Pintar+Education";
                                        }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#ffd21f] text-[#145da0] text-[10px] font-black px-3 py-1 rounded-lg shadow-sm uppercase">
                                            {subject.level}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT AREA */}
                                <div className="p-7 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#145da0] transition-colors">
                                        {subject.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                                        {subject.description}
                                    </p>

                                    {/* INFO ROW */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Price</span>
                                            <span className="text-[#145da0] font-bold text-lg">
                                                {subject.price === 0 ? 'Free' : `IDR ${subject.price.toLocaleString()}`}
                                            </span>
                                        </div>
                                        
                                        <div className="h-10 w-[1px] bg-gray-100"></div>
                                        
                                        <div className="text-right">
                                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Status</span>
                                            {subject.is_enrolled ? (
                                                <span className="flex items-center justify-end text-xs font-bold text-green-500 italic">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                                    Enrolled
                                                </span>
                                            ) : (
                                                <span className="block text-xs font-semibold text-gray-400 italic">
                                                    Available
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* BUTTON: Menggunakan rounded-xl yang konsisten */}
                                    <Link
                                        href={route("subjects.show", subject.id)}
                                        className={`mt-auto inline-flex items-center justify-center w-full py-3 rounded-2xl font-bold transform active:scale-[0.98] transition-all shadow-md ${
                                            subject.is_enrolled 
                                            ? 'bg-white border-2 border-[#145da0] text-[#145da0] hover:bg-blue-50' 
                                            : 'bg-[#145da0] text-white hover:bg-[#0d4a80]'
                                        }`}
                                    >
                                        {subject.is_enrolled ? 'Lanjutkan Belajar' : 'Lihat Materi'}
                                        <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}