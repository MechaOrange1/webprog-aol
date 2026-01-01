import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, subject }) {
    // Inisialisasi form dengan data subject yang ada
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        title: subject.title || '',
        description: subject.description || '',
        level: subject.level || 'SD',
        price: subject.price || 0,
        thumbnail_url: subject.thumbnail_url || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.subjects.update', subject.id));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this subject? This action cannot be undone.')) {
            destroy(route('admin.subjects.destroy', subject.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">Edit Subject</h2>
                </div>
            }
        >
            <Head title={`Edit ${subject.title}`} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    
                    {/* BACK BUTTON (Konsisten dengan halaman lain) */}
                    <div className="mb-8">
                        <Link
                            href={route("admin.subjects.index")}
                            className="inline-flex items-center text-gray-400 font-semibold hover:text-[#145da0] transition-colors"
                        >
                            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
                            Back to Managements
                        </Link>
                    </div>

                    {/* FORM CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Header Card */}
                        <div className="bg-blue-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Subject Details</h3>
                                <p className="text-sm text-gray-500">Editing ID: #{subject.id}</p>
                            </div>
                            <button
                                onClick={handleDelete}
                                className="text-sm text-red-500 font-bold hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                            >
                                Delete Subject
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            
                            {/* TITLE INPUT */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Subject Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-semibold text-gray-800 bg-gray-50/50 transition-all"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Mathematics"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                            </div>

                            {/* DESCRIPTION INPUT */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 text-gray-700 bg-gray-50/50 transition-all resize-none"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Explain what students will learn..."
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1 font-bold">{errors.description}</div>}
                            </div>

                            {/* GRID: PRICE & LEVEL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (IDR)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-gray-400 font-bold text-sm">Rp</span>
                                        <input
                                            type="number"
                                            className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 pl-10 pr-4 font-bold text-gray-800 bg-gray-50/50 transition-all"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                        />
                                    </div>
                                    {errors.price && <div className="text-red-500 text-xs mt-1 font-bold">{errors.price}</div>}
                                </div>

                                {/* Level */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Education Level</label>
                                    <select
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-bold text-gray-700 bg-gray-50/50 transition-all"
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                    >
                                        <option value="SD">SD (Elementary)</option>
                                        <option value="SMP">SMP (Junior High)</option>
                                        <option value="SMA">SMA (High School)</option>
                                        <option value="Umum">Umum (General)</option>
                                    </select>
                                    {errors.level && <div className="text-red-500 text-xs mt-1 font-bold">{errors.level}</div>}
                                </div>
                            </div>

                            {/* THUMBNAIL URL & PREVIEW */}
                            <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Thumbnail Image</label>
                                
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Preview Box */}
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                        <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300 relative group">
                                            {data.thumbnail_url ? (
                                                <img 
                                                    src={data.thumbnail_url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://placehold.co/600x400?text=Invalid+Link";
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Image</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Input URL */}
                                    <div className="w-full md:w-2/3">
                                        <input
                                            type="text"
                                            className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 text-sm text-gray-600 bg-white transition-all mb-2"
                                            value={data.thumbnail_url}
                                            onChange={(e) => setData('thumbnail_url', e.target.value)}
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                        <p className="text-[10px] text-gray-400 leading-relaxed">
                                            Tip: Use direct image links ending in .jpg or .png. <br/>
                                            Recommended: Unsplash or standard image hosting.
                                        </p>
                                        {errors.thumbnail_url && <div className="text-red-500 text-xs mt-1 font-bold">{errors.thumbnail_url}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50 mt-6">
                                <Link
                                    href={route('admin.subjects.index')}
                                    className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#145da0] hover:bg-[#0d4a80] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Saving Changes...' : 'Save Updates'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}