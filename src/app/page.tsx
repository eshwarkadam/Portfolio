import Image from "next/image";
import { education, services, highlights, jobs, me, projects, toolkit } from "@/content";
import { DotGrid, Effects, Logo, Magnetic, Wave, MaskLine, Reveal, StackCard } from "@/fx";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 text-xs font-medium tracking-[0.2em] text-mute uppercase">{children}</p>
);
const Em = ({ children }: { children: React.ReactNode }) => <em className="font-serif font-medium">{children}</em>;
const Pill = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm">{children}</li>
);

const logos = [...new Map(toolkit.flatMap((t) => t.tools).filter((t) => t.icon).map((t) => [t.name, t])).values()];

function LogoRow({ items, rev }: { items: typeof logos; rev?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul className={`${rev ? "marquee-rev" : "marquee"} flex w-max gap-3 py-2 group-hover:[animation-play-state:paused]`}>
        {[...items, ...items].map((t, i) => (
          <li key={i} className="flex items-center gap-2.5 rounded-full border border-lav bg-white px-5 py-3 whitespace-nowrap text-mute shadow-sm transition hover:-translate-y-0.5 hover:text-ink">
            {t.icon && <t.icon className="text-xl" />}<span className="text-sm font-medium">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <Effects />
      <Logo name={`${me.first} ${me.last}`} />
      <header className="fixed top-4 right-4 z-50 hidden items-center md:top-5 md:flex gap-1 rounded-full bg-white/85 p-1 text-sm shadow-[0_10px_30px_-12px_rgba(47,52,87,0.3)] backdrop-blur-md md:right-8">
        <nav className="hidden items-center md:flex">
          {["About", "Services", "Skills", "Experience", "Work", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="sweep rounded-full px-3 py-1.5 transition hover:text-ink-deep">{l}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="p-3">
          <div className="relative flex h-[calc(100svh-24px)] min-h-[560px] flex-col items-center justify-end overflow-hidden rounded-[2rem] bg-ink pb-8 text-center text-white md:items-start md:px-14 md:pb-14 md:text-left">
            <Image src="/hero-2.jpg" alt="" fill sizes="100vw" className="hidden scale-110 object-cover blur-2xl md:block" />
            <div className="absolute inset-x-0 top-0 bottom-[34%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:inset-y-0 md:right-0 md:left-auto md:aspect-[1448/900] md:max-w-full md:[mask-image:linear-gradient(to_right,transparent,black_22%)]">
              <Image src="/hero-2.jpg" alt="Eshwar Kadam" fill priority sizes="100vw" className="object-cover object-[45%_100%]" />
            </div>
                        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/85 via-ink/30 via-30% to-transparent to-50% md:block" />
            <div className="relative px-5 md:max-w-md md:px-0">
              <Reveal now delay={0.5}>
                <a data-ripple href="#work" className="group inline-flex items-center gap-3 rounded-full bg-sun py-1.5 pr-1.5 pl-5 font-medium text-ink-deep shadow-lg">
                  View my work
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-white transition group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-5 hidden max-w-sm text-white/85 sm:block">
                  Software Engineer building scalable products across mobile, web and cloud, from clean code to production on Google Cloud.
                </p>
              </Reveal>
              <h1 className="mt-4 text-[15vw] leading-[0.9] font-semibold md:text-[7rem]">
                <MaskLine delay={0.1}><Wave text={me.first} /></MaskLine>
                <MaskLine delay={0.2}><Wave text={me.last} /><span className="text-sun">.</span></MaskLine>
              </h1>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-2">
          <Reveal>
            <Eyebrow>About me</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Turning complexity<br />into <Em>clean software.</Em></h2>
            <div className="mt-10 flex items-center gap-5">
              <div className="relative size-32 overflow-hidden rounded-3xl bg-lav">
                <Image src="/headshot.jpg" alt="Eshwar Kadam" fill sizes="128px" className="object-cover" />
              </div>
              <div>
                <p className="text-lg font-medium">{me.first} {me.last}</p>
                <p className="text-mute">Software Engineer · Pune</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:pt-12">
            <p className="text-2xl leading-snug">I build complete software products, from the interface people use to the cloud it runs on.</p>
            <p className="mt-5 leading-relaxed text-mute">
              I work across the full stack: mobile and web front ends, Kotlin/Ktor APIs on PostgreSQL, deployments on Google Cloud and Firebase, and AI features built in where they help.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[["Experience", "2+", "years in software", "bg-lav"], ["Projects", "15+", "delivered end to end", "bg-butter"], ["Platforms", "3", "mobile, web & cloud", "bg-sage"]].map(([k, v, s, bg]) => (
                <div key={k} className={`rounded-3xl p-4 md:p-5 ${bg}`}>
                  <p className="text-xs">{k}</p>
                  <p className="my-1 font-display text-4xl">{v}</p>
                  <p className="text-xs text-mute">{s}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* STACK MARQUEE */}
        <section aria-label="Tech stack" className="py-10">
          <p className="mb-6 text-center text-xs font-medium tracking-[0.2em] text-mute uppercase">Tools I ship with</p>
          <div className="space-y-3">
            <LogoRow items={logos.slice(0, Math.ceil(logos.length / 2))} />
            <LogoRow items={logos.slice(Math.ceil(logos.length / 2))} rev />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <Eyebrow>What I do</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-7xl">Less boilerplate.<br />More <Em>shipping.</Em></h2>
            <p className="mx-auto mt-6 max-w-xl text-mute">From the first screen to the cloud it runs on, I take products all the way to production.</p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.1} className="group h-full">
                <article data-glow className="flex h-full flex-col rounded-[1.75rem] border border-lav bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(47,52,87,0.3)] md:p-9">
                  <div className="flex items-center justify-between">
                    <span className={`grid size-14 place-items-center rounded-2xl text-2xl ${s.bg}`}><s.icon /></span>
                    <span className="font-display text-5xl text-lav transition group-hover:text-sun">{s.n}</span>
                  </div>
                  <h3 className="mt-8 text-3xl font-medium">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{s.text}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {s.points.map((p) => <li key={p} className={`rounded-full px-3 py-1.5 text-sm ${s.bg}`}>{p}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TOOLKIT */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <Eyebrow>Toolkit</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Every layer.<br /><Em>One clean system.</Em></h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {toolkit.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.08} className={`flex min-h-72 flex-col rounded-[1.75rem] p-7 ${t.bg} md:col-span-2`}>
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

        {/* FLASHLIGHT BANNER */}
        <section className="px-3 py-10">
          <div data-flash className="relative grid h-64 place-items-center overflow-hidden rounded-[2rem] bg-[#1c2040] px-6 md:h-80">
            <p className="text-center font-display text-4xl leading-tight font-extrabold text-[#2c3160] md:text-7xl">Built for production.<br />Designed to scale.</p>
            <p aria-hidden className="flash-lit absolute inset-0 grid place-items-center bg-gradient-to-br from-sun to-[#fff3a8] px-6 text-center font-display text-4xl leading-tight font-extrabold text-ink-deep md:text-7xl">Built for production.<br />Designed to scale.</p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <Eyebrow>Career</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Where I&apos;ve<br /><Em>shipped.</Em></h2>
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
              <article className="group h-full rounded-[2rem] bg-white p-2 shadow-[0_20px_60px_-20px_rgba(47,52,87,0.3)]">
                <div className={`grid h-full overflow-hidden rounded-[1.6rem] md:grid-cols-2 ${p.bg}`}>
                  <div className="flex flex-col p-7 md:p-12">
                    <p className="text-xs tracking-[0.2em] text-mute uppercase">0{i + 1} · {p.kind}</p>
                    <h3 className="mt-auto text-4xl leading-tight font-medium md:text-6xl">{p.title}</h3>
                    <p className="mt-4 leading-relaxed text-mute">{p.desc}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <Pill key={t}>{t}</Pill>)}</ul>
                  </div>
                  <div className="relative hidden flex-col justify-center gap-6 border-l border-ink/10 p-10 md:flex">
                    <div className="overflow-hidden rounded-2xl bg-ink-deep shadow-[0_30px_60px_-25px_rgba(47,52,87,0.6)] transition duration-500 group-hover:-rotate-1">
                      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                        <span className="size-2.5 rounded-full bg-[#ff6b6b]" /><span className="size-2.5 rounded-full bg-sun" /><span className="size-2.5 rounded-full bg-green-400" />
                        <span className="ml-3 font-mono text-xs text-white/50">{p.file}</span>
                      </div>
                      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-white/85">
                        {p.code.map((l, j) => (
                          <div key={j}><span className="mr-4 inline-block w-4 text-right text-white/25 select-none">{j + 1}</span>{l}</div>
                        ))}
                      </pre>
                    </div>
                    <div className="flex justify-center gap-6 text-3xl text-ink/50">
                      {p.icons.map((Icon, j) => <Icon key={j} />)}
                    </div>
                  </div>
                </div>
              </article>
            </StackCard>
          ))}
        </section>

        {/* EDUCATION */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <Eyebrow>Education</Eyebrow>
            <h2 className="text-5xl leading-[1.05] font-medium md:text-6xl">Where the<br /><Em>foundations came from.</Em></h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <article data-glow className={`flex h-full flex-col rounded-[1.75rem] p-7 md:p-9 ${i ? "bg-sage" : "bg-lav"}`}>
                  <div className="flex items-center justify-between text-sm text-mute">
                    <span>{e.meta}</span>
                    <span className="rounded-full bg-white/80 px-3 py-1 font-medium text-ink">{e.score}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-medium">{e.title}</h3>
                  <p className="mt-2 text-mute">{e.where}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="p-3">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-white md:py-20">
            <DotGrid />
            <Reveal className="relative">
              <div className="relative mx-auto mb-5 size-20 md:size-24">
                <Image src="/contact.jpg" alt="Eshwar Kadam" fill sizes="96px" className="rounded-full object-cover ring-[3px] ring-sun" />
                <span className="absolute right-0.5 bottom-0.5 size-4 rounded-full border-[3px] border-ink bg-green-400" title="Available for work" />
              </div>
              <p className="mb-3 text-xs font-medium tracking-[0.2em] text-white/60 uppercase">Contact</p>
              <h2 className="text-4xl leading-[1.05] font-medium md:text-5xl">Have a project that<br /><Em>needs engineering?</Em></h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-white/70 md:text-base">I&apos;m open to software engineering roles and freelance projects across mobile, web and cloud. Tell me what you&apos;re building.</p>
            </Reveal>
            <Magnetic className="relative mx-auto mt-7 w-fit max-w-full">
              <a data-ripple href={`mailto:${me.email}`} className="group inline-flex max-w-full items-center gap-3 rounded-full bg-sun py-1.5 pr-1.5 pl-5 text-sm font-medium text-ink-deep sm:text-base">
                {me.email}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white transition group-hover:-rotate-45">→</span>
              </a>
            </Magnetic>
            <ul className="relative mt-6 flex flex-wrap justify-center gap-2 text-sm">
              {[["LinkedIn", me.linkedin], ["GitHub", me.github], [me.phone, `tel:${me.phone.replace(/\s/g, "")}`]].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-fill data-ripple className="block rounded-full border border-white/20 px-4 py-2 transition">{l} ↗</a>
                </li>
              ))}
            </ul>
          </div>
          <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-6 text-sm text-mute">
            <span>© {new Date().getFullYear()} {me.first} {me.last} · {me.location}</span>
            <a href="#top" className="sweep -mx-3 px-3 pb-1 hover:text-ink">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
