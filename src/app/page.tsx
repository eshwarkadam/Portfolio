import { Geist, Instrument_Serif } from "next/font/google";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { FaLinkedin } from "react-icons/fa";
import { LuArrowRight, LuArrowUpRight, LuGraduationCap, LuMail, LuMapPin, LuMenu, LuPhone } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { education, highlights, jobs, me, projects, services, toolkit } from "@/content";
import { ContactForm, Reveal } from "@/fx";

const sans = Geist({ variable: "--pro-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--pro-serif", subsets: ["latin"], weight: "400", style: "italic" });

const NAV = [["About", "about"], ["Experience", "experience"], ["Projects", "projects"], ["Skills", "skills"], ["Contact", "contact"]] as const;

const STATS = [
  ["2+ yrs", "Professional experience"],
  ["4", "Platforms: mobile, backend, web, cloud"],
  [String(projects.length), "Open-source projects on GitHub"],
  ["8.5", "M.Sc. Computer Science CGPA"],
];

const tools = toolkit.flatMap((t) => t.tools).filter((t) => t.icon);

const Em = ({ children }: { children: ReactNode }) => (
  <em className="font-normal text-[#3b5bff]" style={{ fontFamily: "var(--pro-serif)" }}>{children}</em>
);

function Head({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-sm font-semibold tracking-wide text-[#3b5bff] uppercase">{label}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-[#5b6070]">{children}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className={`${sans.variable} ${serif.variable} min-h-screen bg-[#fafaf7] text-[#0b1020]`} style={{ fontFamily: "var(--pro-sans)" }}>
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#fafaf7]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1020] text-sm text-white">EK</span>
            Eshwar Kadam
          </a>
          <nav className="ml-auto hidden gap-7 text-[15px] text-[#5b6070] md:flex" aria-label="Main">
            {NAV.map(([label, id]) => <a key={id} href={`#${id}`} className="transition hover:text-[#0b1020]">{label}</a>)}
          </nav>
          <a href="/Eshwar-Kadam-Resume.pdf" target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-[#0b1020] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3b5bff] md:ml-0">
            Resume
          </a>
          <details className="relative md:hidden">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-black/10" aria-label="Menu"><LuMenu /></summary>
            <nav className="absolute top-12 right-0 flex w-48 flex-col rounded-2xl border border-black/10 bg-white p-2 shadow-xl" aria-label="Mobile">
              {NAV.map(([label, id]) => <a key={id} href={`#${id}`} className="rounded-xl px-3 py-2.5 hover:bg-black/5">{label}</a>)}
            </nav>
          </details>
        </div>
      </header>

      <main id="top">
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:grid-cols-[1.2fr_0.8fr] md:pt-20">
          <div>
            <Reveal now>
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-sm text-[#3d4252]">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" /><span className="relative h-2 w-2 rounded-full bg-[#22c55e]" /></span>
                Open to work · {me.location}
              </p>
            </Reveal>
            <Reveal now delay={0.08}>
              <h1 className="mt-6 text-[2.75rem] leading-[1.05] font-semibold tracking-tight md:text-[4.25rem]">
                Software engineer building <Em>apps, APIs</Em> and <Em>AI features</Em> that ship.
              </h1>
            </Reveal>
            <Reveal now delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6070]">
                I&apos;m Eshwar. I build Android apps, REST APIs and cloud backends end to end, from the first commit to production, and add AI where it helps.
              </p>
            </Reveal>
            <Reveal now delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-[#3b5bff] px-6 py-3.5 font-medium text-white shadow-[0_10px_30px_-10px_#3b5bff] transition hover:bg-[#2c47e0]">
                  View my work <LuArrowRight className="transition group-hover:translate-x-0.5" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 font-medium transition hover:border-black/40">
                  Get in touch
                </a>
              </div>
              <div className="mt-8 flex items-center gap-5 text-[#5b6070]">
                <a href={me.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-xl transition hover:text-[#0b1020]"><SiGithub /></a>
                <a href={me.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-xl transition hover:text-[#0a66c2]"><FaLinkedin /></a>
                <a href={`mailto:${me.email}`} aria-label="Email" className="text-xl transition hover:text-[#0b1020]"><LuMail /></a>
                <span className="h-5 w-px bg-black/15" />
                <span className="flex items-center gap-1.5 text-sm"><LuMapPin /> {me.location}</span>
              </div>
            </Reveal>
          </div>

          {/* frameless cut-out rising out of an accent disc */}
          <Reveal now delay={0.2} className="relative mx-auto w-full max-w-[420px]">
            <div className="relative aspect-[4/4.4]">
              <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-[radial-gradient(circle_at_30%_25%,#8fa6ff,#3b5bff_55%,#1e2fa8)]" />
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-b-full">
                <Image src="/portrait-cutout.webp" alt="Eshwar Kadam" width={800} height={772} priority className="absolute bottom-0 left-1/2 w-[96%] -translate-x-1/2" />
              </div>
              <div className="absolute top-[22%] -left-2 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_12px_40px_-12px_rgba(11,16,32,0.3)] md:-left-10">
                <p className="text-2xl font-semibold">2+ yrs</p>
                <p className="text-xs text-[#5b6070]">building products</p>
              </div>
              <div className="absolute right-0 bottom-[14%] rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_12px_40px_-12px_rgba(11,16,32,0.3)] md:-right-8">
                <p className="text-sm font-semibold">Kotlin · Ktor · GCP</p>
                <p className="text-xs text-[#5b6070]">React · Gemini AI</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* stats */}
        <section className="mx-auto max-w-6xl px-5">
          <Reveal className="grid grid-cols-2 rounded-3xl border border-black/[0.07] bg-white md:grid-cols-4">
            {STATS.map(([n, label], i) => (
              <div key={label} className={`p-6 md:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-black/[0.07]`}>
                <p className="text-3xl font-semibold tracking-tight md:text-4xl">{n}</p>
                <p className="mt-1.5 text-sm text-[#5b6070]">{label}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* tool marquee */}
        <section className="mt-16 overflow-hidden border-y border-black/[0.06] bg-white py-6" aria-label="Tools I use">
          <div className="marquee flex w-max gap-12 pr-12">
            {[...tools, ...tools].map((t, i) => {
              const I = t.icon!;
              return (
                <span key={i} aria-hidden={i >= tools.length} className="flex items-center gap-2.5 text-[17px] font-medium whitespace-nowrap text-[#3d4252]">
                  <I className="text-2xl text-[#0b1020]" /> {t.name}
                </span>
              );
            })}
          </div>
        </section>

        {/* about / services */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:py-32">
          <Head label="What I do" title={<>End to end, from <Em>idea</Em> to <Em>production</Em></>}>
            One engineer across the stack: the app people use, the API behind it, the cloud it runs on, and the AI that makes it smarter.
          </Head>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.08}>
                <article className="group h-full rounded-3xl border border-black/[0.07] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(59,91,255,0.45)] md:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eef1ff] text-2xl text-[#3b5bff] transition group-hover:bg-[#3b5bff] group-hover:text-white">
                    <s.icon />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#5b6070]">{s.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => <li key={p} className="rounded-full bg-[#f3f3ef] px-3 py-1 text-sm text-[#3d4252]">{p}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="scroll-mt-20 bg-white py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[0.8fr_1.2fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <Head label="Experience" title={<>Where I&apos;ve <Em>worked</Em></>}>
                Shipping production software for real users, from internship to full-time engineer.
              </Head>
            </div>
            <div>
              <ol className="relative space-y-10 border-l-2 border-black/[0.08] pl-8">
                {jobs.map((j, i) => (
                  <li key={j.role} className="relative">
                    <span className={`absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-white ${j.current ? "bg-[#3b5bff] ring-4 ring-[#3b5bff]/20" : "bg-[#b9bccb]"}`} />
                    <Reveal delay={i * 0.08}>
                      <p className="text-sm font-medium text-[#3b5bff]">{j.when.replace(" - ", " to ")}</p>
                      <h3 className="mt-1 text-2xl font-semibold">{j.role}</h3>
                      <p className="mt-1 text-[#5b6070]">{j.where.replace(" · ", ", ")}</p>
                      {j.current && (
                        <ul className="mt-5 space-y-3">
                          {highlights.map((h) => (
                            <li key={h.title} className="flex gap-3 leading-relaxed text-[#3d4252]">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b5bff]" />
                              <span><strong className="font-semibold text-[#0b1020]">{h.title}.</strong> {h.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Reveal>
                  </li>
                ))}
              </ol>

              <Reveal className="mt-14">
                <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#5b6070] uppercase"><LuGraduationCap className="text-lg" /> Education</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {education.map((e) => (
                    <div key={e.title} className="rounded-2xl border border-black/[0.07] bg-[#fafaf7] p-5">
                      <p className="font-semibold">{e.title}</p>
                      <p className="mt-1 text-sm text-[#5b6070]">{e.where}</p>
                      <p className="mt-3 text-sm font-medium text-[#3d4252]">{e.meta.replace(" - ", " to ")} · {e.score}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:py-32">
          <Head label="Projects" title={<>Selected <Em>work</Em></>}>
            Open-source projects you can read, run and fork on GitHub.
          </Head>
          <div className="mt-14 space-y-8">
            {projects.map((p, i) => (
              <Reveal key={p.title}>
                <article className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white md:grid-cols-2">
                  <div className={`bg-[#0b1020] p-6 md:p-8 ${i % 2 ? "md:order-2" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
                      <span className="ml-3 font-mono text-xs text-white/50">{p.file}</span>
                    </div>
                    <pre className="mt-6 overflow-x-auto font-mono text-[13px] leading-relaxed text-[#c9d4ff]">{p.code.join("\n")}</pre>
                  </div>
                  <div className="flex flex-col p-7 md:p-10">
                    <p className="text-sm font-medium text-[#3b5bff]">{p.kind}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-4 leading-relaxed text-[#5b6070]">{p.desc}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => <li key={t} className="rounded-full border border-black/10 px-3 py-1 text-sm text-[#3d4252]">{t}</li>)}
                    </ul>
                    <a href={p.link} target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-2 self-start font-medium text-[#0b1020]">
                      <SiGithub /> View on GitHub <LuArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* skills */}
        <section id="skills" className="scroll-mt-20 bg-white py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-5">
            <Head label="Skills" title={<>My <Em>toolkit</Em></>}>
              The languages, frameworks and platforms I use every day.
            </Head>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {toolkit.map((t, i) => (
                <Reveal key={t.title} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-3xl border border-black/[0.07] bg-[#fafaf7] p-6">
                    <div className="flex items-center gap-3">
                      <t.icon className="text-xl text-[#3b5bff]" />
                      <h3 className="text-lg font-semibold">{t.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-[#5b6070]">{t.note}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {t.tools.map((x) => (
                        <li key={x.name} className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-sm text-[#3d4252]">
                          {x.icon && <x.icon className="text-[#0b1020]" />} {x.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-20 px-3 py-24 md:px-5 md:py-32">
          <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[#0b1020] text-white">
            <div className="relative grid gap-12 p-7 md:grid-cols-2 md:p-14">
              <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#3b5bff]/40 blur-[120px]" />
              <div className="relative">
                <p className="text-sm font-semibold tracking-wide text-[#8fa6ff] uppercase">Contact</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                  Let&apos;s build something <em className="font-normal text-[#8fa6ff]" style={{ fontFamily: "var(--pro-serif)" }}>great</em> together.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                  Hiring for a role or planning a product? Send a message and I&apos;ll reply within 1 to 2 days.
                </p>
                <ul className="mt-10 space-y-4">
                  {[
                    [LuMail, me.email, `mailto:${me.email}`],
                    [LuPhone, me.phone, `tel:${me.phone.replace(/\s/g, "")}`],
                    [FaLinkedin, "LinkedIn", me.linkedin],
                    [SiGithub, "GitHub", me.github],
                  ].map(([I, label, href]) => {
                    const Icon = I as typeof LuMail;
                    const external = String(href).startsWith("http");
                    return (
                      <li key={String(label)}>
                        <a href={String(href)} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="group inline-flex items-center gap-3 text-white/85 transition hover:text-white">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition group-hover:bg-[#3b5bff]"><Icon /></span>
                          {String(label)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* ContactForm reads its accent from these theme variables */}
              <div className="relative" style={{ "--color-sun": "#8fa6ff", "--color-ink-deep": "#0b1020" } as CSSProperties}>
                <ContactForm email={me.email} />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-black/[0.07] px-5 py-8 text-sm text-[#5b6070] md:flex-row">
        <p>© {new Date().getFullYear()} Eshwar Kadam. Software Engineer, Pune.</p>
        <a href="#top" className="transition hover:text-[#0b1020]">Back to top ↑</a>
      </footer>
    </div>
  );
}
