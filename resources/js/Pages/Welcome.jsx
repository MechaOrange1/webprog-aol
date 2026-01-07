import { Link, Head, router } from "@inertiajs/react"; // Tambahkan 'router' disini
import { useState } from "react";

export default function Welcome({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan teks pencarian

    // --- FUNGSI BARU: MENANGANI PENCARIAN ---
    const handleSearch = () => {
        if (auth.user) {
            // JIKA SUDAH LOGIN: Lakukan pencarian
            // Ini akan mengarahkan ke halaman dashboard (atau courses) dengan parameter ?search=...
            // Ganti 'dashboard' dengan nama route halaman pencarian Anda jika ada, misal: 'courses.index'
            router.get(route('dashboard'), { search: searchQuery });
        } else {
            // JIKA BELUM LOGIN: Tampilkan Popup
            setIsModalOpen(true);
        }
    };

    // --- FUNGSI SMOOTH SCROLL ---
    const handleScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    };

    // Data Dummy Testimoni
    const testimonials = [
        {
            name: "Tatang Supriatna",
            role: "Siswa SMA Negeri 69 Swiss",
            image: "img/tatang supriatna.jpg",
            text: "Platform belajar terbaik! Materi pembelajaran dijelaskan dengan sangat detail namun mudah dipahami. Sangat membantu tugas sekolah saya. Saya menjadi lebih pintar berkat PintarEducation.",
        },
        {
            name: "Alexander Wijaya",
            role: "Siswa SMP Negeri 1 Luksemburg",
            image: "img/alexander wijaya.jpeg",
            text: "Saya belajar skill baru di sini tanpa biaya sepeser pun. Kurikulumnya relevan dengan kebutuhan pembelajaran saat ini. Terima kasih PintarEducation!",
        },
        {
            name: "Cecep Gorbacep",
            role: "Guru SMA Negeri 8 Austria",
            image: "img/cecep gorbacep.jpg",
            text: "Sebagai pengajar, saya sering mencari referensi materi di sini. Penjelasannya terstruktur dan visualnya menarik untuk murid-murid saya.",
        },
    ];

    return (
        <>
            <Head title="Welcome" />

            <style>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            <div className="min-h-screen bg-[#f9f9f9] font-sans relative overflow-x-hidden flex flex-col">
                
                {/* --- NAVBAR --- */}
                <nav className="fixed top-0 w-full z-40 flex items-center justify-between px-6 py-6 md:px-10 bg-[#f9f9f9]/95 backdrop-blur-sm border-b border-transparent shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <img src="/img/PintarEduCharacterLogo.png" alt="Logo" className="h-10 w-auto object-contain" />
                        <div className="text-2xl font-bold text-[#145da0]">
                            Pintar<span className="text-[#ffd21f]">Education</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route("dashboard")} className="px-6 py-2 bg-[#145da0] text-white font-semibold rounded-lg shadow hover:bg-[#ffd21f] transition">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route("login")} className="hidden md:block text-gray-700 font-semibold hover:text-[#ffd21f] transition">Log in</Link>
                                <Link href={route("register")} className="px-8 py-3 bg-[#145da0] text-white hover:text-[#145da0] font-bold rounded-lg shadow-lg hover:bg-[#ffd21f] transition">Register</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* --- MAIN CONTENT (HERO) --- */}
                <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-10 items-center pt-32 pb-6">
                    <div className="space-y-6 max-w-xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                            Best Learning <br />
                            <span className="text-[#0e3b65]">Education Platform</span> <br />
                            <span className="text-[#145da0]">in Indonesia</span>
                        </h1>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            PintarEducation berusaha menyediakan platform pembelajaran online gratis agar siapa pun dapat belajar dan meningkatkan keterampilan tanpa hambatan biaya.
                        </p>
                        
                        {/* --- SEARCH BAR SECTION (DIMODIFIKASI) --- */}
                        <div className="mt-8 bg-white p-2 rounded-xl shadow-sm flex items-center max-w-md border border-gray-100">
                            <div className="pl-4 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            
                            {/* Input Field: Ditambahkan value, onChange, dan onKeyDown */}
                            <input 
                                type="text" 
                                placeholder={auth.user ? "Cari pelajaran..." : "Apa yang ingin kamu pelajari?"}
                                className="flex-1 p-3 border-none outline-none focus:ring-0 text-gray-700 bg-transparent placeholder-gray-400" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Bisa tekan Enter
                            />
                            
                            {/* Tombol Search: Menggunakan handleSearch */}
                            <button 
                                onClick={handleSearch} 
                                className="bg-[#145da0] hover:bg-[#ffd21f] text-white hover:text-[#145da0] px-6 py-3 rounded-lg font-semibold transition"
                            >
                                Search Course
                            </button>
                        </div>

                    </div>

                    <div className="relative h-full min-h-[500px] hidden lg:block items-center justify-center">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-xl z-10">
                            <img src="img/kerja-kelompok.png" alt="Student working" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-80 h-[450px] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                            <img src="img/perpustakaan.jpg" alt="Group in library" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-20 right-10 bg-[#145da0] text-white hover:bg-[#ffd21f] hover:text-[#145da0] transition p-6 rounded-2xl shadow-2xl z-20 max-w-xs">
                            <div className="flex items-start space-x-3 mb-2">
                                <span className="bg-white text-[#145da0] rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                                <div><p className="font-bold">Free open course</p></div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-white text-[#145da0] rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                                <p className="text-sm opacity-90">Trusted by over 10,000 students</p>
                            </div>
                        </div>
                    </div>

                    {/* --- TOMBOL SCROLL DOWN --- */}
                    <div className="col-span-1 lg:col-span-2 flex justify-center mt-4">
                        <a 
                            href="#testimonials" 
                            onClick={handleScroll} 
                            className="group flex flex-col items-center cursor-pointer animate-bounce transition duration-300"
                        >
                            <span className="text-sm font-semibold text-gray-400 group-hover:text-[#145da0] mb-2">Lihat Testimoni</span>
                            <div className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#145da0] group-hover:bg-[#145da0] group-hover:text-white transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </main>

                {/* ================= TESTIMONIALS SECTION ================= */}
                <section id="testimonials" className="py-20 bg-[#f9f9f9] border-t border-gray-100 scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0e3b65] mb-4">
                                Apa Kata <span className="text-[#145da0]">Siswa Kami?</span>
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Bergabunglah dengan ribuan siswa lainnya yang telah meningkatkan skill mereka bersama PintarEducation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testi, index) => (
                                <div key={index} className="bg-[#f9f9f9] p-8 rounded-2xl hover:shadow-xl transition duration-300 border border-transparent hover:border-[#ffd21f] flex flex-col">
                                    <div className="flex gap-1 mb-4 text-[#ffd21f]">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 italic flex-1">"{testi.text}"</p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                        <img src={testi.image} alt={testi.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#145da0]" />
                                        <div>
                                            <h4 className="font-bold text-[#0e3b65]">{testi.name}</h4>
                                            <p className="text-sm text-[#145da0]">{testi.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= FOOTER ================= */}
                <footer className="bg-white border-t border-gray-200 mt-auto">
                    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} PintarEducation. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            {/* MODAL POPUP (Hanya muncul jika isModalOpen true) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative transform transition-all scale-100">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#145da0]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ingin akses lebih lanjut?</h3>
                            <p className="text-gray-500">Daftar sekarang untuk mulai belajar dan akses ribuan materi kursus.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href={route("register")} className="w-full py-3 bg-[#145da0] text-white hover:text-[#145da0] font-bold rounded-lg shadow-lg hover:bg-[#ffd21f] transition text-center">Register Now</Link>
                            <div className="text-center text-sm text-gray-500 my-1">atau sudah punya akun?</div>
                            <Link href={route("login")} className="w-full py-3 border-2 border-[#145da0] text-[#145da0] font-bold rounded-lg hover:bg-gray-50 transition text-center">Log In</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}