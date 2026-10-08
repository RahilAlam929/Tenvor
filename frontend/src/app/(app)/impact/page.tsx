"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Zap, RefreshCw, ArrowRight } from "lucide-react";
import { useCallers, useCallees, useImpact } from "@/lib/api/hooks";
import { LoadingState, EmptyState, ErrorState } from "@/components/ui/States";
import { Badge } from "@/components/ui/Badge";

function ImpactInner() {
  const searchParams = useSearchParams();
  const fn = searchParams.get("fn");

  const callers = useCallers(fn);
  const callees = useCallees(fn);
  const impact = useImpact(fn);

  if (!fn) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <EmptyState
          title="No function specified"
          description="Select a function to view its impact analysis."
        />
      </div>
    );
  }

  const loading = callers.loading || callees.loading || impact.loading;
  const error = callers.error || callees.error || impact.error;

  const totalImpact = impact.data?.length ?? 0;
  const directCallers = callers.data?.length ?? 0;
  const directCallees = callees.data?.length ?? 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            >
              <Zap size={16} style={{ color: "var(--text-muted)" }} />
            </div>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
            >
              Impact Analysis
            </h1>
          </div>
          <code
            className="text-sm font-medium"
            style={{ color: "var(--text-muted)", fontFamily: "monospace" }}
          >
            {fn}
          </code>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Analyzing impact..." />
      ) : error ? (
        <ErrorState
          message={error}
          action={
            <button
              onClick={() => {
                callers.refetch();
                callees.refetch();
                impact.refetch();
              }}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
              style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
            >
              <RefreshCw size={14} />
              Retry
            </button>
          }
        />
      ) : (
        <>
          {/* Impact summary */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div
              className="rounded-lg border p-4"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
                Direct Callers
              </p>
              <p className="mt-1.5 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                {directCallers}
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
                Direct Callees
              </p>
              <p className="mt-1.5 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                {directCallees}
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
            >
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
                Total Impact
              </p>
              <p className="mt-1.5 text-2xl font-semibold" style={{ color: "var(--text)" }}>
                {totalImpact}
              </p>
            </div>
          </div>

          {/* Callers */}
          <Section
            title="What calls this function"
            items={callers.data ?? []}
            renderItem={(c) => (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant="success">caller</Badge>
                  <code
                    className="text-sm font-medium"
                    style={{ color: "var(--text)", fontFamily: "monospace" }}
                  >
                    {c.caller}
                  </code>
                </div>
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {c.caller_file}
                </p>
              </div>
            )}
            emptyText="No callers found. This function may not be called within the indexed codebase."
          />

          {/* Callees */}
          <Section
            title="What this function calls"
            items={callees.data ?? []}
            renderItem={(c) => (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant="info">callee</Badge>
                  <code
                    className="text-sm font-medium"
                    style={{ color: "var(--text)", fontFamily: "monospace" }}
                  >
                    {c.callee}
                  </code>
                </div>
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {c.callee_file}
                </p>
              </div>
            )}
            emptyText="No callees found. This function may not call other indexed functions."
          />

          {/* Full impact chain */}
          <Section
            title="Full impact relationships"
            items={impact.data ?? []}
            renderItem={(i) => (
              <div className="flex items-center gap-3 text-xs">
                <code
                  className="font-medium"
                  style={{ color: "var(--text)", fontFamily: "monospace" }}
                >
                  {i.source}
                </code>
                <ArrowRight size={12} style={{ color: "var(--text-subtle)" }} />
                <code
                  className="font-medium"
                  style={{ color: "var(--text)", fontFamily: "monospace" }}
                >
                  {i.target}
                </code>
              </div>
            )}
            emptyText="No impact relationships found."
          />
        </>
      )}
    </div>
  );
}

export default function ImpactPage() {
  return (
    <Suspense>
      <ImpactInner />
    </Suspense>
  );
}

// ─── Section helper ────────────────────────────────────────────────────────

function Section<T>({
  title,
  items,
  renderItem,
  emptyText,
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyText: string;
}) {
  return (
    <div className="mb-6">
      <h2
        className="mb-3 text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--text-subtle)" }}
      >
        {title}
      </h2>
      <div
        className="rounded-lg border"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            {emptyText}
          </div>
        ) : (
          <div>
            {items.map((item, i) => (
              <div
                key={i}
                className="border-b px-4 py-3 last:border-b-0"
                style={{ borderColor: "var(--border)" }}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
