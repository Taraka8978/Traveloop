import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Traveloop | Personalized Travel Planning",
  description: "Dream, design, and organize your trips with ease. Discover cities, plan itineraries, and budget effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="page-wrapper">
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
