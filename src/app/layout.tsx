import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--nf-display", subsets: ["latin"] });
const sans = DM_Sans({ variable: "--nf-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--nf-serif", subsets: ["latin"], style: "italic", weight: "500" });

export const metadata: Metadata = {
  metadataBase: new URL("https://eshwarkadam.com"),
  title: "Eshwar Kadam | Android & Full-Stack Engineer",
  description:
    "Kotlin, Jetpack Compose, Ktor and React. Builder of an end-to-end CBSE maths learning platform.",
  openGraph: { images: ["/about.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
