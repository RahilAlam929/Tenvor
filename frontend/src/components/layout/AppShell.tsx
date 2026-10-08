"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 56 : 220;

  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <TopBar sidebarCollapsed={collapsed} />
      <main
        className="min-h-screen"
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: "52px",
          transition: "margin-left 0.2s ease",
          background: "var(--bg)",
        }}
      >
        <div className="page-enter">
          {children}
        </div>
      </main>
    </>
  );
}
