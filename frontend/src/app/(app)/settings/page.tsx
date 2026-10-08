"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useHealth } from "@/lib/api/hooks";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const health = useHealth();

  useEffect(() => setMounted(true), []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          Settings
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Application and appearance settings.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Appearance */}
        <Section title="Appearance">
          {mounted && (
            <SettingRow
              label="Theme"
              description="Choose between light and dark mode, or follow system preference."
            >
              <div className="flex gap-2">
                {(["system", "light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className="rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors"
                    style={{
                      background: theme === t ? "var(--text)" : "transparent",
                      color: theme === t ? "var(--bg)" : "var(--text-muted)",
                      borderColor: theme === t ? "var(--text)" : "var(--border)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </SettingRow>
          )}
        </Section>

        {/* API configuration */}
        <Section title="API">
          <SettingRow
            label="API URL"
            description="The backend API base URL. Configure via NEXT_PUBLIC_API_URL."
          >
            <code
              className="rounded-md border px-3 py-1.5 text-xs"
              style={{
                background: "var(--bg-subtle)",
                borderColor: "var(--border)",
                color: "var(--text)",
                fontFamily: "monospace",
              }}
            >
              {apiUrl}
            </code>
          </SettingRow>

          <SettingRow
            label="Backend status"
            description="Connection status to the TENVOR API backend."
          >
            <div className="flex items-center gap-2">
              {health.loading ? (
                <Badge variant="default">Checking...</Badge>
              ) : health.error ? (
                <Badge variant="danger">Unreachable</Badge>
              ) : (
                <>
                  <Badge variant="success">Connected</Badge>
                  {health.data && (
                    <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                      {health.data.service} v{health.data.version}
                    </span>
                  )}
                </>
              )}
            </div>
          </SettingRow>
        </Section>

        {/* About */}
        <Section title="About">
          <SettingRow
            label="Platform"
            description="TENVOR codebase intelligence platform."
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              TENVOR
            </span>
          </SettingRow>
          <SettingRow
            label="Frontend"
            description="Next.js App Router, TypeScript, Tailwind CSS."
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Next.js 16
            </span>
          </SettingRow>
          <SettingRow
            label="Backend"
            description="FastAPI, Neo4j, Tree-sitter."
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              FastAPI 0.1.0
            </span>
          </SettingRow>
        </Section>
      </div>
    </div>
  );
}

// ─── Components ────────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="mb-3 text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--text-subtle)" }}
      >
        {title}
      </h2>
      <div
        className="overflow-hidden rounded-lg border"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between border-b px-4 py-4 last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mr-6 flex-1">
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {label}
        </p>
        <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}
