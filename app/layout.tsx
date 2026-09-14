import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shamshomeimprovement.com"),
  title: "Shams Home Improvement | Remodeling & Repairs in Atlanta",
  description:
    "Shams Home Improvement provides bathroom remodeling, tile, flooring, carpentry, plumbing, electrical, painting, decks and home improvement services throughout Metro Atlanta.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shams Home Improvement",
    description: "Remodeling, repairs and home improvement services in Metro Atlanta.",
    url: "https://shamshomeimprovement.com",
    siteName: "Shams Home Improvement",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}