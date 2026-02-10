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
        <div className="page-container">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

