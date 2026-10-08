"use client";

import { useState } from "react";
import { GitFork, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useImportRepository } from "@/lib/api/hooks";

export default function RepositoriesPage() {
  const [url, setUrl] = useState("");
  const { data, loading, error, importRepo, reset } = useImportRepository();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    await importRepo(url.trim());
  };

  const handleReset = () => {
    reset();
    setUrl("");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          Repositories
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Import a GitHub repository to index its codebase.
        </p>
      </div>

      {/* ── Import form ─────────────────────────────────────────── */}
      {!data && (
        <div
          className="rounded-xl border p-8"
          style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
        >
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
          >
            <GitFork size={20} style={{ color: "var(--text-muted)" }} />
          </div>

          <h2
            className="mb-2 text-center text-base font-semibold"
            style={{ color: "var(--text)" }}
          >
            Import repository
          </h2>
          <p
            className="mx-auto mb-6 max-w-md text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Provide a GitHub repository URL. TENVOR will clone it, parse files,
            extract functions and classes, and build the code graph.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="url"
              placeholder="https://github.com/owner/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
              className="h-10 rounded-md border bg-transparent px-3 text-sm outline-none transition-colors"
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

            {error && (
              <div
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--danger)",
                  background: "rgba(220,38,38,0.05)",
                  color: "var(--danger)",
                }}
              >
                <XCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-opacity disabled:opacity-50"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Importing...
                </>
              ) : (
                "Import repository"
              )}
            </button>
          </form>
        </div>
      )}

      {/* ── Success result ──────────────────────────────────────── */}
      {data && (
        <div
          className="rounded-xl border p-8"
          style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
        >
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--success)" }}
          >
            <CheckCircle size={20} style={{ color: "var(--success)" }} />
          </div>

          <h2
            className="mb-2 text-center text-base font-semibold"
            style={{ color: "var(--text)" }}
          >
            Import complete
          </h2>
          <p
            className="mx-auto mb-6 max-w-md text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Repository successfully cloned and scanned.
          </p>

          {/* Repository info */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between border-b py-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Repository ID
              </span>
              <code className="text-xs font-medium" style={{ color: "var(--text)", fontFamily: "monospace" }}>
                {data.repository_id}
              </code>
            </div>

            <div className="flex items-center justify-between border-b py-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Files
              </span>
              <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                {data.file_count.toLocaleString()}
              </span>
            </div>

            <div className="flex items-start justify-between border-b py-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Languages
              </span>
              <div className="flex flex-wrap justify-end gap-1.5 text-xs">
                {Object.entries(data.languages).length > 0 ? (
                  Object.entries(data.languages).map(([lang, count]) => (
                    <span
                      key={lang}
                      className="rounded px-2 py-0.5"
                      style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
                    >
                      {lang} ({count})
                    </span>
                  ))
                ) : (
                  <span style={{ color: "var(--text-subtle)" }}>None detected</span>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between py-2">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Path
              </span>
              <code className="max-w-xs truncate text-xs" style={{ color: "var(--text-subtle)", fontFamily: "monospace" }}>
                {data.path}
              </code>
            </div>
          </div>

          {/* Next steps */}
          <div
            className="mb-4 rounded-lg border p-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Next steps
            </p>
            <ul className="space-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <li>• The repository has been cloned but not yet parsed.</li>
              <li>• Parsing and graph indexing require additional backend processing.</li>
              <li>• Visit <a href="/graph" className="underline" style={{ color: "var(--text)" }}>/graph</a> to explore indexed content.</li>
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Import another repository
          </button>
        </div>
      )}
    </div>
  );
}
