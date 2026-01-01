import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, subject }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        time_limit: 10,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.quizzes.store', subject.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">Add New Quiz</h2>
                </div>
            }
        >
            <Head title={`Add Quiz - ${subject.title}`} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    
                    {/* BACK BUTTON */}
                    <div className="mb-8">
                        <Link
                            href={route('admin.subjects.edit', subject.id)}
                            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#145da0] transition-all group"
                        >
                            <span className="mr-3 bg-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-[#145da0] group-hover:text-white transition-all transform group-hover:-translate-x-1">
                                ←
                            </span> 
                            Back to {subject.title}
                        </Link>
                    </div>

                    {/* FORM CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-50/50 px-8 py-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">Quiz Configuration</h3>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            
                            {/* QUIZ TITLE */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quiz Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-semibold text-gray-800 bg-gray-50/50 transition-all"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Final Chapter Exam"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                            </div>

                            {/* TIME LIMIT */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Time Limit (Minutes)</label>
                                <div className="relative max-w-[200px]">
                                    <input
                                        type="number"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-bold text-gray-800 bg-gray-50/50 transition-all"
                                        value={data.time_limit}
                                        onChange={(e) => setData('time_limit', e.target.value)}
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400 text-sm font-medium">Min</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 ml-1">Set to '0' for no time limit.</p>
                                {errors.time_limit && <div className="text-red-500 text-xs mt-1 font-bold">{errors.time_limit}</div>}
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
                                    {processing ? 'Creating...' : 'Create Quiz'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}