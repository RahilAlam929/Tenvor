import type { Metadata } from "next";
import Link from "next/link";
import {
  Share2,
  Search,
  Zap,
  GitFork,
  ArrowRight,
  Code2,
  Network,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TENVOR — Understand Every Layer of Your Codebase",
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 z-40 w-full border-b backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--bg) 85%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Share2 size={14} />
            </div>
            <span className="font-semibold tracking-tight" style={{ fontSize: "15px", letterSpacing: "-0.03em" }}>
              TENVOR
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="hidden text-sm sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="hidden text-sm sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              Blog
            </Link>
            <Link
              href="/overview"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Open app
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--success)" }}
            />
            Codebase intelligence powered by Neo4j &amp; Tree-sitter
          </div>
          <h1
            className="text-balance text-5xl font-semibold leading-tight tracking-tight md:text-6xl"
            style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
          >
            Understand every layer of your codebase.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            TENVOR turns repositories into explorable code intelligence graphs.
            Parse files, map call relationships, trace change impact — all in
            one platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/overview"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Explore your codebase
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Read documentation
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section
        className="border-t border-b py-24"
        style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--text-subtle)" }}
          >
            How it works
          </h2>
          <p
            className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            From repository to intelligence graph in seconds.
          </p>

          <div className="mt-12 grid gap-0 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={i} className="relative pr-8">
                <div
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                    color: "var(--text)",
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.description}
                </p>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute right-0 top-4 hidden h-px w-8 md:block"
                    style={{ background: "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UI Walkthrough ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--text-subtle)" }}
          >
            Workflow
          </h2>
          <p
            className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            A complete developer intelligence workflow.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {WORKFLOW_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <item.icon size={18} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3 className="mb-2 font-semibold" style={{ color: "var(--text)", fontSize: "15px" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>

                {/* Mock UI panel */}
                <div
                  className="mt-4 overflow-hidden rounded-lg border"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  {item.mock}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section
        className="border-t border-b py-24"
        style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--text-subtle)" }}
          >
            Capabilities
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div key={i}>
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)", background: "var(--bg)" }}
                >
                  <f.icon size={16} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2
            className="text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
          >
            Ready to understand your codebase?
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--text-muted)" }}>
            Import any GitHub repository and start exploring in seconds.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/repositories"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Import a repository
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Read docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="border-t py-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Share2 size={11} />
            </div>
            <span className="text-sm font-semibold" style={{ letterSpacing: "-0.03em" }}>TENVOR</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/docs">Docs</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/overview">App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: "Import repository",
    description: "Provide a GitHub URL. TENVOR clones it and prepares it for analysis.",
  },
  {
    title: "Parse with Tree-sitter",
    description: "Source files are parsed into a structured AST. Functions, classes, and imports are extracted.",
  },
  {
    title: "Build the graph",
    description: "Entities and call relationships are stored as nodes and edges in Neo4j.",
  },
  {
    title: "Explore & analyze",
    description: "Navigate the graph, trace callers and callees, search across the entire codebase.",
  },
];

const WORKFLOW_ITEMS = [
  {
    icon: Share2,
    title: "Interactive code graph",
    description: "Visualize functions, classes, and files as a navigable graph. Select a node to inspect its relationships.",
    mock: (
      <div className="p-4">
        <div className="flex flex-col gap-2">
          {[
            { label: "main()", type: "function", depth: 0 },
            { label: "parse_file()", type: "function", depth: 1 },
            { label: "ParserService", type: "class", depth: 1 },
          ].map((n) => (
            <div
              key={n.label}
              className="flex items-center gap-2 text-xs"
              style={{ paddingLeft: `${n.depth * 12}px` }}
            >
              {n.depth > 0 && (
                <span style={{ color: "var(--border)", fontSize: "10px" }}>└─</span>
              )}
              <span
                className="rounded px-1.5 py-0.5"
                style={{
                  background: n.type === "function" ? "rgba(22,163,74,0.1)" : "rgba(202,138,4,0.1)",
                  color: n.type === "function" ? "#16a34a" : "#ca8a04",
                }}
              >
                {n.type}
              </span>
              <code style={{ color: "var(--text)", fontFamily: "monospace" }}>{n.label}</code>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Search,
    title: "Codebase search",
    description: "Search across all nodes by name or file path. Results are ranked by type.",
    mock: (
      <div className="p-4">
        <div
          className="mb-3 flex h-7 items-center gap-2 rounded border px-2 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <Search size={11} />
          <span>search_graph</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {["search_graph()", "graph_search_service", "search.py"].map((r) => (
            <div key={r} className="flex items-center gap-2 rounded px-2 py-1 text-xs" style={{ background: "var(--bg)" }}>
              <span style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Impact analysis",
    description: "Select any function to see what calls it, what it calls, and the full impact chain.",
    mock: (
      <div className="p-4">
        <div className="mb-2 text-xs font-medium" style={{ color: "var(--text-subtle)" }}>Impact of build_graph()</div>
        <div className="flex flex-col gap-1.5">
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text-subtle)" }}>Callers: </span>
            <code style={{ fontFamily: "monospace", color: "var(--text)" }}>index_repository</code>
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text-subtle)" }}>Callees: </span>
            <code style={{ fontFamily: "monospace", color: "var(--text)" }}>save_graph, get_nodes</code>
          </div>
          <div className="mt-1 rounded px-2 py-1 text-xs" style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}>
            4 relationships affected
          </div>
        </div>
      </div>
    ),
  },
];

const FEATURES = [
  {
    icon: GitFork,
    title: "Repository import",
    description: "Clone any public GitHub repository. Files are scanned and language statistics are computed.",
  },
  {
    icon: Code2,
    title: "Tree-sitter parsing",
    description: "Functions, classes, and imports are extracted via Tree-sitter, supporting multiple languages.",
  },
  {
    icon: Network,
    title: "Neo4j graph database",
    description: "Parsed entities and relationships are stored as a property graph, ready for deep traversal.",
  },
  {
    icon: Zap,
    title: "Impact analysis",
    description: "Understand what changes when you modify a function. Trace call chains and affected paths.",
  },
];
