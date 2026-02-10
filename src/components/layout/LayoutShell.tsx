"use client";
import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

