"use client";

import Link from "next/link";
import {
  Share2,
  Search,
  GitFork,
  Files,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useGraphStats, useNodes } from "@/lib/api/hooks";
import { StatCard } from "@/components/ui/StatCard";
import { ErrorState } from "@/components/ui/States";

export default function OverviewPage() {
  const stats = useGraphStats();
  const functions = useNodes("function");
  const classes = useNodes("class");
  const imports = useNodes("import");
  const files = useNodes("file");

  const hasError = stats.error;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          Overview
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Current state of the indexed codebase.
        </p>
      </div>

      {hasError ? (
        <ErrorState
          title="Cannot connect to backend"
          message={stats.error!}
          action={
            <button
              onClick={stats.refetch}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
              style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
            >
              <RefreshCw size={14} />
              Retry
            </button>
          }
        />
      ) : (
        <>
          {/* ── Graph stats ───────────────────────────────────────── */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Nodes"
              value={stats.data?.nodes ?? 0}
              loading={stats.loading}
              description="All indexed entities"
            />
            <StatCard
              label="Relationships"
              value={stats.data?.edges ?? 0}
              loading={stats.loading}
              description="Calls, imports, definitions"
            />
            <StatCard
              label="Functions"
              value={functions.data?.nodes.length ?? 0}
              loading={functions.loading}
              description="Parsed function definitions"
            />
            <StatCard
              label="Classes"
              value={classes.data?.nodes.length ?? 0}
              loading={classes.loading}
              description="Class definitions"
            />
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Files"
              value={files.data?.nodes.length ?? 0}
              loading={files.loading}
              description="Indexed source files"
            />
            <StatCard
              label="Imports"
              value={imports.data?.nodes.length ?? 0}
              loading={imports.loading}
              description="Import statements"
            />
          </div>

          {/* ── Quick actions ─────────────────────────────────────── */}
          <div className="mb-8">
            <h2
              className="mb-4 text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Quick actions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg border p-4 transition-colors"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--text-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border"
                    style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
                  >
                    <action.icon size={15} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium" style={{ color: "var(--text)" }}>
                      {action.label}
                    </p>
                    <p className="truncate text-xs" style={{ color: "var(--text-muted)" }}>
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--text-muted)" }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Most connected functions ──────────────────────────── */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Functions
              </h2>
              <Link
                href="/graph"
                className="text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                View graph →
              </Link>
            </div>

            <div
              className="overflow-hidden rounded-lg border"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              {functions.loading ? (
                <div className="flex flex-col gap-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="skeleton h-4 w-32 rounded" />
                      <div className="skeleton h-4 w-48 rounded" />
                    </div>
                  ))}
                </div>
              ) : functions.data?.nodes.length ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className="border-b text-left"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <th
                        className="px-4 py-2.5 text-xs font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Function
                      </th>
                      <th
                        className="hidden px-4 py-2.5 text-xs font-medium sm:table-cell"
                        style={{ color: "var(--text-muted)" }}
                      >
                        File
                      </th>
                      <th
                        className="hidden px-4 py-2.5 text-xs font-medium md:table-cell"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Line
                      </th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {functions.data.nodes.slice(0, 10).map((fn) => (
                      <tr
                        key={fn.id}
                        className="border-b last:border-b-0 hover:bg-[var(--bg-subtle)] transition-colors"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <td className="px-4 py-2.5">
                          <Link
                            href={`/impact?fn=${encodeURIComponent(fn.name)}`}
                            className="font-mono text-xs font-medium hover:underline"
                            style={{ color: "var(--text)" }}
                          >
                            {fn.name}
                          </Link>
                        </td>
                        <td
                          className="hidden max-w-xs truncate px-4 py-2.5 font-mono text-xs sm:table-cell"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {fn.file_path}
                        </td>
                        <td
                          className="hidden px-4 py-2.5 text-xs md:table-cell"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {fn.line}
                        </td>
                        <td className="px-4 py-2.5">
                          <Link
                            href={`/impact?fn=${encodeURIComponent(fn.name)}`}
                            className="text-xs"
                            style={{ color: "var(--text-subtle)" }}
                          >
                            Analyze →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  No functions indexed yet.{" "}
                  <Link href="/repositories" style={{ color: "var(--text)" }}>
                    Import a repository →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const QUICK_ACTIONS = [
  {
    label: "Import repository",
    description: "Add a new codebase",
    href: "/repositories",
    icon: GitFork,
  },
  {
    label: "Browse files",
    description: "Explore source files",
    href: "/files",
    icon: Files,
  },
  {
    label: "Open graph",
    description: "Interactive code graph",
    href: "/graph",
    icon: Share2,
  },
  {
    label: "Search codebase",
    description: "Find functions and files",
    href: "/search",
    icon: Search,
  },
];
