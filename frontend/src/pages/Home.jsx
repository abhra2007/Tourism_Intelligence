import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  checkBackendHealth,
  getDestinations,
} from "../services/api";

function Home({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("2026-09-10");
  const [time, setTime] = useState("10:00");

  const [backendStatus, setBackendStatus] = useState("checking");
  const [destinations, setDestinations] = useState([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await checkBackendHealth();
        setBackendStatus("online");
      } catch {
        setBackendStatus("offline");
      }

      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch {
        setDestinations([]);
      } finally {
        setDestinationsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(destination.toLowerCase())
  );

  /*
   * Navigate to Analysis.
   *
   * Analysis.jsx is responsible for making the actual
   * /analysis/ API request.
   */
  const handleAnalyze = () => {
    if (!destination.trim()) return;

    navigate(
      `/analysis?destination=${encodeURIComponent(
        destination.trim()
      )}&date=${date}&time=${time}`
    );
  };

  const selectDestination = (name) => {
    setDestination(name);
    setShowSuggestions(false);
  };

  const destinationImages = {
    goa:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",

    darjeeling:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",

    gangtok:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",

    shillong:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85";

  const getDestinationImage = (item) => {
    const id = item.id?.toLowerCase();
    const name = item.name?.toLowerCase();

    return (
      destinationImages[id] ||
      destinationImages[name] ||
      fallbackImage
    );
  };

  return (
    <div className="page-enter min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="travel-background relative overflow-hidden bg-[linear-gradient(135deg,var(--hero-start),var(--hero-end))] px-6 py-24 text-white sm:py-28">

        {/* Ambient lights */}

        <div className="ambient-light teal -left-32 top-20" />

        <div className="ambient-light blue right-[-180px] top-[40%]" />

        <div className="ambient-light warm bottom-[-200px] left-[35%]" />

        {/* Floating orbs */}

        <div className="travel-orb -right-32 top-20" />

        <div className="travel-orb bottom-0 left-1/3" />

        <div className="travel-orb left-[-120px] top-[55%]" />

        {/* Decorative route */}

        <div className="pointer-events-none absolute left-[8%] top-[25%] hidden h-px w-[35%] rotate-[18deg] bg-gradient-to-r from-transparent via-teal-300/40 to-transparent lg:block">
          <div className="absolute -top-1 h-2 w-2 animate-pulse rounded-full bg-teal-300 shadow-[0_0_15px_rgba(94,234,212,0.8)]" />
        </div>

        <div className="pointer-events-none absolute right-[12%] top-[28%] hidden h-px w-[20%] -rotate-[25deg] bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent xl:block">
          <div className="absolute right-0 -top-1 h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* HERO TEXT */}

          <div className="mx-auto max-w-4xl text-center">

            <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 shadow-lg backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />

              AI-Powered Destination Intelligence
            </div>

            <h1 className="fade-up fade-up-delay-1 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Travel smarter.
              <br />

              <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-white bg-clip-text text-transparent">
                Avoid the crowds.
              </span>
            </h1>

            <p className="fade-up fade-up-delay-2 mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Discover when and where to travel using AI-driven crowd
              intelligence, weather, transport demand, events and seasonal
              patterns.
            </p>

          </div>


          {/* =================================================
              SEARCH PANEL
          ================================================= */}

          <div className="fade-up fade-up-delay-3 mx-auto mt-12 max-w-5xl">

            <div className="glass search-panel rounded-[1.7rem] p-4 text-[var(--text-primary)] sm:p-6">

              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end">

                {/* DESTINATION */}

                <div className="relative">

                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                    Destination
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg">
                      📍
                    </span>

                    <input
                      type="text"
                      value={destination}
                      onChange={(event) => {
                        setDestination(event.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAnalyze();
                        }
                      }}
                      placeholder={
                        destinationsLoading
                          ? "Loading destinations..."
                          : "Where are you going?"
                      }
                      className="theme-input pl-12 pr-4"
                    />

                  </div>


                  {/* SUGGESTIONS */}

                  {showSuggestions &&
                    destination &&
                    filteredDestinations.length > 0 && (

                      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-2 shadow-2xl backdrop-blur-xl">

                        {filteredDestinations.map((item) => (

                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              selectDestination(item.name)
                            }
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent-soft)] hover:pl-5"
                          >

                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                              📍
                            </span>

                            <div>
                              <p className="font-semibold">
                                {item.name}
                              </p>

                              <p className="text-xs text-[var(--text-muted)]">
                                {item.state}, {item.country}
                              </p>
                            </div>

                          </button>

                        ))}

                      </div>

                    )}

                </div>


                {/* DATE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(event) =>
                      setDate(event.target.value)
                    }
                    className="theme-input px-4"
                  />

                </div>


                {/* TIME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                    Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(event) =>
                      setTime(event.target.value)
                    }
                    className="theme-input px-4"
                  />

                </div>


                {/* ANALYZE */}

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={
                    !destination.trim() ||
                    destinationsLoading
                  }
                  className="button-premium h-14 rounded-2xl bg-[var(--accent)] px-7 font-semibold text-white shadow-lg shadow-teal-900/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Analyze

                  <span className="ml-2">
                    →
                  </span>
                </button>

              </div>


              {/* BACKEND STATUS */}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">

                <span
                  className={`h-2 w-2 rounded-full ${
                    backendStatus === "online"
                      ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                      : backendStatus === "offline"
                        ? "bg-red-400"
                        : "animate-pulse bg-yellow-400"
                  }`}
                />

                {backendStatus === "online"
                  ? "Intelligence engine connected"
                  : backendStatus === "offline"
                    ? "Backend unavailable"
                    : "Connecting to intelligence engine..."}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          POPULAR DESTINATIONS
      ===================================================== */}

      <section className="travel-background relative overflow-hidden px-6 py-24">

        <div className="ambient-light teal -left-40 top-20" />

        <div className="ambient-light blue right-[-180px] top-1/2" />

        <div className="ambient-light warm bottom-[-180px] left-1/3" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="fade-up mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Explore
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Popular destinations
              </h2>

              <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
                Start with one of our currently supported destinations and
                explore its predicted travel conditions.
              </p>

            </div>

            <div className="hidden items-center gap-2 text-sm font-semibold text-[var(--primary)] sm:flex">
              Explore destinations
              <span className="text-lg">
                →
              </span>
            </div>

          </div>


          {destinationsLoading ? (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-[1.5rem] bg-[var(--surface-soft)]"
                />
              ))}

            </div>

          ) : destinations.length === 0 ? (

            <div className="premium-card rounded-3xl p-10 text-center">

              <div className="text-4xl">
                🗺️
              </div>

              <h3 className="mt-4 text-xl font-bold">
                No destinations available
              </h3>

              <p className="mt-2 text-[var(--text-secondary)]">
                The destination database could not be loaded.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {destinations.map((item, index) => {

                const image = getDestinationImage(item);

                return (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDestination(item.name);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="destination-card fade-up group relative h-72 overflow-hidden rounded-[1.5rem] text-left"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >

                    {/* IMAGE */}

                    <img
                      src={image}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />


                    {/* GRADIENT */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 transition-all duration-700 group-hover:from-black/95 group-hover:via-black/40" />


                    {/* GLASS BORDER */}

                    <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:border-white/55" />


                    {/* HOVER LIGHT */}

                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-teal-300/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />


                    {/* ARROW */}

                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-lg text-white shadow-lg backdrop-blur-md transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-[var(--accent)]">
                      ↗
                    </div>


                    {/* CONTENT */}

                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">

                      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/65">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(94,234,212,0.9)]" />
                        Destination
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/70">
                        {item.state}, {item.country}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">

                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                          Analyze destination
                        </span>

                        <span className="translate-x-0 text-lg transition-transform duration-500 group-hover:translate-x-2">
                          →
                        </span>

                      </div>

                    </div>

                  </button>

                );
              })}

            </div>

          )}

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="travel-background relative overflow-hidden bg-[var(--background-secondary)] px-6 py-24 transition-colors duration-500">

        <div className="ambient-light teal -left-40 top-1/3" />

        <div className="ambient-light blue right-[-160px] bottom-[-100px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
              Intelligence layer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              More than just a crowd score
            </h2>

            <p className="mt-4 text-[var(--text-secondary)]">
              Multiple signals come together to give you a clearer picture of
              what your destination may look like.
            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {[
              {
                icon: "👥",
                title: "Crowd Intelligence",
                text: "Understand expected crowd levels for your selected date and time.",
              },
              {
                icon: "🌦️",
                title: "Weather Signals",
                text: "Weather conditions are incorporated into the destination analysis.",
              },
              {
                icon: "🚆",
                title: "Travel Signals",
                text: "Transport demand, holidays, events and seasonal patterns enrich the prediction.",
              },
            ].map((feature, index) => (

              <div
                key={feature.title}
                className={`premium-card fade-up rounded-3xl p-7 ${
                  index === 1
                    ? "glow-pulse"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 140}ms`,
                }}
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl shadow-sm">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-8 transition-colors duration-500">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-[var(--text-muted)] md:flex-row md:text-left">

          <p>
            Tourism Intelligence Platform
          </p>

          <p>
            Built for smarter, calmer and more informed journeys.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;