"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SeriesData = {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  layers: { title: string; text: string; tools: string; progress: number }[];
  projects: { title: string; kind: string; desc: string; tags: string[]; link: string; file: string; code: string; hue: number }[];
  seasons: { season: string; years: string; episodes: { title: string; where: string; when: string }[] }[];
  topSkills: string[];
};

type Project = SeriesData["projects"][number];

/* cinematic poster drawn in CSS, so every project gets artwork without stock images */
function Poster({ p, i }: { p: Project; i: number }) {
  return (
    <div
      className="relative aspect-[2/3] w-full overflow-hidden rounded-md"
      style={{ background: `radial-gradient(120% 80% at 30% 20%, hsl(${p.hue} 85% 45%), hsl(${p.hue} 70% 12%) 60%, #050505)` }}
    >
      <span className="sr-v absolute -right-4 -bottom-8 text-[11rem] leading-none text-white/10">{i + 1}</span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
        <p className="text-[11px] font-semibold tracking-wide text-[var(--red)]">ORIGINAL</p>
        <p className="sr-v mt-1 text-3xl leading-none text-white">{p.title}</p>
        <p className="mt-2 text-xs text-white/70">{p.kind}</p>
      </div>
    </div>
  );
}

export function Series({ d }: { d: SeriesData }) {
  const root = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(true);
  const [open, setOpen] = useState<Project | null>(null);
  const [resume, setResume] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // lock scroll while an overlay is open; close on Escape
  useEffect(() => {
    const locked = intro || !!open || resume;
    if (locked) lenisRef.current?.stop(); else lenisRef.current?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setResume(false); } };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [intro, open, resume]);

  useGSAP(
    () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(root);

      /* opening sequence */
      if (reduce) setIntro(false);
      else
        gsap.timeline({ onComplete: () => setIntro(false) })
          .from(q(".sr-op-1"), { autoAlpha: 0, duration: 0.6 })
          .to(q(".sr-op-1"), { autoAlpha: 0, duration: 0.4, delay: 0.5 })
          .fromTo(q(".sr-op-name"), { scale: 1.6, autoAlpha: 0, letterSpacing: "0.4em" }, { scale: 1, autoAlpha: 1, letterSpacing: "0em", duration: 1.1, ease: "expo.out" })
          .from(q(".sr-op-sub"), { autoAlpha: 0, y: 10, duration: 0.5 }, "-=0.3")
          .to(q(".sr-opening"), { autoAlpha: 0, duration: 0.6, delay: 0.7 });

      if (reduce) return;

      /* smooth scroll */
      const lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      /* hero: parallax portrait + background title drift */
      gsap.to(q(".sr-portrait"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: q(".sr-hero")[0], start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".sr-bgword"), { xPercent: -25, ease: "none", scrollTrigger: { trigger: q(".sr-hero")[0], start: "top top", end: "bottom top", scrub: true } });
      gsap.from(q(".sr-hero-in"), { autoAlpha: 0, y: 30, stagger: 0.08, duration: 0.9, ease: "power3.out", delay: reduce ? 0 : 3.6 });

      /* section headings and rows rise in */
      q(".sr-reveal").forEach((el: Element) =>
        gsap.from(el, { autoAlpha: 0, y: 50, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
      );
      /* continue-watching bars fill to their value */
      q(".sr-bar").forEach((el: Element) =>
        gsap.from(el, { scaleX: 0, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" } }),
      );

      /* originals: pinned horizontal rail on desktop */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const sec = q(".sr-originals")[0] as HTMLElement;
        const track = sec.querySelector<HTMLElement>(".sr-track")!;
        const dist = () => track.scrollWidth - innerWidth + 80;
        gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
      });

      return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisRef.current = null; };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sr">
      {/* OPENING */}
      {intro && (
        <div className="sr-opening fixed inset-0 z-[100] grid place-items-center bg-black" aria-hidden>
          <p className="sr-op-1 absolute text-sm tracking-[0.3em] text-white/70">EK STUDIOS PRESENTS</p>
          <div className="text-center">
            <p className="sr-op-name sr-v text-[16vw] leading-none text-[var(--red)] [text-shadow:0_0_60px_rgba(229,29,46,0.55)] opacity-0 md:text-[11vw]">ESHWAR</p>
            <p className="sr-op-sub mt-2 text-sm tracking-[0.5em] text-white/80">THE SERIES</p>
          </div>
          <button type="button" onClick={() => setIntro(false)} className="absolute right-6 bottom-6 text-sm text-white/60 hover:text-white">Skip intro</button>
        </div>
      )}

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-5 py-4 md:px-12">
        <a href="#top" className="sr-v text-3xl text-[var(--red)]">ESHWAR</a>
        <nav aria-label="Main" className="hidden gap-7 text-sm text-white/80 md:flex">
          <a className="hover:text-white" href="#about">About</a>
          <a className="hover:text-white" href="#originals">Projects</a>
          <a className="hover:text-white" href="#seasons">Journey</a>
          <a className="hover:text-white" href="#skills">Skills</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="rounded bg-[var(--red)] px-4 py-2 text-sm font-bold text-white transition hover:brightness-110">Hire me</a>
      </header>

      <main id="top">
        {/* HERO BILLBOARD */}
        <section className="sr-hero relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_65%_45%,rgba(229,29,46,0.28),transparent_70%)]" />
          <p aria-hidden className="sr-bgword sr-v pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[34vw] leading-none whitespace-nowrap text-[var(--red)]/[0.07]">
            FULL STACK · MOBILE · CLOUD · AI
          </p>
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-12">
            <div>
              <p className="sr-hero-in flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded bg-[var(--red)] px-2 py-0.5 font-bold">NEW SEASON</span>
                <span className="tracking-wide text-white/80">SOFTWARE ENGINEER · PUNE</span>
              </p>
              <h1 className="sr-hero-in sr-v mt-5 text-[22vw] leading-[0.82] md:text-[9.5rem]">
                ESHWAR
                <br />
                <span className="text-[var(--red)]">KADAM</span>
              </h1>
              <p className="sr-hero-in mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
                <span className="font-bold text-[#46d369]">Open to work</span>
                <span className="rounded border border-white/40 px-1.5">2+ yrs</span>
                <span>Mobile</span><span>·</span><span>Web</span><span>·</span><span>Cloud</span><span>·</span><span>AI</span>
              </p>
              <p className="sr-hero-in mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                A software engineer who builds the whole story: native Android apps, the APIs behind them, the cloud they run on, and the AI that makes them smart.
              </p>
              <div className="sr-hero-in mt-8 flex flex-wrap gap-3">
                <a href="#originals" className="inline-flex items-center gap-2 rounded bg-white px-7 py-3 font-bold text-black transition hover:bg-white/80">
                  <span aria-hidden>▶</span> Watch projects
                </a>
                <button type="button" onClick={() => setResume(true)} className="inline-flex items-center gap-2 rounded bg-white/20 px-7 py-3 font-bold text-white backdrop-blur transition hover:bg-white/30">
                  <span aria-hidden>ⓘ</span> View resume
                </button>
              </div>
            </div>
            <div className="sr-hero-in relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-6 rounded-2xl bg-[var(--red)]/30 blur-3xl" aria-hidden />
              <div className="sr-portrait relative overflow-hidden rounded-xl border border-[var(--red)]/40 bg-[#141414] p-3 shadow-2xl">
                <span className="absolute top-5 left-5 z-10 rounded bg-[var(--red)] px-2 py-1 text-[11px] font-bold">FEATURED ENGINEER</span>
                <Image src="/profile.jpg" alt="Eshwar Kadam" width={640} height={640} priority className="aspect-[4/5] w-full rounded-lg object-cover object-top" />
              </div>
            </div>
          </div>
        </section>

        {/* EPISODE 01: ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-12">
          <p className="sr-reveal text-sm"><span className="font-bold text-[var(--red)]">EPISODE 01</span> <span className="text-white/60">· The pilot</span></p>
          <h2 className="sr-reveal sr-v mt-3 text-6xl leading-none md:text-8xl">ORIGIN <span className="text-[var(--red)]">STORY.</span></h2>
          <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
            <div className="sr-reveal rounded-xl border border-white/10 bg-[#141414] p-8 md:p-10">
              <p className="text-sm font-bold text-[var(--red)]">CAST &amp; BACKGROUND</p>
              <p className="mt-5 text-2xl leading-snug">
                I&apos;m <strong>Eshwar Kadam</strong>, a Software Engineer at <strong>VKS Infotech (Anireysoft)</strong> in Pune, with an M.Sc. in Computer Science.
              </p>
              <p className="mt-4 leading-relaxed text-white/70">
                I take features from the first screen to production: Kotlin and Jetpack Compose on mobile, Ktor and PostgreSQL on the server, React dashboards, Google Cloud and Firebase, and Gemini-powered AI.
              </p>
            </div>
            <div className="sr-reveal grid grid-cols-2 gap-5">
              {[["2+", "years shipping"], ["30+", "tools in the stack"], ["3", "platforms"], ["8.5", "M.Sc. CGPA"]].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-white/10 bg-[#141414] p-6">
                  <p className="sr-v text-5xl text-[var(--red)]">{v}</p>
                  <p className="mt-1 text-sm text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTINUE WATCHING: what I build */}
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-12">
          <h2 className="sr-reveal text-2xl font-bold">Continue watching for you</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.layers.map((l) => (
              <article key={l.title} className="sr-reveal group overflow-hidden rounded-md bg-[#181818] transition duration-300 hover:scale-[1.04] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]">
                <div className="p-5">
                  <h3 className="text-lg font-bold">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{l.text}</p>
                  <p className="mt-3 text-xs text-white/50">{l.tools}</p>
                </div>
                <div className="h-1 bg-white/15">
                  <div className="sr-bar h-full origin-left bg-[var(--red)]" style={{ width: `${l.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ORIGINALS: projects */}
        <section id="originals" className="sr-originals relative overflow-hidden py-16 md:flex md:h-svh md:items-center md:py-0">
          <div className="sr-track flex flex-col gap-8 px-5 md:flex-row md:items-center md:gap-8 md:px-12">
            <div className="shrink-0 md:w-[26vw]">
              <p className="text-sm"><span className="font-bold text-[var(--red)]">EPISODE 02</span> <span className="text-white/60">· Originals</span></p>
              <h2 className="sr-v mt-3 text-6xl leading-none md:text-8xl">ESHWAR <span className="text-[var(--red)]">ORIGINALS</span></h2>
              <p className="mt-5 max-w-xs text-white/70">Open-source projects you can watch, read and run. Select a title for details.</p>
            </div>
            {d.projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setOpen(p)}
                className="group w-full shrink-0 text-left transition duration-300 hover:-translate-y-2 sm:w-64 md:w-72"
                aria-label={`Open ${p.title}`}
              >
                <div className="transition duration-300 group-hover:shadow-[0_0_0_2px_var(--red),0_30px_60px_-20px_rgba(229,29,46,0.6)]">
                  <Poster p={p} i={i} />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-white/70">{p.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SEASONS: journey */}
        <section id="seasons" className="mx-auto max-w-7xl px-5 py-24 md:px-12">
          <p className="sr-reveal text-sm"><span className="font-bold text-[var(--red)]">EPISODE 03</span> <span className="text-white/60">· My journey</span></p>
          <h2 className="sr-reveal sr-v mt-3 text-6xl leading-none md:text-8xl">THE <span className="text-[var(--red)]">SEASONS.</span></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {d.seasons.map((s) => (
              <div key={s.season} className="sr-reveal rounded-xl border border-white/10 bg-[#141414] p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="sr-v text-4xl">{s.season}</h3>
                  <span className="text-sm text-white/60">{s.years}</span>
                </div>
                <ol className="mt-6 space-y-4">
                  {s.episodes.map((e, i) => (
                    <li key={e.title} className="flex gap-4 rounded-lg p-3 transition hover:bg-white/5">
                      <span className="sr-v text-3xl text-white/30">{i + 1}</span>
                      <div>
                        <p className="font-bold">{e.title}</p>
                        <p className="text-sm text-white/70">{e.where}</p>
                        <p className="mt-1 text-xs text-[var(--red)]">{e.when}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* TOP 10: skills */}
        <section id="skills" className="mx-auto max-w-7xl px-5 pb-24 md:px-12">
          <h2 className="sr-reveal text-2xl font-bold">Top 10 in my stack today</h2>
          <ol className="sr-reveal mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {d.topSkills.map((s, i) => (
              <li key={s} className="flex shrink-0 items-end">
                <span className="sr-v sr-outline text-[9rem] leading-[0.75]">{i + 1}</span>
                <span className="-ml-6 grid h-36 w-28 place-items-center rounded-md border border-white/10 bg-[#181818] p-3 text-center text-sm font-bold">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* FINALE */}
        <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 py-28 text-center md:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(229,29,46,0.3),transparent_70%)]" />
          <p className="sr-reveal relative text-sm tracking-[0.3em] text-white/60">NEXT EPISODE</p>
          <h2 className="sr-reveal sr-v relative mt-4 text-6xl leading-none md:text-9xl">TO BE <span className="text-[var(--red)]">CONTINUED…</span></h2>
          <p className="sr-reveal relative mx-auto mt-6 max-w-lg text-white/75">The next chapter could be with your team. Open to software engineering roles and freelance projects.</p>
          <div className="sr-reveal relative mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${d.email}`} className="rounded bg-[var(--red)] px-7 py-3 font-bold transition hover:brightness-110">Email me</a>
            <button type="button" onClick={() => setResume(true)} className="rounded bg-white/15 px-7 py-3 font-bold transition hover:bg-white/25">View resume</button>
            <a href={d.linkedin} target="_blank" rel="noreferrer" className="rounded bg-white/15 px-7 py-3 font-bold transition hover:bg-white/25">LinkedIn</a>
            <a href={d.github} target="_blank" rel="noreferrer" className="rounded bg-white/15 px-7 py-3 font-bold transition hover:bg-white/25">GitHub</a>
          </div>
          <p className="relative mt-16 text-sm text-white/50">{d.email} · {d.phone}</p>
        </section>
      </main>

      {/* PROJECT OVERLAY */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} className="sr-fade fixed inset-0 z-[90] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm md:p-10" onClick={() => setOpen(null)}>
          <div className="sr-pop mx-auto max-w-3xl overflow-hidden rounded-xl bg-[#181818]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-56 md:h-72" style={{ background: `radial-gradient(120% 90% at 30% 20%, hsl(${open.hue} 85% 45%), hsl(${open.hue} 70% 10%) 70%)` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
              <h3 className="sr-v absolute bottom-6 left-7 text-6xl leading-none md:text-7xl">{open.title}</h3>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-black/60 text-xl">×</button>
            </div>
            <div className="grid gap-8 p-7 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-sm"><span className="font-bold text-[#46d369]">Open source</span> <span className="text-white/60">· {open.kind}</span></p>
                <p className="mt-4 leading-relaxed text-white/85">{open.desc}</p>
                <a href={open.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded bg-white px-6 py-2.5 font-bold text-black">
                  <span aria-hidden>▶</span> View source on GitHub
                </a>
              </div>
              <div className="text-sm text-white/70">
                <p><span className="text-white/50">Stack: </span>{open.tags.join(", ")}</p>
              </div>
            </div>
            <pre className="mx-7 mb-7 overflow-x-auto rounded-lg bg-black/60 p-5 font-mono text-[13px] leading-6 text-white/85">
              <span className="mb-2 block text-white/50">{open.file}</span>
              {open.code}
            </pre>
          </div>
        </div>
      )}

      {/* RESUME OVERLAY */}
      {resume && (
        <div role="dialog" aria-modal="true" aria-label="Resume" className="sr-fade fixed inset-0 z-[90] flex flex-col bg-black/85 p-4 backdrop-blur-sm md:p-10" onClick={() => setResume(false)}>
          <div className="sr-pop mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-[#181818]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <p className="font-bold">Eshwar Kadam · Resume</p>
              <div className="flex gap-2">
                <a href="/Eshwar-Kadam-Resume.pdf" download className="rounded bg-[var(--red)] px-4 py-1.5 text-sm font-bold">Download</a>
                <button type="button" onClick={() => setResume(false)} aria-label="Close" className="rounded bg-white/15 px-3 py-1.5 text-sm">Close</button>
              </div>
            </div>
            <iframe src="/Eshwar-Kadam-Resume.pdf#view=FitH" title="Resume PDF" className="h-full w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}
