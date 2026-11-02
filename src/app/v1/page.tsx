import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Phone } from "./phone";
import "./v1.css";

const sans = Manrope({ variable: "--v1-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshwar Kadam | Software Engineer (v1)",
  robots: { index: false }, // preview design; the main page stays canonical
};

export default function V1() {
  return (
    <div className={sans.variable}>
      <Phone />
    </div>
  );
}
