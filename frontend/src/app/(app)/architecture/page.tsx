import type { Metadata } from "next";
import Link from "next/link";
import {
  GitFork,
  Code2,
  Network,
  Database,
  Zap,
  ArrowRight,
  Terminal,
  Box,
  Layers,
  Share2,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = { title: "Architecture" };

// ─────────────────────────────────────────────────────────────────────────────
// Architecture page — Server Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="mb-10">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-xs" style={{ color: "var(--text-subtle)" }}>
          <Box size={12} />
          <span>Architecture</span>
          <span>/</span>
          <span style={{ color: "var(--text-muted)" }}>How TENVOR Works</span>
        </div>

        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
        >
          Architecture &amp; How TENVOR Works
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A complete technical reference covering the processing pipeline, data model,
          tech stack, and API surface of the TENVOR codebase intelligence platform.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* ── 1. System Architecture Diagram ───────────────────────── */}
        <Section icon={Layers} title="System Architecture">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            TENVOR processes a repository through a sequential pipeline — from a raw Git URL
            to an interactive, queryable graph served to the browser.
          </p>

          <div className="flex flex-col items-center gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center w-full max-w-lg">
                {/* Step box */}
                <div
                  className="w-full rounded-lg border px-4 py-3.5"
                  style={{
                    background: step.bg,
                    borderColor: step.border,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
                      style={{ background: step.iconBg }}
                    >
                      <step.icon size={14} style={{ color: step.iconColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: step.iconColor }}
                        >
                          {step.label}
                        </span>
                        {step.tag && (
                          <span
                            className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                            style={{ background: step.iconBg, color: step.iconColor }}
                          >
                            {step.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow connector (all except last) */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div
                      className="h-4 w-px"
                      style={{ background: "var(--border)" }}
                    />
                    <ArrowRight
                      size={12}
                      className="rotate-90"
                      style={{ color: "var(--text-subtle)" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. Data Model ─────────────────────────────────────────── */}
        <Section icon={Network} title="Code Graph Data Model">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            TENVOR represents source code as a property graph. Every entity — file, function,
            class, or import — becomes a node. Every relationship — definition, call, or
            import — becomes a directed edge.
          </p>

          {/* Node types */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Node types
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {NODE_TYPES.map((n) => (
                <div
                  key={n.type}
                  className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
                  style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
                >
                  <div
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ background: n.color }}
                  />
                  <div>
                    <p className="font-mono text-xs font-semibold" style={{ color: "var(--text)" }}>
                      {n.type}
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {n.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relationship types */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Relationship types
            </h3>
            <div
              className="overflow-hidden rounded-lg border"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Source
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Target
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {REL_TYPES.map((r) => (
                    <tr
                      key={r.type}
                      className="border-b last:border-b-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-2.5">
                        <code
                          className="rounded px-1.5 py-0.5 font-mono text-xs"
                          style={{ background: "var(--bg-subtle)", color: "var(--accent-primary)" }}
                        >
                          {r.type}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {r.source}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {r.target}
                      </td>
                      <td className="px-4 py-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
                        {r.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graph relationship visual */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Relationship diagram
            </h3>
            <div
              className="rounded-lg border px-6 py-5"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              <div className="flex flex-col gap-4">
                {/* Row 1: File → defines → Function → calls → Function */}
                <div className="flex flex-wrap items-center gap-2">
                  <GraphNode label="File" color="#3b82f6" />
                  <RelEdge label="defines" />
                  <GraphNode label="Function" color="#22c55e" />
                  <RelEdge label="calls" />
                  <GraphNode label="Function" color="#22c55e" />
                </div>
                {/* Row 2: File → defines → Class */}
                <div className="flex flex-wrap items-center gap-2">
                  <GraphNode label="File" color="#3b82f6" />
                  <RelEdge label="defines" />
                  <GraphNode label="Class" color="#f59e0b" />
                </div>
                {/* Row 3: File → imports → Module */}
                <div className="flex flex-wrap items-center gap-2">
                  <GraphNode label="File" color="#3b82f6" />
                  <RelEdge label="imports" />
                  <GraphNode label="Import" color="#a855f7" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 3. Technology Cards ───────────────────────────────────── */}
        <Section icon={Code2} title="Technology Stack">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            TENVOR is built on a lean, modern stack chosen for developer productivity,
            type safety, and graph-native data modeling.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col gap-3 rounded-lg border p-4"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-bold text-sm"
                    style={{ background: tech.iconBg, color: tech.iconColor }}
                  >
                    {tech.abbr}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {tech.name}
                    </p>
                    <p className="text-[11px] font-mono" style={{ color: "var(--text-subtle)" }}>
                      {tech.version}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className="mb-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {tech.role}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. Getting Started ────────────────────────────────────── */}
        <Section icon={Terminal} title="Getting Started">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Run TENVOR locally in three steps: start Neo4j, run the backend, then run the frontend.
          </p>

          <div className="flex flex-col gap-6">
            {/* Step 1 — Neo4j */}
            <SetupStep number={1} title="Start Neo4j">
              <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                TENVOR requires a running Neo4j instance. The fastest way is via Docker:
              </p>
              <CodeBlock>{`docker run -d \\
  --name tenvor-neo4j \\
  -p 7474:7474 \\
  -p 7687:7687 \\
  -e NEO4J_AUTH=neo4j/tenvor123 \\
  neo4j:5`}</CodeBlock>
              <p className="mt-2 text-xs" style={{ color: "var(--text-subtle)" }}>
                Neo4j Browser available at{" "}
                <code
                  className="rounded px-1 py-0.5 font-mono text-[11px]"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  http://localhost:7474
                </code>{" "}
                once running.
              </p>
            </SetupStep>

            {/* Step 2 — Backend */}
            <SetupStep number={2} title="Set up the backend">
              <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Create a virtual environment, install dependencies, and start the FastAPI server:
              </p>
              <CodeBlock>{`cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001`}</CodeBlock>
              <p className="mt-2 text-xs" style={{ color: "var(--text-subtle)" }}>
                API available at{" "}
                <code
                  className="rounded px-1 py-0.5 font-mono text-[11px]"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  http://127.0.0.1:8001
                </code>
                . Interactive docs at{" "}
                <code
                  className="rounded px-1 py-0.5 font-mono text-[11px]"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  /docs
                </code>
                .
              </p>
            </SetupStep>

            {/* Step 3 — Frontend */}
            <SetupStep number={3} title="Set up the frontend">
              <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Install npm dependencies and start the Next.js development server:
              </p>
              <CodeBlock>{`cd frontend
npm install
npm run dev`}</CodeBlock>
              <p className="mt-2 text-xs" style={{ color: "var(--text-subtle)" }}>
                Frontend available at{" "}
                <code
                  className="rounded px-1 py-0.5 font-mono text-[11px]"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  http://localhost:3000
                </code>
                .
              </p>
            </SetupStep>
          </div>
        </Section>

        {/* ── 5. API Reference ─────────────────────────────────────── */}
        <Section icon={Zap} title="API Reference">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            The TENVOR backend exposes a REST API on port 8001. Full interactive documentation
            is available at{" "}
            <code
              className="rounded px-1.5 py-0.5 font-mono text-xs"
              style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
            >
              http://127.0.0.1:8001/docs
            </code>
            .
          </p>

          <div
            className="overflow-hidden rounded-lg border"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Method
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Path
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {API_ENDPOINTS.map((ep) => (
                    <tr
                      key={ep.method + ep.path}
                      className="border-b last:border-b-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-2.5">
                        <MethodBadge method={ep.method} />
                      </td>
                      <td className="px-4 py-2.5">
                        <code
                          className="font-mono text-xs"
                          style={{ color: "var(--text)" }}
                        >
                          {ep.path}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
                        {ep.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* ── 6. Navigation Links ──────────────────────────────────── */}
        <div>
          <h2
            className="mb-1 text-base font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            Explore TENVOR
          </h2>
          <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
            Jump into the platform or read more.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 rounded-lg border p-4 transition-colors"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border"
                  style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
                >
                  <link.icon size={15} style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {link.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {link.description}
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
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md border"
          style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
        >
          <Icon size={14} />
        </div>
        <h2
          className="text-base font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function GraphNode({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5"
      style={{
        background: `${color}18`,
        borderColor: `${color}55`,
      }}
    >
      <div
        className="h-2 w-2 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      <span className="font-mono text-xs font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function RelEdge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-px w-3" style={{ background: "var(--border)" }} />
      <span
        className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
        style={{
          background: "var(--bg-subtle)",
          borderColor: "var(--border)",
          color: "var(--text-subtle)",
        }}
      >
        {label}
      </span>
      <div className="flex items-center">
        <div className="h-px w-3" style={{ background: "var(--border)" }} />
        <ArrowRight size={10} style={{ color: "var(--text-subtle)", marginLeft: "-2px" }} />
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="overflow-x-auto rounded-lg border px-4 py-3.5 font-mono text-xs leading-relaxed"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "var(--border)",
        color: "var(--text-muted)",
        whiteSpace: "pre",
      }}
    >
      {children}
    </pre>
  );
}

function SetupStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
          style={{
            background: "var(--accent-primary)",
            color: "#fff",
          }}
        >
          {number}
        </div>
        <div className="mt-1 flex-1" style={{ width: "1px", background: "var(--border)" }} />
      </div>
      <div className="flex-1 pb-2">
        <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

function MethodBadge({ method }: { method: "GET" | "POST" }) {
  const isPost = method === "POST";
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-semibold"
      style={{
        background: isPost ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.12)",
        color: isPost ? "#22c55e" : "#3b82f6",
      }}
    >
      {method}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  {
    label: "Repository",
    tag: "GitHub URL",
    description: "Any public Git repository URL provided by the developer.",
    icon: GitFork,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3b82f6",
  },
  {
    label: "Git Clone",
    tag: "--depth 1",
    description: "Shallow clone performed for speed. Only the latest commit history is fetched.",
    icon: Terminal,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3b82f6",
  },
  {
    label: "Tree-sitter Parser",
    tag: "Python · JS · TS",
    description: "Source files are parsed using Tree-sitter to produce a Concrete Syntax Tree (CST). Functions, classes, and imports are extracted.",
    icon: Code2,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(168,85,247,0.12)",
    iconColor: "#a855f7",
  },
  {
    label: "Graph Builder",
    tag: "nodes + edges",
    description: "CodeGraph nodes and edges are constructed in memory from the parsed entities and call relationships.",
    icon: Share2,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(168,85,247,0.12)",
    iconColor: "#a855f7",
  },
  {
    label: "Neo4j",
    tag: ":7687",
    description: "Nodes and edges are persisted to Neo4j via MERGE operations. Duplicate prevention is built in. Node IDs follow {type}:{file_path}:{name}.",
    icon: Database,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#f59e0b",
  },
  {
    label: "FastAPI",
    tag: ":8001",
    description: "Python REST API serves graph queries over HTTP. Auto-generated OpenAPI docs available at /docs.",
    icon: Zap,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(34,197,94,0.12)",
    iconColor: "#22c55e",
  },
  {
    label: "Next.js Frontend",
    tag: ":3000",
    description: "React application with interactive graph visualization, search, file explorer, impact analysis, and this architecture view.",
    icon: Network,
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3b82f6",
  },
] as const;

const NODE_TYPES = [
  { type: "file",     color: "#3b82f6", description: "A source file" },
  { type: "function", color: "#22c55e", description: "A function definition" },
  { type: "class",    color: "#f59e0b", description: "A class definition" },
  { type: "import",   color: "#a855f7", description: "An import statement" },
];

const REL_TYPES = [
  { type: "defined_in", source: "Function / Class", target: "File",     description: "Entity is defined inside a file" },
  { type: "imports",    source: "File",             target: "Import",   description: "File imports a module or symbol" },
  { type: "calls",      source: "Function",         target: "Function", description: "Function invokes another function" },
];

const TECH_STACK = [
  {
    name: "Next.js",
    abbr: "N",
    version: "v15+",
    role: "Frontend",
    description: "React Server Components, App Router, TypeScript-first. Powers all UI views.",
    iconBg: "rgba(0,0,0,0.08)",
    iconColor: "var(--text)",
  },
  {
    name: "TypeScript",
    abbr: "TS",
    version: "v5",
    role: "Type Safety",
    description: "Strict types across frontend API clients, components, and data models.",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "#3b82f6",
  },
  {
    name: "FastAPI",
    abbr: "F",
    version: "latest",
    role: "REST API",
    description: "Async Python API framework with auto-generated OpenAPI docs and Pydantic validation.",
    iconBg: "rgba(34,197,94,0.12)",
    iconColor: "#22c55e",
  },
  {
    name: "Tree-sitter",
    abbr: "TS",
    version: "latest",
    role: "Parser",
    description: "Incremental, error-tolerant parser. Produces CSTs for precise entity and call extraction.",
    iconBg: "rgba(168,85,247,0.12)",
    iconColor: "#a855f7",
  },
  {
    name: "Neo4j",
    abbr: "N4",
    version: "v5",
    role: "Graph Database",
    description: "Native property graph database. Cypher queries power all call graph traversals.",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#f59e0b",
  },
  {
    name: "Tailwind CSS",
    abbr: "TW",
    version: "v3",
    role: "Styling",
    description: "Utility-first CSS with CSS custom property design tokens for theming.",
    iconBg: "rgba(20,184,166,0.12)",
    iconColor: "#14b8a6",
  },
];

const API_ENDPOINTS: { method: "GET" | "POST"; path: string; description: string }[] = [
  { method: "GET",  path: "/health",                                  description: "Health check. Returns service name and version." },
  { method: "POST", path: "/repositories/import",                     description: "Clone a Git repository and scan for files and language stats." },
  { method: "GET",  path: "/graph/nodes",                             description: "All indexed nodes. Filter by type: file, function, class, import." },
  { method: "GET",  path: "/graph/relationships",                     description: "All relationships between indexed nodes." },
  { method: "GET",  path: "/graph/stats",                             description: "Codebase statistics: total node count and edge count." },
  { method: "GET",  path: "/graph/search?q=",                         description: "Case-insensitive search across node names and file paths. Up to 50 results." },
  { method: "GET",  path: "/graph/functions/{name}/callers",          description: "All functions in the graph that call the specified function." },
  { method: "GET",  path: "/graph/functions/{name}/callees",          description: "All functions the specified function calls." },
  { method: "GET",  path: "/graph/functions/{name}/impact",           description: "All call relationships where this function appears as source or target." },
];

const NAV_LINKS = [
  { label: "Workspace",       description: "Interactive development canvas",    href: "/workspace", icon: Box },
  { label: "Documentation",   description: "Full technical reference",          href: "/docs",      icon: BookOpen },
  { label: "Blog",            description: "Articles on codebase intelligence", href: "/blog",      icon: GitFork },
];
