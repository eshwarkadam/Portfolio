import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--nf-display", subsets: ["latin"] });
const sans = DM_Sans({ variable: "--nf-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--nf-serif", subsets: ["latin"], style: "italic", weight: "500" });

export const metadata: Metadata = {
  metadataBase: new URL("https://eshwarkadam.com"),
  title: "Eshwar Kadam | Software Engineer",
  description:
    "Eshwar Kadam, Software Engineer in Pune. I build mobile, web and cloud products end to end with Kotlin, React, Google Cloud and AI.",
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Eshwar Kadam",
    title: "Eshwar Kadam | Software Engineer",
    description: "Mobile, web and cloud products, from clean code to production.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Eshwar Kadam, Software Engineer" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eshwar Kadam",
  jobTitle: "Software Engineer",
  url: "https://eshwarkadam.com",
  image: "https://eshwarkadam.com/profile.jpg",
  email: "mailto:eshwarkadam20861@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "VKS Infotech Pvt. Ltd.", url: "https://anireysoft.com" },
  sameAs: ["https://www.linkedin.com/in/eshwar-kadam-496b5b236", "https://github.com/eshwarkadam"],
  knowsAbout: ["Kotlin", "Android", "Jetpack Compose", "Ktor", "React", "Next.js", "PostgreSQL", "Google Cloud", "Firebase", "AI"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
