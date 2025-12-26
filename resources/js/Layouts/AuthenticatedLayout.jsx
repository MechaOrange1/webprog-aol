import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#145da0] via-[#6fa3a1] to-[#ffd21f]">
            {/* NAVBAR */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex h-16 items-center justify-between">
                        {/* LEFT */}
                        <div className="flex items-center gap-10">
                            <Link href="/">
                                <ApplicationLogo className="h-9 w-auto text-gray-800" />
                            </Link>

                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                My Dashboard
                            </NavLink>

                            {/* Tambah menu lain jika perlu */}
                            {/* 
                            <NavLink href={route("subjects.index")}>
                                Subjects
                            </NavLink> 
                            */}
                        </div>

                        {/* RIGHT */}
                        <div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        {user.name}
                                        <svg
                                            className="h-4 w-4"
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

            {/* OPTIONAL HEADER */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-6 py-6">{header}</div>
                </header>
            )}

            {/* MAIN */}
            <main className="flex-1">{children}</main>

            {/* FOOTER */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} PintarEducation. All rights
                        reserved.
                    </p>

                    {/* <div className="flex gap-6 text-sm">
                        <Link
                            href="/about"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Privacy Policy
                        </Link>
                    </div> */}
                </div>
            </footer>
        </div>
    );
}
