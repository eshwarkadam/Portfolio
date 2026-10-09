"use client";

import { useEffect, useState } from "react";
import { LAYER_COLOR } from "./colors";


// one request traced through the stack: start/end in ms on a 0–240ms axis
const TRACE = [
  { name: "Tap in the mobile app", layer: "Mobile", start: 0, end: 18, detail: "Kotlin and Jetpack Compose, offline-first" },
  { name: "Sign-in check", layer: "Auth", start: 18, end: 46, detail: "Firebase Auth with real-time sync" },
  { name: "POST /sync", layer: "API", start: 46, end: 186, detail: "Ktor REST API with caching and validation" },
  { name: "Read and write", layer: "Database", start: 70, end: 128, detail: "PostgreSQL, indexed queries" },
  { name: "Summarise", layer: "AI", start: 128, end: 176, detail: "Gemini API behind a provider-neutral router" },
  { name: "Served from the cloud", layer: "Cloud", start: 46, end: 200, detail: "Docker containers on Google Cloud Run" },
  { name: "Response on screen", layer: "Response", start: 200, end: 214, detail: "The user sees the result" },
];
const TOTAL = 240;
const PLAY_MS = 2600; // the whole trace replays over 2.6s
const TICKS = [0, 60, 120, 180, 240];

const colorOf = (layer: string) => LAYER_COLOR[layer] ?? "#e8952b";

export function Trace() {
  const [run, setRun] = useState(0);
  const [ms, setMs] = useState(TOTAL);

  // tick the counter alongside the CSS playhead
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now() + 250;
    const step = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / PLAY_MS));
      setMs(Math.round(p * TOTAL));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  return (
    <figure className="mt-16 md:mt-20" aria-labelledby="trace-cap">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <figcaption id="trace-cap" className="text-[var(--soft)]">One request through the stack I build</figcaption>
        <div className="flex items-center gap-4">
          <span className="v2-mono text-lg" aria-live="off">
            <span className="text-[var(--ink)]">{String(ms).padStart(3, " ")}</span>
            <span className="text-[var(--soft)]"> / {TOTAL} ms</span>
          </span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="rounded-full border border-[var(--ink)] px-4 py-1.5 text-sm font-medium transition hover:bg-[var(--ink)] hover:text-white active:scale-95"
          >
            Replay request
          </button>
        </div>
      </div>

      <div key={run} className="relative mt-7 border-t border-[var(--ink)]">
        {/* time axis + playhead live over the bar column */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-0 md:left-[calc(15rem+1.5rem)]">
          {TICKS.map((t) => (
            <span key={t} className="absolute inset-y-0 border-l border-dashed border-[var(--rule)]" style={{ left: `${(t / TOTAL) * 100}%` }}>
              <span className="v2-mono absolute -top-6 -translate-x-1/2 text-[11px] text-[var(--soft)]">{t}</span>
            </span>
          ))}
          <span className="v2-playhead absolute inset-y-0 w-0.5 bg-[var(--cobalt)] shadow-[0_0_14px_rgba(47,73,245,0.7)]" style={{ animationDuration: `${PLAY_MS}ms`, animationDelay: "250ms" }} />
        </div>

        <ol className="relative">
          {TRACE.map((s) => {
            const left = (s.start / TOTAL) * 100;
            const width = ((s.end - s.start) / TOTAL) * 100;
            return (
              <li key={s.name} tabIndex={0} className="v2-row grid grid-cols-1 gap-x-6 border-b border-[var(--rule)] py-3 outline-none md:grid-cols-[15rem_1fr]">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-2.5 shrink-0 rounded-full" style={{ background: colorOf(s.layer) }} />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm text-[var(--soft)]">{s.layer}</p>
                  </div>
                </div>
                <div className="relative mt-2 md:mt-0">
                  <div className="relative h-7">
                    <span
                      aria-hidden
                      className="v2-span absolute top-1 h-5 rounded-[4px]"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: colorOf(s.layer),
                        animationDelay: `${250 + (s.start / TOTAL) * PLAY_MS}ms`,
                        animationDuration: `${Math.max(180, ((s.end - s.start) / TOTAL) * PLAY_MS)}ms`,
                      }}
                    />
                    <span className="v2-ms v2-mono absolute top-1 text-[13px] leading-5 text-[var(--soft)]" style={{ left: `calc(${((s.end / TOTAL) * 100).toFixed(2)}% + 8px)`, animationDelay: `${250 + (s.end / TOTAL) * PLAY_MS}ms` }}>
                      {s.end - s.start} ms
                    </span>
                  </div>
                  <p className="v2-detail text-sm text-[var(--soft)]">{s.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
