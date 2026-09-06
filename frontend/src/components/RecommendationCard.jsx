function RecommendationCard({ recommendations = [] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--hero-start),var(--hero-end))] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
      {/* Atmospheric decoration */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 backdrop-blur-md">
              <span className="animate-pulse">✦</span>
              AI Travel Advisor
            </div>

            <h3 className="text-2xl font-bold sm:text-3xl">
              Our recommendations
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Practical suggestions based on the destination's predicted
              conditions and available signals.
            </p>
          </div>

          <div className="float-soft flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl backdrop-blur-md">
            🧭
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
            No specific recommendations are available for this analysis.
          </div>
        ) : (
          <div className="mt-8 grid gap-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={`${recommendation}-${index}`}
                className="fade-up flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-300/10 text-teal-200">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm leading-6 text-white/75">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-7 flex items-center gap-2 text-xs text-white/40">
          <span className="h-2 w-2 rounded-full bg-teal-300" />
          Recommendations are generated from the current analysis signals
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;