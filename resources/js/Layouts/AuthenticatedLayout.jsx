import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Tentukan menu berdasarkan role
    const menuItems =
        user.role === "admin"
            ? [
                  { name: "Admin Dashboard", href: route("admin.dashboard") },
                  {
                      name: "Subjects Management",
                      href: route("admin.subjects.index"),
                  },
              ]
            : [
                  { name: "Dashboard", href: route("dashboard") },
                  { name: "All Subjects", href: route("subjects.index") },
              ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* ================= NAVBAR ================= */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex h-16 items-center justify-between">
                        {/* LEFT: Logo */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <img
                                    src="/img/PintarEduCharacterLogo.png"
                                    alt="PintarEducation Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="font-bold text-gray-800 hidden sm:inline">
                                    PintarEducation
                                </span>
                            </Link>
                        </div>

                        {/* RIGHT: Desktop Nav + Username */}
                        <div className="flex items-center gap-4">
                            {/* Desktop Nav Links */}
                            <div className="hidden md:flex items-center gap-6">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        active={route().current(item.href)}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Username dropdown (tetap muncul di semua ukuran) */}
                            <div className="flex-shrink-0">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                                            <span>{user.name}</span>
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
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        {user.role !== "admin" && (
                                            <Dropdown.Link
                                                href={route(
                                                    "student-dashboard"
                                                )}
                                            >
                                                Student Dashboard
                                            </Dropdown.Link>
                                        )}
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

                            {/* Hamburger Button ONLY MOBILE */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    {mobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 pt-4 pb-4 flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.href}
                                    href={item.href}
                                    className="block"
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
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
