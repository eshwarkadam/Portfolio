import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { education, jobs, me, projects, services, toolkit } from "@/content";
import { Series, type SeriesData } from "@/series/series";
import "@/series/series.css";

const display = Bebas_Neue({ variable: "--sr-display", subsets: ["latin"], weight: "400" });
const sans = Manrope({ variable: "--sr-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (series)",
  robots: { index: false }, // preview design; the main page stays canonical
};

const TOOLS_FOR: Record<string, string> = { "Mobile apps": "Mobile", "Backend & APIs": "Backend", "Google Cloud": "Cloud & DevOps", "AI features": "AI" };
const PROGRESS = [92, 85, 74, 66];
const HUES = [355, 222, 278];

// only plain serializable data crosses into the client component
const data: SeriesData = {
  email: me.email,
  phone: me.phone,
  linkedin: me.linkedin,
  github: me.github,
  layers: services.map((s, i) => ({
    title: s.title,
    text: s.text,
    tools: (toolkit.find((t) => t.title === TOOLS_FOR[s.title])?.tools ?? []).slice(0, 4).map((x) => x.name).join(", "),
    progress: PROGRESS[i] ?? 60,
  })),
  projects: projects.map((p, i) => ({
    title: p.title,
    kind: p.kind.replace(" · ", ", "),
    desc: p.desc,
    tags: p.tags,
    link: p.link,
    file: p.file,
    code: p.code.join("\n"),
    hue: HUES[i % HUES.length],
  })),
  seasons: [
    {
      season: "SEASON 2",
      years: "2024 to now",
      episodes: jobs.map((j) => ({ title: j.role, where: j.where.replace(" · ", ", "), when: j.when.replace(" - ", " to ") })),
    },
    {
      season: "SEASON 1",
      years: "2020 to 2025",
      episodes: education.map((e) => ({ title: e.title, where: e.where, when: `${e.meta.replace(" - ", " to ")}, ${e.score}` })),
    },
  ],
  topSkills: ["Kotlin", "Jetpack Compose", "Ktor", "PostgreSQL", "React", "Next.js", "Google Cloud", "Firebase", "Docker", "Gemini API"],
};

export default function SeriesPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <Series d={data} />
    </div>
  );
}
