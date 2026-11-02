"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { education, highlights, jobs, me, projects, services, toolkit } from "@/content";

const STATS = [92, 85, 74, 66];
const STARTED = new Date(2024, 8); // first day in the industry (Sep 2024)
const NAV = [["stats", "STATS"], ["quests", "QUESTS"], ["levels", "LEVELS"], ["items", "ITEMS"], ["party", "PARTY"]] as const;

type Quest = (typeof projects)[number];

const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5 } };

function Title({ id, kicker, children }: { id: string; kicker: string; children: ReactNode }) {
  return (
    <motion.div {...reveal} id={id} className="scroll-mt-24">
      <p className="v4-px text-[10px] text-[var(--pink)]">{kicker}</p>
      <h2 className="v4-px mt-3 text-2xl text-[var(--gold)] md:text-4xl">{children}</h2>
    </motion.div>
  );
}

/** experience in months; a year of it is one level */
function useExp() {
  const [months, setMonths] = useState<number | null>(null);
  useEffect(() => {
    const n = new Date();
    // computed on the client so the static HTML never goes stale
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonths((n.getFullYear() - STARTED.getFullYear()) * 12 + n.getMonth() - STARTED.getMonth());
  }, []);
  return months;
}

export function Game() {
  const [started, setStarted] = useState(false);
  const [quest, setQuest] = useState<Quest | null>(null);
  const months = useExp();

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!started && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setStarted(true); }
      if (e.key === "Escape") setQuest(null);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [started]);

  useEffect(() => {
    document.documentElement.style.overflow = !started || quest ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [started, quest]);

  const level = months === null ? "-" : Math.max(1, Math.floor(months / 12));
  const xp = months === null ? 0 : ((months % 12) / 12) * 100;

  return (
    <div className="v4">
      <div className="v4-crt" aria-hidden />

      {/* title screen */}
      <AnimatePresence>
        {!started && (
          <motion.button
            type="button"
            onClick={() => setStarted(true)}
            exit={{ opacity: 0, scale: 1.15, filter: "brightness(3)", transition: { duration: 0.4 } }}
            className="v4-stars fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0716] px-6 text-center"
            aria-label="Press start"
          >
            <span className="v4-px text-[10px] text-[var(--cyan)] md:text-xs">EK GAMES PRESENTS</span>
            <span className="v4-px v4-glow mt-8 text-4xl leading-tight text-white md:text-7xl">
              ESHWAR
              <br />
              KADAM
            </span>
            <span className="v4-px mt-6 text-[10px] text-[var(--gold)] md:text-sm">THE SOFTWARE ENGINEER</span>
            <span className="v4-px v4-blink mt-16 text-sm text-white md:text-lg">▶ PRESS START</span>
            <span className="mt-4 text-xs text-white/60">click, tap or press Enter</span>
            <span className="v4-px absolute bottom-6 text-[8px] text-white/45">© 2026 EK GAMES · 1 PLAYER</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* HUD */}
      <header className="sticky top-0 z-40 border-b-4 border-black bg-[#140d29]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#stats" className="v4-px shrink-0 text-[10px] text-[var(--cyan)]">P1 ESHWAR</a>
          <div className="hidden items-center gap-2 sm:flex" title={months === null ? "" : `${months} months of experience`}>
            <span className="v4-px text-[9px] text-[var(--gold)]">LVL {level}</span>
            <span className="h-3 w-28 border-2 border-white/80 p-[1px]">
              <span className="block h-full bg-[var(--lime)]" style={{ width: `${xp}%` }} />
            </span>
          </div>
          <nav className="ml-auto flex gap-3 overflow-x-auto md:gap-6" aria-label="Sections">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="v4-px text-[9px] whitespace-nowrap text-white/80 hover:text-[var(--gold)] md:text-[10px]">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-32 px-4 py-16 md:py-24">
        {/* character */}
        <section className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <motion.div {...reveal} className="v4-box relative mx-auto aspect-square w-full max-w-sm overflow-hidden">
            <div className="v4-stars absolute inset-0 opacity-60" />
            <Image src="/portrait-pixel.png" alt="Pixel art of Eshwar Kadam" width={64} height={62} priority className="v4-pixelated absolute inset-x-[8%] bottom-0 w-[84%]" />
            <span className="v4-px absolute top-3 left-3 bg-[var(--pink)] px-2 py-1 text-[9px] text-white">PLAYER 1</span>
            <span className="v4-px v4-blink absolute top-3 right-3 text-[9px] text-[var(--lime)]">● READY</span>
          </motion.div>

          <div>
            <Title id="stats" kicker="CHARACTER SELECT">ESHWAR KADAM</Title>
            <motion.dl {...reveal} className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-white/60">CLASS</dt><dd>Software Engineer</dd>
              <dt className="text-white/60">BASE</dt><dd>{me.location}</dd>
              <dt className="text-white/60">EXP</dt><dd>{months === null ? "..." : `${months} months, level ${level}`}</dd>
              <dt className="text-white/60">STATUS</dt><dd className="text-[var(--lime)]">Open to work</dd>
            </motion.dl>

            <motion.div {...reveal} className="mt-8 space-y-4">
              {services.map((s, i) => (
                <div key={s.title}>
                  <div className="v4-px flex justify-between text-[9px] md:text-[10px]">
                    <span>{s.title.toUpperCase()}</span>
                    <span className="text-[var(--gold)]">{STATS[i]}</span>
                  </div>
                  <div className="mt-2 flex gap-1" aria-hidden>
                    {Array.from({ length: 10 }, (_, b) => (
                      <motion.span
                        key={b}
                        initial={{ opacity: 0.15 }}
                        whileInView={{ opacity: b < Math.round(STATS[i] / 10) ? 1 : 0.15 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + b * 0.06 }}
                        className="h-4 flex-1"
                        style={{ background: ["var(--cyan)", "var(--pink)", "var(--lime)", "var(--gold)"][i] }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* special moves */}
        <section>
          <Title id="moves" kicker="ABILITIES">SPECIAL MOVES</Title>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {highlights.map((h, i) => (
              <motion.div key={h.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="v4-box p-5">
                <p className="v4-px text-[10px] text-[var(--cyan)]">MOVE 0{i + 1}</p>
                <p className="mt-3 font-bold text-white">{h.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* projects */}
        <section>
          <Title id="quests" kicker="QUEST LOG">COMPLETED QUESTS</Title>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((p, i) => (
              <motion.button
                key={p.title}
                type="button"
                onClick={() => setQuest(p)}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="v4-box group flex flex-col p-5 text-left"
              >
                <span className="v4-px text-[9px] text-[var(--pink)]">QUEST 0{i + 1}</span>
                <span className="v4-px mt-4 text-sm leading-relaxed text-white">{p.title.toUpperCase()}</span>
                <span className="mt-2 text-xs text-white/60">{p.kind}</span>
                <span className="mt-5 text-xs text-white/50">LOOT</span>
                <span className="mt-1 text-xs text-[var(--cyan)]">{p.tags.slice(0, 4).join(" · ")}</span>
                <span className="v4-px mt-6 flex items-center justify-between text-[9px]">
                  <span className="text-[var(--lime)]">✓ COMPLETE</span>
                  <span className="text-[var(--gold)] group-hover:underline">VIEW ▶</span>
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* career map */}
        <section>
          <Title id="levels" kicker="WORLD MAP">LEVELS CLEARED</Title>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {[
              { world: "WORLD 1: EDUCATION", nodes: [...education].reverse().map((e) => ({ title: e.title, sub: e.where, when: `${e.meta.replace(" - ", " to ")}, ${e.score}`, here: false })) },
              { world: "WORLD 2: CAREER", nodes: [...jobs].reverse().map((j) => ({ title: j.role, sub: j.where.replace(" · ", ", "), when: j.when.replace(" - ", " to "), here: !!j.current })) },
            ].map((w, wi) => (
              <motion.div key={w.world} {...reveal} transition={{ duration: 0.5, delay: wi * 0.1 }}>
                <p className="v4-px text-[10px] text-[var(--cyan)]">{w.world}</p>
                <ol className="mt-6 ml-4 space-y-6 border-l-4 border-dashed border-white/25 pl-6">
                  {w.nodes.map((n, ni) => (
                    <li key={n.title} className="relative">
                      <span className={`v4-px absolute top-0 -left-[42px] grid h-8 w-8 place-items-center border-4 border-black text-[8px] ${n.here ? "bg-[var(--gold)] text-black" : "bg-[var(--lime)] text-black"}`}>
                        {wi + 1}-{ni + 1}
                      </span>
                      <p className="font-bold text-white">{n.title}</p>
                      <p className="mt-1 text-sm text-white/70">{n.sub}</p>
                      <p className="mt-1 text-xs text-white/50">{n.when}</p>
                      {n.here && <p className="v4-px v4-blink mt-2 text-[9px] text-[var(--gold)]">▲ YOU ARE HERE</p>}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section>
          <Title id="items" kicker="INVENTORY">ITEMS EQUIPPED</Title>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((t, i) => (
              <motion.div key={t.title} {...reveal} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="v4-box p-4">
                <p className="v4-px text-[10px] text-[var(--gold)]">{t.title.toUpperCase()}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {t.tools.map((x) => (
                    <div key={x.name} className="flex aspect-square flex-col items-center justify-center gap-1.5 border-2 border-white/20 bg-black/40 p-1 text-center transition hover:border-[var(--cyan)]">
                      {x.icon ? <x.icon className="text-2xl text-white" aria-hidden /> : <span className="v4-px text-xs text-white">{x.name.slice(0, 2).toUpperCase()}</span>}
                      <span className="text-[10px] leading-tight text-white/75">{x.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="party" className="scroll-mt-24 pb-10 text-center">
          <motion.div {...reveal}>
            <p className="v4-px text-[10px] text-[var(--pink)]">NEW CHALLENGER WANTED</p>
            <h2 className="v4-px v4-glow mt-6 text-3xl leading-tight text-white md:text-6xl">JOIN MY PARTY?</h2>
            <p className="mx-auto mt-6 max-w-md text-white/75">Hiring, or have a project that needs an engineer? Pick an option.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${me.email}`} className="v4-btn v4-px bg-[var(--gold)] px-5 py-4 text-[10px] text-black">▶ YES, EMAIL</a>
              <a href="/Eshwar-Kadam-Resume.pdf" target="_blank" rel="noreferrer" className="v4-btn v4-px px-5 py-4 text-[10px] text-[var(--cyan)]">RESUME</a>
              <a href={me.linkedin} target="_blank" rel="noreferrer" className="v4-btn v4-px px-5 py-4 text-[10px] text-[var(--pink)]">LINKEDIN</a>
              <a href={me.github} target="_blank" rel="noreferrer" className="v4-btn v4-px px-5 py-4 text-[10px] text-[var(--lime)]">GITHUB</a>
            </div>
            <p className="mt-8 text-sm text-white/60">{me.email} · {me.phone}</p>
            <p className="v4-px mt-24 text-[9px] text-white/40">THANKS FOR PLAYING</p>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>{quest && <QuestBox q={quest} close={() => setQuest(null)} />}</AnimatePresence>
    </div>
  );
}

/** RPG dialog box; the description types itself out, click to skip */
function QuestBox({ q, close }: { q: Quest; close: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= q.desc.length) return;
    const t = setTimeout(() => setN((x) => Math.min(q.desc.length, x + 3)), 16);
    return () => clearTimeout(t);
  }, [n, q.desc.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={q.title}
    >
      <motion.div
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => { e.stopPropagation(); setN(q.desc.length); }}
        className="v4-box max-h-[88svh] w-full max-w-3xl overflow-y-auto p-6 md:p-8"
      >
        <p className="v4-px text-[9px] text-[var(--pink)]">QUEST COMPLETE</p>
        <h3 className="v4-px mt-3 text-lg leading-relaxed text-[var(--gold)] md:text-2xl">{q.title.toUpperCase()}</h3>
        <p className="mt-4 min-h-[6rem] leading-relaxed text-white/90">
          {q.desc.slice(0, n)}
          {n < q.desc.length && <span className="v4-blink">▌</span>}
        </p>
        <p className="mt-5 text-xs text-white/50">LOOT</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {q.tags.map((t) => <span key={t} className="border-2 border-[var(--cyan)] px-2 py-1 text-xs text-[var(--cyan)]">{t}</span>)}
        </div>
        <div className="mt-5 border-2 border-white/20 bg-black/50">
          <p className="border-b-2 border-white/20 px-3 py-1.5 text-xs text-white/60">{q.file}</p>
          <pre className="overflow-x-auto p-3 text-[12px] leading-relaxed text-[var(--lime)]">{q.code.join("\n")}</pre>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={q.link} target="_blank" rel="noreferrer" className="v4-btn v4-px bg-[var(--gold)] px-4 py-3 text-[10px] text-black">▶ VIEW ON GITHUB</a>
          <button type="button" autoFocus onClick={close} className="v4-btn v4-px px-4 py-3 text-[10px] text-white">CLOSE (ESC)</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
