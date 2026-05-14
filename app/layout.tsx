import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Preston Ridge Boykin Spaniels | AKC · BSS · UKC Registered",
  description: "Premium Boykin Spaniel puppies raised for hunting and family life. AKC, BSS, and UKC registered. Health tested. Based in the USA.",
  openGraph: {
    title: "Preston Ridge Boykin Spaniels",
    description: "Premium AKC · BSS · UKC Registered Boykin Spaniel puppies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather:wght@300;400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-bark-dark antialiased">{children}</body>
    </html>
  );
}
