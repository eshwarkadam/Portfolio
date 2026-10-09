import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { education, jobs, me, projects, services, toolkit } from "@/content";
import { Experience, type V3Data } from "./experience";
import "./v3.css";

const display = Syne({ variable: "--v3-display", subsets: ["latin"] });
const sans = Manrope({ variable: "--v3-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (v3)",
  robots: { index: false }, // preview design; the main page stays canonical
};

const TOOLS_FOR: Record<string, string> = { "Mobile apps": "Mobile", "Backend & APIs": "Backend", "Google Cloud": "Cloud & DevOps", "AI features": "AI" };

// only plain serializable data crosses into the client component
const data: V3Data = {
  email: me.email,
  phone: me.phone,
  linkedin: me.linkedin,
  github: me.github,
  layers: services.map((s) => ({
    title: s.title,
    text: s.text,
    tools: (toolkit.find((t) => t.title === TOOLS_FOR[s.title])?.tools ?? []).map((x) => x.name).join(", "),
  })),
  projects: projects.map((p) => ({ title: p.title, desc: p.desc, tags: p.tags.join(", "), link: p.link, file: p.file, code: p.code.join("\n") })),
  jobs: jobs.map((j) => ({ role: j.role, where: j.where.replace(" · ", ", "), when: j.when.replace(" - ", " to ") })),
  education: education.map((e) => ({ title: e.title, where: e.where, meta: `${e.meta.replace(" - ", " to ")}, ${e.score}` })),
};

export default function V3() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <Experience d={data} />
    </div>
  );
}
