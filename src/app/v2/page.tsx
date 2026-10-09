import type { Metadata } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { education, jobs, me, projects, services, toolkit } from "@/content";
import "./v2.css";

const sans = Schibsted_Grotesk({ variable: "--v2-sans", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--v2-mono", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (v2)",
  robots: { index: false }, // preview design; the main page stays canonical
};

// one request traced through the stack I build: start/end in ms on a 0–240ms axis
const TRACE = [
  { name: "Tap in the mobile app", layer: "Mobile", start: 0, end: 18, detail: "Kotlin and Jetpack Compose, offline-first" },
  { name: "Sign-in check", layer: "Auth", start: 18, end: 46, detail: "Firebase Auth with real-time sync" },
  { name: "POST /sync", layer: "API", start: 46, end: 186, detail: "Ktor REST API with caching and validation" },
  { name: "Read and write", layer: "Database", start: 70, end: 128, detail: "PostgreSQL, indexed queries" },
  { name: "Summarise", layer: "AI", start: 128, end: 176, detail: "Gemini API behind a provider-neutral router" },
  { name: "Served from the cloud", layer: "Cloud", start: 46, end: 200, detail: "Docker containers on Google Cloud Run" },
  { name: "Response on screen", layer: "Mobile", start: 200, end: 214, detail: "The user sees the result" },
];
const TOTAL = 240;

export default function V2() {
  return (
    <div className={`v2 ${sans.variable} ${mono.variable}`}>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-white">
        Skip to work
      </a>

      <header className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-6 pt-8 md:px-10">
        <a href="#top" className="font-bold tracking-tight">Eshwar Kadam</a>
        <nav aria-label="Main" className="flex gap-5 text-sm text-[var(--soft)] md:gap-6 md:text-[15px]">
          <a className="hover:text-[var(--ink)]" href="#work">Work</a>
          <a className="hidden hover:text-[var(--ink)] sm:inline" href="#experience">Experience</a>
          <a className="hover:text-[var(--ink)]" href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO: name, then one request traced through the stack */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28">
          <h1 className="text-[15vw] leading-[0.86] font-extrabold md:text-[9.5rem]">Eshwar Kadam</h1>
          <p className="mt-8 max-w-xl text-xl leading-snug text-[var(--soft)] md:text-2xl">
            Software engineer in Pune. I build the whole path a request travels, from the screen you tap to the cloud that answers.
          </p>

          <figure className="mt-16 md:mt-20" aria-labelledby="trace-cap">
            <div className="flex items-baseline justify-between border-b border-[var(--rule)] pb-3 text-sm text-[var(--soft)]">
              <figcaption id="trace-cap">One request through the stack I build</figcaption>
              <span className="v2-mono">{TOTAL} ms</span>
            </div>
            <ol>
              {TRACE.map((s, i) => {
                const last = i === TRACE.length - 1;
                return (
                  <li key={s.name} tabIndex={0} className="v2-row grid grid-cols-1 gap-x-6 border-b border-[var(--rule)] py-3 outline-none md:grid-cols-[minmax(0,15rem)_1fr]">
                    <div className="v2-row-text" style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-[var(--soft)]">{s.layer}</p>
                    </div>
                    <div className="relative mt-2 md:mt-0">
                      <div className="relative h-7">
                        <span
                          aria-hidden
                          className="v2-span absolute top-1 h-5 rounded-[3px]"
                          style={{
                            left: `${(s.start / TOTAL) * 100}%`,
                            width: `${((s.end - s.start) / TOTAL) * 100}%`,
                            background: last ? "var(--amber)" : "var(--cobalt)",
                            opacity: s.layer === "Cloud" ? 0.35 : 1,
                            animationDelay: `${0.3 + i * 0.12}s`,
                          }}
                        />
                        <span
                          className="v2-mono absolute top-1 text-[13px] leading-5 text-[var(--soft)]"
                          style={{ left: `calc(${(s.end / TOTAL) * 100}% + 8px)` }}
                        >
                          {s.end - s.start} ms
                        </span>
                      </div>
                      <p className="v2-detail text-sm text-[var(--soft)]">{s.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </figure>
        </section>

        {/* WHAT I BUILD */}
        <section className="border-t border-[var(--rule)] bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[minmax(0,15rem)_1fr] md:px-10">
            <h2 className="text-3xl font-bold">What I build</h2>
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title}>
                  <dt className="text-xl font-bold">{s.title}</dt>
                  <dd className="mt-2 max-w-md text-[var(--soft)]">{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <h2 className="text-3xl font-bold">Open-source work</h2>
          <ul className="mt-10 border-t border-[var(--ink)]">
            {projects.map((p) => (
              <li key={p.title} className="grid gap-4 border-b border-[var(--rule)] py-10 md:grid-cols-[minmax(0,15rem)_1fr_auto] md:gap-10">
                <h3 className="text-2xl leading-tight font-bold">{p.title}</h3>
                <div>
                  <p className="max-w-2xl text-[var(--soft)]">{p.desc}</p>
                  <p className="mt-4 text-sm text-[var(--soft)]">{p.tags.join(", ")}</p>
                </div>
                <a className="v2-link self-start font-medium text-[var(--cobalt)]" href={p.link} target="_blank" rel="noreferrer">
                  Source on GitHub
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* EXPERIENCE + EDUCATION: a real sequence, so a timeline */}
        <section id="experience" className="border-t border-[var(--rule)] bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:px-10">
            <div>
              <h2 className="text-3xl font-bold">Experience</h2>
              <ol className="mt-10 space-y-8 border-l-2 border-[var(--rule)] pl-6">
                {jobs.map((j) => (
                  <li key={j.role} className="relative">
                    <span aria-hidden className={`absolute top-2 -left-[31px] size-3 rounded-full ${j.current ? "bg-[var(--cobalt)]" : "bg-[var(--rule)]"}`} />
                    <p className="text-xl font-bold">{j.role}</p>
                    <p className="text-[var(--soft)]">
                      <a className="v2-link" href="https://anireysoft.com" target="_blank" rel="noreferrer">{j.where.replace(" · ", ", ")}</a>
                    </p>
                    <p className="v2-mono mt-1 text-sm text-[var(--soft)]">{j.when.replace(" - ", " to ")}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Education</h2>
              <ol className="mt-10 space-y-8 border-l-2 border-[var(--rule)] pl-6">
                {education.map((e, i) => (
                  <li key={e.title} className="relative">
                    <span aria-hidden className={`absolute top-2 -left-[31px] size-3 rounded-full ${i === 0 ? "bg-[var(--cobalt)]" : "bg-[var(--rule)]"}`} />
                    <p className="text-xl font-bold">{e.title}</p>
                    <p className="text-[var(--soft)]">{e.where}</p>
                    <p className="v2-mono mt-1 text-sm text-[var(--soft)]">{e.meta.replace(" - ", " to ")}, {e.score}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* TOOLS: plain grouped list, no badges */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <h2 className="text-3xl font-bold">Tools I use</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((t) => (
              <div key={t.title} className="border-t border-[var(--rule)] pt-4">
                <dt className="font-bold">{t.title}</dt>
                <dd className="mt-1 text-[var(--soft)]">{t.tools.map((x) => x.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-28 md:px-10">
            <h2 className="max-w-3xl text-4xl leading-tight font-bold !text-white md:text-6xl">
              Working on something that needs to reach production? Let&apos;s talk.
            </h2>
            <a href={`mailto:${me.email}`} className="mt-10 inline-block text-2xl font-medium break-all text-white underline decoration-[var(--cobalt)] decoration-4 underline-offset-8 hover:decoration-[var(--amber)] md:text-4xl">
              {me.email}
            </a>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-white/80">
              <li><a className="hover:text-white" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="hover:text-white" href={me.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="hover:text-white" href="/Eshwar-Kadam-Resume.pdf" target="_blank" rel="noreferrer">Resume (PDF)</a></li>
              <li><a className="hover:text-white" href={`tel:${me.phone.replace(/\s/g, "")}`}>{me.phone}</a></li>
            </ul>
            <p className="mt-20 text-sm text-white/60">{me.first} {me.last}, {me.location}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
