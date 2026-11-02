"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import {
  LuBriefcase, LuChevronLeft, LuChevronRight, LuCpu, LuExternalLink, LuFileText, LuFolderGit2, LuMail, LuMessageCircle, LuPhone, LuSend, LuUser,
} from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { education, highlights, jobs, me, projects, toolkit } from "@/content";

type AppId = "about" | "projects" | "work" | "skills" | "resume" | "messages";

const APPS: { id: AppId; name: string; icon: IconType; bg: string }[] = [
  { id: "about", name: "About", icon: LuUser, bg: "linear-gradient(140deg,#ffa25c,#ff4f7b)" },
  { id: "projects", name: "Projects", icon: LuFolderGit2, bg: "linear-gradient(140deg,#5b8cff,#7a4dff)" },
  { id: "work", name: "Experience", icon: LuBriefcase, bg: "linear-gradient(140deg,#2bd99f,#0f9d76)" },
  { id: "skills", name: "Skills", icon: LuCpu, bg: "linear-gradient(140deg,#ffd45a,#ff9f1a)" },
  { id: "resume", name: "Resume", icon: LuFileText, bg: "linear-gradient(140deg,#ff6b6b,#c9184a)" },
  { id: "messages", name: "Messages", icon: LuMessageCircle, bg: "linear-gradient(140deg,#5ef08a,#18b84a)" },
];

const LINKS: { name: string; icon: IconType; bg: string; href: string }[] = [
  { name: "GitHub", icon: SiGithub, bg: "linear-gradient(140deg,#3a3f47,#0d1117)", href: me.github },
  { name: "LinkedIn", icon: FaLinkedin, bg: "linear-gradient(140deg,#2a8cff,#0a66c2)", href: me.linkedin },
];

const PROJECT_BG = ["linear-gradient(140deg,#7a4dff,#ff4f7b)", "linear-gradient(140deg,#18c1a6,#5b8cff)", "linear-gradient(140deg,#ffa25c,#e0245e)"];

const MSGS = [
  "Hi! 👋 I'm Eshwar, a software engineer in Pune.",
  "I build Android apps, APIs and cloud backends, and add AI features to them.",
  "Hiring, or have a project in mind? Send me a message below.",
];

const ease = [0.2, 0.9, 0.3, 1] as const;

function Icon({ bg, icon: I, size = "h-14 w-14" }: { bg: string; icon: IconType; size?: string }) {
  return (
    <span className={`grid ${size} place-items-center rounded-[18px] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]`} style={{ background: bg }}>
      <I className="text-[26px]" />
    </span>
  );
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // the time only exists on the client, so it can't mismatch the server HTML
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  return {
    time: now?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) ?? "",
    date: now?.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }) ?? "",
  };
}

