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
