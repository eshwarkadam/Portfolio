import Image from "next/image";
import { chips, education, highlights, jobs, me, projects, ribbon, ribbon2, toolkit } from "@/content";
import { Magnetic, MaskLine, Reveal, StackCard } from "@/fx";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 text-xs font-medium tracking-[0.2em] text-mute uppercase">{children}</p>
);
const Em = ({ children }: { children: React.ReactNode }) => <em className="font-serif font-medium">{children}</em>;
const Pill = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm">{children}</li>
);

function Ribbon({ items, className, rev }: { items: string[]; className: string; rev?: boolean }) {
  return (
    <div className={`w-[110%] -translate-x-[5%] overflow-hidden py-4 shadow-lg ${className}`}>
      <div className={`${rev ? "marquee-rev" : "marquee"} flex w-max gap-8 font-display text-lg font-bold tracking-widest whitespace-nowrap uppercase`}>
        {[...items, ...items, ...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-8">{s}<span aria-hidden>✳</span></span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white/85 py-2 pr-2 pl-6 shadow-[0_10px_40px_-12px_rgba(47,52,87,0.25)] backdrop-blur-md">
        <a href="#top" className="font-display text-xl font-semibold">{me.first}<span className="text-sun">.</span></a>
        <nav className="hidden gap-1 rounded-full bg-lav/60 p-1 text-sm md:flex">
          {["About", "Skills", "Experience", "Work", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="rounded-full px-4 py-2 transition hover:bg-white">{l}</a>
          ))}
        </nav>
        <a href={`mailto:${me.email}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-deep">Say hello</a>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="p-3">
          <div className="relative flex h-[calc(100svh-24px)] min-h-[560px] flex-col items-center justify-end overflow-hidden rounded-[2rem] pb-10 text-center text-white">
            <Image src="/about.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_30%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/30 to-ink/90" />
            <div className="relative px-5">
              <Reveal now delay={0.5}>
                <a href="#work" className="group mx-auto inline-flex items-center gap-3 rounded-full bg-sun py-1.5 pr-1.5 pl-5 font-medium text-ink-deep shadow-lg">
                  View my work
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-white transition group-hover:translate-x-1">→</span>
                </a>
                <p className="mx-auto mt-5 max-w-md text-white/85">
                  Software Engineer. I build native Android apps in Kotlin, and the Ktor servers and React dashboards behind them.
                </p>
              </Reveal>
              <h1 className="mt-4 text-[17vw] leading-[0.9] font-semibold md:text-[9rem]">
                <MaskLine delay={0.1}>{me.first}</MaskLine>
                <MaskLine delay={0.2}>{me.last}<span className="text-sun">.</span></MaskLine>
              </h1>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-2">
          <Reveal>
            <Eyebrow>About me</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">I turn ideas<br />into <Em>working apps.</Em></h2>
            <div className="mt-10 flex items-center gap-5">
              <div className="relative size-32 overflow-hidden rounded-3xl bg-lav">
                <Image src="/headshot.jpg" alt="Eshwar Kadam" fill sizes="128px" className="object-cover" />
              </div>
              <div>
                <p className="text-lg font-medium">{me.first} {me.last}</p>
                <p className="text-mute">Android & Full-Stack Engineer · Pune</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:pt-12">
            <p className="text-2xl leading-snug">As an Android engineer, I build the whole path from a user&apos;s tap to the server and back.</p>
            <p className="mt-5 leading-relaxed text-mute">
              Most of my work is end-to-end products: Kotlin & Compose apps, Ktor APIs on PostgreSQL and React dashboards, all backed by Firebase, and now with AI built in.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[["Experience", "2+", "years building apps", "bg-lav"], ["Apps built", "10+", "mobile apps shipped", "bg-butter"], ["Projects", "15+", "completed end to end", "bg-sage"]].map(([k, v, s, bg]) => (
                <div key={k} className={`rounded-3xl p-4 md:p-5 ${bg}`}>
                  <p className="text-xs">{k}</p>
                  <p className="my-1 font-display text-4xl">{v}</p>
                  <p className="text-xs text-mute">{s}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* RIBBONS */}
        <div className="relative h-56 overflow-hidden" aria-hidden>
          <div className="absolute inset-x-0 top-16 rotate-2"><Ribbon items={ribbon2} className="bg-sun text-ink-deep" /></div>
          <div className="absolute inset-x-0 top-16 -rotate-2"><Ribbon items={ribbon} className="bg-ink text-white" rev /></div>
        </div>

        {/* FOCUS */}
        <section className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-7xl">Less boilerplate.<br />More <Em>shipping.</Em></h2>
            <p className="mx-auto mt-6 max-w-xl text-mute">Good apps come from boring, reliable engineering. Here is what I bring to every build:</p>
          </Reveal>
          <div className="relative mx-auto mt-14 max-w-4xl">
            <Reveal className="mx-auto w-[340px] md:w-[500px]">
              <Image src="/cutout.webp" alt="" width={882} height={629} sizes="500px" className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
            </Reveal>
            <ul className="mt-8 flex flex-wrap justify-center gap-3 md:mt-0">
              {chips.map((c, i) => (
                <li
                  key={c.bold}
                  className={`float rounded-full px-5 py-3 text-sm shadow-lg md:absolute ${c.bg} ${["md:top-[18%] md:left-0", "md:top-[12%] md:right-0", "md:top-[55%] md:left-[4%]", "md:top-[60%] md:right-[2%]"][i]}`}
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  {c.text} <b className="font-semibold">{c.bold}</b>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TOOLKIT */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <Eyebrow>Toolkit</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Different layers.<br /><Em>The same app.</Em></h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {toolkit.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.08} className={`flex min-h-72 flex-col rounded-[1.75rem] p-7 ${t.bg} ${t.wide ? "md:col-span-3" : "md:col-span-2"}`}>
                <span className="grid size-12 place-items-center rounded-2xl bg-white/80 text-2xl"><t.icon /></span>
                <h3 className="mt-auto pt-10 text-2xl font-medium">{t.title}</h3>
                <p className="mt-1 text-sm text-mute">{t.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {t.tools.map((x) => <Pill key={x.name}>{x.icon && <x.icon />}{x.name}</Pill>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="text-6xl font-medium md:text-8xl">Experience</h2>
            <div className="mt-10 space-y-3">
              {jobs.map((j) => (
                <div key={j.role} className={`rounded-3xl p-6 ${j.current ? "bg-lav" : "border border-lav bg-white"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-medium">{j.role}</h3>
                    {j.current && <span className="rounded-full bg-sun px-3 py-1 text-xs font-medium text-ink-deep">Current</span>}
                  </div>
                  <p className="mt-2 w-fit border-b border-ink/30 pb-1">{j.where}</p>
                  <p className="mt-3 text-sm text-mute">{j.when}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-20 md:pt-40">
            <Eyebrow>Highlights from Anireysoft</Eyebrow>
            {highlights.map((h) => (
              <Reveal key={h.title}>
                <h3 className="text-4xl font-medium md:text-5xl">{h.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-mute">{h.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="mb-12">
            <Eyebrow>AI projects</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Putting AI<br /><Em>where it&apos;s useful.</Em></h2>
          </Reveal>
          {projects.map((p, i) => (
            <StackCard key={p.title} i={i} total={projects.length}>
              <article className="h-full rounded-[2rem] bg-white p-2 shadow-[0_20px_60px_-20px_rgba(47,52,87,0.3)]">
                <div className={`grid h-full overflow-hidden rounded-[1.6rem] md:grid-cols-2 ${p.bg}`}>
                  <div className="flex flex-col p-7 md:p-12">
                    <p className="text-xs tracking-[0.2em] text-mute uppercase">0{i + 1} · {p.kind}</p>
                    <h3 className="mt-auto text-4xl leading-tight font-medium md:text-6xl">{p.title}</h3>
                    <p className="mt-4 leading-relaxed text-mute">{p.desc}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <Pill key={t}>{t}</Pill>)}</ul>
                  </div>
                  <div className="hidden grid-cols-2 place-content-center place-items-center gap-10 border-l border-ink/10 p-12 text-7xl text-ink/60 md:grid">
                    {p.icons.map((Icon, j) => <Icon key={j} className={j % 2 ? "opacity-50" : ""} />)}
                  </div>
                </div>
              </article>
            </StackCard>
          ))}
        </section>

        {/* EDUCATION */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="text-5xl font-medium md:text-7xl">Education</h2>
          <p className="mt-3 text-mute">Where the foundations came from.</p>
          <ul className="mt-10 border-t border-lav">
            {education.map((e) => (
              <li key={e.title} className="grid gap-2 border-b border-lav px-2 py-7 transition hover:bg-white md:grid-cols-[1.2fr_2fr_auto] md:items-center md:gap-8">
                <span className="text-xl">{e.title}</span>
                <span className="text-mute">{e.where}</span>
                <span className="flex gap-4 text-sm text-mute"><b className="font-medium text-ink">{e.score}</b>{e.meta}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact" className="p-3">
          <div className="rounded-[2rem] bg-ink px-6 py-24 text-center text-white md:py-32">
            <Reveal>
              <p className="mb-5 text-xs font-medium tracking-[0.2em] text-white/60 uppercase">Contact</p>
              <h2 className="text-5xl leading-[1.05] font-medium md:text-7xl">Have an app that<br /><Em>needs building?</Em></h2>
              <p className="mx-auto mt-6 max-w-md text-white/70">I&apos;m open to Android, Kotlin and full-stack roles. Tell me what you&apos;re working on.</p>
            </Reveal>
            <Magnetic className="mx-auto mt-10 w-fit max-w-full">
              <a href={`mailto:${me.email}`} className="group inline-flex max-w-full items-center gap-3 rounded-full bg-sun py-2 pr-2 pl-6 font-medium break-all text-ink-deep md:text-lg">
                {me.email}
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition group-hover:-rotate-45">→</span>
              </a>
            </Magnetic>
            <ul className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
              {[["LinkedIn", me.linkedin], ["GitHub", me.github], [me.phone, `tel:${me.phone.replace(/\s/g, "")}`]].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block rounded-full border border-white/20 px-5 py-2.5 transition hover:bg-white/10">{l} ↗</a>
                </li>
              ))}
            </ul>
          </div>
          <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-8 text-sm text-mute">
            <span>© {new Date().getFullYear()} {me.first} {me.last} · {me.location}</span>
            <a href="#top" className="hover:text-ink">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
