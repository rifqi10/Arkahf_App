
import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

const LandingPage = lazy(
  () => import("./pages/landingPage")
);

const LoginPage = lazy(
  () => import("./pages/loginPage")
);

const TotalisasiPage = lazy(
  () => import("./pages/totalisasiPage")
);

const AUTH_KEY = "arkahf_totalisasi_auth";

/* =========================================
   CEK STATUS SESSION
========================================= */

type AuthStatus = {
  authenticated: boolean;
  expired: boolean;
};

function getAuthStatus(): AuthStatus {
  const storedValue =
    sessionStorage.getItem(AUTH_KEY);

  if (!storedValue) {
    return {
      authenticated: false,
      expired: false,
    };
  }

  const expiresAt = Number(storedValue);

  if (!Number.isFinite(expiresAt)) {
    sessionStorage.removeItem(AUTH_KEY);

    return {
      authenticated: false,
      expired: true,
    };
  }

  if (Date.now() >= expiresAt) {
    sessionStorage.removeItem(AUTH_KEY);

    return {
      authenticated: false,
      expired: true,
    };
  }

  return {
    authenticated: true,
    expired: false,
  };
}

/* =========================================
   CEK HALAMAN TOTALISASI
========================================= */

function getIsTotalisasi() {
  const hash = window.location.hash;

  const admin = new URLSearchParams(
    window.location.search
  ).get("admin");

  return (
    hash === "#/admin/totalisasi" ||
    admin === "totalisasi"
  );
}

/* =========================================
   LOADING PAGE
========================================= */

function LoadingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5EF] px-4">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#294B3A]/[0.05] blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#C58B4A]/[0.07] blur-3xl" />

      <div className="relative w-full max-w-xs rounded-3xl border border-[#E8E4DA] bg-white p-8 text-center shadow-[0_15px_50px_rgba(38,59,48,0.06)]">

        {/* Logo */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E8E4DA] bg-[#F7F5EF]">
          <span className="font-serif text-4xl font-bold text-[#294B3A]">
            A
          </span>
        </div>

        <h2 className="text-lg font-bold text-[#263B30]">
          Arkahf Craft
        </h2>

        <p className="mt-1 text-xs text-[#92958D]">
          Internal Management System
        </p>

        {/* Loading */}
        <div className="mx-auto mt-7 h-8 w-8 animate-spin rounded-full border-[3px] border-[#294B3A]/10 border-t-[#294B3A]" />

        <p className="mt-4 text-sm font-medium text-[#777C73]">
          Memuat halaman...
        </p>

        <div className="mt-6 border-t border-[#EEEAE1] pt-4">
          <p className="text-[10px] font-medium tracking-wider text-[#A5A69F]">
            ARKAHF CRAFT INTERNAL
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   MODAL SESSION HABIS
========================================= */

type SessionExpiredModalProps = {
  onLogin: () => void;
};

function SessionExpiredModal({
  onLogin,
}: SessionExpiredModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#17251D]/45 px-4 py-6 backdrop-blur-sm">

      <div className="w-full max-w-md animate-[modalAppear_0.25s_ease-out] overflow-hidden rounded-3xl border border-[#E8E4DA] bg-white shadow-[0_25px_80px_rgba(20,35,26,0.18)]">

        {/* Content */}
        <div className="px-7 pb-7 pt-9 text-center sm:px-9">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C58B4A]/20 bg-[#C58B4A]/10">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#B17C3F]"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>

          </div>

          {/* Badge */}
          <span className="inline-flex rounded-full bg-[#C58B4A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#A46F34]">
            Keamanan Akun
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#263B30]">
            Sesi Telah Berakhir
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#777C73]">
            Sesi login Anda telah berakhir
            setelah 24 jam demi menjaga
            keamanan akun.
          </p>

          <p className="mt-2 text-sm leading-6 text-[#92958D]">
            Silakan login kembali untuk
            mengakses halaman Totalisasi.
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={onLogin}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#294B3A] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#294B3A]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#355D48] hover:shadow-xl active:translate-y-0"
          >
            Login Kembali

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* Footer */}
        <div className="border-t border-[#EEEAE1] bg-[#FAF9F6] px-7 py-4 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#92958D]">
            ARKAHF CRAFT INTERNAL
          </p>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   MODAL KONFIRMASI LOGOUT
========================================= */

type LogoutConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function LogoutConfirmModal({
  onConfirm,
  onCancel,
}: LogoutConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#17251D]/45 px-4 py-6 backdrop-blur-sm">

      <div className="w-full max-w-md animate-[modalAppear_0.25s_ease-out] overflow-hidden rounded-3xl border border-[#E8E4DA] bg-white shadow-[0_25px_80px_rgba(20,35,26,0.18)]">

        {/* Content */}
        <div className="px-7 pb-7 pt-9 text-center sm:px-9">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C58B4A]/20 bg-[#C58B4A]/10">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#B17C3F]"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>

          </div>

          <span className="inline-flex rounded-full bg-[#294B3A]/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#294B3A]">
            Konfirmasi
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#263B30]">
            Konfirmasi Logout
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#777C73]">
            Apakah Anda yakin ingin keluar
            dari Arkahf Craft Internal?
          </p>

          <p className="mt-2 text-xs text-[#92958D]">
            Pilih Ya untuk keluar atau Tidak
            untuk membatalkan.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">

            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-xl border border-[#E8E4DA] bg-[#FAF9F6] px-5 py-3.5 text-sm font-bold text-[#35473B] transition duration-200 hover:border-[#D5D0C4] hover:bg-[#F1EFE8] active:scale-[0.98]"
            >
              Tidak
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-xl bg-[#294B3A] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#294B3A]/10 transition duration-200 hover:bg-[#355D48] active:scale-[0.98]"
            >
              Ya
            </button>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-[#EEEAE1] bg-[#FAF9F6] px-7 py-4 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#92958D]">
            ARKAHF CRAFT INTERNAL
          </p>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   APP
========================================= */

export default function App() {
  const initialAuth = getAuthStatus();

  const [isTotalisasi, setIsTotalisasi] =
    useState(getIsTotalisasi);

  const [isAuthenticated, setIsAuthenticated] =
    useState(initialAuth.authenticated);

  const [showSessionExpired, setShowSessionExpired] =
    useState(initialAuth.expired);

  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  /* =========================================
     HANDLE HASH
  ========================================= */

  useEffect(() => {
    const handleHashChange = () => {
      setIsTotalisasi(getIsTotalisasi());

      const auth = getAuthStatus();

      setIsAuthenticated(auth.authenticated);

      if (auth.expired) {
        setShowSessionExpired(true);
      }
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  /* =========================================
     TIMER SESSION
  ========================================= */

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const expiresAt =
      sessionStorage.getItem(AUTH_KEY);

    if (!expiresAt) {
      setIsAuthenticated(false);
      return;
    }

    const expirationTime = Number(expiresAt);

    const remainingTime =
      expirationTime - Date.now();

    if (remainingTime <= 0) {
      sessionStorage.removeItem(AUTH_KEY);

      setIsAuthenticated(false);
      setShowSessionExpired(true);

      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.removeItem(AUTH_KEY);

      setIsAuthenticated(false);
      setShowSessionExpired(true);
    }, remainingTime);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isAuthenticated]);

  /* =========================================
     CEK KETIKA KEMBALI KE TAB
  ========================================= */

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState !== "visible"
      ) {
        return;
      }

      const auth = getAuthStatus();

      if (auth.expired) {
        setIsAuthenticated(false);
        setShowSessionExpired(true);

        return;
      }

      if (auth.authenticated) {
        setIsAuthenticated(true);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /* =========================================
     LOGIN BERHASIL
  ========================================= */

  const handleLoginSuccess = () => {
    setShowSessionExpired(false);
    setIsAuthenticated(true);
  };

  /* =========================================
     LOGIN KEMBALI
  ========================================= */

  const handleLoginAgain = () => {
    setShowSessionExpired(false);
  };

  /* =========================================
     KONFIRMASI LOGOUT
  ========================================= */

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  /* =========================================
     LOGOUT DIKONFIRMASI
  ========================================= */

  const handleConfirmLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);

    setIsAuthenticated(false);
    setIsTotalisasi(true);
    setShowSessionExpired(false);
    setShowLogoutConfirm(false);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <>
      <Suspense fallback={<LoadingPage />}>

        {!isTotalisasi ? (
          <LandingPage />
        ) : !isAuthenticated ? (
          <>
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
            />

            {showSessionExpired && (
              <SessionExpiredModal
                onLogin={handleLoginAgain}
              />
            )}
          </>
        ) : (
          <TotalisasiPage
            onLogout={handleLogout}
          />
        )}

      </Suspense>

      {showLogoutConfirm && (
        <LogoutConfirmModal
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}

      {/* GLOBAL ANIMATION */}
      <style>
        {`
          @keyframes modalAppear {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}
