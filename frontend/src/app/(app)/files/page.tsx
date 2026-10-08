"use client";

import { useState } from "react";
import { File, RefreshCw } from "lucide-react";
import { useNodes } from "@/lib/api/hooks";
import { LoadingState, EmptyState, ErrorState } from "@/components/ui/States";
import { NodeBadge } from "@/components/ui/Badge";
import type { GraphNode } from "@/lib/api/types";
import Link from "next/link";

export default function FilesPage() {
  const { data, loading, error, refetch } = useNodes("file");
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [filterText, setFilterText] = useState("");

  const files = data?.nodes ?? [];

  const filtered = filterText
    ? files.filter(
        (f) =>
          f.name.toLowerCase().includes(filterText.toLowerCase()) ||
          f.file_path.toLowerCase().includes(filterText.toLowerCase()),
      )
    : files;

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden">
      {/* ── File list ───────────────────────────────────────────── */}
      <div
        className="flex w-72 flex-col border-r"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {/* Header */}
        <div
          className="border-b p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <h1
            className="mb-3 text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Files
          </h1>
          <input
            type="search"
            placeholder="Filter files..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="h-8 w-full rounded-md border bg-transparent px-3 text-xs outline-none"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <LoadingState message="Loading files..." />
          ) : error ? (
            <ErrorState
              message={error}
              action={
                <button
                  onClick={refetch}
                  className="text-xs flex items-center gap-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <RefreshCw size={12} />
                  Retry
                </button>
              }
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No files"
              description={filterText ? "No files match your filter." : "Import a repository to index files."}
            />
          ) : (
            <div className="flex flex-col gap-0.5">
              {filtered.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelected(file)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors"
                  style={{
                    background:
                      selected?.id === file.id
                        ? "var(--bg-subtle)"
                        : "transparent",
                    color: "var(--text)",
                  }}
                  onMouseEnter={(e) => {
                    if (selected?.id !== file.id) {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selected?.id !== file.id) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  <File size={12} className="flex-shrink-0" style={{ color: "var(--text-subtle)" }} />
                  <span className="truncate font-mono">{file.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {!loading && !error && (
          <div
            className="border-t px-4 py-2 text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-subtle)" }}
          >
            {filtered.length} {filtered.length === 1 ? "file" : "files"}
          </div>
        )}
      </div>

      {/* ── Detail panel ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {selected ? (
          <FileDetail file={selected} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <File size={32} style={{ color: "var(--text-subtle)", margin: "0 auto 12px" }} />
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Select a file
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-subtle)" }}>
                Choose a file from the list to view details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FileDetail({ file }: { file: GraphNode }) {
  const functions = useNodes("function");
  const classes = useNodes("class");

  const fileEntities = [
    ...(functions.data?.nodes.filter((n) => n.file_path === file.file_path) ?? []),
    ...(classes.data?.nodes.filter((n) => n.file_path === file.file_path) ?? []),
  ];

  return (
    <div className="p-6">
      {/* File header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <NodeBadge type="file" />
            <h2 className="text-base font-semibold" style={{ color: "var(--text)" }}>
              {file.name}
            </h2>
          </div>
          <p
            className="mt-1 font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {file.file_path}
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div
        className="mb-6 rounded-lg border"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "var(--border)" }}>
          {[
            { label: "Path", value: file.file_path },
            { label: "Node ID", value: file.id },
          ].map((item) => (
            <div key={item.label} className="p-4">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </p>
              <p
                className="mt-1 truncate font-mono text-xs font-medium"
                style={{ color: "var(--text)" }}
              >
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Entities in file */}
      {fileEntities.length > 0 && (
        <div>
          <h3
            className="mb-3 text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--text-subtle)" }}
          >
            Entities in this file
          </h3>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            {fileEntities.map((entity) => (
              <div
                key={entity.id}
                className="flex items-center justify-between border-b px-4 py-2.5 last:border-b-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <NodeBadge type={entity.node_type} />
                  <code className="text-xs" style={{ color: "var(--text)", fontFamily: "monospace" }}>
                    {entity.name}
                  </code>
                </div>
                <div className="flex items-center gap-4">
                  {entity.line > 0 && (
                    <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                      line {entity.line}
                    </span>
                  )}
                  {entity.node_type === "function" && (
                    <Link
                      href={`/impact?fn=${encodeURIComponent(entity.name)}`}
                      className="text-xs"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      Analyze →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fileEntities.length === 0 && !functions.loading && (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No functions or classes indexed for this file.
        </p>
      )}
    </div>
  );
}
