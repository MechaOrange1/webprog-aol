import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ auth, quiz, subject }) {
    const { data, setData, put, processing, errors } = useForm({
        title: quiz.title || '',
        time_limit: quiz.time_limit || 10,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.quizzes.update', quiz.id));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this quiz? All questions inside will be lost.')) {
            router.delete(route('admin.quizzes.destroy', quiz.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">Edit {quiz.title}</h2>
                </div>
            }
        >
            <Head title={`Edit Quiz - ${quiz.title}`} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
                    
                    {/* BACK BUTTON */}
                    <div>
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

                    {/* MAIN SETTINGS CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Quiz Settings</h3>
                            <button
                                onClick={handleDelete}
                                className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                            >
                                Delete Quiz
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quiz Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-semibold text-gray-800 bg-gray-50/50 transition-all"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Time (Mins)</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-2xl border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-3 px-4 font-bold text-gray-800 bg-gray-50/50 transition-all"
                                        value={data.time_limit}
                                        onChange={(e) => setData('time_limit', e.target.value)}
                                    />
                                    {errors.time_limit && <div className="text-red-500 text-xs mt-1 font-bold">{errors.time_limit}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#145da0] hover:bg-[#0d4a80] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                                >
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* QUESTIONS MANAGEMENT CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Questions List</h3>
                                <p className="text-xs text-gray-400 font-medium">Total: {quiz.questions?.length || 0} Questions</p>
                            </div>
                            <Link
                                href={route('admin.questions.create', quiz.id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2"
                            >
                                <span className="text-lg">+</span> Add Question
                            </Link>
                        </div>

                        <div className="p-8">
                            <div className="space-y-4">
                                {quiz.questions && quiz.questions.length > 0 ? (
                                    quiz.questions.map((question, index) => (
                                        <div key={question.id} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-4">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-sm font-bold text-[#145da0]">
                                                        {index + 1}
                                                    </span>
                                                    <p className="font-bold text-gray-800 leading-relaxed mt-1">
                                                        {question.question_text}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-[10px] font-bold text-gray-400 hover:text-[#145da0] uppercase tracking-wider">Edit</button>
                                                    <span className="text-gray-200">|</span>
                                                    <button className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-wider">Delete</button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                                                {question.options.map((opt) => (
                                                    <div 
                                                        key={opt.id} 
                                                        className={`px-4 py-2 rounded-xl text-sm border ${
                                                            opt.is_correct 
                                                            ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                                                            : 'bg-white border-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        <span className="mr-2 opacity-50">•</span>
                                                        {opt.option_text}
                                                        {opt.is_correct && <span className="ml-2 text-[10px] bg-green-200 px-2 py-0.5 rounded-md uppercase">Correct</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 italic">No questions have been added to this quiz yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}