"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X, RefreshCw, Loader2, Search } from "lucide-react";
import { useNodes, useRelationships, useCallers, useCallees } from "@/lib/api/hooks";
import { NodeBadge } from "@/components/ui/Badge";
import { ErrorState, LoadingState } from "@/components/ui/States";
import type { GraphNode, NodeType } from "@/lib/api/types";

const NODE_COLORS: Record<NodeType, string> = {
  file:     "#657c78",
  function: "#53775d",
  class:    "#d88c55",
  import:   "#798178",
};

const NODE_TYPE_LABELS: Record<NodeType, string> = {
  file: "File",
  function: "Function",
  class: "Class",
  import: "Import",
};

export default function GraphPage() {
  const { data, loading, error, refetch } = useNodes();
  const rels = useRelationships();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filter, setFilter] = useState<NodeType | "all">("all");
  const [search, setSearch] = useState("");

  const flowNodes = useMemo<Node[]>(() => {
    if (!data?.nodes) return [];
    const filtered = data.nodes.filter((n) => {
      if (filter !== "all" && n.node_type !== filter) return false;
      if (search && !n.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    // Simple force-layout approximation: grid
    const COLS = Math.ceil(Math.sqrt(filtered.length));
    return filtered.map((node, i) => ({
      id: node.id,
      position: {
        x: (i % COLS) * 200,
        y: Math.floor(i / COLS) * 100,
      },
      data: { label: node.name, nodeType: node.node_type, raw: node },
      style: {
        background: `color-mix(in srgb, ${NODE_COLORS[node.node_type as NodeType] ?? "#71717a"} 15%, var(--bg-elevated))`,
        border: `1px solid ${
          selectedNode?.id === node.id
            ? "#d88c55"
            : `${NODE_COLORS[node.node_type as NodeType] ?? "#71717a"}40`
        }`,
        boxShadow: selectedNode?.id === node.id
          ? "0 0 0 2px rgba(216, 140, 85, 0.20)"
          : "none",
        color: "var(--text)",
        borderRadius: "3px",
        fontSize: "11px",
        fontFamily: "var(--font-geist-mono, monospace)",
        padding: "6px 10px",
        minWidth: "120px",
        maxWidth: "200px",
      },
    }));
  }, [data, filter, search, selectedNode]);

  const nodeIds = useMemo(() => new Set(flowNodes.map((n) => n.id)), [flowNodes]);

  const flowEdges = useMemo<Edge[]>(() => {
    if (!rels.data?.relationships) return [];
    return rels.data.relationships
      .filter((r) => nodeIds.has(r.source) || nodeIds.has(r.target))
      .map((r, i) => ({
        id: `e-${i}`,
        source: r.source,
        target: r.target,
        label: r.relation,
        style: { stroke: "#9ba398", strokeWidth: 1.15 },
        labelStyle: { fontSize: "9px", fill: "var(--text-subtle)" },
        animated: r.relation === "calls",
      }));
  }, [rels.data, nodeIds]);

  const [nodes, , onNodesChange] = useNodesState(flowNodes);
  const [edges, , onEdgesChange] = useEdgesState(flowEdges);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    const raw = (node.data as { raw: GraphNode }).raw;
    setSelectedNode(raw);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-52px)] items-center justify-center">
        <LoadingState message="Loading graph data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-52px)] items-center justify-center">
        <ErrorState
          message={error}
          action={
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
              style={{ background: "var(--bg-subtle)", color: "var(--text)" }}
            >
              <RefreshCw size={14} />
              Retry
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden">
      {/* Graph canvas */}
      <div className="relative flex-1">
        {/* Toolbar */}
        <div
          className="absolute left-4 top-4 z-10 flex flex-col gap-2"
          style={{ pointerEvents: "all" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-sm border px-3 py-1.5"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <Search size={13} style={{ color: "var(--text-subtle)" }} />
            <input
              type="search"
              placeholder="Filter nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 bg-transparent text-xs outline-none"
              style={{ color: "var(--text)" }}
            />
          </div>

          {/* Type filter */}
          <div
            className="flex flex-wrap gap-1.5 rounded-sm border p-2"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <FilterChip
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {(["file", "function", "class", "import"] as NodeType[]).map((t) => (
              <FilterChip
                key={t}
                label={NODE_TYPE_LABELS[t]}
                active={filter === t}
                color={NODE_COLORS[t]}
                onClick={() => setFilter(filter === t ? "all" : t)}
              />
            ))}
          </div>

          {/* Stats */}
          <div
            className="rounded-sm border px-3 py-1.5 text-xs"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            {nodes.length} nodes · {edges.length} edges
          </div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
          style={{ background: "var(--bg)" }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#d9d8cc" />
          <Controls />
          <MiniMap
            nodeColor={(n) =>
              NODE_COLORS[(n.data as { nodeType: NodeType }).nodeType] ?? "#71717a"
            }
          />
        </ReactFlow>
      </div>

      {/* Inspector panel */}
      {selectedNode && (
        <NodeInspector node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
}

// ─── Filter chip ───────────────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm border px-2 py-0.5 text-xs transition-colors"
      style={{
        background: active
          ? color
            ? `${color}20`
            : "var(--bg-muted)"
          : "transparent",
        color: active ? (color ?? "var(--text)") : "var(--text-muted)",
        border: `1px solid ${active ? (color ?? "var(--border)") + "60" : "transparent"}`,
      }}
    >
      {label}
    </button>
  );
}

// ─── Node Inspector ────────────────────────────────────────────────────────

function NodeInspector({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  const callers = useCallers(node.node_type === "function" ? node.name : null);
  const callees = useCallees(node.node_type === "function" ? node.name : null);

  return (
    <aside
      className="flex h-full w-72 flex-col overflow-y-auto border-l"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Inspector
        </span>
        <button
          onClick={onClose}
          className="rounded p-1 transition-colors"
          style={{ color: "var(--text-muted)" }}
          aria-label="Close inspector"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Node info */}
      <div className="border-b p-4" style={{ borderColor: "var(--border)" }}>
        <div className="mb-3 flex items-center gap-2">
          <NodeBadge type={node.node_type} />
        </div>
        <p className="font-mono text-sm font-medium" style={{ color: "var(--text)" }}>
          {node.name}
        </p>
        {node.file_path && (
          <p className="mt-1 truncate font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {node.file_path}
          </p>
        )}
        {node.line > 0 && (
          <p className="mt-1 text-xs" style={{ color: "var(--text-subtle)" }}>
            Line {node.line}
          </p>
        )}
      </div>

      {/* Callers */}
      {node.node_type === "function" && (
        <>
          <InspectorSection
            title="Callers"
            loading={callers.loading}
            items={callers.data ?? []}
            renderItem={(item) => (
              <span className="font-mono text-xs" style={{ color: "var(--text)" }}>
                {item.caller}
              </span>
            )}
            emptyText="No callers found"
          />

          <InspectorSection
            title="Callees"
            loading={callees.loading}
            items={callees.data ?? []}
            renderItem={(item) => (
              <span className="font-mono text-xs" style={{ color: "var(--text)" }}>
                {item.callee}
              </span>
            )}
            emptyText="No callees found"
          />

          <div className="p-4">
            <a
              href={`/impact?fn=${encodeURIComponent(node.name)}`}
              className="flex w-full items-center justify-center rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Full impact analysis →
            </a>
          </div>
        </>
      )}
    </aside>
  );
}

function InspectorSection<T>({
  title,
  loading,
  items,
  renderItem,
  emptyText,
}: {
  title: string;
  loading: boolean;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyText: string;
}) {
  return (
    <div className="border-b p-4" style={{ borderColor: "var(--border)" }}>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
        {title}
      </p>
      {loading ? (
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Loader2 size={12} className="animate-spin" />
          Loading...
        </div>
      ) : items.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
          {emptyText}
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {items.map((item, i) => (
            <li key={i}>{renderItem(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
