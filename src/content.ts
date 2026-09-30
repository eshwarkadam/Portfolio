import type { IconType } from "react-icons";
import {
  SiAndroid, SiAndroidstudio, SiCloudflare, SiFastapi, SiNextdotjs, SiPython, SiSqlite, SiTailwindcss, SiGooglecloud, SiGooglecloudstorage, SiGooglepubsub, SiClaude, SiAxios, SiDocker, SiFigma, SiFirebase, SiGit, SiGithub, SiGooglegemini, SiJavascript, SiIntellijidea, SiNodedotjs, SiOpenjdk,
  SiJetpackcompose, SiKotlin, SiKtor, SiMui, SiPostgresql, SiPostman, SiReact, SiVite,
} from "react-icons/si";

export const me = {
  first: "Eshwar",
  last: "Kadam",
  email: "eshwarkadam20861@gmail.com",
  phone: "+91 7719897892",
  linkedin: "https://www.linkedin.com/in/eshwar-kadam-496b5b236",
  github: "https://github.com/eshwarkadam",
  location: "Pune, India",
};

export const services = [
  {
    n: "01", title: "Mobile apps", bg: "bg-lav", icon: SiAndroid,
    text: "Native Kotlin & Jetpack Compose apps: fast, offline-first, clean architecture and store-ready.",
    points: ["Kotlin & Compose", "Offline-first", "Play Store release"],
  },
  {
    n: "02", title: "Backend & APIs", bg: "bg-butter", icon: SiKtor,
    text: "Ktor REST APIs on PostgreSQL with auth, caching and clean docs, built to be easy for mobile and web to consume.",
    points: ["Ktor & Coroutines", "PostgreSQL", "Auth & caching"],
  },
  {
    n: "03", title: "Google Cloud", bg: "bg-sage", icon: SiGooglecloud,
    text: "Deploy and run services on GCP: containers on Cloud Run, managed databases, storage, and CI/CD that ships on every push.",
    points: ["Cloud Run", "Cloud SQL & Storage", "CI/CD"],
  },
  {
    n: "04", title: "AI features", bg: "bg-peach", icon: SiGooglegemini,
    text: "Add Gemini-powered features to apps: smart assistants, summaries and chat grounded in your own data.",
    points: ["Gemini & Claude APIs", "RAG", "LLM routing"],
  },
];

type Tool = { name: string; icon?: IconType };
export const toolkit: { title: string; note: string; bg: string; icon: IconType; tools: Tool[] }[] = [
  {
    title: "Mobile", note: "Native Android apps with clean, testable architecture.", bg: "bg-lav", icon: SiAndroid,
    tools: [{ name: "Kotlin", icon: SiKotlin }, { name: "Java", icon: SiOpenjdk }, { name: "Jetpack Compose", icon: SiJetpackcompose }, { name: "MVVM" }, { name: "Room DB" }, { name: "Retrofit" }],
  },
  {
    title: "Backend", note: "Fast, secure REST APIs and data layers.", bg: "bg-butter", icon: SiKtor,
    tools: [{ name: "Ktor", icon: SiKtor }, { name: "Coroutines" }, { name: "Node.js", icon: SiNodedotjs }, { name: "REST APIs" }, { name: "PostgreSQL", icon: SiPostgresql }, { name: "SQL" }],
  },
  {
    title: "Web", note: "Responsive dashboards and admin panels.", bg: "bg-sage", icon: SiReact,
    tools: [{ name: "React", icon: SiReact }, { name: "JavaScript", icon: SiJavascript }, { name: "Material-UI", icon: SiMui }, { name: "Vite", icon: SiVite }, { name: "Axios", icon: SiAxios }, { name: "Recharts" }],
  },
  {
    title: "Cloud & DevOps", note: "Deploy, scale and monitor in production.", bg: "bg-peach", icon: SiGooglecloud,
    tools: [{ name: "Cloud Run", icon: SiGooglecloud }, { name: "Cloud SQL" }, { name: "Cloud Storage", icon: SiGooglecloudstorage }, { name: "Pub/Sub", icon: SiGooglepubsub }, { name: "Firebase", icon: SiFirebase }, { name: "Docker", icon: SiDocker }],
  },
  {
    title: "AI", note: "Practical AI features inside real products.", bg: "bg-peri", icon: SiGooglegemini,
    tools: [{ name: "Gemini API", icon: SiGooglegemini }, { name: "Google Generative AI" }, { name: "Prompt design" }, { name: "Claude API", icon: SiClaude }, { name: "RAG" }, { name: "Embeddings" }],
  },
  {
    title: "Workflow", note: "Tools for building, testing and shipping.", bg: "bg-lav", icon: SiGit,
    tools: [{ name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "Android Studio", icon: SiAndroidstudio }, { name: "IntelliJ IDEA", icon: SiIntellijidea }, { name: "Postman", icon: SiPostman }, { name: "Figma", icon: SiFigma }],
  },
];

