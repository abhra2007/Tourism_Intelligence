import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-2xl transition-all duration-500">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-5">

          {/* BRAND */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-[var(--accent-soft)]
                text-xl
                shadow-sm
                transition-all
                duration-500
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              🌍
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-bold tracking-[0.25em] text-[var(--primary)]">
                TOURISM
              </p>

              <p className="text-base font-bold leading-none text-[var(--text-primary)]">
                Intelligence
              </p>
            </div>
          </Link>


          {/* NAVIGATION */}

          <div className="flex items-center gap-1 sm:gap-2">

            <Link
              to="/"
              className="
                route-line
                rounded-xl
                px-3 py-2
                text-sm
                font-medium
                text-[var(--text-secondary)]
                transition-all
                duration-300
                hover:bg-[var(--accent-soft)]
                hover:text-[var(--primary)]
                sm:px-4
              "
            >
              Explore
            </Link>

            <Link
              to="/compare"
              className="
                route-line
                hidden
                rounded-xl
                px-3 py-2
                text-sm
                font-medium
                text-[var(--text-secondary)]
                transition-all
                duration-300
                hover:bg-[var(--accent-soft)]
                hover:text-[var(--primary)]
                sm:block
                sm:px-4
              "
            >
              Compare
            </Link>


            {/* THEME TOGGLE */}

            <button
              type="button"
              onClick={() =>
                setDarkMode((current) => !current)
              }
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="
                ml-1
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[var(--accent)]
                hover:shadow-[0_8px_30px_var(--glow)]
              "
            >
              <span
                className="text-base transition-transform duration-700"
                style={{
                  transform: darkMode
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                {darkMode ? "🌙" : "☀️" }
              </span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;