import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

const SocialIcon = ({ label }) => (
    <button type="button" className="flex items-center justify-center w-12 h-12 border border-[#d9d9d9] rounded-lg hover:bg-gray-50 transition">
        <span className="font-bold text-gray-600 text-xs">{label}</span>
    </button>
);

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="fixed inset-0 flex items-center justify-center bg-[#f9f9f9] z-[50] p-4">
                <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[550px] bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                    <div className="relative w-full md:w-5/12 bg-[#ffffff] flex flex-col justify-center items-center text-white p-12 text-center overflow-hidden">
                        <div className="absolute -right-16 top-0 bottom-0 w-32 bg-[#d9d9d9] rounded-[50%] hidden md:block scale-y-150 transform translate-x-4"></div>  
                        <div className="relative z-10">
                            <img src="/img/logo.png" alt="Pintaredication Logo" />
                            <h2 className="text-3xl font-bold mb-2 text-[#145da0]">Hello, Welcome!</h2>
                            <p className="text-sm opacity-80 mb-8 text-[#145da0]">Don't have an account?</p>
                            <Link
                                href={route('register')}
                                className="inline-block px-10 py-2 border-2 bg-[#145da0] rounded-xl font-semibold hover:bg-[#0d4a80] hover:text-[#f9f9f9] transition-all"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-[#d9d9d9]">
                        <h1 className="text-4xl font-bold text-center text-[#145da0] mb-8">Login</h1>

                        {status && <div className="mb-4 text-green-600 text-sm text-center font-medium">{status}</div>}

                        <form onSubmit={submit} className="space-y-4">

                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <span className="absolute right-4 top-3 text-gray-400 hover:">👤</span>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <span className="absolute right-4 top-3 text-gray-400">🔒</span>
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div className="flex items-center justify-between mt-4 mb-4">
                                <label className="flex items-center cursor-pointer">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#145da0] shadow-sm focus:ring-[#ffd21f]"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-[#145da0] hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>

                            <button
                                disabled={processing}
                                className="w-full bg-[#145da0] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#0d4a80] transition-all transform active:scale-95"
                            >
                                Login
                            </button>
                        </form>

                        {/* <div className="mt-8">
                            <p className="text-center text-xs text-gray-400 mb-4">or login with social platforms</p>
                            <div className="flex justify-center gap-4">
                                {['G', 'f', 'gh', 'in'].map((social) => (
                                    <button key={social} className="w-10 h-10 border border-[#d9d9d9] rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 uppercase text-xs">
                                        {social}
                                    </button>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
