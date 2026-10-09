import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { education, jobs, me, projects, services, toolkit } from "@/content";
import { LAYER_COLOR } from "./colors";
import { Trace } from "./trace";
import "./v2.css";

const sans = Schibsted_Grotesk({ variable: "--v2-sans", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--v2-mono", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (v2)",
  robots: { index: false }, // preview design; the main page stays canonical
};

const SERVICE_LAYER: Record<string, string> = { "Mobile apps": "Mobile", "Backend & APIs": "API", "Google Cloud": "Cloud", "AI features": "AI" 
};

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
          <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h1 className="text-[15vw] leading-[0.86] font-extrabold md:text-[8.5rem]">Eshwar Kadam</h1>
              <p className="mt-8 max-w-xl text-xl leading-snug text-[var(--soft)] md:text-2xl">
                Software engineer in Pune. I build the whole path a request travels, from the screen you tap to the cloud that answers.
              </p>
            </div>
            <figure className="v2-portrait relative w-48 justify-self-start md:w-60 md:justify-self-end">
              <div className="overflow-hidden rounded-2xl ring-1 ring-[var(--rule)]">
                <Image src="/profile.jpg" alt="Portrait of Eshwar Kadam" width={480} height={480} priority className="aspect-[4/5] h-auto w-full object-cover object-top" />
              </div>
              <figcaption className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-[0_8px_24px_-12px_rgba(21,24,29,0.45)]">
                <span aria-hidden className="size-2 rounded-full bg-[#0f9d84]" />
                Open to new roles
              </figcaption>
            </figure>
          </div>

          <Trace />
        </section>

        {/* WHAT I BUILD */}
        <section className="border-t border-[var(--rule)] bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[minmax(0,15rem)_1fr] md:px-10">
            <h2 className="text-3xl font-bold">What I build</h2>
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title}>
                  <span aria-hidden className="mb-4 block h-1.5 w-16 rounded-full" style={{ background: LAYER_COLOR[SERVICE_LAYER[s.title]] }} />
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
              <li key={p.title} className="grid gap-6 border-b border-[var(--rule)] py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
                <div>
                  <h3 className="text-3xl leading-tight font-bold md:text-4xl">{p.title}</h3>
                  <p className="mt-4 max-w-xl text-[var(--soft)]">{p.desc}</p>
                  <p className="mt-4 text-sm text-[var(--soft)]">{p.tags.join(", ")}</p>
                  <a className="v2-link mt-6 inline-block font-medium text-[var(--cobalt)]" href={p.link} target="_blank" rel="noreferrer">
                    Source on GitHub
                  </a>
                </div>
                <div className="v2-code self-start overflow-hidden rounded-xl bg-[var(--ink)] text-white shadow-[0_24px_60px_-28px_rgba(21,24,29,0.6)]">
                  <p className="v2-mono border-b border-white/10 px-5 py-3 text-xs text-white/70">{p.file}</p>
                  <pre className="v2-mono overflow-x-auto px-5 py-4 text-[13px] leading-6 text-white/90">{p.code.join("\n")}</pre>
                </div>
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
