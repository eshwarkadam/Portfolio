"use client";

import { useEffect, useRef, useState } from "react";

type Line = { kind: "cmd" | "out"; text: string };

const commands: Record<string, string> = {
  help: "Commands: whoami · skills · projects · experience · education · contact · hire · clear",
  whoami: "Eshwar Kadam, Software Engineer in Pune, India.\nI build mobile, web and cloud products end to end.",
  skills:
    "Mobile   → Kotlin, Jetpack Compose, MVVM, Room\nBackend  → Ktor, FastAPI, Node.js, PostgreSQL, REST\nWeb      → React, Next.js, Tailwind CSS\nCloud    → Google Cloud Run, Firebase, Docker\nAI       → Gemini API, Claude API, RAG",
  projects:
    "▸ kotlin-ai-router   one API in front of several LLM vendors\n▸ rag-starter        chat with your PDFs, with citations\n▸ portfolio          the site you're on right now",
  experience:
    "Software Engineer         VKS Infotech (Anireysoft)   Sep 2024 – now\nAndroid Developer Intern  VKS Infotech (Anireysoft)   Mar – Sep 2024",
  education: "M.Sc. Computer Science   2023 – 2025   CGPA 8.5\nB.Sc. Computer Science   2020 – 2023   CGPA 8.2",
  contact: "Email    eshwarkadam20861@gmail.com\nLinkedIn linkedin.com/in/eshwar-kadam-496b5b236\nGitHub   github.com/eshwarkadam",
  hire: "✓ Great choice. Taking you to the contact form…",
  sudo: "Nice try. Root access is granted after the interview 😄",
  ls: "about/  skills/  projects/  experience/  contact/",
};

const chips = ["whoami", "skills", "projects", "experience", "hire", "help"];

/** Fake terminal: type a command or tap a chip; answers type out. `hire` scrolls to the contact form. */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: "Welcome! Type 'help' or tap a command below." }]);
  const [typing, setTyping] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const queue = useRef<string | null>(null);
  const out = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  // type out the pending answer one character at a time
  useEffect(() => {
    const text = queue.current;
    if (text === null) return;
    if (typing.length >= text.length) {
      queue.current = null;
      setLines((l) => [...l, { kind: "out", text }]);
      setTyping("");
      return;
    }
    const t = setTimeout(() => setTyping(text.slice(0, typing.length + 2)), 10);
    return () => clearTimeout(t);
  }, [typing, lines]);

  useEffect(() => {
    out.current?.scrollTo({ top: out.current.scrollHeight });
  }, [lines, typing]);

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase();
    if (!c || queue.current !== null) return;
    setHistory((h) => [c, ...h].slice(0, 20));
    setHIdx(-1);
    if (c === "clear") {
      setLines([]);
      return;
    }
    const answer = commands[c] ?? `command not found: ${c}. Try 'help'.`;
    setLines((l) => [...l, { kind: "cmd", text: c }]);
    queue.current = answer;
    setTyping(answer.slice(0, 1));
    if (c === "hire") setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 900);
  };

  return (
    <div className="rounded-[2rem] bg-[#1c2040] p-5 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1 pb-5">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Interactive · for the curious</p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">
            Ask my <span className="text-sun">terminal.</span>
          </h3>
        </div>
        <p className="text-sm text-white/50">Try <code className="text-sun">hire</code> 😉</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1226]" onClick={() => field.current?.focus()}>
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff6b6b]" />
          <span className="size-3 rounded-full bg-sun" />
          <span className="size-3 rounded-full bg-green-400" />
          <span className="ml-3 font-mono text-xs text-white/40">eshwar@portfolio: ~</span>
        </div>
        <div ref={out} aria-live="polite" className="h-64 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-6 whitespace-pre-wrap text-[#d6d9ff] md:text-sm">
          {lines.map((l, i) =>
            l.kind === "cmd" ? (
              <div key={i}><span className="text-sun">➜</span> {l.text}</div>
            ) : (
              <div key={i}>{l.text}</div>
            ),
          )}
          {typing && <div>{typing}<span className="animate-pulse text-sun">▋</span></div>}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
          className="flex items-center gap-2 px-5 pb-4 font-mono text-sm"
        >
          <span className="text-sun">➜</span>
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const n = Math.min(hIdx + 1, history.length - 1);
                setHIdx(n);
                setInput(history[n]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hIdx - 1;
                setHIdx(Math.max(n, -1));
                setInput(n >= 0 ? history[n] : "");
              }
            }}
            aria-label="Terminal command"
            placeholder="type a command…"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-white caret-sun outline-none placeholder:text-white/30"
          />
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[13px] transition ${
              c === "hire" ? "border-sun/60 text-sun hover:bg-sun hover:text-ink-deep" : "border-white/15 bg-white/5 text-white hover:border-sun hover:text-sun"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
