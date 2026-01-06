import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({ auth, lesson, isCompleted }) {
    const { post, processing } = useForm();

    const handleComplete = () => {
        post(route("lessons.complete", lesson.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {lesson.title}
                </h2>
            }
        >
            <Head title={lesson.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow overflow-hidden">
                        <div className="p-8">
                            {/* VIDEO */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-3">
                                    Video Tutorial
                                </h3>

                                {lesson.video_url ? (
                                    <div className="aspect-video rounded-xl overflow-hidden bg-black">
                                        <iframe
                                            src={(() => {
                                                const url = lesson.video_url;
                                                // Handle standard YouTube watch URLs
                                                if (url.includes('youtube.com/watch')) {
                                                    const videoId = new URLSearchParams(new URL(url).search).get('v');
                                                    return `https://www.youtube.com/embed/${videoId}`;
                                                }
                                                // Handle youtu.be short URLs
                                                if (url.includes('youtu.be/')) {
                                                    const videoId = url.split('youtu.be/')[1].split('?')[0];
                                                    return `https://www.youtube.com/embed/${videoId}`;
                                                }
                                                // Return original if it seems like an embed or other URL
                                                return url;
                                            })()}
                                            title={lesson.title}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No video available
                                    </p>
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-3">
                                    Materi
                                </h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {lesson.content}
                                </p>
                            </div>

                            {/* ACTION */}
                            <div className="flex items-center justify-between border-t pt-6">
                                {isCompleted ? (
                                    <span className="inline-flex items-center bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
                                        ✅ Lesson Completed
                                    </span>
                                ) : (
                                    <button
                                        onClick={handleComplete}
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-xl transition disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Processing..."
                                            : "Mark as Complete"}
                                    </button>
                                )}

                                <Link
                                    href={route(
                                        "subjects.show",
                                        lesson.subject.id
                                    )}
                                    className="text-sm text-gray-500 hover:underline"
                                >
                                    ← Back to {lesson.subject.title}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
