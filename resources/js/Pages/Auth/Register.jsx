import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="fixed inset-0 flex items-center justify-center bg-[#f9f9f9] z-[50] p-4">
                <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[550px] bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                    <div className="relative w-full md:w-5/12 bg-[#ffffff] flex flex-col justify-center items-center text-white p-12 text-center overflow-hidden">
                        <div className="absolute -right-16 top-0 bottom-0 w-32 bg-[#d9d9d9] rounded-[50%] hidden md:block scale-y-150 transform translate-x-4 pointer-events-none"></div>
                        <div className="relative z-10">
                            <img src="/img/logo.png" alt="Pintaredication Logo" />
                            <h2 className="text-3xl font-bold mb-2 text-[#145da0]">Hello, Welcome!</h2>
                            <p className="text-sm opacity-80 mb-8 text-[#145da0]">Already have an account?</p>
                            <Link
                                href={route('login')}
                                className="inline-block px-10 py-2 border-2 bg-[#145da0] rounded-xl font-semibold hover:bg-[#0d4a80] hover:text-[#f9f9f9] transition-all"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-[#d9d9d9]">
                        <h1 className="text-4xl font-bold text-center text-[#145da0] mb-8">Register</h1>

                        <form onSubmit={submit} className="space-y-4">

                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    required
                                />
                                <span className="absolute right-4 top-3 text-gray-400">👤</span>
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                                <span className="absolute right-4 top-3 text-gray-400">👤</span>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                                <span className="absolute right-4 top-3 text-gray-400">🔒</span>
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full bg-[#f9f9f9] border-none rounded-xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#145da0]"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                                <span className="absolute right-4 top-3 text-gray-400">🔒</span>
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            <div className="mt-4">
                                <label className="flex items-center cursor-pointer">
                                    <Checkbox
                                        name="terms"
                                        checked={data.terms}
                                        onChange={(e) => setData('terms', e.target.checked)}
                                        className="rounded border-gray-300 text-[#145da0] shadow-sm focus:ring-[#ffd21f]"
                                        required
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="#" className="text-[#145da0] hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="#" className="text-[#145da0] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                                <InputError message={errors.terms} className="mt-1" />
                            </div>

                            <button
                                disabled={processing}
                                className="w-full bg-[#145da0] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#0d4a80] transition-all transform active:scale-95"
                            >
                                {processing ? 'Creating Account...' : 'Register'}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