export function Phone() {
  const { time, date } = useClock();
  const [locked, setLocked] = useState(true);
  const [app, setApp] = useState<AppId | null>(null);
  const [project, setProject] = useState<number | null>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (project !== null) setProject(null);
      else setApp(null);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [project]);

  const open = (id: AppId) => { setProject(null); setApp(id); };
  const dark = !locked && !app; // status bar sits on the wallpaper

  return (
    <main className="v1 flex min-h-svh items-center justify-center gap-16 md:p-8">
      <section className="hidden max-w-md md:block">
        <p className="text-sm font-semibold tracking-wide text-[#9d9ab8]">eshwarkadam.com</p>
        <h1 className="mt-4 text-6xl leading-[0.95] font-extrabold tracking-tight lg:text-7xl">
          Eshwar
          <br />
          Kadam
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#c9c6e0]">
          Software Engineer. I build apps, so this portfolio runs on a phone. Unlock it and tap around.
        </p>
        <p className="mt-8 text-sm text-[#9d9ab8]">Tip: press Esc to go back home.</p>
      </section>

      <div className="relative h-svh w-full overflow-hidden bg-black md:aspect-[9/19.5] md:h-[min(860px,92svh)] md:w-auto md:rounded-[58px] md:border-[12px] md:border-[#1d1c22] md:shadow-[0_40px_120px_-20px_rgba(122,77,255,0.45),0_0_0_2px_#3a3842]">
        {/* status bar (desktop only; a real phone already shows its own) */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-50 hidden items-center justify-between px-8 pt-4 text-[15px] font-semibold md:flex ${locked || dark ? "text-white" : "text-black"}`}
        >
          <span>{locked ? "" : time}</span>
          <span className="h-8 w-28 rounded-full bg-black" />
          <span className="flex items-center gap-1.5 text-xs">5G <span className="inline-block h-3 w-6 rounded-[4px] border border-current p-[2px]"><span className="block h-full w-4/5 rounded-[2px] bg-current" /></span></span>
        </div>

        {/* home screen */}
        <div inert={locked || !!app} className="v1-wall absolute inset-0 flex flex-col px-5 pt-10 pb-5 md:pt-16">
          <div className="v1-glass flex items-center gap-4 rounded-[26px] p-4">
            <Image src="/profile.jpg" alt="" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-lg leading-tight font-bold">Eshwar Kadam</p>
              <p className="text-sm text-white/80">Software Engineer, Pune</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#7dffb0]">
                <span className="h-2 w-2 rounded-full bg-[#7dffb0]" /> Open to work
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-4 gap-x-2 gap-y-6">
            {APPS.map((a) => (
              <button key={a.id} type="button" onClick={() => open(a.id)} className="flex flex-col items-center gap-1.5 rounded-[18px] transition active:scale-90">
                <motion.span layoutId={`app-${a.id}`} className="rounded-[18px]">
                  <Icon bg={a.bg} icon={a.icon} />
                </motion.span>
                <span className="text-xs font-medium text-white drop-shadow">{a.name}</span>
              </button>
            ))}
            {LINKS.map((l) => (
              <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-[18px] transition active:scale-90">
                <Icon bg={l.bg} icon={l.icon} />
                <span className="text-xs font-medium text-white drop-shadow">{l.name}</span>
              </a>
            ))}
          </div>

          <div className="v1-glass mt-7 rounded-[26px] p-4">
            <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">Latest build</p>
            <button type="button" onClick={() => { setApp("projects"); setProject(0); }} className="mt-2 flex w-full items-center gap-3 rounded-xl text-left">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold" style={{ background: PROJECT_BG[0] }}>AI</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{projects[0].title}</span>
                <span className="block truncate text-sm text-white/75">{projects[0].kind}</span>
              </span>
              <LuChevronRight className="text-white/70" />
            </button>
          </div>

          <div className="v1-glass mt-auto flex justify-around rounded-[30px] p-3">
            <a href={`tel:${me.phone.replace(/\s/g, "")}`} aria-label="Call" className="rounded-[18px]"><Icon bg="linear-gradient(140deg,#5ef08a,#18b84a)" icon={LuPhone} /></a>
            <button type="button" onClick={() => open("messages")} aria-label="Messages" className="rounded-[18px]"><Icon bg="linear-gradient(140deg,#5ef08a,#18b84a)" icon={LuMessageCircle} /></button>
            <a href={`mailto:${me.email}`} aria-label="Email" className="rounded-[18px]"><Icon bg="linear-gradient(140deg,#4fc3ff,#1a73e8)" icon={LuMail} /></a>
            <button type="button" onClick={() => open("resume")} aria-label="Resume" className="rounded-[18px]"><Icon bg={APPS[4].bg} icon={LuFileText} /></button>
          </div>
        </div>

        {/* open app grows out of its icon */}
        <AnimatePresence>
          {app && (
            <motion.div
              key={app}
              layoutId={`app-${app}`}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 z-40 overflow-hidden rounded-none bg-[#f4f4f8] text-[#111]"
              role="dialog"
              aria-label={APPS.find((a) => a.id === app)?.name}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex h-full flex-col">
                <AppScreen id={app} project={project} setProject={setProject} close={() => setApp(null)} />
                <button type="button" aria-label="Go home" onClick={() => setApp(null)} className="mx-auto mb-2 flex h-6 w-40 shrink-0 items-center justify-center">
                  <span className="h-[5px] w-32 rounded-full bg-black/80" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* lock screen */}
        <AnimatePresence>
          {locked && (
            <motion.button
              type="button"
              onClick={() => setLocked(false)}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.7, bottom: 0 }}
              onDragEnd={(_, i) => { if (i.offset.y < -60) setLocked(false); }}
              exit={{ y: "-100%", transition: { duration: 0.5, ease } }}
              className="absolute inset-0 z-[45] flex flex-col items-center overflow-hidden rounded-none text-white"
              aria-label="Unlock the phone"
            >
              <Image src="/profile.jpg" alt="" fill priority sizes="(min-width: 768px) 420px, 100vw" className="object-cover object-[50%_20%]" />
              <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70" />
              <span className="relative mt-20 text-sm font-semibold text-white/85 md:mt-24">{date}</span>
              <span className="relative text-[88px] leading-none font-bold tracking-tight">{time || " "}</span>
              <span className="v1-glass relative mt-auto mb-8 w-[86%] rounded-[22px] p-4 text-left">
                <span className="flex items-center gap-2 text-xs text-white/80">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-[#18b84a]"><LuMessageCircle className="text-[11px]" /></span>
                  MESSAGES <span className="ml-auto">now</span>
                </span>
                <span className="mt-2 block text-sm font-bold">Eshwar Kadam</span>
                <span className="block text-sm">Software engineer, open to work. Unlock to see my portfolio.</span>
              </span>
              <span className="relative mb-3 text-sm font-medium text-white/85">Tap or swipe up to unlock</span>
              <span className="relative mb-3 h-[5px] w-32 rounded-full bg-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Header({ title, back, onBack }: { title: string; back: string; onBack: () => void }) {
  return (
    <div className="shrink-0 px-5 pt-6 md:pt-14">
      <button type="button" onClick={onBack} className="-ml-1 flex items-center rounded-lg text-[17px] text-[#0a66ff]">
        <LuChevronLeft className="text-2xl" /> {back}
      </button>
      <h2 className="mt-2 text-[32px] leading-tight font-extrabold tracking-tight">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${className}`}>{children}</div>;
}

