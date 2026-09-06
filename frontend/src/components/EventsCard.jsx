function EventsCard({ events = [], destination }) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-solid)] p-6 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Events
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              What's happening
            </h3>
          </div>

          <div className="float-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
            🎭
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)] p-6 text-center">
            <div className="text-3xl">✨</div>

            <p className="mt-3 font-semibold">
              No major events detected
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              No significant event signals are currently available for{" "}
              {destination}.
            </p>
          </div>
        ) : (
          <div className="mt-7 space-y-3">
            {events.map((event, index) => (
              <div
                key={`${event.name}-${event.date}-${index}`}
                className="fade-up route-line rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-lg">
                    📅
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="font-bold">
                        {event.name}
                      </h4>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          String(event.impact || "")
                            .toLowerCase()
                            .includes("high")
                            ? "bg-red-500/10 text-red-600 dark:text-red-300"
                            : String(event.impact || "")
                                  .toLowerCase()
                                  .includes("low")
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-300"
                        }`}
                      >
                        {event.impact || "Moderate"} impact
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      {event.date} · {event.start_time} – {event.end_time}
                    </p>

                    {event.source && (
                      <p className="mt-2 text-xs text-[var(--text-muted)]">
                        Source: {event.source}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          Event signals contribute to crowd estimation
        </div>
      </div>
    </div>
  );
}

export default EventsCard;