function TransportCard({ transport }) {
  const demandScore = Math.round(transport?.demand_score ?? 0);
  const demandLevel = transport?.demand_level || "Unknown";
  const status = transport?.status || "Unavailable";
  const source = transport?.source || "Estimated";

  const normalizedLevel = demandLevel.toLowerCase();

  const isHigh = normalizedLevel.includes("high");
  const isLow = normalizedLevel.includes("low");

  const levelClass = isHigh
    ? "bg-red-500/10 text-red-600 dark:text-red-300"
    : isLow
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
      : "bg-amber-500/10 text-amber-600 dark:text-amber-300";

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-solid)] p-6 sm:p-7">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Transport
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              Travel demand
            </h3>
          </div>

          <div className="float-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
            🚆
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-[var(--border)]">
            <div
              className="absolute inset-[-8px] rounded-full border-8 border-transparent border-t-[var(--accent)] transition-transform duration-1000"
              style={{
                transform: `rotate(${45 + demandScore * 2.7}deg)`,
              }}
            />

            <div className="text-center">
              <p className="text-3xl font-bold">
                {demandScore}
              </p>

              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                score
              </p>
            </div>
          </div>

          <div>
            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${levelClass}`}
            >
              {demandLevel}
            </span>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Estimated transportation pressure around the selected
              destination and time.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <p className="text-xs text-[var(--text-muted)]">
              Status
            </p>

            <p className="mt-2 font-semibold">
              {status}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <p className="text-xs text-[var(--text-muted)]">
              Source
            </p>

            <p className="mt-2 font-semibold">
              {source}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Transport demand is currently estimated
        </div>
      </div>
    </div>
  );
}

export default TransportCard;