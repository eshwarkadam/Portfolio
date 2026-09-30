"use client";

import { useEffect, useRef, useState } from "react";

const GAME_SECONDS = 20;
type Bug = { id: number; x: number; y: number; vx: number; vy: number; gold: boolean };

const rankFor = (s: number) =>
  s >= 25 ? "Staff Engineer" : s >= 15 ? "Senior Engineer" : s >= 7 ? "Software Engineer" : "Junior Dev";

const code = [
  "fun deploy(build: Build) {",
  "  require(build.testsPassed)",
  "  cloudRun.release(build.image)",
  "  monitor.watch(errorRate < 0.1)",
  "}",
  "val api = embeddedServer(Netty, port = 8080)",
  "suspend fun sync() = coroutineScope {",
  "  launch { firestore.listen() }",
  "}",
];

function BugIcon({ gold }: { gold: boolean }) {
  const c = gold ? "#ffdb1e" : "#ff6b6b";
  return (
    <svg viewBox="0 0 40 40" className="size-full" aria-hidden>
      {[12, 20, 28].map((y) => (
        <g key={y} stroke={c} strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1={y} x2="4" y2={y - 3} />
          <line x1="28" y1={y} x2="36" y2={y - 3} />
        </g>
      ))}
      <ellipse cx="20" cy="23" rx="9" ry="12" fill={c} />
      <circle cx="20" cy="9" r="5" fill={c} />
      <line x1="20" y1="13" x2="20" y2="34" stroke="#1c2040" strokeWidth="1.5" />
    </svg>
  );
}

