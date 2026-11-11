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
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5EF] px-4 py-10">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#294B3A]/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#C58B4A]/10 blur-3xl" />

            {/* LOGIN CARD */}
            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-3xl border border-[#E8E4DA] bg-white p-8 shadow-[0_20px_60px_rgba(38,59,48,0.08)] sm:p-10">

                    {/* Logo */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#294B3A]/10 bg-[#294B3A]/5">
                            <span className="font-serif text-4xl font-bold text-[#294B3A]">
                                A
                            </span>
                        </div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C58B4A]">
                            Arkahf Craft Internal
                        </p>

                        <h1 className="text-2xl font-bold text-[#263B30]">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#777C73]">
                            Silakan login untuk mengakses halaman totalisasi penjualan.
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-semibold text-[#35473B]"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan username"
                                autoComplete="username"
                                className="w-full rounded-xl border border-[#E5E1D7] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#263B30] outline-none transition placeholder:text-[#A5A69F] focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10 disabled:opacity-60"
                                required
                                disabled={isLoading || showSuccess}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-[#35473B]"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-[#E5E1D7] bg-[#FAF9F6] px-4 py-3.5 pr-12 text-sm text-[#263B30] outline-none transition placeholder:text-[#A5A69F] focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10 disabled:opacity-60"
                                    required
                                    disabled={isLoading || showSuccess}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    disabled={isLoading || showSuccess}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#858A80] transition hover:bg-[#294B3A]/5 hover:text-[#294B3A] disabled:opacity-50"
                                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading || showSuccess}
                            className="w-full rounded-xl bg-[#294B3A] px-4 py-3.5 font-semibold text-white shadow-lg shadow-[#294B3A]/15 transition hover:-translate-y-0.5 hover:bg-[#355D48] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Memproses..." : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 border-t border-[#EEEAE1] pt-5 text-center">
                        <p className="text-xs text-[#92958D]">
                            Halaman khusus administrator
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-[#294B3A]">
                            ARKAHF CRAFT
                        </p>
                    </div>
                </div>
            </div>

            {/* POPUP LOGIN BERHASIL */}
            {showSuccess && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#263B30]/40 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm animate-[successPopup_0.25s_ease-out] rounded-3xl border border-[#E8E4DA] bg-white p-8 text-center shadow-2xl">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#294B3A]/10 bg-[#294B3A]/10">
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
                                className="text-[#294B3A]"
                            >
                                <path d="m5 12 4 4L19 6" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-bold text-[#263B30]">
                            Login Berhasil
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#777C73]">
                            Selamat datang kembali.
                            <br />
                            Anda berhasil masuk ke halaman Totalisasi.
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-2">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C58B4A]" />
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C58B4A] [animation-delay:150ms]" />
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C58B4A] [animation-delay:300ms]" />

                            <span className="ml-2 text-xs text-[#858A80]">
                                Membuka Totalisasi...
                            </span>
                        </div>

                        <div className="mt-6 border-t border-[#EEEAE1] pt-4">
                            <p className="text-[11px] text-[#92958D]">
                                Arkahf Craft Internal
                            </p>
                        </div>
                    </div>
                </div>
            )}

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