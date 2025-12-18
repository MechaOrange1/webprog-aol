import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
    <GuestLayout>
        <Head title="Log in" />

        {/* LOGO */}
        <div className="flex justify-center mb-6">
            <img
                src="/img/pintareducation.png"
                alt="Pintar Education"
                className="h-20"
            />
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold text-[#145da0]">
            Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
            Sign in to Continue to Pintar Education
        </p>

        {status && (
            <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700">
                {status}
            </div>
        )}

        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full rounded-lg focus:border-[#145da0] focus:ring-[#145da0]"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full rounded-lg focus:border-[#145da0] focus:ring-[#145da0]"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    <span className="ms-2 text-sm text-gray-600">
                        Remember me
                    </span>
                </label>

                {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="text-sm text-[#145da0] hover:text-[#0f4c8a] underline"
                    >
                        Forgot password?
                    </Link>
                )}
            </div>

            <div className="mt-6">
                <PrimaryButton
                    className="w-full justify-center bg-[#145da0] hover:bg-[#0f4c8a] focus:ring-[#ffd21f]"
                    disabled={processing}
                >
                    Log in
                </PrimaryButton>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
                href={route('register')}
                className="font-medium text-[#145da0] hover:underline"
            >
            Register
            </Link>
            </div>

        </form>
    </GuestLayout>
    );

}
