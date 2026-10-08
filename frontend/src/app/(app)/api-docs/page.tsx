import type { Metadata } from "next";
import { Code2, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "API Reference" };

const API_BASE = "http://127.0.0.1:8001";

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Code2 size={16} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
              API Reference
            </span>
          </div>
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            TENVOR REST API
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Base URL: <code className="font-mono text-xs" style={{ color: "var(--text)" }}>{API_BASE}</code>
          </p>
        </div>
        <a
          href={`${API_BASE}/docs`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          Swagger UI
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex flex-col gap-8">
        {ENDPOINTS.map((group, i) => (
          <div key={i}>
            <h2
              className="mb-4 text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-subtle)" }}
            >
              {group.group}
            </h2>
            <div className="flex flex-col gap-3">
              {group.endpoints.map((ep, j) => (
                <EndpointCard key={j} {...ep} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Endpoint card ─────────────────────────────────────────────────────────

const METHOD_COLORS: Record<string, string> = {
  GET:  "#16a34a",
  POST: "#2563eb",
};

function EndpointCard({
  method,
  path,
  description,
  params,
  response,
}: {
  method: string;
  path: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  response: string;
}) {
  return (
    <div
      className="rounded-lg border"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      {/* Endpoint line */}
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold"
          style={{
            background: `${METHOD_COLORS[method] ?? "#71717a"}15`,
            color: METHOD_COLORS[method] ?? "var(--text-muted)",
          }}
        >
          {method}
        </span>
        <code
          className="text-sm font-medium"
          style={{ color: "var(--text)", fontFamily: "monospace" }}
        >
          {path}
        </code>
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <p className="mb-3 text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>

        {/* Parameters */}
        {params && params.length > 0 && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-subtle)" }}>
              Parameters
            </p>
            <div className="flex flex-col gap-1.5">
              {params.map((p) => (
                <div key={p.name} className="flex items-start gap-3 text-xs">
                  <code
                    className="w-28 flex-shrink-0 font-medium"
                    style={{ color: "var(--text)", fontFamily: "monospace" }}
                  >
                    {p.name}
                  </code>
                  <span style={{ color: "var(--text-subtle)" }}>{p.type}</span>
                  <span style={{ color: "var(--text-muted)" }}>{p.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Response */}
        <div>
          <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--text-subtle)" }}>
            Response
          </p>
          <pre
            className="overflow-x-auto rounded-md p-3 text-xs"
            style={{
              background: "var(--bg-subtle)",
              color: "var(--text)",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
          >
            {response}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ─── Endpoint data ─────────────────────────────────────────────────────────

const ENDPOINTS = [
  {
    group: "Health",
    endpoints: [
      {
        method: "GET",
        path: "/health",
        description: "Returns the API status and version information.",
        response: `{ "status": "ok", "service": "tenvor-api", "version": "0.1.0" }`,
      },
    ],
  },
  {
    group: "Repositories",
    endpoints: [
      {
        method: "POST",
        path: "/repositories/import",
        description: "Clone a GitHub repository and scan it for files and language statistics.",
        params: [
          { name: "url", type: "string", description: "GitHub repository URL" },
        ],
        response: `{
  "repository_id": "uuid",
  "path": "/data/repositories/uuid",
  "file_count": 42,
  "languages": { "Python": 12, "TypeScript": 8 },
  "files": ["src/main.py", "..."]
}`,
      },
    ],
  },
  {
    group: "Graph",
    endpoints: [
      {
        method: "GET",
        path: "/graph/nodes",
        description: "Retrieve all nodes in the code graph. Optionally filter by type.",
        params: [
          {
            name: "node_type",
            type: "string?",
            description: "file | function | class | import",
          },
        ],
        response: `{
  "nodes": [
    { "id": "...", "node_type": "function", "name": "parse_file",
      "file_path": "app/parser.py", "line": 12 }
  ]
}`,
      },
      {
        method: "GET",
        path: "/graph/relationships",
        description: "Retrieve all relationships (edges) in the code graph.",
        response: `{
  "relationships": [
    { "source": "parse_file", "source_type": "function",
      "relation": "calls", "target": "build_graph", "target_type": "function" }
  ]
}`,
      },
      {
        method: "GET",
        path: "/graph/stats",
        description: "Returns aggregate statistics about the graph.",
        response: `{ "nodes": 142, "edges": 89 }`,
      },
      {
        method: "GET",
        path: "/graph/search",
        description: "Search nodes by name or file path. Case-insensitive substring match.",
        params: [
          { name: "q", type: "string", description: "Search term (required, min length 1)" },
        ],
        response: `{
  "query": "parse",
  "results": [
    { "id": "...", "name": "parse_file", "node_type": "function",
      "file_path": "app/parser.py", "line": 12 }
  ]
}`,
      },
    ],
  },
  {
    group: "Functions",
    endpoints: [
      {
        method: "GET",
        path: "/graph/functions/{function_name}/callers",
        description: "Returns all functions that call the specified function.",
        response: `{
  "function": "parse_file",
  "callers": [
    { "caller": "index_repository", "caller_file": "app/indexer.py",
      "target": "parse_file", "target_file": "app/parser.py" }
  ]
}`,
      },
      {
        method: "GET",
        path: "/graph/functions/{function_name}/callees",
        description: "Returns all functions that the specified function calls.",
        response: `{
  "function": "parse_file",
  "callees": [
    { "source": "parse_file", "source_file": "app/parser.py",
      "callee": "build_graph", "callee_file": "app/builder.py" }
  ]
}`,
      },
      {
        method: "GET",
        path: "/graph/functions/{function_name}/impact",
        description:
          "Returns all call relationships involving the specified function as source or target.",
        response: `{
  "function": "parse_file",
  "impact": [
    { "source": "index_repository", "source_file": "...",
      "target": "parse_file", "target_file": "..." }
  ]
}`,
      },
    ],
  },
];
