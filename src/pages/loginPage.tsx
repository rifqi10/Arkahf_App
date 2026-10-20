import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type LoginPageProps = {
    onLoginSuccess: () => void;
};

const LOGIN_USERNAME = "arkahf65";
const LOGIN_PASSWORD = "Sholawat123";

export default function LoginPage({
    onLoginSuccess,
}: LoginPageProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Popup login berhasil
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!showSuccess) {
            return;
        }

        const timer = window.setTimeout(() => {
            onLoginSuccess();
        }, 1400);

        return () => {
            window.clearTimeout(timer);
        };
    }, [showSuccess, onLoginSuccess]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        // Sedikit delay agar proses login terasa natural
        setTimeout(() => {
            if (
                username.trim() === LOGIN_USERNAME &&
                password === LOGIN_PASSWORD
            ) {
                // Session berlaku selama 24 jam
                const expiresAt =
                    Date.now() + 24 * 60 * 60 * 1000;

                sessionStorage.setItem(
                    "arkahf_totalisasi_auth",
                    String(expiresAt)
                );

                // Tampilkan popup berhasil terlebih dahulu
                setShowSuccess(true);
            } else {
                setError("Username atau password salah.");
                setIsLoading(false);
            }
        }, 400);
    };

    return (
        <div className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4">

            {/* =========================================
                LOGIN CARD
            ========================================= */}
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl">

                    {/* Logo / Judul */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10">
                            <span className="text-2xl font-bold text-amber-400">
                                A
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-white">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            Silakan login untuk mengakses halaman totalisasi
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                placeholder="Masukkan username"
                                autoComplete="username"
                                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
                                required
                                disabled={isLoading || showSuccess}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
                                    required
                                    disabled={isLoading || showSuccess}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    disabled={
                                        isLoading ||
                                        showSuccess
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-amber-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                >
                                    {showPassword ? (
                                        /* Icon mata terbuka */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                            />
                                        </svg>
                                    ) : (
                                        /* Icon mata dicoret */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-4.232 5.383" />
                                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.526-5.273" />
                                            <path d="m2 2 20 20" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={
                                isLoading ||
                                showSuccess
                            }
                            className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading
                                ? "Memproses..."
                                : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-xs text-slate-600">
                        Halaman khusus administrator
                    </p>
                </div>
            </div>

            {/* =========================================
                POPUP LOGIN BERHASIL
            ========================================= */}
            {showSuccess && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-sm animate-[successPopup_0.25s_ease-out] rounded-3xl border border-white/10 bg-slate-900 p-7 text-center shadow-2xl shadow-black/50">

                        {/* Icon centang */}
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-emerald-400"
                            >
                                <path d="m5 12 4 4L19 6" />
                            </svg>

                        </div>

                        {/* Judul */}
                        <h2 className="text-xl font-bold text-white">
                            Login Berhasil
                        </h2>

                        {/* Deskripsi */}
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Selamat datang kembali.
                            <br />
                            Anda berhasil masuk ke
                            halaman Totalisasi.
                        </p>

                        {/* Loading kecil */}
                        <div className="mt-6 flex items-center justify-center gap-2">

                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 [animation-delay:150ms]" />
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 [animation-delay:300ms]" />

                            <span className="ml-2 text-xs text-slate-500">
                                Membuka Totalisasi...
                            </span>

                        </div>

                        {/* Footer */}
                        <div className="mt-6 border-t border-white/5 pt-4">
                            <p className="text-[11px] text-slate-600">
                                Arkahf Craft Internal
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Animasi popup */}
            <style>
                {`
                    @keyframes successPopup {
                        from {
                            opacity: 0;
                            transform: scale(0.95) translateY(8px);
                        }

                        to {
                            opacity: 1;
                            transform: scale(1) translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
}