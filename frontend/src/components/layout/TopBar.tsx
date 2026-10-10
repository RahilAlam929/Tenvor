"use client";

import { Search, Sun, Moon, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const sidebarWidth = sidebarCollapsed ? 56 : 220;

  return (
    <header
      className="fixed right-0 top-0 z-20 flex items-center gap-4 border-b px-4"
      style={{
        left: `${sidebarWidth}px`,
        height: "var(--topbar-height)",
        minHeight: "52px",
        background: "var(--bg-elevated)",
        borderColor: "var(--border)",
        transition: "left 0.2s ease",
      }}
    >
      {/* Global Search */}
      <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
        <div className="relative flex max-w-md flex-1 items-center">
          <Search
            size={14}
            className="absolute left-3 pointer-events-none"
            style={{ color: "var(--text-subtle)" }}
          />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search codebase..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-full rounded-sm border bg-transparent pl-9 pr-3 text-sm outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--text-subtle)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
            }}
          />
        </div>
      </form>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--text-muted)" }}
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}

        {/* Settings */}
        <Link
          href="/settings"
          className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
          style={{ color: "var(--text-muted)" }}
          aria-label="Settings"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <Settings size={15} />
        </Link>
      </div>
    </header>
  );
}
