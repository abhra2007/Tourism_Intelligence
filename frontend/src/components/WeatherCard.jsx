function WeatherCard({ weather }) {
  const temperature = weather?.temperature;
  const humidity = weather?.humidity;
  const precipitation = weather?.precipitationProbability;
  const wind = weather?.windSpeed;

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-solid)] p-6 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Weather
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              Current conditions
            </h3>
          </div>

          <div className="float-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-2xl">
            🌦️
          </div>
        </div>

        <div className="mt-8 flex items-end gap-3">
          <span className="text-5xl font-bold tracking-tight">
            {temperature != null ? `${Math.round(temperature)}°` : "--"}
          </span>

          <span className="mb-2 text-sm text-[var(--text-muted)]">
            temperature
          </span>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            {
              icon: "💧",
              label: "Humidity",
              value: humidity != null ? `${Math.round(humidity)}%` : "--",
            },
            {
              icon: "🌧️",
              label: "Rain",
              value:
                precipitation != null
                  ? `${Math.round(precipitation)}%`
                  : "--",
            },
            {
              icon: "💨",
              label: "Wind",
              value: wind != null ? `${Math.round(wind)} km/h` : "--",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className="fade-up rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-lg">{item.icon}</div>

              <p className="mt-3 text-xs text-[var(--text-muted)]">
                {item.label}
              </p>

              <p className="mt-1 text-sm font-bold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Weather data from Open-Meteo
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;