export const jobs = [
  { role: "Software Engineer", where: "VKS Infotech Pvt. Ltd. (Anireysoft) · Pune", when: "Sep 2024 - Present", current: true },
  { role: "Android Developer Intern", where: "VKS Infotech Pvt. Ltd. (Anireysoft) · Pune", when: "Mar 2024 - Sep 2024" },
];

export const highlights = [
  { title: "End-to-end products", text: "Build mobile apps, web dashboards and cloud backends end to end, from first commit to production." },
  { title: "Scalable backends", text: "Design REST APIs with Ktor and PostgreSQL, with caching, auth and Dockerised deploys." },
  { title: "Real-time & multilingual", text: "Ship real-time data sync, push notifications and multi-language support." },
  { title: "Cloud-ready delivery", text: "Deploy and run services on Google Cloud and Firebase, with CI/CD that ships on every push." },
];

export const projects = [
  {
    kind: "AI Backend · Kotlin",
    title: "Kotlin AI Router",
    desc: "Ktor service that puts one interface in front of several LLM vendors (Gemini, Claude). Each purpose gets its own model and failover chain, with retries on transient errors and per-call token and cost telemetry.",
    tags: ["Kotlin", "Ktor", "Coroutines", "Gemini API", "Claude API", "Docker"],
    icons: [SiKotlin, SiKtor, SiGooglegemini, SiDocker],
    bg: "bg-lav",
    link: "https://github.com/eshwarkadam/kotlin-ai-router",
    file: "Router.kt",
    code: ["suspend fun complete(purpose: String, prompt: String)", "  : Completion {", "  for (step in chain(purpose)) {", "    val p = providers[step.provider] ?: continue", "    runCatching { return p.complete(prompt, step.model) }", "  }", "  error(\"all providers failed\")", "}"],
  },
  {
    kind: "RAG · Python",
    title: "RAG Starter",
    desc: "Ask questions about your own PDFs and get answers with citations to the document and page. Boundary-aware chunking with overlap, Gemini embeddings, SQLite vector search and grounded answers served by FastAPI.",
    tags: ["Python", "FastAPI", "Gemini Embeddings", "SQLite", "RAG", "Docker"],
    icons: [SiPython, SiFastapi, SiSqlite, SiGooglegemini],
    bg: "bg-butter",
    link: "https://github.com/eshwarkadam/rag-starter",
    file: "rag.py",
    code: ["async def ask(self, question: str) -> Answer:", "    vec = self._embedder.embed(question)", "    hits = self._store.search(vec, k=5)", "    text = await self._generate(question, hits)", "    return Answer(text, hits, grounded=bool(hits))"],
  },
  {
    kind: "Web · Frontend",
    title: "Portfolio Website",
    desc: "This site: a Next.js and Tailwind CSS portfolio with scroll and mouse-driven animations, statically exported and deployed on Cloudflare with automatic deploys from GitHub.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Cloudflare"],
    icons: [SiNextdotjs, SiReact, SiTailwindcss, SiCloudflare],
    bg: "bg-sage",
    link: "https://github.com/eshwarkadam/Portfolio",
    file: "page.tsx",
    code: ["<Reveal>", "  <h2>Turning complexity", "    into <Em>clean software.</Em>", "  </h2>", "</Reveal>"],
  },
];


export const education = [
  { title: "M.Sc. Computer Science", where: "Advanced algorithms, software engineering, mobile development", meta: "2023 - 2025", score: "CGPA 8.5" },
  { title: "B.Sc. Computer Science", where: "Padmashri Vikhe Patil College, Pravaranagar", meta: "2020 - 2023", score: "CGPA 8.2" },
];
