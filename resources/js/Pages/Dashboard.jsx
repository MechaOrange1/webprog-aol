import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth }) {
    const [searchQuery, setSearchQuery] = useState("");

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 11) return "🌞 Good Morning";
        if (hour >= 11 && hour < 15) return "☀️ Good Afternoon";
        if (hour >= 15 && hour < 18) return "🌤️ Good Evening";
        return "🌙 Good Night";
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Logic untuk search, bisa redirect ke subjects.index dengan query
        window.location.href = route("subjects.index", { search: searchQuery });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            {/* FULL WIDTH GREETING BAR */}
            <div className="w-full mt-2">
                <div className="w-full bg-gradient-to-r from-[#145da0] to-[#ffd21f] pt-2 pb-20 text-white shadow-md">
                    <div className="mx-auto max-w-7xl px-6">
                        <p className="text-lg opacity-90 mt-6">
                            {getGreeting()},
                        </p>
                        <h1 className="text-4xl font-bold tracking-wide mt-2">
                            {auth.user.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* SEARCH BAR - Positioned below gradient */}
            <div className="relative -mt-10 mx-auto max-w-7xl px-6">
                <form onSubmit={handleSearch} className="w-full">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for subjects, lessons, or topics..."
                            className="w-full px-6 py-4 pr-14 text-gray-700 bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#145da0] placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#145da0] transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* MAIN CONTENT WITH LIGHT BACKGROUND */}
            <div className="bg-[#f9f9f9] min-h-screen py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-4">You're logged in!</p>

                            <h3 className="text-lg font-bold mb-2">
                                Where would you like to go?
                            </h3>

                            <ul className="list-disc list-inside">
                                <li className="mb-2">
                                    <Link
                                        href={route("student-dashboard")}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href={route("subjects.index")}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Browse All Subjects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
