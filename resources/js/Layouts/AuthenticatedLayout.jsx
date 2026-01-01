import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* ================= NAVBAR ================= */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex h-16 items-center justify-between">
                        {/* LEFT */}
                        <div className="flex items-center gap-10">
                            <Link href="/" className="flex items-center gap-3">
                                {/* LOGO IMAGE */}
                                <img
                                    src="/img/PintarEduCharacterLogo.png"
                                    alt="PintarEducation Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="font-bold text-gray-800 hidden sm:inline">
                                    PintarEducation
                                </span>
                            </Link>

                            <div className="hidden md:flex items-center gap-6">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route("subjects.index")}
                                    active={route().current("subjects.*")}
                                >
                                    Subjects
                                </NavLink>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center gap-3 rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-[#145da0] text-white flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="hidden sm:inline">
                                            {user.name}
                                        </span>
                                        <svg
                                            className="h-4 w-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right">
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route("student-dashboard")}
                                    >
                                        Student Dashboard
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* OPTIONAL PAGE HEADER */}
            {header && (
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-6">{header}</div>
                </header>
            )}

            {/* ================= MAIN ================= */}
            <main className="flex-1">{children}</main>

            {/* ================= FOOTER ================= */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} PintarEducation. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
