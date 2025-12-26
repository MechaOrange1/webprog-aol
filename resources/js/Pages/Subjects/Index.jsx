import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, subjects }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    All Subjects
                </h2>
            }
        >
            <Head title="Subjects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                            >
                                {/* IMAGE */}
                                <img
                                    src={
                                        subject.thumbnail_url ||
                                        "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={subject.title}
                                    className="h-44 w-full object-cover"
                                />

                                {/* CONTENT */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-1">
                                        {subject.title}
                                    </h3>

                                    {/* DESCRIPTION (FIX HEIGHT + CLAMP) */}
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                                        {subject.description}
                                    </p>

                                    <div className="text-sm text-gray-600 mb-4">
                                        <span className="font-medium">
                                            Level:
                                        </span>{" "}
                                        {subject.level}
                                        <br />
                                        <span className="font-medium">
                                            Price:
                                        </span>{" "}
                                        {subject.price}
                                    </div>

                                    {/* BUTTON STAYS AT BOTTOM */}
                                    <Link
                                        href={route(
                                            "subjects.show",
                                            subject.id
                                        )}
                                        className="mt-auto inline-block w-full text-center bg-[#145da0] text-white py-2 rounded-xl hover:bg-[#0f4c81] transition"
                                    >
                                        Lihat Materi →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BACK */}
                    <div className="mt-10 text-center">
                        <Link
                            href={route("dashboard")}
                            className="text-gray-500 hover:underline"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
