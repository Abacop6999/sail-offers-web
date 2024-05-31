import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

    // Credenciales predeterminadas
    const defaultCredentials = {
        email: 'dan@example.com',
        password: 'O2331.P',
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="dark:text-white mt-8 mb-4">
                    <p className="text-lg font-semibold">Credenciales predeterminadas:</p>
                    <p>Email: {defaultCredentials.email}</p>
                    <p>Contraseña: {defaultCredentials.password}</p>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex flex-col mt-4">
                    <div className="flex justify-end">
                        <PrimaryButton
                            disabled={processing}
                            type="submit"
                            className="w-24 flex items-center justify-center"
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                    <Link
                        href={route("register")}
                        className="mt-2 text-sm text-white underline"
                    >
                        Don't have an account? Register here
                    </Link>
                    {canResetPassword && (
                        <div className="mt-4 text-sm text-white">
                            <Link
                                href={route("password.request")}
                                className="underline hover:text-gray-200"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
