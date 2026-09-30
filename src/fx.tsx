"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/slide in: on scroll into view, or on load with `now`. */
export function Reveal({ children, delay = 0, className, now }: { children: ReactNode; delay?: number; className?: string; now?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      {...(now ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline line that slides up from behind a mask. */
export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Element that leans toward the pointer. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Sticky card that shrinks as the next one stacks over it. */
export function StackCard({ children, i, total }: { children: ReactNode; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.03]);
  return (
    <div ref={ref} className="sticky h-[75vh] md:h-[70vh]" style={{ top: `calc(110px + ${i * 20}px)` }}>
      <motion.div style={{ scale }} className="h-full origin-top">
        {children}
      </motion.div>
    </div>
  );
}

const roles = ["Software Engineer", "Full-Stack Developer", "Cloud & AI"];

/** Top-left brand: slides in, shimmers, lifts on hover, cycles the role line. */
export function Logo({ name }: { name: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.a
      href="#top"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
      whileHover={{ y: -2, scale: 1.03 }}
      className="group fixed top-4 left-4 z-50 overflow-hidden rounded-xl bg-white/90 px-3 py-1.5 leading-tight md:top-5 md:rounded-2xl md:px-4 md:py-2 shadow-[0_10px_30px_-12px_rgba(47,52,87,0.3)] backdrop-blur-md transition-shadow hover:shadow-[0_14px_36px_-10px_rgba(47,52,87,0.45)] md:left-8"
    >
      <span className="shimmer pointer-events-none absolute inset-0" aria-hidden />
      <span className="relative block font-display text-sm font-extrabold text-ink-deep md:text-base">
        {name}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded bg-sun transition-all duration-500 group-hover:w-full" />
      </span>
      <span className="relative block h-3 overflow-hidden text-[8px] font-medium tracking-[0.16em] md:h-3.5 md:text-[10px] md:tracking-[0.18em] text-mute uppercase">
        <AnimatePresence mode="wait">
          <motion.span key={roles[i]} className="block" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.35, ease }}>
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.a>
  );
}

/** Page-wide mouse effects via data attributes:
 *  data-glow / data-fill / data-flash get --x/--y (cursor position inside the element),
 *  data-ripple spawns a ripple on click. */
export function Effects() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-glow],[data-fill],[data-flash]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    const click = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-ripple]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "rp";
      s.style.left = `${e.clientX - r.left}px`;
      s.style.top = `${e.clientY - r.top}px`;
      el.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };
    addEventListener("pointermove", move);
    addEventListener("click", click);
    return () => { removeEventListener("pointermove", move); removeEventListener("click", click); };
  }, []);
  return null;
}

/** Dot field that glows around the cursor. Fills its (relative) parent; redraws only on pointer moves. */
export function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, box = cv.parentElement!, ctx = cv.getContext("2d")!;
    const gap = 26;
    let W = 0, H = 0, mx = -999, my = -999;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let x = gap / 2; x < W; x += gap)
        for (let y = gap / 2; y < H; y += gap) {
          const k = Math.max(0, 1 - Math.hypot(x - mx, y - my) / 150);
          ctx.beginPath();
          ctx.arc(x, y, 1.3 + k * 3, 0, 7);
          ctx.fillStyle = k > 0 ? `rgba(255,219,30,${0.25 + k * 0.75})` : "rgba(255,255,255,0.12)";
          ctx.fill();
        }
    };
    const size = () => {
      const d = devicePixelRatio || 1;
      W = box.clientWidth; H = box.clientHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      draw();
    };
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      requestAnimationFrame(draw);
    };
    const leave = () => { mx = my = -999; requestAnimationFrame(draw); };
    const ro = new ResizeObserver(size);
    ro.observe(box);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    return () => { ro.disconnect(); box.removeEventListener("pointermove", move); box.removeEventListener("pointerleave", leave); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/** Letters near the cursor lift and turn yellow. */
export function Wave({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    for (const l of ref.current!.children as HTMLCollectionOf<HTMLElement>) {
      const r = l.getBoundingClientRect();
      const k = Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / 140);
      l.style.transform = `translateY(${-k * 0.12}em)`;
      l.style.color = k > 0.55 ? "var(--color-sun)" : "";
    }
  };
  const leave = () => {
    for (const l of ref.current!.children as HTMLCollectionOf<HTMLElement>) { l.style.transform = ""; l.style.color = ""; }
  };
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} aria-label={text} className="wave">
      {[...text].map((c, i) => <span key={i} aria-hidden>{c}</span>)}
    </span>
  );
}

/** Contact form posting to FormSubmit (no backend). First submission triggers a one-time activation email. */
export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // bot filled the hidden field
    setState("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio message from ${data.name}`, _template: "table" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };
  const field = "w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-sun focus:bg-white/15";
  if (state === "sent")
    return (
      <div role="status" className="grid h-full place-items-center rounded-3xl border border-white/15 bg-white/5 p-8 text-center">
        <div>
          <p className="text-4xl">✓</p>
          <p className="mt-3 text-xl font-medium">Thanks, message sent!</p>
          <p className="mt-2 text-sm text-white/60">I&apos;ll reply within 1–2 days.</p>
          <button onClick={() => setState("idle")} className="mt-5 text-sm text-sun underline underline-offset-4">Send another</button>
        </div>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-3 rounded-3xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur-sm md:p-7">
      <p className="mb-1 text-lg font-medium">Send a message</p>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block">
        <span className="sr-only">Your name</span>
        <input required name="name" maxLength={80} placeholder="Your name" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Your email</span>
        <input required type="email" name="email" maxLength={120} placeholder="Your email" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea required name="message" rows={4} maxLength={2000} placeholder="Tell me about the role or project" className={`${field} resize-none`} />
      </label>
      <button data-ripple disabled={state === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-6 py-3 font-medium text-ink-deep transition hover:brightness-105 disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message →"}
      </button>
      {state === "error" && (
        <p role="alert" className="text-sm text-[#ff9b9b]">Couldn&apos;t send right now. Please email me at {email}.</p>
      )}
    </form>
  );
}
