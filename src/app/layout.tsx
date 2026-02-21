import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = "https://thedialogueplatform.com";

export const metadata: Metadata = {
  title: {
    default: "The Dialogue Platform",
    template: "%s | The Dialogue Platform",
  },
  description:
    "A structured environment for institutions to design and govern complex public dialogues. Built for municipalities, universities, and public organisations.",
  keywords: [
    "dialogue",
    "governance",
    "public engagement",
    "institutional design",
    "municipalities",
    "stakeholder dialogue",
  ],
  authors: [{ name: "The Dialogue Platform" }],
  creator: "The Dialogue Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Dialogue Platform",
    title: "The Dialogue Platform",
    description:
      "A structured environment for institutions to design and govern complex public dialogues.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dialogue Platform",
    description:
      "A structured environment for institutions to design and govern complex public dialogues.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
