import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, subject, lessons, quizzes, isEnrolled, completedLessons = [] }) {
    const { post, processing } = useForm();

    const handleEnroll = () => {
        post(route('subjects.enroll', subject.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-bold text-[#145da0] tracking-tight">
                {subject.title}
                </h2>
            }
        >
            <Head title={subject.title} />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        
                    {/* TOMBOL BACK DI ATAS */}
                    <div className="mb-8">
                        <Link
                            href={route("subjects.index")}
                            className="inline-flex items-center text-gray-400 font-semibold hover:text-[#145da0] transition-colors"
                        >
                            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
                            Back to Subjects
                        </Link>
                    </div>


                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Main Info */}
                        <div className="lg:w-2/3 space-y-6">
                            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
                                <img
                                    src={subject.thumbnail_url || 'https://placehold.co/800x400?text=Pintar+Education'}
                                    alt={subject.title}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h1 className="text-3xl font-bold text-gray-800">{subject.title}</h1>
                                        {!isEnrolled && (
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 uppercase font-bold">Price</p>
                                                <p className="text-2xl font-black text-[#145da0]">IDR {subject.price.toLocaleString()}</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-3 mb-6">
                                        <span className="bg-blue-50 text-[#145da0] text-xs font-bold px-4 py-1.5 rounded-full border border-blue-100">
                                            {subject.level}
                                        </span>
                                        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-4 py-1.5 rounded-full border border-gray-100">
                                            {lessons.length} Lessons
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800 mb-2">About this Subject</h3>
                                    <p className="text-gray-600 leading-relaxed">{subject.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Curriculum & Action */}
                        <div className="lg:w-1/3 space-y-6">
                            {/* Enroll Card */}
                            <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-blue-50 sticky top-6">
                                {isEnrolled ? (
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100 text-green-700 mb-6">
                                            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                                            <span className="font-bold">You are Enrolled!</span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        disabled={processing}
                                        className="w-full bg-[#145da0] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-[#0d4a80] transition-all mb-6 transform active:scale-95"
                                    >
                                        {processing ? 'Processing...' : 'Enroll Now'}
                                    </button>
                                )}

                                <h3 className="font-bold text-gray-800 mb-4 px-2">Course Content</h3>
                                
                                {/* Lessons List */}
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-gray-400 uppercase px-2 mb-2">Lessons</p>
                                    {lessons.map((lesson) => (
                                        <Link 
                                            key={lesson.id} 
                                            href={isEnrolled ? route('lessons.show', lesson.id) : '#'}
                                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                                isEnrolled 
                                                ? 'hover:border-[#145da0] hover:bg-blue-50 border-transparent bg-gray-50' 
                                                : 'opacity-60 cursor-not-allowed border-transparent bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-gray-400">{lesson.sequence}</span>
                                                <span className="font-semibold text-gray-700 truncate w-40">{lesson.title}</span>
                                            </div>
                                            {completedLessons.includes(lesson.id) && (
                                                <span className="text-green-500 text-xl">●</span>
                                            )}
                                        </Link>
                                    ))}

                                    {/* Quizzes List */}
                                    <p className="text-xs font-bold text-gray-400 uppercase px-2 mt-6 mb-2">Final Evaluation</p>
                                    {quizzes.map((quiz) => (
                                        <Link 
                                            key={quiz.id} 
                                            href={isEnrolled ? route('quizzes.show', quiz.id) : '#'}
                                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                                                isEnrolled 
                                                ? 'border-[#ffd21f] bg-yellow-50/30 hover:bg-[#ffd21f]/10' 
                                                : 'opacity-60 cursor-not-allowed bg-gray-100'
                                            }`}
                                        >
                                            <div className="w-10 h-10 bg-[#ffd21f] rounded-xl flex items-center justify-center text-[#145da0]">
                                                ⏱️
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{quiz.title}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">{quiz.time_limit} Minutes</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}