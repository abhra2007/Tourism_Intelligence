import { useEffect, useState } from "react";
import { checkBackendHealth } from "../services/api";
import splashImage from "../assets/easygo-splash.png";

function SplashScreen({ onComplete }) {
  const [status, setStatus] = useState(
    "Connecting to intelligence engine"
  );

  const [progress, setProgress] = useState(8);
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const wait = (milliseconds) =>
      new Promise((resolve) =>
        setTimeout(resolve, milliseconds)
      );

    const initialize = async () => {
      // Phase 1 — Logo / opening
      await wait(1000);

      if (!mounted) return;

      setStatus("Connecting to intelligence engine");
      setProgress(25);

      try {
        // Real backend health check
        await checkBackendHealth();

        if (!mounted) return;

        // Phase 2 — Backend connected
        setBackendReady(true);
        setStatus("Intelligence engine connected");
        setProgress(55);

        await wait(1000);

        if (!mounted) return;

        // Phase 3 — Preparing intelligence
        setStatus("Preparing destination intelligence");
        setProgress(78);

        await wait(1200);

        if (!mounted) return;

        // Phase 4 — Ready
        setStatus("Ready for smarter journeys");
        setProgress(100);

        await wait(1200);

        if (mounted) {
          onComplete();
        }
      } catch {
        if (!mounted) return;

        setBackendReady(false);
        setStatus("Intelligence engine unavailable");
        setProgress(35);
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <div className="splash-screen fixed inset-0 z-[9999] overflow-hidden bg-black">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        style={{
          backgroundImage: `url(${splashImage})`,
        }}
      />

      <div className="absolute inset-0 bg-black/25" />


      {/* =====================================================
          MAIN EASYGO+ ARTWORK
          ===================================================== */}

      <img
        src={splashImage}
        alt="EasyGo+"
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          padding: "1vh 2vw",
        }}
      />


      {/* =====================================================
          CINEMATIC VIGNETTE
          ===================================================== */}

      <div className="splash-vignette absolute inset-0" />


      {/* =====================================================
          LIGHT SCAN
          ===================================================== */}

      <div className="splash-scan absolute inset-y-0 left-[-30%] w-[25%]" />


      {/* =====================================================
          FLOATING PARTICLES
          ===================================================== */}

      <div className="splash-particle particle-1" />
      <div className="splash-particle particle-2" />
      <div className="splash-particle particle-3" />
      <div className="splash-particle particle-4" />
      <div className="splash-particle particle-5" />


      {/* =====================================================
          INITIALIZATION STATUS
          ===================================================== */}

      <div className="absolute bottom-[4%] left-1/2 z-20 w-[min(90%,720px)] -translate-x-1/2">

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">

          {/* Status */}

          <div className="flex items-center justify-between gap-4">

            <div className="flex min-w-0 items-center gap-3">

              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  backendReady
                    ? "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]"
                    : "animate-pulse bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
                }`}
              />

              <span className="truncate text-xs font-medium tracking-[0.18em] text-white/80 sm:text-sm">
                {status}
              </span>

            </div>

            <span className="shrink-0 font-mono text-xs text-cyan-200 sm:text-sm">
              {progress}%
            </span>

          </div>


          {/* Progress bar */}

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-white shadow-[0_0_15px_rgba(45,212,191,0.9)] transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default SplashScreen;