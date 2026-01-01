import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, subjects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-black text-2xl text-[#145da0] leading-tight">
                    Manage Subjects
                </h2>
            }
        >
            <Head title="Manage Subjects" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* STATS / HEADER ACTION AREA */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-widest">Administrator</h3>
                            <p className="text-gray-400 text-xs">Manage your curriculum and student materials</p>
                        </div>
                        <Link
                            href={route('admin.subjects.create')}
                            className="bg-[#145da0] hover:bg-[#0d4a80] text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-blue-100 transition-all transform active:scale-95 flex items-center gap-2"
                        >
                            <span className="text-xl">+</span> Add New Subject
                        </Link>
                    </div>

                    {/* MAIN TABLE CARD */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-[2.5rem] border border-gray-100">
                        <div className="p-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-50">
                                            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Title</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Level</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                                            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {subjects.map((subject) => (
                                            <tr key={subject.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                                            <img 
                                                                src={subject.thumbnail_url} 
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => e.target.src = "https://placehold.co/100x100?text=Pinar"}
                                                            />
                                                        </div>
                                                        <span className="font-bold text-gray-700 group-hover:text-[#145da0] transition-colors">
                                                            {subject.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="bg-[#ffd21f]/20 text-[#145da0] text-[10px] font-black px-3 py-1 rounded-lg uppercase">
                                                        {subject.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="font-bold text-gray-600">
                                                        IDR {subject.price.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('admin.subjects.edit', subject.id)}
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-[#145da0] hover:bg-[#145da0] hover:text-white transition-all shadow-sm"
                                                            title="Edit Subject"
                                                        >
                                                            ✎
                                                        </Link>
                                                        {/* Tambahkan tombol delete jika perlu */}
                                                        <button 
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                            title="Delete Subject"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {subjects.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-gray-400 font-bold italic">No subjects available yet. Start by adding one!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            © 2026 Pinar Education Admin System
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}