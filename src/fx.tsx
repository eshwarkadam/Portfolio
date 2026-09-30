"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

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
