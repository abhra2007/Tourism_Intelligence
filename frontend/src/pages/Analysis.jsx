import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import CrowdScore from "../components/CrowdScore";
import WeatherCard from "../components/WeatherCard";
import TransportCard from "../components/TransportCard";
import EventsCard from "../components/EventsCard";
import HistoricalCard from "../components/HistoricalCard";
import CrowdChart from "../components/CrowdChart";
import RecommendationCard from "../components/RecommendationCard";

import { analyzeDestination } from "../services/api";

function Analysis({ darkMode, setDarkMode }) {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!destination || !date || !time) {
        setError("Missing destination, date or time.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await analyzeDestination({
          destination,
          date,
          time,
        });

        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.detail ||
            "Unable to load destination analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [destination, date, time]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="travel-background flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />

            <h2 className="text-2xl font-bold">
              Analyzing {destination || "destination"}...
            </h2>

            <p className="mt-3 text-[var(--text-secondary)]">
              Gathering weather, transport and destination signals.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
          <div className="premium-card max-w-lg rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Analysis unavailable
            </h2>

            <p className="mt-3 text-[var(--text-secondary)]">
              {error || "Something went wrong while loading the analysis."}
            </p>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="button-premium mt-6 rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ANALYSIS HERO */}
      <section className="travel-background relative overflow-hidden border-b border-[var(--border)] px-6 py-14">
        <div className="travel-orb -right-32 top-0" />
        <div className="travel-orb bottom-[-100px] left-1/4" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="fade-up flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Destination Analysis
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {analysis.destination}
              </h1>

              <p className="mt-3 text-lg text-[var(--text-secondary)]">
                Intelligence for{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {analysis.date}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {analysis.time}
                </span>
              </p>
            </div>

            <div className="glass rounded-2xl px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Analysis status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-semibold">Live analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* CROWD SCORE */}
        <section className="fade-up fade-up-delay-1">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              AI Assessment
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Expected crowd conditions
            </h2>
          </div>

          <div className="premium-card overflow-hidden rounded-3xl p-2">
            <CrowdScore
              crowd={analysis.crowd}
              factors={analysis.factors}
            />
          </div>
        </section>

        {/* WEATHER + TRANSPORT */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="fade-up fade-up-delay-1 premium-card rounded-3xl p-2">
            <WeatherCard weather={analysis.weather} />
          </div>

          <div className="fade-up fade-up-delay-2 premium-card rounded-3xl p-2">
            <TransportCard transport={analysis.transport} />
          </div>
        </section>

        {/* EVENTS + HISTORICAL */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="fade-up fade-up-delay-2 premium-card rounded-3xl p-2">
            <EventsCard
              events={analysis.events}
              destination={analysis.destination}
            />
          </div>

          <div className="fade-up fade-up-delay-3 premium-card rounded-3xl p-2">
            <HistoricalCard historical={analysis.historical} />
          </div>
        </section>

        {/* CROWD TREND */}
        <section className="fade-up fade-up-delay-2 premium-card mt-6 overflow-hidden rounded-3xl p-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Daily Pattern
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Crowd trend throughout the day
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Estimated crowd intensity across different times.
            </p>
          </div>

          <CrowdChart data={analysis.crowd_trend} />
        </section>

        {/* RECOMMENDATION */}
        <section className="fade-up fade-up-delay-3 mt-6">
          <RecommendationCard
            recommendations={analysis.recommendations}
          />
        </section>

        {/* DATA STATUS */}
        <section className="premium-card mt-8 rounded-3xl p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Intelligence Sources
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Data status
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(analysis.data_status || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="route-line rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium capitalize text-[var(--text-secondary)]">
                      {key.replaceAll("_", " ")}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* FOOTER MESSAGE */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            {analysis.message}
          </p>

          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Crowd predictions are estimates and should not be treated as exact
            visitor counts.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Analysis;