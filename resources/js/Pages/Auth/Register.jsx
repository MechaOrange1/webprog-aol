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

            <div className="text-center mb-6">
                <h2 className="text-center text-2xl font-bold text-[#145da0]">Create Your Account</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Join us today and start your learning journey
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Enter your full name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email Address" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="Enter your email address"
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
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Create a strong password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                        placeholder="Confirm your password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            onChange={(e) =>
                                setData('terms', e.target.checked)
                            }
                            required
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            I agree to the{' '}
                            <Link href="#" className="text-indigo-600 hover:text-indigo-500 underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="#" className="text-indigo-600 hover:text-indigo-500 underline">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    <InputError message={errors.terms} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center bg-[#145da0] hover:bg-[#0f4c8a]" disabled={processing}>
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </PrimaryButton>
                </div>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                        >
                            Sign in here
                        </Link>
                    </span>
                </div>
            </form>
        </GuestLayout>
    );
}
