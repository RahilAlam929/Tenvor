import type { Metadata } from "next";
import Link from "next/link";
import {
  Share2,
  Search,
  GitFork,
  ArrowRight,
  Network,
  ChevronRight,
  Database,
  Cpu,
  Layers,
  Terminal,
  GitBranch,
  Activity,
  Box,
} from "lucide-react";
import LandingMetrics from "./LandingMetrics";

export const metadata: Metadata = {
  title: "TENVOR — Understand Every Layer of Your Codebase",
  description:
    "TENVOR turns repositories into explorable code intelligence graphs. Parse files, map call relationships, trace change impact — all in one platform.",
};

// ─── Inline SVG: animated code graph illustration ────────────────────────────

function HeroGraphIllustration() {
  return (
    <svg
      viewBox="0 0 560 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", maxWidth: "560px", height: "auto" }}
    >
      <style>{`
        @keyframes hero-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes hero-drift-a {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes hero-drift-b {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(4px); }
        }
        @keyframes hero-drift-c {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        @keyframes edge-draw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-node-a, .hero-node-b, .hero-node-c, .hero-node-d, .hero-node-e {
            animation: none !important;
          }
          .hero-edge { animation: none !important; }
        }
      `}</style>

      {/* ── Edges ── */}
      {/* File → Function 1 */}
      <line
        className="hero-edge"
        x1="140" y1="80" x2="260" y2="55"
        stroke="var(--border)" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: "edge-draw 1s ease-out 0.2s both" }}
      />
      {/* File → Function 2 */}
      <line
        className="hero-edge"
        x1="140" y1="85" x2="265" y2="145"
        stroke="var(--border)" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: "edge-draw 1s ease-out 0.35s both" }}
      />
      {/* File → Class */}
      <line
        className="hero-edge"
        x1="140" y1="90" x2="255" y2="210"
        stroke="var(--border)" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: "edge-draw 1s ease-out 0.5s both" }}
      />
      {/* Function 1 → Import */}
      <line
        className="hero-edge"
        x1="350" y1="55" x2="420" y2="130"
        stroke="var(--border)" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: "edge-draw 1s ease-out 0.65s both" }}
      />
      {/* Function 2 → Function 1 */}
      <line
        className="hero-edge"
        x1="355" y1="145" x2="352" y2="68"
        stroke="var(--border)" strokeWidth="1.5"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: "edge-draw 1s ease-out 0.8s both" }}
      />

      {/* ── Node: File (blue) ── */}
      <g
        className="hero-node-a"
        style={{ animation: "hero-drift-a 4s ease-in-out infinite" }}
      >
        <rect
          x="52" y="65" width="88" height="40" rx="8"
          fill="rgba(37,99,235,0.12)" stroke="rgba(37,99,235,0.45)" strokeWidth="1.5"
        />
        <rect x="64" y="77" width="4" height="4" rx="1" fill="rgba(37,99,235,0.7)" />
        <rect x="72" y="78" width="30" height="2" rx="1" fill="rgba(37,99,235,0.5)" />
        <rect x="64" y="85" width="4" height="4" rx="1" fill="rgba(37,99,235,0.4)" />
        <rect x="72" y="86" width="18" height="2" rx="1" fill="rgba(37,99,235,0.3)" />
        <text x="96" y="71" fontSize="8" fill="rgba(37,99,235,0.9)" fontFamily="monospace" fontWeight="600">FILE</text>
      </g>

      {/* ── Node: Function 1 (green) ── */}
      <g
        className="hero-node-b"
        style={{ animation: "hero-drift-b 3.5s ease-in-out infinite 0.5s" }}
      >
        <rect
          x="263" y="38" width="100" height="38" rx="8"
          fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.45)" strokeWidth="1.5"
        />
        <text x="275" y="54" fontSize="9" fill="rgba(22,163,74,0.9)" fontFamily="monospace" fontWeight="600">fn parse_file()</text>
        <rect x="275" y="58" width="60" height="2" rx="1" fill="rgba(22,163,74,0.3)" />
        <rect x="275" y="64" width="40" height="2" rx="1" fill="rgba(22,163,74,0.2)" />
      </g>

      {/* ── Node: Function 2 (green) ── */}
      <g
        className="hero-node-c"
        style={{ animation: "hero-drift-a 5s ease-in-out infinite 1s" }}
      >
        <rect
          x="267" y="126" width="100" height="38" rx="8"
          fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.45)" strokeWidth="1.5"
        />
        <text x="279" y="142" fontSize="9" fill="rgba(22,163,74,0.9)" fontFamily="monospace" fontWeight="600">fn build_graph()</text>
        <rect x="279" y="148" width="55" height="2" rx="1" fill="rgba(22,163,74,0.3)" />
        <rect x="279" y="154" width="35" height="2" rx="1" fill="rgba(22,163,74,0.2)" />
      </g>

      {/* ── Node: Class (amber) ── */}
      <g
        className="hero-node-d"
        style={{ animation: "hero-drift-b 4.5s ease-in-out infinite 0.8s" }}
      >
        <rect
          x="258" y="193" width="96" height="38" rx="8"
          fill="rgba(202,138,4,0.12)" stroke="rgba(202,138,4,0.45)" strokeWidth="1.5"
        />
        <text x="270" y="207" fontSize="9" fill="rgba(202,138,4,0.9)" fontFamily="monospace" fontWeight="600">class GraphBuilder</text>
        <rect x="270" y="213" width="58" height="2" rx="1" fill="rgba(202,138,4,0.3)" />
        <rect x="270" y="219" width="38" height="2" rx="1" fill="rgba(202,138,4,0.2)" />
      </g>

      {/* ── Node: Import (purple) ── */}
      <g
        className="hero-node-e"
        style={{ animation: "hero-drift-c 3.8s ease-in-out infinite 0.3s" }}
      >
        <rect
          x="420" y="113" width="96" height="34" rx="8"
          fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.45)" strokeWidth="1.5"
        />
        <text x="432" y="127" fontSize="9" fill="rgba(139,92,246,0.9)" fontFamily="monospace" fontWeight="600">import neo4j</text>
        <rect x="432" y="133" width="50" height="2" rx="1" fill="rgba(139,92,246,0.3)" />
        <rect x="432" y="139" width="30" height="2" rx="1" fill="rgba(139,92,246,0.2)" />
      </g>

      {/* ── Legend ── */}
      <g opacity="0.75">
        <rect x="24" y="218" width="8" height="8" rx="2" fill="rgba(37,99,235,0.6)" />
        <text x="36" y="226" fontSize="8" fill="var(--text-subtle)" fontFamily="sans-serif">File</text>
        <rect x="70" y="218" width="8" height="8" rx="2" fill="rgba(22,163,74,0.6)" />
        <text x="82" y="226" fontSize="8" fill="var(--text-subtle)" fontFamily="sans-serif">Function</text>
        <rect x="132" y="218" width="8" height="8" rx="2" fill="rgba(202,138,4,0.6)" />
        <text x="144" y="226" fontSize="8" fill="var(--text-subtle)" fontFamily="sans-serif">Class</text>
        <rect x="186" y="218" width="8" height="8" rx="2" fill="rgba(139,92,246,0.6)" />
        <text x="198" y="226" fontSize="8" fill="var(--text-subtle)" fontFamily="sans-serif">Import</text>
      </g>
    </svg>
  );
}

