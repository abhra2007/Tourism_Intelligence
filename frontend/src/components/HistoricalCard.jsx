function HistoricalCard({ historical }) {
  const averageScore = Math.round(historical?.average_score ?? 0);
  const estimatedScore = Math.round(historical?.estimated_score ?? 0);
  const comparison = historical?.comparison;

  const comparisonText =
    typeof comparison === "number"
      ? `${comparison >= 0 ? "+" : ""}${comparison.toFixed(1)}`
      : comparison || "N/A";

  const comparisonPositive =
    typeof comparison === "number" && comparison > 0;

  const comparisonNegative =
    typeof comparison === "number" && comparison < 0;

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-solid)] p-6 sm:p-7">
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Historical Pattern
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              What history suggests
            </h3>
          </div>

          <div className="float-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            📈
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Historical average
            </p>

            <p className="mt-3 text-4xl font-bold">
              {averageScore}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              crowd score
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Estimated
            </p>

            <p className="mt-3 text-4xl font-bold">
              {estimatedScore}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              selected period
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)]">
                Compared with historical pattern
              </p>

              <p className="mt-1 text-sm font-semibold">
                {historical?.peak_period || "Pattern unavailable"}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                comparisonPositive
                  ? "bg-red-500/10 text-red-600 dark:text-red-300"
                  : comparisonNegative
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    : "bg-[var(--accent-soft)] text-[var(--primary)]"
              }`}
            >
              {comparisonText}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>
            Source: {historical?.source || "Estimated"}
          </span>

          <span
            className={`rounded-full px-3 py-1 ${
              historical?.is_observed_data
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-300"
            }`}
          >
            {historical?.is_observed_data
              ? "Observed data"
              : "Estimated pattern"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HistoricalCard;