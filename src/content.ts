import type { IconType } from "react-icons";
import {
  SiAndroid, SiAndroidstudio, SiGooglecloud, SiGooglecloudstorage, SiGooglepubsub, SiAnthropic, SiHuggingface, SiModelcontextprotocol, SiTensorflow, SiAxios, SiDocker, SiFigma, SiFirebase, SiGit, SiGithub, SiGooglegemini, SiIntellijidea, SiNodedotjs, SiOpenjdk,
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
    n: "01", title: "Android apps", bg: "bg-lav", icon: SiAndroid,
    text: "Native Kotlin & Jetpack Compose apps that feel fast on every phone: offline-first, clean MVVM, Play Store ready.",
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
    points: ["Gemini API", "RAG", "On-device AI"],
  },
];

type Tool = { name: string; icon?: IconType };
export const toolkit: { title: string; note: string; bg: string; icon: IconType; tools: Tool[]; }[] = [
  {
    title: "Android", note: "Native apps that feel fast on cheap phones.", bg: "bg-lav", icon: SiAndroid,
    tools: [{ name: "Kotlin", icon: SiKotlin }, { name: "Java", icon: SiOpenjdk }, { name: "Jetpack Compose", icon: SiJetpackcompose }, { name: "XML layouts" }, { name: "MVVM" }, { name: "ViewModel & LiveData" }, { name: "Navigation" }, { name: "Room DB" }, { name: "Retrofit" }, { name: "ExoPlayer" }],
  },
  {
    title: "Backend", note: "APIs that generate, cache and serve content.", bg: "bg-butter", icon: SiKtor,
    tools: [{ name: "Ktor", icon: SiKtor }, { name: "Coroutines" }, { name: "PostgreSQL", icon: SiPostgresql }, { name: "SQL" }, { name: "REST APIs" }, { name: "Node.js", icon: SiNodedotjs }, { name: "Docker", icon: SiDocker }],
  },
  {
    title: "Web", note: "Dashboards and admin panels.", bg: "bg-sage", icon: SiReact,
    tools: [{ name: "React", icon: SiReact }, { name: "Material-UI", icon: SiMui }, { name: "Recharts" }, { name: "Vite", icon: SiVite }, { name: "Axios", icon: SiAxios }],
  },
  {
    title: "Cloud & AI", note: "Auth, push, LLMs, RAG and on-device AI.", bg: "bg-peach", icon: SiFirebase,
    tools: [{ name: "Firebase Auth", icon: SiFirebase }, { name: "Firestore" }, { name: "Cloud Messaging" }, { name: "Firebase Admin" }, { name: "Google Generative AI", icon: SiGooglegemini }, { name: "Gemini Nano" }, { name: "RAG & embeddings" }, { name: "LLM tool calling" }, { name: "MCP", icon: SiModelcontextprotocol }],
  },
  {
    title: "Google Cloud", note: "Deploy, scale and run services on GCP.", bg: "bg-lav", icon: SiGooglecloud,
    tools: [{ name: "Cloud Run", icon: SiGooglecloud }, { name: "Cloud Functions" }, { name: "Cloud SQL" }, { name: "Cloud Storage", icon: SiGooglecloudstorage }, { name: "Pub/Sub", icon: SiGooglepubsub }, { name: "Artifact Registry" }, { name: "Cloud Build" }, { name: "IAM" }],
  },
  {
    title: "Everyday tools", note: "Where the work actually happens.", bg: "bg-peri", icon: SiAndroidstudio,
    tools: [{ name: "Android Studio", icon: SiAndroidstudio }, { name: "IntelliJ IDEA", icon: SiIntellijidea }, { name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "Postman", icon: SiPostman }, { name: "Figma", icon: SiFigma }],
  },
];

export const jobs = [
  { role: "Software Engineer", where: "Anireysoft · Pune", when: "Sep 2024 - Present", current: true },
  { role: "Android Developer Intern", where: "Anireysoft · Pune", when: "Mar 2024 - Sep 2024" },
];

export const highlights = [
  { title: "End-to-end products", text: "Build Android apps, web dashboards and Kotlin/Ktor backends end to end, from first screen to production." },
  { title: "Scalable backends", text: "Design REST APIs with Ktor and PostgreSQL, with caching, auth and Dockerised deploys." },
  { title: "Real-time & multilingual", text: "Ship real-time data sync, push notifications and multi-language support." },
  { title: "Solid foundations", text: "Started as an intern shipping core Kotlin/XML screens with MVVM, Firebase Auth, Firestore and Retrofit." },
];

export const projects = [
  {
    kind: "On-device AI · Android",
    title: "Pocket AI Assistant",
    desc: "Offline-first Android assistant running Gemini Nano on the device: summarises notes, drafts replies and answers questions with no network and no data leaving the phone. Falls back to cloud Gemini for longer tasks.",
    tags: ["Kotlin", "Jetpack Compose", "Gemini Nano", "ML Kit GenAI", "Room DB", "Coroutines"],
    icons: [SiAndroid, SiGooglegemini, SiKotlin, SiTensorflow],
    bg: "bg-lav",
  },
  {
    kind: "RAG · Backend",
    title: "DocChat RAG API",
    desc: "Ktor service that lets you chat with your own PDFs and docs. Chunks and embeds files into PostgreSQL + pgvector, retrieves the right passages and streams grounded, cited answers over SSE.",
    tags: ["Kotlin", "Ktor", "PostgreSQL", "pgvector", "Embeddings", "Docker"],
    icons: [SiKtor, SiPostgresql, SiHuggingface, SiDocker],
    bg: "bg-butter",
  },
  {
    kind: "AI Agents · Full-stack",
    title: "Agentic Task Automator",
    desc: "LLM agent that plans and runs multi-step tasks through tool calling, with a Kotlin MCP server exposing app tools and a React dashboard to watch, approve and replay every step.",
    tags: ["Kotlin", "MCP", "Tool calling", "LLM APIs", "React", "Firebase"],
    icons: [SiModelcontextprotocol, SiAnthropic, SiReact, SiKotlin],
    bg: "bg-sage",
  },
];

export const education = [
  { title: "M.Sc. Computer Science", where: "Advanced algorithms, software engineering, mobile development", meta: "2023 - 2025", score: "CGPA 8.5" },
  { title: "B.Sc. Computer Science", where: "Padmashri Vikhe Patil College, Pravaranagar", meta: "2020 - 2023", score: "CGPA 8.2" },
];
