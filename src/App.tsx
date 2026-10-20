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

  // Belum pernah login
  if (!storedValue) {
    return {
      authenticated: false,
      expired: false,
    };
  }

  const expiresAt = Number(storedValue);

  // Data session rusak
  if (!Number.isFinite(expiresAt)) {
    sessionStorage.removeItem(AUTH_KEY);

    return {
      authenticated: false,
      expired: true,
    };
  }

  // Session sudah habis
  if (Date.now() >= expiresAt) {
    sessionStorage.removeItem(AUTH_KEY);

    return {
      authenticated: false,
      expired: true,
    };
  }

  // Session masih aktif
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
   LOADING
========================================= */

function LoadingPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-amber-400" />

        <p className="text-sm text-slate-400">
          Memuat...
        </p>
      </div>
    </div>
  );
}

/* =========================================
   POPUP SESSION HABIS
========================================= */

type SessionExpiredModalProps = {
  onLogin: () => void;
};

function SessionExpiredModal({
  onLogin,
}: SessionExpiredModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50">

        {/* Icon */}
        <div className="px-7 pt-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
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
              className="text-amber-400"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />
              <polyline points="12 7 12 12 15 14" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-white">
            Sesi Telah Berakhir
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Sesi login Anda telah berakhir
            setelah 24 jam demi menjaga
            keamanan akun.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Silakan login kembali untuk
            mengakses halaman Totalisasi.
          </p>
        </div>

        {/* Button */}
        <div className="px-7 pb-7 pt-6">
          <button
            type="button"
            onClick={onLogin}
            className="w-full rounded-xl bg-amber-500 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 active:scale-[0.98]"
          >
            Login Kembali
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 bg-white/[0.02] px-7 py-3 text-center">
          <p className="text-[11px] text-slate-600">
            Arkahf Craft Internal
          </p>
        </div>
      </div>
    </div>
  );
}



/* =========================================
   POPUP KONFIRMASI LOGOUT
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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50">
        <div className="px-7 pt-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
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
              className="text-amber-400"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-white">
            Konfirmasi Logout
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Apakah Anda yakin ingin keluar dari
            Arkahf Craft Internal?
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Pilih Ya untuk keluar atau Tidak
            untuk membatalkan.
          </p>
        </div>

        <div className="flex gap-3 px-7 pb-7 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            Tidak
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-xl bg-amber-500 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 active:scale-[0.98]"
          >
            Ya
          </button>
        </div>

        <div className="border-t border-white/5 bg-white/[0.02] px-7 py-3 text-center">
          <p className="text-[11px] text-slate-600">
            Arkahf Craft Internal
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

      setIsAuthenticated(
        auth.authenticated
      );

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

    const expirationTime =
      Number(expiresAt);

    const remainingTime =
      expirationTime - Date.now();

    // Sudah expired
    if (remainingTime <= 0) {
      sessionStorage.removeItem(AUTH_KEY);

      setIsAuthenticated(false);
      setShowSessionExpired(true);

      return;
    }

    // Timer sampai session habis
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
        document.visibilityState !==
        "visible"
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
     TAMPILKAN KONFIRMASI LOGOUT
  ========================================= */

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  /* =========================================
     LOGOUT DIBATALKAN
  ========================================= */

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

      {showLogoutConfirm && (
        <LogoutConfirmModal
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </Suspense>
  );

}