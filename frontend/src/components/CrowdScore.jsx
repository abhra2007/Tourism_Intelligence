function CrowdScore({ crowd, factors }) {
  const score = Math.round(crowd?.score ?? 0);

  const getLevelStyle = (level) => {
    const normalized = String(level || "").toLowerCase();

    if (normalized.includes("low")) {
      return {
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        ring: "stroke-emerald-400",
        glow: "shadow-emerald-500/10",
      };
    }

    if (normalized.includes("high")) {
      return {
        badge: "bg-red-500/10 text-red-600 dark:text-red-300",
        ring: "stroke-red-400",
        glow: "shadow-red-500/10",
      };
    }

    return {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
      ring: "stroke-amber-400",
      glow: "shadow-amber-500/10",
    };
  };

  const levelStyle = getLevelStyle(crowd?.level);

  const factorItems = [
    ["Base", factors?.base_score],
    ["Weekend", factors?.weekend_effect],
    ["Time", factors?.time_of_day_effect],
    ["Weather", factors?.weather_effect],
    ["Seasonality", factors?.seasonality_effect],
    ["Holiday", factors?.holiday_effect],
    ["Transport", factors?.transport_effect],
    ["Events", factors?.event_effect],
  ];

  const radius = 82;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-solid)] p-6 sm:p-8">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
        {/* SCORE RING */}
        <div className="flex justify-center">
          <div
            className={`relative flex h-56 w-56 items-center justify-center rounded-full shadow-2xl ${levelStyle.glow}`}
          >
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-[var(--border)]"
              />

              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                className={`${levelStyle.ring} transition-all duration-[1500ms] ease-out`}
                strokeDasharray={circumference}
                strokeDashoffset={progress}
              />
            </svg>

            <div className="text-center">
              <p className="text-5xl font-bold tracking-tight">
                {score}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Crowd Score
              </p>
            </div>
          </div>
        </div>

        {/* INFORMATION */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${levelStyle.badge}`}
            >
              {crowd?.level || "Unknown"}
            </span>

            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm text-[var(--text-secondary)]">
              Confidence {Math.round((crowd?.confidence ?? 0) * 100)}%
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-bold">
            Expected visitor intensity
          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">
            The score combines multiple destination signals to estimate how
            busy the location may feel at the selected date and time.
          </p>

          {/* FACTORS */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Contributing factors
            </p>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {factorItems.map(([name, value], index) => (
                <div
                  key={name}
                  className="fade-up rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--text-muted)]">
                      {name}
                    </span>

                    <span className="text-sm font-bold">
                      {value >= 0 ? "+" : ""}
                      {Number(value ?? 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrowdScore;