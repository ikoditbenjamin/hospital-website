import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jiddena Medical Clinic",
    template: "%s | Jiddena Medical Clinic",
  },
  description:
    "Jiddena Medical Clinic in Kampala, Uganda offers affordable, high-quality healthcare services including consultation, diagnosis, treatment, and expert medical care for individuals and families.",
  keywords: [
    "Jiddena Medical Clinic",
    "medical clinic Kampala",
    "hospital in Kampala",
    "doctors in Uganda",
    "healthcare services Uganda",
    "clinic near me Kampala",
    "affordable medical care Uganda",
  ],
  twitter: {
  card: "summary_large_image",
  title: "Jiddena Medical Clinic",
  description:
    "Affordable and professional healthcare services in Kampala, Uganda.",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Header />
        {children}
         <Footer />
        </body>
    </html>
  );
}
