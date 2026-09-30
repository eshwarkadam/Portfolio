import type { IconType } from "react-icons";
import {
  SiAndroid, SiAndroidstudio, SiAxios, SiDocker, SiFigma, SiFirebase, SiGit, SiGithub, SiGooglegemini, SiIntellijidea, SiNodedotjs, SiOpenjdk,
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

export const ribbon = [
  "Kotlin", "Jetpack Compose", "Ktor", "PostgreSQL", "Firebase", "React", "Coroutines", "MVVM", "Docker",
];
export const ribbon2 = [
  "Android", "Clean architecture", "REST APIs", "Real-time sync", "Ed-tech", "Offline-first", "Bilingual UI",
];

export const chips = [
  { text: "Ship native apps in", bold: "Kotlin & Compose", bg: "bg-lav" },
  { text: "Generate questions with", bold: "78+ algorithms", bg: "bg-sage" },
  { text: "Keep data in", bold: "real-time sync", bg: "bg-butter" },
  { text: "Speak to students in", bold: "English & मराठी", bg: "bg-peach" },
];

type Tool = { name: string; icon?: IconType };
export const toolkit: { title: string; note: string; bg: string; icon: IconType; tools: Tool[]; wide?: boolean }[] = [
  {
    title: "Android", note: "Native apps that feel fast on cheap phones.", bg: "bg-lav", icon: SiAndroid,
    tools: [{ name: "Kotlin", icon: SiKotlin }, { name: "Java", icon: SiOpenjdk }, { name: "Jetpack Compose", icon: SiJetpackcompose }, { name: "XML layouts" }, { name: "MVVM" }, { name: "ViewModel & LiveData" }, { name: "Navigation" }, { name: "Room DB" }, { name: "Retrofit" }, { name: "ExoPlayer" }],
  },
  {
    title: "Backend", note: "APIs that generate, cache and serve content.", bg: "bg-butter", icon: SiKtor,
    tools: [{ name: "Ktor", icon: SiKtor }, { name: "Coroutines" }, { name: "PostgreSQL", icon: SiPostgresql }, { name: "SQL" }, { name: "REST APIs" }, { name: "Node.js", icon: SiNodedotjs }, { name: "Docker", icon: SiDocker }],
  },
  {
    title: "Web", note: "Dashboards for students and admins.", bg: "bg-sage", icon: SiReact,
    tools: [{ name: "React", icon: SiReact }, { name: "Material-UI", icon: SiMui }, { name: "Recharts" }, { name: "Vite", icon: SiVite }, { name: "Axios", icon: SiAxios }],
  },
  {
    title: "Cloud & AI", note: "Auth, storage, push and AI tutoring.", bg: "bg-peach", icon: SiFirebase, wide: true,
    tools: [{ name: "Firebase Auth", icon: SiFirebase }, { name: "Firestore" }, { name: "Cloud Messaging" }, { name: "Firebase Admin" }, { name: "Google Generative AI", icon: SiGooglegemini }],
  },
  {
    title: "Everyday tools", note: "Where the work actually happens.", bg: "bg-peri", icon: SiAndroidstudio, wide: true,
    tools: [{ name: "Android Studio", icon: SiAndroidstudio }, { name: "IntelliJ IDEA", icon: SiIntellijidea }, { name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "Postman", icon: SiPostman }, { name: "Figma", icon: SiFigma }],
  },
];

export const jobs = [
  { role: "Software Engineer", where: "EdTech product company · Pune", when: "Sep 2024 - Present", current: true },
  { role: "Android Developer Intern", where: "EdTech product company · Pune", when: "Mar 2024 - Sep 2024" },
];

export const highlights = [
  { title: "End-to-end platform", text: "Built a CBSE maths learning platform across Android, web and a Kotlin/Ktor backend, from first screen to production." },
  { title: "Question engine", text: "Designed 78+ maths question-generation algorithms that create personalised practice on demand." },
  { title: "Real-time & bilingual", text: "Integrated real-time data sync, push notifications and full English & Marathi support." },
  { title: "Solid foundations", text: "Started as an intern shipping core Kotlin/XML screens with MVVM, Firebase Auth, Firestore and Retrofit." },
];

export const impact = [
  { value: "78+", label: "question algorithms", bg: "bg-lav" },
  { value: "10x", label: "buffer caching", bg: "bg-butter" },
  { value: "3", label: "platforms shipped", bg: "bg-sage" },
];

export const projects = [
  {
    kind: "Android Application",
    title: "Maths Learning App",
    desc: "Native Android app for CBSE maths students: interactive practice, AI tutoring with Google Generative AI, auto-scored exams, video lessons, real-time progress sync and full English & Marathi support.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Google AI", "MVVM", "ExoPlayer"],
    icons: [SiKotlin, SiJetpackcompose, SiFirebase, SiGooglegemini],
    bg: "bg-lav",
  },
  {
    kind: "Backend Server",
    title: "Question Engine API",
    desc: "Kotlin/Ktor REST API that generates personalised maths questions on demand from 78+ algorithm classes, with 10x buffer caching, a class-chapter-topic curriculum hierarchy, Firebase auth and Dockerised deploys.",
    tags: ["Kotlin", "Ktor", "PostgreSQL", "Firebase Admin", "Docker", "Coroutines"],
    icons: [SiKtor, SiPostgresql, SiDocker, SiKotlin],
    bg: "bg-butter",
  },
  {
    kind: "Web Frontend",
    title: "Student & Admin Portal",
    desc: "React web platform for students and admins: dashboards, a live exam interface, assignment tracking, performance analytics with Recharts and PDF report export.",
    tags: ["React 19", "Material-UI", "Firebase", "Recharts", "Axios", "Vite"],
    icons: [SiReact, SiMui, SiVite, SiFirebase],
    bg: "bg-sage",
  },
];

export const education = [
  { title: "M.Sc. Computer Science", where: "Advanced algorithms, software engineering, mobile development", meta: "2023 - 2025", score: "CGPA 8.5" },
  { title: "B.Sc. Computer Science", where: "Padmashri Vikhe Patil College, Pravaranagar", meta: "2020 - 2023", score: "CGPA 8.2" },
];
