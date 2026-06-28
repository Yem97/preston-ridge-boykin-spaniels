import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Preston Ridge Boykin Spaniels | AKC · BSS · UKC Registered",
  description: "Premium Boykin Spaniel puppies raised for hunting and family life. AKC, BSS, and UKC registered. Health tested. Based in the USA.",
  openGraph: {
    title: "Preston Ridge Boykin Spaniels",
    description: "Premium AKC · BSS · UKC Registered Boykin Spaniel puppies.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Preston Ridge Boykin Spaniels",
    description: "Premium AKC · BSS · UKC Registered Boykin Spaniel puppies.",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: "Premium AKC · BSS · UKC registered Boykin Spaniel puppies, health tested and family raised.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  address: { "@type": "PostalAddress", addressCountry: "US" },
  areaServed: "US",
  knowsAbout: ["Boykin Spaniel", "Hunting dogs", "Family dogs", "Puppies"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather:wght@300;400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-bark-dark antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
