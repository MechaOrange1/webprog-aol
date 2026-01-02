import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="min-h-screen bg-[#f3f4f6] py-12">
                <div className="max-w-5xl mx-auto px-6 space-y-10">
                    {/* ===== PAGE HEADER ===== */}
                    <div className="bg-white rounded-2xl shadow p-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            ⚙️ Account Settings
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Kelola informasi akun dan keamanan Anda
                        </p>
                    </div>

                    {/* ===== PROFILE INFO ===== */}
                    <section className="bg-white rounded-2xl shadow p-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                👤 Profile Information
                            </h2>
                            <p className="text-sm text-gray-500">
                                Perbarui nama dan email akun Anda
                            </p>
                        </div>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>

                    {/* ===== PASSWORD ===== */}
                    <section className="bg-white rounded-2xl shadow p-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                🔒 Change Password
                            </h2>
                            <p className="text-sm text-gray-500">
                                Gunakan password yang kuat untuk keamanan akun
                            </p>
                        </div>

                        <UpdatePasswordForm className="max-w-xl" />
                    </section>

                    {/* ===== DELETE ACCOUNT ===== */}
                    <section className="bg-white rounded-2xl shadow p-8 border border-red-100">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-red-600">
                                ⚠️ Delete Account
                            </h2>
                            <p className="text-sm text-gray-500">
                                Tindakan ini bersifat permanen dan tidak dapat
                                dibatalkan
                            </p>
                        </div>

                        <DeleteUserForm className="max-w-xl" />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
