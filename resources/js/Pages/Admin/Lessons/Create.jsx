import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, subject }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        video_url: '',
        sequence: 1
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.lessons.store', subject.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">Add New Lesson</h2>
                </div>
            }
        >
            <Head title={`Add Lesson - ${subject.title}`} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    
                    {/* BACK BUTTON */}
                    <div>
                        <Link
                            href={route('admin.subjects.edit', subject.id)}
                            className="mb-4 inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#145da0] transition-all group"
                        >
                            <span className="mr-3 bg-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-[#145da0] group-hover:text-white transition-all transform group-hover:-translate-x-1">
                                ←
                            </span> 
                            Back to Edit {subject.title}
                        </Link>
                    </div>

                    {/* FORM CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-50/50 px-8 py-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">Lesson Information</h3>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            
                            {/* TITLE & SEQUENCE GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-3">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Lesson Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-semibold text-gray-800 bg-gray-50/50 transition-all"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g. Introduction to Algebra"
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                                </div>

                                <div className="md:col-span-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Order</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-bold text-gray-800 bg-gray-50/50 transition-all"
                                        value={data.sequence}
                                        onChange={(e) => setData('sequence', e.target.value)}
                                    />
                                    {errors.sequence && <div className="text-red-500 text-xs mt-1 font-bold">{errors.sequence}</div>}
                                </div>
                            </div>

                            {/* VIDEO URL */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Video URL (Optional)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 text-sm text-gray-700 bg-gray-50/50 transition-all"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://youtube.com/embed/..."
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 ml-1">Paste your YouTube or Video hosting link here.</p>
                                {errors.video_url && <div className="text-red-500 text-xs mt-1 font-bold">{errors.video_url}</div>}
                            </div>

                            {/* CONTENT TEXTAREA */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Lesson Content</label>
                                <textarea
                                    rows="8"
                                    className="w-full rounded-[2rem] border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-4 px-5 text-gray-700 bg-gray-50/50 transition-all resize-none"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Write the lesson material here..."
                                />
                                {errors.content && <div className="text-red-500 text-xs mt-1 font-bold">{errors.content}</div>}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50 mt-6">
                                <Link
                                    href={route('admin.subjects.edit', subject.id)}
                                    className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#145da0] hover:bg-[#0d4a80] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Lesson'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}