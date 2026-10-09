"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import Image from "next/image";
import { useRef } from "react";
import { createParticles } from "./particles";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export type V3Data = {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  layers: { title: string; text: string; tools: string }[];
  projects: { title: string; desc: string; tags: string; link: string; file: string; code: string }[];
  jobs: { role: string; where: string; when: string }[];
  education: { title: string; where: string; meta: string }[];
};

export function Experience({ d }: { d: V3Data }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = matchMedia("(pointer: fine)").matches;
      const q = gsap.utils.selector(root);

      /* ---------- smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync ---------- */
      let lenis: Lenis | null = null;
      if (!reduce) {
        lenis = new Lenis({ lerp: 0.09 });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (t: number) => lenis!.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        root.current!.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((a) =>
          a.addEventListener("click", (e) => { e.preventDefault(); lenis!.scrollTo(a.getAttribute("href")!, { offset: 0 }); }),
        );
      }

      /* ---------- WebGL particles ---------- */
      const font = getComputedStyle(q(".v3-display")[0]).fontFamily;
      const scene = createParticles(canvas.current!, font);
      const state = { morph: 0, intro: reduce ? 1 : 0 };
      scene.setIntro(state.intro);
      let visible = true;
      const tick = (t: number) => { if (visible) { scene.setMorph(state.morph); scene.setIntro(state.intro); scene.render(reduce ? 0 : t); } };
      gsap.ticker.add(tick);
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(canvas.current!);
      const onResize = () => scene.resize();
      addEventListener("resize", onResize);
      const onMove = (e: PointerEvent) => scene.setMouse((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      if (finePointer) addEventListener("pointermove", onMove);

      /* ---------- custom cursor ---------- */
      if (finePointer && !reduce) {
        const dot = q(".v3-cursor")[0] as HTMLElement;
        gsap.set(dot, { xPercent: -50, yPercent: -50, autoAlpha: 1 });
        const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });
        addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
        q("a, button").forEach((el: Element) => {
          el.addEventListener("pointerenter", () => gsap.to(dot, { scale: 3.2, duration: 0.3 }));
          el.addEventListener("pointerleave", () => gsap.to(dot, { scale: 1, duration: 0.3 }));
        });
        // magnetic contact button
        const mag = q(".v3-magnet")[0] as HTMLElement;
        const mx = gsap.quickTo(mag, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
        const my = gsap.quickTo(mag, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
        mag.addEventListener("pointermove", (e) => {
          const r = mag.getBoundingClientRect();
          mx((e.clientX - r.left - r.width / 2) * 0.35);
          my((e.clientY - r.top - r.height / 2) * 0.35);
        });
        mag.addEventListener("pointerleave", () => { mx(0); my(0); });
      }

      if (reduce) {
        gsap.set(q(".v3-loader"), { autoAlpha: 0 });
        return () => { io.disconnect(); gsap.ticker.remove(tick); removeEventListener("resize", onResize); scene.dispose(); };
      }

      /* ---------- 1. preloader + hero intro (the signature moment) ---------- */
      const counter = { v: 0 };
      const intro = gsap.timeline();
      intro
        .to(counter, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { (q(".v3-count")[0] as HTMLElement).textContent = String(Math.round(counter.v)); } })
        .to(q(".v3-loader"), { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
        .to(state, { intro: 1, duration: 2.2, ease: "expo.out" }, "-=0.5")
        .from(SplitText.create(q(".v3-hero-line"), { type: "words", mask: "words" }).words, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.06 }, "-=1.6")
        .from(q(".v3-hero-meta"), { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.8");

      /* ---------- 2. scroll: name compiles into a sphere ---------- */
      gsap.timeline({ scrollTrigger: { trigger: q(".v3-hero")[0], start: "top top", end: "+=120%", scrub: 1, pin: true } })
        .to(state, { morph: 1, ease: "none" }, 0)
        .to(q(".v3-hero-copy"), { autoAlpha: 0, y: -60, ease: "none" }, 0)
        .fromTo(q(".v3-sphere-caption"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: "none" }, 0.5);

      /* ---------- 3. manifesto: words light up as you read ---------- */
      const words = SplitText.create(q(".v3-manifesto"), { type: "words" }).words;
      gsap.fromTo(words, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: q(".v3-manifesto")[0], start: "top 75%", end: "bottom 45%", scrub: true } });

      /* ---------- 4 & 5. horizontal tracks (stack layers, projects) ---------- */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        q(".v3-hscroll").forEach((sec: Element) => {
          const track = sec.querySelector<HTMLElement>(".v3-track")!;
          const dist = () => track.scrollWidth - innerWidth;
          const tween = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
          // progress bar for the track
          gsap.to(sec.querySelector(".v3-progress"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, scrub: true } });
          // cards rise as they enter the viewport inside the horizontal scroll
          sec.querySelectorAll(".v3-card").forEach((c) =>
            gsap.from(c, { y: 80, rotate: 2, autoAlpha: 0.2, ease: "power2.out", scrollTrigger: { trigger: c, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true } }),
          );
        });
      });

      /* ---------- 6. career line draws itself ---------- */
      gsap.fromTo(q(".v3-line"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(".v3-career")[0], start: "top 70%", end: "bottom 60%", scrub: true } });
      q(".v3-stop").forEach((s: Element) => gsap.from(s, { autoAlpha: 0, x: -30, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: s, start: "top 80%" } }));

      /* ---------- 7. contact: giant type slides in ---------- */
      gsap.from(SplitText.create(q(".v3-cta"), { type: "words,chars", mask: "chars" }).chars, { yPercent: 100, stagger: 0.02, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: q(".v3-cta")[0], start: "top 80%" } });

      return () => {
        io.disconnect();
        gsap.ticker.remove(tick);
        removeEventListener("resize", onResize);
        removeEventListener("pointermove", onMove);
        lenis?.destroy();
        scene.dispose();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3">
      {/* preloader */}
      <div className="v3-loader fixed inset-0 z-[90] flex items-end justify-between bg-[var(--aqua)] p-6 text-[var(--plum)] md:p-10" aria-hidden>
        <p className="v3-display text-2xl font-extrabold">Compiling</p>
        <p className="v3-display text-[22vw] leading-[0.8] font-extrabold md:text-[14vw]"><span className="v3-count">0</span></p>
      </div>
      <div className="v3-cursor pointer-events-none fixed top-0 left-0 z-[80] size-4 rounded-full bg-[var(--aqua)] opacity-0 mix-blend-difference" aria-hidden />

      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[95] focus:rounded-full focus:bg-[var(--aqua)] focus:px-4 focus:py-2 focus:text-[var(--plum)]">
        Skip to work
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10">
        <a href="#top" className="v3-display text-lg font-extrabold text-white">EK</a>
        <nav aria-label="Main" className="flex gap-6 text-sm text-white md:gap-8">
          <a href="#stack">Stack</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="v3-hero relative h-svh overflow-hidden">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
          <h1 className="sr-only">Eshwar Kadam, Software Engineer</h1>
          <div className="v3-hero-copy pointer-events-none absolute inset-x-6 bottom-8 flex flex-col gap-6 md:inset-x-10 md:bottom-10 md:flex-row md:items-end md:justify-between">
            <p className="v3-hero-line v3-display max-w-xl text-2xl leading-tight font-bold md:text-4xl">
              Software engineer building products that travel from your phone to the cloud.
            </p>
            <div className="v3-hero-meta flex items-center gap-4 text-sm text-[var(--pearl)]/80">
              <span className="relative block size-14 overflow-hidden rounded-full ring-2 ring-[var(--aqua)]">
                <Image src="/profile.jpg" alt="Eshwar Kadam" fill sizes="56px" className="object-cover" priority />
              </span>
              <span>Pune, India<br />Open to new roles</span>
            </div>
          </div>
          <p className="v3-sphere-caption v3-display pointer-events-none absolute inset-x-0 bottom-10 text-center text-xl font-bold opacity-0 md:text-3xl">
            Many parts. One working system.
          </p>
          <p className="v3-hero-meta pointer-events-none absolute top-24 left-1/2 hidden -translate-x-1/2 text-sm text-[var(--pearl)]/60 md:block">Scroll to compile</p>
        </section>

        {/* MANIFESTO */}
        <section className="px-6 py-[22vh] md:px-10">
          <p className="v3-manifesto v3-display mx-auto max-w-5xl text-3xl leading-[1.15] font-bold md:text-6xl">
            I write the Kotlin that runs on your phone, the API it talks to, the database behind it, and the cloud that keeps it all online. Then I add the AI that makes it feel smart.
          </p>
        </section>

        {/* STACK: horizontal */}
        <section id="stack" className="v3-hscroll relative overflow-hidden">
          <div className="v3-progress absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-[var(--aqua)]" aria-hidden />
          <div className="v3-track flex flex-col gap-6 px-6 py-24 md:h-svh md:flex-row md:items-center md:gap-10 md:px-10 md:py-0">
            <div className="shrink-0 md:w-[32vw]">
              <h2 className="v3-display text-5xl leading-none font-extrabold md:text-7xl">The stack, layer by layer</h2>
              <p className="mt-6 max-w-sm text-[var(--pearl)]/75">Follow one request from the screen to the cloud.</p>
            </div>
            {d.layers.map((l, i) => (
              <article key={l.title} className="v3-card relative shrink-0 rounded-[28px] border border-white/12 bg-white/[0.04] p-8 backdrop-blur-sm md:h-[62vh] md:w-[30vw] md:p-10">
                <p className="v3-display text-[7rem] leading-none font-extrabold text-[var(--aqua)]/90">{i + 1}</p>
                <h3 className="v3-display mt-6 text-3xl font-bold">{l.title}</h3>
                <p className="mt-3 text-[var(--pearl)]/80">{l.text}</p>
                <p className="mt-6 text-sm text-[var(--pearl)]/60">{l.tools}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WORK: horizontal */}
        <section id="work" className="v3-hscroll relative overflow-hidden bg-[var(--pearl)] text-[var(--plum)]">
          <div className="v3-progress absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-[var(--plum)]" aria-hidden />
          <div className="v3-track flex flex-col gap-6 px-6 py-24 md:h-svh md:flex-row md:items-center md:gap-10 md:px-10 md:py-0">
            <div className="shrink-0 md:w-[28vw]">
              <h2 className="v3-display text-5xl leading-none font-extrabold md:text-7xl">Open-source work</h2>
              <p className="mt-6 max-w-sm opacity-75">Real code you can read on GitHub.</p>
            </div>
            {d.projects.map((p) => (
              <article key={p.title} className="v3-card flex shrink-0 flex-col rounded-[28px] bg-[var(--plum)] p-8 text-[var(--pearl)] md:h-[70vh] md:w-[40vw] md:p-10">
                <h3 className="v3-display text-4xl font-extrabold">{p.title}</h3>
                <p className="mt-4 text-[var(--pearl)]/80">{p.desc}</p>
                <pre className="mt-6 flex-1 overflow-hidden rounded-2xl bg-black/30 p-5 font-mono text-[13px] leading-6 text-[var(--aqua)]">
                  <span className="mb-2 block text-[var(--pearl)]/60">{p.file}</span>
                  {p.code}
                </pre>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-sm text-[var(--pearl)]/60">{p.tags}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-[var(--aqua)] px-5 py-2.5 text-sm font-bold text-[var(--plum)] transition hover:scale-105">
                    View source
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CAREER */}
        <section className="v3-career px-6 py-32 md:px-10">
          <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1fr_1.4fr]">
            <h2 className="v3-display text-5xl leading-none font-extrabold md:sticky md:top-32 md:self-start md:text-7xl">Where I&apos;ve been</h2>
            <div className="relative pl-10">
              <span className="v3-line absolute top-0 left-0 h-full w-0.5 origin-top bg-[var(--aqua)]" aria-hidden />
              {[...d.jobs.map((j) => ({ t: j.role, s: j.where, m: j.when })), ...d.education.map((e) => ({ t: e.title, s: e.where, m: e.meta }))].map((x) => (
                <div key={x.t} className="v3-stop relative pb-16 last:pb-0">
                  <span className="absolute top-2 -left-[47px] size-4 rounded-full border-2 border-[var(--aqua)] bg-[var(--plum)]" aria-hidden />
                  <p className="text-sm text-[var(--aqua)]">{x.m}</p>
                  <h3 className="v3-display mt-1 text-3xl font-bold">{x.t}</h3>
                  <p className="mt-1 text-[var(--pearl)]/75">{x.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden px-6 pt-32 pb-12 md:px-10">
          <h2 className="v3-cta v3-display text-[16vw] leading-[0.9] font-extrabold md:text-[12vw]">Let&apos;s build.</h2>
          <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <a href={`mailto:${d.email}`} className="v3-magnet inline-grid size-44 place-items-center rounded-full bg-[var(--aqua)] text-center font-bold text-[var(--plum)] md:size-56">
              Email me
            </a>
            <ul className="space-y-3 text-lg">
              <li><a className="v3-link" href={`mailto:${d.email}`}>{d.email}</a></li>
              <li><a className="v3-link" href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="v3-link" href={d.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="v3-link" href="/Eshwar-Kadam-Resume.pdf" target="_blank" rel="noreferrer">Resume (PDF)</a></li>
            </ul>
          </div>
          <p className="mt-24 text-sm text-[var(--pearl)]/50">Eshwar Kadam, Pune. Built with Next.js, GSAP and WebGL.</p>
        </section>
      </main>
    </div>
  );
}
