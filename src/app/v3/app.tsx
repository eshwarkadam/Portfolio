"use client";

import { useEffect, useState } from "react";
import { Experience, type Mode, type V3Data } from "./experience";

const KEY = "v3-mode";

const OPTIONS: { mode: Mode; title: string; text: string }[] = [
  { mode: "recruiter", title: "Recruiter", text: "Experience, skills and resume first." },
  { mode: "developer", title: "Developer", text: "Code and projects first." },
];

/** Asks the visitor who they are, then mounts the experience with sections in that order. */
export function V3App({ d }: { d: V3Data }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    // reading storage after mount avoids a server/client mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "recruiter" || saved === "developer") setMode(saved);
    setChecked(true);
  }, []);

  const choose = (m: Mode) => {
    try { localStorage.setItem(KEY, m); } catch {}
    setMode(m);
  };

  if (!checked) return <div className="v3 min-h-svh" />;

  if (!mode)
    return (
      <div className="v3 grid min-h-svh place-items-center px-6">
        <div className="w-full max-w-4xl">
          <p className="v3-pick text-[var(--aqua)]" style={{ animationDelay: "0.1s" }}>eshwarkadam.com</p>
          <h1 className="v3-pick v3-display mt-4 text-5xl leading-[0.95] font-extrabold md:text-8xl" style={{ animationDelay: "0.2s" }}>
            Who&apos;s this build for?
          </h1>
          <p className="v3-pick mt-6 max-w-lg text-[var(--pearl)]/75" style={{ animationDelay: "0.3s" }}>
            Pick one and the page arranges itself for you. You can switch any time.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {OPTIONS.map((o, i) => (
              <button
                key={o.mode}
                type="button"
                onClick={() => choose(o.mode)}
                className="v3-pick group rounded-[28px] border border-white/15 bg-white/[0.04] p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--aqua)] hover:bg-[var(--aqua)] hover:text-[var(--plum)] md:p-10"
                style={{ animationDelay: `${0.45 + i * 0.12}s` }}
              >
                <span className="v3-display block text-4xl font-extrabold md:text-5xl">{o.title}</span>
                <span className="mt-3 block opacity-75">{o.text}</span>
                <span className="mt-8 block text-sm font-bold">Build this view</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <Experience
      key={mode}
      d={d}
      mode={mode}
      skipIntro={switched}
      onSwitch={() => { setSwitched(true); choose(mode === "recruiter" ? "developer" : "recruiter"); }}
    />
  );
}