const Label = ({ children }: { children: ReactNode }) => <p className="mt-6 mb-2 px-1 text-xs font-semibold tracking-wide text-[#6b6b76] uppercase">{children}</p>;

function AppScreen({ id, project, setProject, close }: { id: AppId; project: number | null; setProject: (i: number | null) => void; close: () => void }) {
  const name = APPS.find((a) => a.id === id)!.name;
  const body = "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6";

  if (id === "projects" && project !== null) {
    const p = projects[project];
    return (
      <motion.div key={p.title} initial={{ x: "30%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease }} className="flex min-h-0 flex-1 flex-col">
        <Header title={p.title} back="Projects" onBack={() => setProject(null)} />
        <div className={body}>
          <p className="text-sm font-semibold text-[#6b6b76]">{p.kind}</p>
          <p className="mt-3 leading-relaxed text-[#2a2a33]">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">{t}</span>)}
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl bg-[#14141c] text-[#e6e6f0]">
            <p className="border-b border-white/10 px-4 py-2 font-mono text-xs text-white/60">{p.file}</p>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">{p.code.join("\n")}</pre>
          </div>
          <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#0a66ff] py-3.5 font-semibold text-white">
            <SiGithub /> View on GitHub
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Header title={name} back="Home" onBack={close} />
      <div className={body}>
        {id === "about" && (
          <>
            <Card className="mt-3 flex items-center gap-4">
              <Image src="/profile.jpg" alt="Eshwar Kadam" width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
              <div>
                <p className="text-xl font-bold">Eshwar Kadam</p>
                <p className="text-sm text-[#6b6b76]">Software Engineer, {me.location}</p>
              </div>
            </Card>
            <p className="mt-4 px-1 leading-relaxed text-[#2a2a33]">
              I build Android apps, REST APIs and cloud backends end to end, and add AI features that run in production.
            </p>
            <Label>What I do</Label>
            <div className="space-y-2">
              {highlights.map((h) => (
                <Card key={h.title}>
                  <p className="font-semibold">{h.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a4a55]">{h.text}</p>
                </Card>
              ))}
            </div>
          </>
        )}

        {id === "projects" && (
          <div className="mt-3 overflow-hidden rounded-2xl bg-white">
            {projects.map((p, i) => (
              <button key={p.title} type="button" onClick={() => setProject(i)} className="flex w-full items-center gap-3 border-b border-black/5 p-3 text-left last:border-0">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold text-white" style={{ background: PROJECT_BG[i % PROJECT_BG.length] }}>
                  {p.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.title}</span>
                  <span className="block truncate text-sm text-[#6b6b76]">{p.kind}</span>
                </span>
                <LuChevronRight className="text-[#b0b0bb]" />
              </button>
            ))}
          </div>
        )}

        {id === "work" && (
          <>
            <Label>Work</Label>
            <div className="space-y-2">
              {jobs.map((j) => (
                <Card key={j.role}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{j.role}</p>
                    {j.current && <span className="shrink-0 rounded-full bg-[#e3f9ea] px-2 py-0.5 text-[11px] font-semibold text-[#137a34]">Now</span>}
                  </div>
                  <p className="mt-1 text-sm text-[#4a4a55]">{j.where.replace(" · ", ", ")}</p>
                  <p className="mt-1 text-sm text-[#6b6b76]">{j.when.replace(" - ", " to ")}</p>
                </Card>
              ))}
            </div>
            <Label>Education</Label>
            <div className="space-y-2">
              {education.map((e) => (
                <Card key={e.title}>
                  <p className="font-semibold">{e.title}</p>
                  <p className="mt-1 text-sm text-[#4a4a55]">{e.where}</p>
                  <p className="mt-1 text-sm text-[#6b6b76]">{e.meta.replace(" - ", " to ")}, {e.score}</p>
                </Card>
              ))}
            </div>
          </>
        )}

        {id === "skills" &&
          toolkit.map((t) => (
            <div key={t.title}>
              <Label>{t.title}</Label>
              <Card>
                <p className="text-sm text-[#4a4a55]">{t.note}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.tools.map((x) => (
                    <span key={x.name} className="flex items-center gap-1.5 rounded-full bg-[#f0f0f5] px-3 py-1.5 text-xs font-semibold">
                      {x.icon && <x.icon className="text-[13px]" />} {x.name}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          ))}

        {id === "resume" && (
          <>
            <a href="/Eshwar-Kadam-Resume.pdf" target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#0a66ff] py-3 font-semibold text-white">
              <LuExternalLink /> Open full PDF
            </a>
            <iframe src="/Eshwar-Kadam-Resume.pdf#view=FitH" title="Eshwar Kadam resume" className="mt-3 h-[70vh] w-full rounded-2xl bg-white md:h-[520px]" />
          </>
        )}

        {id === "messages" && <Messages />}
      </div>
    </div>
  );
}

function Messages() {
  const [shown, setShown] = useState(0);
  const [text, setText] = useState("");

  // messages arrive one by one, like someone typing
  useEffect(() => {
    if (shown >= MSGS.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : 1100);
    return () => clearTimeout(t);
  }, [shown]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    location.href = `mailto:${me.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="mt-3 flex flex-col items-center">
        <Image src="/profile.jpg" alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
        <p className="mt-1 text-sm font-semibold">Eshwar</p>
      </div>
      <div className="mt-4 flex flex-col gap-2" aria-live="polite">
        {MSGS.slice(0, shown).map((m) => (
          <motion.p key={m} initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-w-[82%] self-start rounded-[20px] rounded-bl-md bg-[#e5e5ea] px-4 py-2.5 text-[15px] leading-snug">
            {m}
          </motion.p>
        ))}
        {shown < MSGS.length && (
          <p className="v1-typing flex gap-1 self-start rounded-[20px] bg-[#e5e5ea] px-4 py-3.5" aria-label="Eshwar is typing">
            <span className="h-2 w-2 rounded-full bg-[#8e8e93]" /><span className="h-2 w-2 rounded-full bg-[#8e8e93]" /><span className="h-2 w-2 rounded-full bg-[#8e8e93]" />
          </p>
        )}
      </div>
      {shown >= MSGS.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`mailto:${me.email}`} className="rounded-full border border-[#0a66ff] px-3 py-1.5 text-sm font-semibold text-[#0a66ff]">Email</a>
          <a href={`tel:${me.phone.replace(/\s/g, "")}`} className="rounded-full border border-[#0a66ff] px-3 py-1.5 text-sm font-semibold text-[#0a66ff]">Call</a>
          <a href={me.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-[#0a66ff] px-3 py-1.5 text-sm font-semibold text-[#0a66ff]">LinkedIn</a>
        </div>
      )}
      <form onSubmit={send} className="sticky bottom-0 mt-auto flex items-center gap-2 bg-[#f4f4f8] pt-4">
        <label htmlFor="v1-msg" className="sr-only">Message</label>
        <input
          id="v1-msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-[#0a66ff]"
        />
        <button type="submit" aria-label="Send by email" disabled={!text.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a66ff] text-white disabled:opacity-40">
          <LuSend />
        </button>
      </form>
    </div>
  );
}
