"use client";

import { useEffect, useRef, useState } from "react";

/* Live animated system architecture for the hero.
   Canvas draws grid, stars, links and comet-trail packets; nodes are HTML for crisp text + hover. */

type NodeDef = { id: string; x: number; y: number; icon: string; label: string; stack: string };

// positions are fractions of the canvas box (desktop: right ~60% of hero)
const NODES: NodeDef[] = [
  { id: "app", x: 0.14, y: 0.24, icon: "📱", label: "Mobile app", stack: "Native, fast, offline-first" },
  { id: "web", x: 0.14, y: 0.66, icon: "🖥️", label: "Web app", stack: "Responsive dashboards" },
  { id: "api", x: 0.46, y: 0.45, icon: "⚙️", label: "API", stack: "Secure, scalable REST services" },
  { id: "db", x: 0.8, y: 0.18, icon: "🗄️", label: "Database", stack: "Reliable data storage" },
  { id: "cloud", x: 0.84, y: 0.5, icon: "☁️", label: "Cloud", stack: "Deploy, scale and monitor" },
  { id: "ai", x: 0.62, y: 0.82, icon: "✨", label: "AI", stack: "Smart features built in" },
  { id: "fb", x: 0.36, y: 0.08, icon: "🔐", label: "Auth", stack: "Sign-in and real-time sync" },
];
const EDGES: [string, string][] = [
  ["app", "api"], ["web", "api"], ["api", "db"], ["api", "cloud"], ["api", "ai"], ["app", "fb"], ["fb", "api"], ["web", "cloud"],
];
const ROUTES = [["app", "api", "db"], ["web", "api", "ai"], ["app", "fb", "api", "cloud"], ["web", "api", "cloud"]];

type Packet = { path: string[]; seg: number; t: number; speed: number; color: string; trail: { x: number; y: number }[] };

const LOGS = [
  ["$ run tests", ""],
  ["✓ 48 tests passed", "ok"],
  ["$ build release", ""],
  ["✓ build ready · 21s", "ok"],
  ["$ deploy to production", ""],
  ["✓ live in production", "sun"],
] as const;

