"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Layers, ArrowRight, Users, GitMerge, Zap, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import {
  StatCard,
  EmptyState,
  LoadingState,
  ErrorState,
  Badge,
  NodeBadge,
} from "@/components/ui";
import {
  useImportRepository,
  useGraphStats,
  useNodes,
  useSearch,
  useCallers,
  useCallees,
  useImpact,
} from "@/lib/api/hooks";
import type { SearchResult, CallerRecord, CalleeRecord, ImpactRecord } from "@/lib/api/types";

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-base font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Panel wrapper ─────────────────────────────────────────────────────────

function Panel({
  title,
  count,
  icon,
  children,
}: {
  title: string;
  count?: number;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col rounded-lg border"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <span style={{ color: "var(--text-subtle)" }}>{icon}</span>
        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {title}
        </span>
        {count !== undefined && (
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              background: "var(--bg-muted)",
              color: "var(--text-muted)",
            }}
          >
            {count}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}

// ─── Mono text ─────────────────────────────────────────────────────────────

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded px-1 py-0.5 text-xs"
      style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
        background: "var(--bg-subtle)",
        color: "var(--text)",
      }}
    >
      {children}
    </code>
  );
}

// ─── Repository Import Panel ────────────────────────────────────────────────

function RepositoryImportPanel() {
  const [url, setUrl] = useState("");
  const { data, loading, error, importRepo, reset } = useImportRepository();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    await importRepo(trimmed);
  }

  if (data) {
    return (
      <div
        className="rounded-lg border p-5"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {/* Success header */}
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} style={{ color: "#16a34a" }} />
          <span className="text-sm font-medium" style={{ color: "#16a34a" }}>
            Repository imported successfully
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {/* Repo ID */}
          <div
            className="rounded-md border p-3"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Repository ID
            </p>
            <p className="break-all font-mono text-xs" style={{ color: "var(--text)" }}>
              {data.repository_id}
            </p>
          </div>

          {/* File count */}
          <div
            className="rounded-md border p-3"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Files
            </p>
            <p className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
              {data.file_count.toLocaleString()}
            </p>
          </div>

          {/* Languages */}
          <div
            className="rounded-md border p-3"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              Languages
            </p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(data.languages).map(([lang, count]) => (
                <Badge key={lang} variant="info">
                  {lang}: {count}
                </Badge>
              ))}
              {Object.keys(data.languages).length === 0 && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>None detected</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={reset}
          className="mt-4 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          style={{
            background: "var(--bg-subtle)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg-muted)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
          }}
        >
          Import another
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border p-5"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="repo-url"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Git repository URL
          </label>
          <input
            id="repo-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/owner/repository"
            disabled={loading}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-all"
            style={{
              background: "var(--bg-subtle)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--accent-primary)";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 2px var(--accent-primary-subtle)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          style={{
            background: loading || !url.trim() ? "var(--bg-muted)" : "var(--accent-primary)",
            color: loading || !url.trim() ? "var(--text-subtle)" : "#ffffff",
            cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Importing…" : "Import repository"}
        </button>
      </form>

      {error && (
        <div
          className="mt-3 flex items-start gap-2 rounded-md border p-3"
          style={{
            background: "rgba(220,38,38,0.05)",
            borderColor: "rgba(220,38,38,0.2)",
          }}
        >
          <AlertCircle size={14} style={{ color: "#dc2626", marginTop: "1px", flexShrink: 0 }} />
          <p className="text-sm" style={{ color: "#dc2626" }}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Live Stats Row ─────────────────────────────────────────────────────────

function LiveStatsRow() {
  const { data: stats, loading: statsLoading } = useGraphStats();
  const { loading: nodesLoading } = useNodes();
  const { data: fnNodes, loading: fnLoading } = useNodes("function");
  const { data: fileNodes, loading: fileLoading } = useNodes("file");

  const loading = statsLoading || nodesLoading || fnLoading || fileLoading;

  const totalNodes = stats?.nodes ?? null;
  const totalEdges = stats?.edges ?? null;
  const fnCount = fnNodes?.nodes.length ?? null;
  const fileCount = fileNodes?.nodes.length ?? null;

  function fmt(v: number | null): string {
    if (v === null) return "--";
    return v.toLocaleString();
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Total Nodes" value={loading ? 0 : fmt(totalNodes)} loading={loading} />
      <StatCard label="Relationships" value={loading ? 0 : fmt(totalEdges)} loading={loading} />
      <StatCard label="Functions" value={loading ? 0 : fmt(fnCount)} loading={loading} />
      <StatCard label="Files" value={loading ? 0 : fmt(fileCount)} loading={loading} />
    </div>
  );
}

// ─── Search Results ─────────────────────────────────────────────────────────

function SearchResultItem({ result }: { result: SearchResult }) {
  return (
    <div
      className="flex items-start gap-3 rounded-md border px-3 py-2.5 transition-colors"
      style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
    >
      <NodeBadge type={result.node_type} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="font-mono text-sm font-medium"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
            }}
          >
            {result.name}
          </span>
          {result.node_type === "function" && (
            <Link
              href={`/impact?fn=${encodeURIComponent(result.name)}`}
              className="flex items-center gap-0.5 text-xs font-medium transition-colors"
              style={{ color: "var(--accent-primary)" }}
            >
              Analyze impact <ArrowRight size={11} />
            </Link>
          )}
        </div>
        {result.file_path && (
          <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-muted)" }}>
            {result.file_path}
            {result.line > 0 && (
              <span style={{ color: "var(--text-subtle)" }}> :{result.line}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function GroupedResults({ results }: { results: SearchResult[] }) {
  const groups: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!groups[r.node_type]) groups[r.node_type] = [];
    groups[r.node_type].push(r);
  }

  // Preferred display order
  const order = ["function", "class", "file", "import"] as const;
  const groupEntries = [
    ...order.filter((t) => groups[t]?.length).map((t) => [t, groups[t]] as [string, SearchResult[]]),
    ...Object.entries(groups).filter(([k]) => !order.includes(k as (typeof order)[number])),
  ];

  return (
    <div className="flex flex-col gap-5">
      {groupEntries.map(([type, items]) => (
        <div key={type}>
          <div className="mb-2 flex items-center gap-2">
            <NodeBadge type={type as SearchResult["node_type"]} />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {items.length} {items.length === 1 ? "result" : "results"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {items.map((r) => (
              <SearchResultItem key={r.id} result={r} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchSection() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const { data: results, loading, error } = useSearch(debouncedQuery);

  return (
    <Section
      title="Code Search"
      description="Search across all indexed functions, classes, files, and imports."
    >
      {/* Input */}
      <div className="relative mb-4">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-subtle)" }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search functions, classes, files…"
          className="w-full rounded-md border py-2 pl-9 pr-4 text-sm outline-none transition-all"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "var(--accent-primary)";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 2px var(--accent-primary-subtle)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "var(--border)";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
        />
      </div>

      {/* States */}
      {!debouncedQuery && (
        <EmptyState
          title="Start typing to search"
          description="Results will appear as you type, grouped by type."
        />
      )}

      {debouncedQuery && loading && <LoadingState message="Searching…" />}

      {debouncedQuery && !loading && error && (
        <ErrorState message={error} title="Search failed" />
      )}

      {debouncedQuery && !loading && !error && results && results.length === 0 && (
        <EmptyState
          title="No results found"
          description={`Nothing matched "${debouncedQuery}". Try a different term.`}
        />
      )}

      {debouncedQuery && !loading && !error && results && results.length > 0 && (
        <GroupedResults results={results} />
      )}
    </Section>
  );
}

// ─── Function Inspector ─────────────────────────────────────────────────────

function CallersPanel({ fnName }: { fnName: string }) {
  const { data, loading, error } = useCallers(fnName);

  return (
    <Panel
      title="Callers"
      count={data?.length}
      icon={<Users size={14} />}
    >
      {loading && <LoadingState message="Loading callers…" />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && data && data.length === 0 && (
        <EmptyState title="No callers" description="Nothing calls this function in the indexed graph." />
      )}
      {!loading && !error && data && data.length > 0 && (
        <ul className="flex flex-col gap-2">
          {data.map((r: CallerRecord, i: number) => (
            <li
              key={i}
              className="rounded-md border p-2.5"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-1.5">
                <Mono>{r.caller}</Mono>
                <Link
                  href={`/impact?fn=${encodeURIComponent(r.caller)}`}
                  className="ml-auto flex-shrink-0 text-xs"
                  style={{ color: "var(--accent-primary)" }}
                  title="Analyze impact"
                >
                  <ArrowRight size={11} />
                </Link>
              </div>
              {r.caller_file && (
                <p className="mt-1 truncate text-xs" style={{ color: "var(--text-muted)" }}>
                  {r.caller_file}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function CalleesPanel({ fnName }: { fnName: string }) {
  const { data, loading, error } = useCallees(fnName);

  return (
    <Panel
      title="Callees"
      count={data?.length}
      icon={<GitMerge size={14} />}
    >
      {loading && <LoadingState message="Loading callees…" />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && data && data.length === 0 && (
        <EmptyState title="No callees" description="This function does not call others in the indexed graph." />
      )}
      {!loading && !error && data && data.length > 0 && (
        <ul className="flex flex-col gap-2">
          {data.map((r: CalleeRecord, i: number) => (
            <li
              key={i}
              className="rounded-md border p-2.5"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-1.5">
                <Mono>{r.callee}</Mono>
                <Link
                  href={`/impact?fn=${encodeURIComponent(r.callee)}`}
                  className="ml-auto flex-shrink-0 text-xs"
                  style={{ color: "var(--accent-primary)" }}
                  title="Analyze impact"
                >
                  <ArrowRight size={11} />
                </Link>
              </div>
              {r.callee_file && (
                <p className="mt-1 truncate text-xs" style={{ color: "var(--text-muted)" }}>
                  {r.callee_file}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function ImpactPanel({ fnName }: { fnName: string }) {
  const { data, loading, error } = useImpact(fnName);

  return (
    <Panel
      title="Impact Summary"
      count={data?.length}
      icon={<Zap size={14} />}
    >
      {loading && <LoadingState message="Loading impact…" />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && data && data.length === 0 && (
        <EmptyState title="No impact relationships" description="This function has no call edges in the graph." />
      )}
      {!loading && !error && data && data.length > 0 && (
        <>
          <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="font-medium" style={{ color: "var(--text)" }}>
              {data.length}
            </span>{" "}
            call {data.length === 1 ? "relationship" : "relationships"} involving{" "}
            <Mono>{fnName}</Mono>
          </p>
          <ul className="flex flex-col gap-1.5">
            {data.map((r: ImpactRecord, i: number) => (
              <li
                key={i}
                className="flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs"
                style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
              >
                <span
                  className="min-w-0 flex-1 truncate font-mono"
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
                  }}
                >
                  {r.source}
                </span>
                <ArrowRight size={11} style={{ color: "var(--text-subtle)", flexShrink: 0 }} />
                <span
                  className="min-w-0 flex-1 truncate font-mono"
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
                  }}
                >
                  {r.target}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  );
}

function FunctionInspector() {
  const [inputValue, setInputValue] = useState("");
  const [inspectedFn, setInspectedFn] = useState<string | null>(null);

  function handleInspect(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) setInspectedFn(trimmed);
  }

  return (
    <Section
      title="Function Inspector"
      description="Enter a function name to explore its callers, callees, and impact in the call graph."
    >
      {/* Input row */}
      <form onSubmit={handleInspect} className="mb-5 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter function name to inspect"
          className="flex-1 rounded-md border py-2 pl-3 pr-3 text-sm outline-none transition-all"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "var(--accent-primary)";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 2px var(--accent-primary-subtle)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "var(--border)";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
          style={{
            background: inputValue.trim() ? "var(--accent-primary)" : "var(--bg-muted)",
            color: inputValue.trim() ? "#ffffff" : "var(--text-subtle)",
            cursor: inputValue.trim() ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
          }}
        >
          Inspect
        </button>
      </form>

      {/* Result panels or empty state */}
      {!inspectedFn ? (
        <EmptyState
          title="No function selected"
          description="Enter a function name above and click Inspect to explore its call relationships."
        />
      ) : (
        <>
          <div
            className="mb-4 flex items-center gap-2 rounded-md border px-3 py-2"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Inspecting:
            </span>
            <Mono>{inspectedFn}</Mono>
            <Link
              href={`/impact?fn=${encodeURIComponent(inspectedFn)}`}
              className="ml-auto flex items-center gap-1 text-xs font-medium"
              style={{ color: "var(--accent-primary)" }}
            >
              Full impact analysis <ArrowRight size={11} />
            </Link>
          </div>

          {/* Three panels: stacked on mobile, side-by-side on md+ */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <CallersPanel fnName={inspectedFn} />
            <CalleesPanel fnName={inspectedFn} />
            <ImpactPanel fnName={inspectedFn} />
          </div>
        </>
      )}
    </Section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WorkspacePage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Page header */}
      <header>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "var(--accent-primary-subtle)" }}
          >
            <Layers size={16} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
              Code Intelligence Workspace
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Import repositories, explore the code graph, and analyze function relationships.
            </p>
          </div>
        </div>
      </header>

      {/* Repository import */}
      <Section
        title="Repository Import"
        description="Import a Git repository to index its code graph into Neo4j."
      >
        <RepositoryImportPanel />
      </Section>

      {/* Live stats */}
      <Section
        title="Live Graph Stats"
        description="Current state of the indexed code graph."
      >
        <LiveStatsRow />
      </Section>

      {/* Search */}
      <SearchSection />

      {/* Function Inspector */}
      <FunctionInspector />
    </div>
  );
}