// ─── Architecture step labels ─────────────────────────────────────────────────

const ARCH_STEPS = [
  { label: "Repository", color: "rgba(37,99,235,0.15)", border: "rgba(37,99,235,0.4)", text: "rgba(37,99,235,0.9)" },
  { label: "Git Clone", color: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.4)", text: "rgba(22,163,74,0.9)" },
  { label: "Tree-sitter", color: "rgba(202,138,4,0.12)", border: "rgba(202,138,4,0.4)", text: "rgba(202,138,4,0.9)" },
  { label: "Graph Builder", color: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.4)", text: "rgba(139,92,246,0.9)" },
  { label: "Neo4j", color: "rgba(37,99,235,0.12)", border: "rgba(37,99,235,0.4)", text: "rgba(37,99,235,0.9)" },
  { label: "FastAPI", color: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.4)", text: "rgba(22,163,74,0.9)" },
  { label: "Frontend", color: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.5)", text: "rgba(99,102,241,0.9)" },
] as const;

// ─── How it works steps ────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
  {
    title: "Import Repository",
    description:
      "Provide any public GitHub URL. TENVOR performs a shallow clone and scans every file for language statistics.",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
        <rect x="8" y="10" width="24" height="20" rx="3" stroke="var(--accent-primary)" strokeWidth="1.5" fill="var(--accent-primary-subtle)" />
        <path d="M14 18h12M14 22h8" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="12" r="4" fill="var(--bg-elevated)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <path d="M26.5 12l1 1 2-2" stroke="var(--accent-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Parse with Tree-sitter",
    description:
      "Python source files are parsed with Tree-sitter. Functions, classes, imports, and call sites are extracted from the AST.",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
        <rect x="8" y="8" width="24" height="24" rx="3" stroke="var(--accent-primary)" strokeWidth="1.5" fill="var(--accent-primary-subtle)" />
        <path d="M13 16l4 4-4 4" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 24h7" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Build the Graph",
    description:
      "Extracted entities become nodes. Call relationships become edges. Everything is persisted into Neo4j as a property graph.",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
        <circle cx="20" cy="20" r="4" fill="var(--accent-primary-subtle)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <circle cx="10" cy="12" r="3" fill="var(--accent-primary-subtle)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <circle cx="30" cy="12" r="3" fill="var(--accent-primary-subtle)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <circle cx="10" cy="28" r="3" fill="var(--accent-primary-subtle)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <circle cx="30" cy="28" r="3" fill="var(--accent-primary-subtle)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <line x1="20" y1="16" x2="12" y2="14.5" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="16" x2="28" y2="14.5" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="24" x2="12" y2="25.5" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="24" x2="28" y2="25.5" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Explore & Analyze",
    description:
      "Navigate the interactive graph, search across all nodes, trace call chains, and understand change impact before modifying anything.",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
        <circle cx="17" cy="18" r="7" stroke="var(--accent-primary)" strokeWidth="1.5" fill="var(--accent-primary-subtle)" />
        <path d="M22 23l6 6" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 18h6M17 15v6" stroke="var(--accent-primary)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

// ─── Feature grid data ─────────────────────────────────────────────────────

type FeatureItem = {
  readonly icon: React.ElementType;
  readonly title: string;
  readonly description: string;
};

const FEATURES: FeatureItem[] = [
  {
    icon: GitFork,
    title: "Repository Import",
    description:
      "Clone any public GitHub repository with a single URL. Files are scanned and language statistics are computed automatically.",
  },
  {
    icon: Cpu,
    title: "Tree-sitter Parsing",
    description:
      "Python source files are parsed via Tree-sitter. Functions, classes, imports, and call sites are extracted from the syntax tree.",
  },
  {
    icon: Database,
    title: "Neo4j Graph Database",
    description:
      "Entities and relationships are stored as a property graph in Neo4j, enabling deep traversal and structural queries.",
  },
  {
    icon: Search,
    title: "Code Search",
    description:
      "Full-text search across all indexed nodes by name or file path. Results grouped by type with direct links to analysis.",
  },
  {
    icon: Network,
    title: "Call Graph Analysis",
    description:
      "Visualize which functions call which. Trace caller chains and callee chains one hop at a time or across the full graph.",
  },
  {
    icon: Activity,
    title: "Impact Analysis",
    description:
      "Before modifying a function, see exactly what depends on it and what it depends on — the full blast radius of any change.",
  },
];

// ─── Landing Page (Server Component) ──────────────────────────────────────────

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* ── Fixed Nav ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 z-40 w-full border-b backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--bg) 85%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Share2 size={14} />
            </div>
            <span
              className="font-semibold tracking-tight"
              style={{ fontSize: "15px", letterSpacing: "-0.03em" }}
            >
              TENVOR
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-5">
            <Link
              href="/docs"
              className="hidden text-sm transition-colors sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="hidden text-sm transition-colors sm:block"
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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Hero copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: "var(--accent-primary)",
                color: "var(--accent-primary)",
                background: "var(--accent-primary-subtle)",
              }}
            >
              <Box size={11} />
              Codebase Intelligence Platform
            </div>

            <h1
              className="text-balance text-5xl font-semibold leading-tight md:text-6xl"
              style={{ color: "var(--text)", letterSpacing: "-0.04em", lineHeight: "1.1" }}
            >
              Understand every layer of your{" "}
              <span className="gradient-text">codebase.</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              TENVOR turns any repository into a queryable code intelligence graph.
              Parse source files, map call relationships, trace change impact — and
              navigate architecture with confidence.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/overview"
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
                style={{ background: "var(--accent-primary)", color: "#ffffff" }}
              >
                Explore workspace
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  background: "var(--bg-elevated)",
                }}
              >
                Read documentation
              </Link>
            </div>
          </div>

          {/* Hero illustration */}
          <div
            className="hidden items-center justify-center rounded-2xl border p-6 lg:flex animate-float"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-elevated)",
            }}
          >
            <HeroGraphIllustration />
          </div>
        </div>
      </section>

      {/* ── Live Metrics (Client Component) ───────────────────────────────── */}
      <LandingMetrics />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section
        className="border-b border-t py-24"
        style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-primary)" }}
          >
            How it works
          </p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            From repository to intelligence graph in seconds.
          </h2>

          <div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-0">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={step.title} className="relative md:pr-10">
                {/* Step number + icon */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold"
                    style={{
                      borderColor: "var(--accent-primary)",
                      background: "var(--accent-primary-subtle)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-subtle)",
                    }}
                  >
                    {step.svg}
                  </div>
                </div>
                <h3
                  className="mb-2 text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.description}
                </p>

                {/* Horizontal connector */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="absolute right-0 top-4 hidden h-px md:block"
                    style={{
                      width: "40px",
                      background:
                        "linear-gradient(to right, var(--border), transparent)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-primary)" }}
          >
            Capabilities
          </p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            Everything you need to understand a codebase.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border p-6"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-elevated)",
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <feature.icon size={18} style={{ color: "var(--accent-primary)" }} />
                </div>
                <h3
                  className="mb-2 font-semibold"
                  style={{ color: "var(--text)", fontSize: "15px" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Diagram ───────────────────────────────────────────── */}
      <section
        className="border-b border-t py-24"
        style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-primary)" }}
          >
            Architecture
          </p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            How TENVOR works
          </h2>
          <p
            className="mt-3 max-w-xl text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            A linear pipeline from raw source to queryable graph, exposed via a
            REST API and visualized in the browser.
          </p>

          {/* Pipeline diagram */}
          <div className="mt-12 overflow-x-auto">
            <div className="flex min-w-max items-center gap-0">
              {ARCH_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div
                    className="flex h-11 items-center justify-center rounded-lg border px-4 text-xs font-semibold whitespace-nowrap"
                    style={{
                      background: step.color,
                      borderColor: step.border,
                      color: step.text,
                    }}
                  >
                    {step.label}
                  </div>
                  {i < ARCH_STEPS.length - 1 && (
                    <div
                      className="flex items-center"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <div
                        className="h-px w-8"
                        style={{ background: "var(--border)" }}
                      />
                      <ChevronRight size={14} style={{ color: "var(--text-subtle)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture detail cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <GitBranch size={15} style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Ingestion Pipeline
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Shallow Git clone → file scan → language detection → Tree-sitter
                parse per <code style={{ fontFamily: "monospace" }}>.py</code> file.
              </p>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <Layers size={15} style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Graph Model
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Files, functions, classes, and imports become nodes. Call
                relationships, definitions, and imports become typed edges.
              </p>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <Terminal size={15} style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                REST API
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                FastAPI serves graph queries, search, caller/callee lookup, and
                impact analysis over HTTP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2
            className="text-4xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
          >
            Ready to understand your codebase?
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Import any GitHub repository and start exploring in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/repositories"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
              style={{ background: "var(--accent-primary)", color: "#ffffff" }}
            >
              Import a repository
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                background: "var(--bg-elevated)",
              }}
            >
              Read docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Share2 size={11} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ letterSpacing: "-0.03em" }}
            >
              TENVOR
            </span>
          </div>
          <div
            className="flex items-center gap-6 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/docs" className="transition-colors hover:text-[var(--text)]">
              Docs
            </Link>
            <Link href="/blog" className="transition-colors hover:text-[var(--text)]">
              Blog
            </Link>
            <Link href="/overview" className="transition-colors hover:text-[var(--text)]">
              App
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