export function SystemHero() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const nodeEls = useRef(new Map<string, HTMLDivElement>());
  const burst = useRef<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const hoverRef = useRef<string | null>(null);
  const [shown, setShown] = useState(0);
  const [stats, setStats] = useState({ rpm: 1204, lat: 84, served: 128_400 });
  const [spark, setSpark] = useState<number[]>(() => Array.from({ length: 24 }, (_, i) => 50 + Math.round(Math.sin(i / 2) * 15)));
  const [log, setLog] = useState<number>(0);

  useEffect(() => { hoverRef.current = hover; }, [hover]);

  // nodes build in one by one
  useEffect(() => {
    if (shown >= NODES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : 180);
    return () => clearTimeout(t);
  }, [shown]);

  // live stats + sparkline + deploy log
  useEffect(() => {
    const a = setInterval(() => {
      const rpm = 1100 + Math.round(Math.random() * 320);
      setStats((s) => ({ rpm, lat: 68 + Math.round(Math.random() * 30), served: s.served + Math.round(rpm / 30) }));
      setSpark((p) => [...p.slice(1), 30 + Math.random() * 60]);
    }, 1200);
    const b = setInterval(() => setLog((l) => (l + 1) % (LOGS.length + 2)), 1300);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  // canvas animation
  useEffect(() => {
    const canvas = cv.current!, host = box.current!, ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, t0 = performance.now(), lastSpawn = 0;
    let mx = 0, my = 0, px = 0, py = 0; // parallax
    const stars = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.3, p: Math.random() * 6 }));
    const packets: Packet[] = [];
    const pos = new Map<string, { x: number; y: number }>();

    const size = () => {
      const d = devicePixelRatio || 1;
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = W * d; canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => { mx = 0; my = 0; };
    host.parentElement!.addEventListener("pointermove", onMove);
    host.parentElement!.addEventListener("pointerleave", onLeave);

    const spawn = (path: string[], color = Math.random() < 0.22 ? "#4ade80" : "#ffdb1e") =>
      packets.push({ path, seg: 0, t: 0, speed: 0.55 + Math.random() * 0.5, color, trail: [] });

    const curve = (a: { x: number; y: number }, b: { x: number; y: number }, t: number) => {
      const cx = (a.x + b.x) / 2, c1 = { x: cx, y: a.y }, c2 = { x: cx, y: b.y }, u = 1 - t;
      return {
        x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
        y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
      };
    };

    const pulse = (id: string) => {
      const el = nodeEls.current.get(id);
      if (!el) return;
      el.classList.remove("node-pulse");
      void el.offsetWidth;
      el.classList.add("node-pulse");
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const time = now / 1000;
      px += (mx - px) * 0.05; py += (my - py) * 0.05;

      // node positions: float + parallax
      const mobile = W < 640;
      NODES.forEach((n, i) => {
        const nx = mobile ? 0.14 + n.x * 0.72 : n.x, ny = mobile ? 0.06 + n.y * 0.42 : n.y;
        const fx = reduce ? 0 : Math.sin(time * 0.6 + i * 1.7) * 6;
        const fy = reduce ? 0 : Math.cos(time * 0.5 + i * 1.3) * 8;
        const p = { x: nx * W + fx + px * 26, y: ny * H + fy + py * 20 };
        pos.set(n.id, p);
        const el = nodeEls.current.get(n.id);
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      });

      ctx.clearRect(0, 0, W, H);

      // panning grid
      const g = 46, off = reduce ? 0 : (time * 8) % g;
      ctx.strokeStyle = "rgba(143,149,214,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -g + off + px * 10; x < W; x += g) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = -g + off + py * 10; y < H; y += g) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();

      // stars
      for (const s of stars) {
        const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(time * 1.5 + s.p));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x * W + px * 6, s.y * H + py * 6, s.r, 0, 7);
        ctx.fill();
      }

      // links
      const hv = hoverRef.current;
      const visible = new Set(NODES.slice(0, shown).map((n) => n.id));
      for (const [a, b] of EDGES) {
        if (!visible.has(a) || !visible.has(b)) continue;
        const A = pos.get(a)!, B = pos.get(b)!, hot = hv && (hv === a || hv === b);
        ctx.strokeStyle = hot ? "rgba(255,219,30,0.75)" : "rgba(143,149,214,0.32)";
        ctx.lineWidth = hot ? 2.2 : 1.4;
        ctx.setLineDash([5, 7]);
        ctx.lineDashOffset = reduce ? 0 : -time * 30;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        const cx = (A.x + B.x) / 2;
        ctx.bezierCurveTo(cx, A.y, cx, B.y, B.x, B.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // spawn packets
      if (shown >= NODES.length && !reduce) {
        if (now - lastSpawn > 420) {
          lastSpawn = now;
          spawn(Math.random() < 0.45 ? ROUTES[(Math.random() * ROUTES.length) | 0] : EDGES[(Math.random() * EDGES.length) | 0].slice(Math.random() < 0.5 ? 0 : 0).sort(() => Math.random() - 0.5));
        }
        if (burst.current) {
          const from = burst.current;
          burst.current = null;
          EDGES.filter((e) => e.includes(from)).forEach(([a, b]) => { for (let k = 0; k < 3; k++) spawn(a === from ? [a, b] : [b, a], "#ffdb1e"); });
        }
      }

      // packets with comet trails
      for (let i = packets.length - 1; i >= 0; i--) {
        const k = packets[i];
        const A = pos.get(k.path[k.seg]), B = pos.get(k.path[k.seg + 1]);
        if (!A || !B) { packets.splice(i, 1); continue; }
        k.t += dt * k.speed;
        const p = curve(A, B, Math.min(1, k.t));
        k.trail.push(p);
        if (k.trail.length > 14) k.trail.shift();
        k.trail.forEach((q, j) => {
          const f = j / k.trail.length;
          ctx.fillStyle = k.color === "#4ade80" ? `rgba(74,222,128,${f * 0.5})` : `rgba(255,219,30,${f * 0.5})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 1 + f * 3, 0, 7);
          ctx.fill();
        });
        ctx.shadowColor = k.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = k.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (k.t >= 1) {
          pulse(k.path[k.seg + 1]);
          k.seg++;
          k.t = 0;
          if (k.seg >= k.path.length - 1) packets.splice(i, 1);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.parentElement?.removeEventListener("pointermove", onMove);
      host.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, [shown]);

  const max = Math.max(...spark);
  const sparkPath = spark.map((v, i) => `${((i / (spark.length - 1)) * 120).toFixed(1)},${(36 - (v / max) * 32).toFixed(1)}`).join(" ");
  const hovered = NODES.find((n) => n.id === hover);

  return (
    <>
      <div ref={box} className="absolute inset-0 md:left-[38%]">
        <canvas ref={cv} aria-hidden className="absolute inset-0 h-full w-full" />
        {NODES.map((n, i) => (
          <div
            key={n.id}
            ref={(el) => { if (el) nodeEls.current.set(n.id, el); else nodeEls.current.delete(n.id); }}
            className="absolute top-0 left-0"
          >
            <button
              type="button"
              onPointerEnter={() => setHover(n.id)}
              onPointerLeave={() => setHover(null)}
              onClick={() => { burst.current = n.id; }}
              aria-label={`${n.label}: ${n.stack}`}
              className={`node-pop group relative flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold md:gap-2 md:rounded-2xl md:px-3.5 md:py-2.5 md:text-sm whitespace-nowrap text-white backdrop-blur-md transition-[border-color,background-color,box-shadow,opacity] duration-300 ${
                i < shown ? "opacity-100" : "pointer-events-none opacity-0"
              } ${hover === n.id ? "border-sun bg-sun/15 shadow-[0_0_30px_-4px_rgba(255,219,30,0.6)]" : "border-white/15 bg-white/[0.07]"}`}
              style={{ animationDelay: `${i * 0.18 + 0.5}s` }}
            >
              <span className="node-orbit pointer-events-none absolute -inset-2 rounded-[1.1rem] border border-dashed border-white/10" aria-hidden />
              <span className="text-sm md:text-lg">{n.icon}</span>
              {n.label}
            </button>
          </div>
        ))}
        {hovered && hover && (
          <div
            className="pointer-events-none absolute z-20 rounded-xl border border-white/15 bg-[#0f1226]/95 px-3 py-2 font-mono text-xs text-white/80 shadow-xl"
            style={{ left: `${hovered.x * 100}%`, top: `calc(${hovered.y * 100}% + 34px)`, transform: "translateX(-50%)" }}
          >
            {hovered.stack}
          </div>
        )}
      </div>

      {/* live dashboard */}
      <div className="absolute right-6 bottom-6 z-10 hidden w-64 rounded-2xl border border-white/10 bg-[#0f1226]/80 p-4 font-mono text-xs text-white/70 backdrop-blur-md md:block">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5"><span className="size-1.5 animate-pulse rounded-full bg-green-400" />live traffic</span>
          <span className="text-green-400">{stats.rpm.toLocaleString()} rpm</span>
        </div>
        <svg viewBox="0 0 120 38" className="mt-2 h-9 w-full" aria-hidden>
          <polyline points={sparkPath} fill="none" stroke="#ffdb1e" strokeWidth="1.6" strokeLinejoin="round" />
          <polyline points={`0,38 ${sparkPath} 120,38`} fill="rgba(255,219,30,0.12)" stroke="none" />
        </svg>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div><p className="text-white">{stats.lat}ms</p><p className="text-[10px] text-white/40">p95</p></div>
          <div><p className="text-white">99.98%</p><p className="text-[10px] text-white/40">uptime</p></div>
          <div><p className="text-white">{(stats.served / 1000).toFixed(1)}k</p><p className="text-[10px] text-white/40">served</p></div>
        </div>
        <div className="mt-3 h-[60px] overflow-hidden border-t border-white/10 pt-2 leading-5">
          {LOGS.slice(Math.max(0, log - 3), log).map(([t, c]) => (
            <p key={t} className={`log-in ${c === "ok" ? "text-green-400" : c === "sun" ? "text-sun" : ""}`}>{t}</p>
          ))}
        </div>
      </div>
    </>
  );
}
