"use client";

import { useEffect, useState } from "react";
import { Activity, Box } from "lucide-react";
import type { GraphStats } from "@/lib/api/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

type MetricsState =
  | { status: "loading" }
  | { status: "success"; data: GraphStats }
  | { status: "error" };

// ─── Skeleton block ────────────────────────────────────────────────────────

function Skeleton({ width, height = 28 }: { width: number; height?: number }) {
  return (
    <div
      className="skeleton rounded-md"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// ─── Single metric card ────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | undefined;
  loading: boolean;
  icon: React.ElementType;
}

function MetricCard({ label, value, loading, icon: Icon }: MetricCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl border p-6"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-subtle)",
        }}
      >
        <Icon size={17} style={{ color: "var(--accent-primary)" }} />
      </div>
      {loading ? (
        <>
          <Skeleton width={72} height={32} />
          <Skeleton width={96} height={14} />
        </>
      ) : (
        <>
          <p
            className="text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
          >
            {value ?? "--"}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {label}
          </p>
        </>
      )}
    </div>
  );
}

// ─── LandingMetrics ────────────────────────────────────────────────────────

export default function LandingMetrics() {
  const [state, setState] = useState<MetricsState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(`${BASE_URL}/graph/stats`, {
          // Don't cache — show live data on every page load
          cache: "no-store",
          signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as GraphStats;
        if (!cancelled) setState({ status: "success", data });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    void fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = state.status === "loading";
  const nodes =
    state.status === "success" ? state.data.nodes.toLocaleString() : undefined;
  const edges =
    state.status === "success" ? state.data.edges.toLocaleString() : undefined;

  return (
    <section
      className="py-20"
      style={{ background: "var(--bg)" }}
      aria-label="Live codebase metrics"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--accent-primary)" }}
        >
          Live codebase metrics
        </p>
        <h2
          className="mt-3 max-w-xl text-3xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
        >
          Indexed and queryable in real time.
        </h2>
        <p
          className="mt-3 max-w-lg text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Statistics pulled live from the running backend. Import a repository to
          populate the graph.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total graph nodes"
            value={nodes}
            loading={loading}
            icon={Box}
          />
          <MetricCard
            label="Relationships"
            value={edges}
            loading={loading}
            icon={Activity}
          />
          {/* Placeholder cards: additional metrics can be added as the API expands */}
          <div
            className="flex flex-col gap-3 rounded-xl border p-6 sm:col-span-2 lg:col-span-2"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-elevated)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              What is the graph?
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Every indexed file, function, class, and import becomes a{" "}
              <strong style={{ color: "var(--text)" }}>node</strong>. Every call
              relationship, definition, and import link becomes an{" "}
              <strong style={{ color: "var(--text)" }}>edge</strong>. The result
              is a queryable map of your entire codebase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
