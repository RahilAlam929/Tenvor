"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitFork,
  Files,
  Share2,
  Search,
  Zap,
  BookOpen,
  Rss,
  Settings,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview",         href: "/overview",         icon: LayoutDashboard },
  { label: "Repositories",     href: "/repositories",     icon: GitFork },
  { label: "Files",            href: "/files",            icon: Files },
  { label: "Graph",            href: "/graph",            icon: Share2 },
  { label: "Search",           href: "/search",           icon: Search },
  { label: "Impact Analysis",  href: "/impact",           icon: Zap },
  { label: "API",              href: "/api-docs",         icon: Code2 },
  { label: "Documentation",    href: "/docs",             icon: BookOpen },
  { label: "Blog",             href: "/blog",             icon: Rss },
  { label: "Settings",         href: "/settings",         icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-full flex-col border-r"
      style={{
        width: collapsed ? "56px" : "220px",
        background: "var(--bg-elevated)",
        borderColor: "var(--border)",
        transition: "width 0.2s ease",
      }}
    >
      {/* Logo area */}
      <div
        className="flex items-center gap-3 border-b px-3"
        style={{
          height: "var(--topbar-height)",
          borderColor: "var(--border)",
          minHeight: "52px",
        }}
      >
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          <Share2 size={14} />
        </div>
        {!collapsed && (
          <span
            className="select-none font-semibold tracking-tight"
            style={{ color: "var(--text)", fontSize: "15px", letterSpacing: "-0.03em" }}
          >
            TENVOR
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className="group flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors"
              style={{
                color: isActive ? "var(--text)" : "var(--text-muted)",
                background: isActive ? "var(--bg-subtle)" : "transparent",
                fontWeight: isActive ? "500" : "400",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }
              }}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t p-2" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-md p-1.5 transition-colors"
          style={{ color: "var(--text-muted)" }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
