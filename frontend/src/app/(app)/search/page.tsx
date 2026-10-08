"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { searchGraph } from "@/lib/api/client";
import { NodeBadge } from "@/components/ui/Badge";
import { EmptyState, ErrorState } from "@/components/ui/States";
import type { SearchResult } from "@/lib/api/types";
import { ApiClientError } from "@/lib/api/client";
import { Suspense } from "react";
import Link from "next/link";

// Inner component that uses useSearchParams
function SearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const data = await searchGraph(q);
      setResults(data.results);
      router.replace(`/search?q=${encodeURIComponent(q)}`, { scroll: false });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      const message =
        err instanceof ApiClientError ? err.message : "Search failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Initial search if URL has query
  useEffect(() => {
    if (initialQuery) {
      void runSearch(initialQuery);
    }
    // Focus input on mount
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => {
      if (query !== initialQuery || results === null) {
        void runSearch(query);
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const grouped = groupByType(results ?? []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Search input */}
      <div className="mb-8">
        <h1
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          Search
        </h1>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-subtle)" }}
          />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search functions, classes, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-lg border bg-transparent pl-10 pr-4 text-sm outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--bg-elevated)",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--text-subtle)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
            }}
          />
          {loading && (
            <Loader2
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin"
              style={{ color: "var(--text-subtle)" }}
            />
          )}
        </div>
      </div>

      {/* Results */}
      {error ? (
        <ErrorState message={error} />
      ) : !query.trim() ? (
        <EmptyState
          title="Search your codebase"
          description="Type a function name, class, or file path to search across all indexed nodes."
        />
      ) : loading && !results ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Loader2 size={14} className="animate-spin" />
          Searching...
        </div>
      ) : results?.length === 0 ? (
        <EmptyState
          title="No results"
          description={`No nodes found matching "${query}".`}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Summary */}
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {results?.length ?? 0} results for &quot;{query}&quot;
          </p>

          {/* Groups */}
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <h2
                className="mb-3 text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-subtle)" }}
              >
                {type}s ({items.length})
              </h2>
              <div
                className="overflow-hidden rounded-lg border"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
              >
                {items.map((result) => (
                  <div
                    key={result.id}
                    className="group flex items-center justify-between border-b px-4 py-3 last:border-b-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <NodeBadge type={result.node_type} />
                        <code
                          className="text-sm font-medium"
                          style={{ color: "var(--text)", fontFamily: "monospace" }}
                        >
                          {highlightMatch(result.name, query)}
                        </code>
                      </div>
                      {result.file_path && (
                        <p
                          className="truncate font-mono text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {result.file_path}
                          {result.line ? `:${result.line}` : ""}
                        </p>
                      )}
                    </div>

                    {result.node_type === "function" && (
                      <Link
                        href={`/impact?fn=${encodeURIComponent(result.name)}`}
                        className="ml-4 flex flex-shrink-0 items-center gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Analyze
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function groupByType(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const key = r.node_type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function highlightMatch(text: string, _query: string): string {
  return text; // Plain text — highlighting would need dangerouslySetInnerHTML
}
