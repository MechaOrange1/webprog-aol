import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, quiz }) {
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        correct_option: '1',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.questions.store', quiz.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">Add Question</h2>
                </div>
            }
        >
            <Head title={`Add Question - ${quiz.title}`} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    
                    {/* TOMBOL KEMBALI */}
                    <div className="mb-8">
                        <Link
                            href={route('admin.quizzes.edit', quiz.id)}
                            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#145da0] transition-all group"
                        >
                            <span className="mr-3 bg-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-[#145da0] group-hover:text-white transition-all transform group-hover:-translate-x-1">
                                ←
                            </span> 
                            Back to {quiz.title}
                        </Link>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-50/50 px-8 py-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">New Question Details</h3>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-8">
                            
                            {/* TEXT PERTANYAAN */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center md:text-left">
                                    Question Statement
                                </label>
                                <textarea
                                    className="w-full rounded-[2rem] border-gray-200 focus:border-[#145da0] focus:ring-[#145da0] py-4 px-6 font-medium text-gray-800 bg-gray-50/50 transition-all text-lg"
                                    rows="3"
                                    placeholder="Type your question here..."
                                    value={data.question_text}
                                    onChange={(e) => setData('question_text', e.target.value)}
                                />
                                {errors.question_text && <div className="text-red-500 text-xs mt-2 font-bold ml-4">{errors.question_text}</div>}
                            </div>

                            {/* PILIHAN JAWABAN */}
                            <div>
                                <div className="flex justify-between items-center mb-4 px-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        Answer Options
                                    </label>
                                    <span className="text-[10px] font-bold text-[#145da0] bg-blue-50 px-3 py-1 rounded-full uppercase">
                                        Select Correct Answer
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div 
                                            key={num} 
                                            className={`group flex items-center p-3 rounded-2xl border transition-all ${
                                                data.correct_option == num 
                                                ? 'bg-green-50 border-green-200 shadow-sm' 
                                                : 'bg-white border-gray-100 hover:border-gray-300'
                                            }`}
                                        >
                                            {/* Radio Button kustom */}
                                            <label className="flex items-center cursor-pointer w-full">
                                                <input
                                                    type="radio"
                                                    name="correct_option"
                                                    value={num}
                                                    checked={data.correct_option == num}
                                                    onChange={(e) => setData('correct_option', e.target.value)}
                                                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500 transition-all ml-2"
                                                />
                                                <div className="flex-1 ml-4">
                                                    <input
                                                        type="text"
                                                        value={data[`option_${num}`]}
                                                        onChange={(e) => setData(`option_${num}`, e.target.value)}
                                                        className={`w-full bg-transparent border-none focus:ring-0 p-0 font-semibold transition-all ${
                                                            data.correct_option == num ? 'text-green-800' : 'text-gray-600'
                                                        }`}
                                                        placeholder={`Option ${num}...`}
                                                    />
                                                </div>
                                            </label>
                                            {errors[`option_${num}`] && (
                                                <span className="text-red-500 text-[10px] font-bold mr-4 italic">Required</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
                                <Link
                                    href={route('admin.quizzes.edit', quiz.id)}
                                    className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:text-gray-700 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#145da0] hover:bg-[#0d4a80] text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Question'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}