/** 20-second "squash the bugs" mini-game. Gold bugs are rare (+5); best score kept in localStorage. */
export function BugGame() {
  const box = useRef<HTMLDivElement>(null);
  const bugs = useRef<Bug[]>([]);
  const els = useRef(new Map<number, HTMLButtonElement>());
  const scoreRef = useRef(0);
  const popId = useRef(0);
  const [live, setLive] = useState<{ id: number; gold: boolean }[]>([]);
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(GAME_SECONDS);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const [pops, setPops] = useState<{ id: number; x: number; y: number; t: string }[]>([]);

  useEffect(() => {
    if (phase !== "play") return;
    const b = box.current!;
    let raf = 0, nextId = 0, spawnAt = 0, shown = GAME_SECONDS, last = performance.now();
    const end = last + GAME_SECONDS * 1000;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (now >= end) {
        const s = scoreRef.current;
        let prev = 0;
        try {
          prev = Number(localStorage.getItem("bugBest")) || 0;
          if (s > prev) localStorage.setItem("bugBest", String(s));
        } catch {}
        setBest(Math.max(prev, s));
        setNewBest(s > prev);
        bugs.current = [];
        setLive([]);
        setPhase("done");
        return;
      }
      const W = b.clientWidth, H = b.clientHeight;
      if (now >= spawnAt && bugs.current.length < 7) {
        const gold = Math.random() < 0.1;
        const sp = (gold ? 2.3 : 1) * (70 + Math.random() * 70);
        const a = Math.random() * Math.PI * 2;
        const bug = { id: nextId++, x: 40 + Math.random() * (W - 80), y: 60 + Math.random() * (H - 100), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gold };
        bugs.current.push(bug);
        setLive((l) => [...l, { id: bug.id, gold }]);
        spawnAt = now + 450 + Math.random() * 400;
      }
      for (const g of bugs.current) {
        if (Math.random() < 0.02) {
          const a = Math.atan2(g.vy, g.vx) + (Math.random() - 0.5) * 1.6, sp = Math.hypot(g.vx, g.vy);
          g.vx = Math.cos(a) * sp;
          g.vy = Math.sin(a) * sp;
        }
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        if (g.x < 22 || g.x > W - 22) { g.vx *= -1; g.x = Math.min(W - 22, Math.max(22, g.x)); }
        if (g.y < 22 || g.y > H - 22) { g.vy *= -1; g.y = Math.min(H - 22, Math.max(22, g.y)); }
        const el = els.current.get(g.id);
        if (el) el.style.transform = `translate(${g.x - 22}px, ${g.y - 22}px) rotate(${Math.atan2(g.vy, g.vx) + Math.PI / 2}rad)`;
      }
      const secs = Math.ceil((end - now) / 1000);
      if (secs !== shown) { shown = secs; setLeft(secs); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const start = () => {
    bugs.current = [];
    scoreRef.current = 0;
    setLive([]);
    setScore(0);
    setLeft(GAME_SECONDS);
    setPops([]);
    setNewBest(false);
    setPhase("play");
  };

  const hit = (id: number) => {
    const i = bugs.current.findIndex((g) => g.id === id);
    if (i < 0) return;
    const [g] = bugs.current.splice(i, 1);
    scoreRef.current += g.gold ? 5 : 1;
    setScore(scoreRef.current);
    setLive((l) => l.filter((x) => x.id !== id));
    const pop = { id: ++popId.current, x: g.x, y: g.y, t: g.gold ? "+5 ✨" : "+1" };
    setPops((p) => [...p, pop]);
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== pop.id)), 700);
  };

  return (
    <div
      ref={box}
      className={`relative h-80 touch-manipulation overflow-hidden rounded-[2rem] bg-[#1c2040] select-none md:h-96 ${phase === "play" ? "cursor-crosshair" : ""}`}
    >
      <pre aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden p-8 font-mono text-sm leading-7 text-white/[0.07] md:text-base md:leading-8">
        {code.join("\n")}
      </pre>

      {phase === "play" && (
        <>
          <div className="absolute inset-x-0 top-0 h-1 bg-white/10">
            <div className="h-full bg-sun" style={{ animation: `shrink ${GAME_SECONDS}s linear forwards` }} />
          </div>
          <div className="pointer-events-none absolute top-4 left-5 z-10 flex gap-2 font-mono text-sm text-white">
            <span className="rounded-full bg-white/10 px-3 py-1">Bugs {score}</span>
            <span className={`rounded-full px-3 py-1 ${left <= 5 ? "bg-[#ff6b6b]/30 text-[#ffb3b3]" : "bg-white/10"}`}>{left}s</span>
          </div>
          {live.map(({ id, gold }) => (
            <button
              key={id}
              ref={(el) => {
                if (el) els.current.set(id, el);
                else els.current.delete(id);
              }}
              onPointerDown={() => hit(id)}
              aria-label={gold ? "Golden bug, 5 points" : "Bug, 1 point"}
              className={`absolute top-0 left-0 size-11 p-1 hover:brightness-125 ${gold ? "drop-shadow-[0_0_10px_rgba(255,219,30,0.9)]" : ""}`}
            >
              <BugIcon gold={gold} />
            </button>
          ))}
          {pops.map((p) => (
            <span key={p.id} className="pop pointer-events-none absolute font-display text-lg font-bold text-sun" style={{ left: p.x, top: p.y }}>
              {p.t}
            </span>
          ))}
        </>
      )}

      {phase !== "play" && (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          {phase === "idle" ? (
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Mini-game · 20 seconds</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-white md:text-5xl">
                Squash the bugs <span className="text-sun">before they ship.</span>
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/60">Tap every bug crawling through the code. Golden bugs are rare and worth +5.</p>
              <button data-ripple onClick={start} className="mt-6 rounded-full bg-sun px-7 py-3 font-medium text-ink-deep transition hover:scale-105">
                Start debugging →
              </button>
            </div>
          ) : (
            <div role="status">
              <p className="text-xs font-medium tracking-[0.2em] text-green-400 uppercase">✓ Build passed</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-white md:text-5xl">
                {score} bugs squashed. <span className="text-sun">{rankFor(score)}</span> level.
              </h3>
              <p className="mt-2 text-sm text-white/60">{newBest ? "🏆 New best score!" : `Your best: ${best}`}</p>
              <p className="mt-5 font-display text-xl text-white/85 md:text-2xl">Built for production. Designed to scale.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button data-ripple onClick={start} className="rounded-full border border-white/40 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                  Play again ↻
                </button>
                <a data-ripple href="#contact" className="rounded-full bg-sun px-6 py-3 font-medium text-ink-deep transition hover:scale-105">
                  Hire the real debugger →
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
