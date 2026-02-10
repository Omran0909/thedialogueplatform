import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { LayoutShell } from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: "The Dialogue Platform",
  description:
    "A structured environment for municipalities, universities, and institutions to design and govern complex public dialogues.",
  metadataBase: new URL("https://thedialogueplatform.com"),
  openGraph: {
    title: "The Dialogue Platform",
    description:
      "A systems-oriented platform for intentional public dialogue, institutional learning, and long-term stewardship.",
    url: "https://thedialogueplatform.com",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-text-primary antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

