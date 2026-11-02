import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { Game } from "./game";
import "./v4.css";

const pixel = Press_Start_2P({ variable: "--v4-pixel", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--v4-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (v4)",
  robots: { index: false }, // preview design; the main page stays canonical
};

export default function V4() {
  return (
    <div className={`${pixel.variable} ${mono.variable}`}>
      <Game />
    </div>
  );
}
