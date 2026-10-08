import type {
  HealthResponse,
  ImportRepositoryRequest,
  ImportRepositoryResponse,
  NodesResponse,
  RelationshipsResponse,
  GraphStats,
  SearchResponse,
  CallersResponse,
  CalleesResponse,
  ImpactResponse,
  NodeType,
} from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new ApiClientError(
      0,
      "Unable to connect to the TENVOR API. Make sure the backend is running.",
    );
  }

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body.detail) detail = body.detail;
    } catch {
      // ignore parse errors
    }
    throw new ApiClientError(response.status, detail);
  }

  return response.json() as Promise<T>;
}

// ─── Health ────────────────────────────────────────────────────────────────

export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}

// ─── Repositories ──────────────────────────────────────────────────────────

export function importRepository(
  body: ImportRepositoryRequest,
): Promise<ImportRepositoryResponse> {
  return request<ImportRepositoryResponse>("/repositories/import", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ─── Graph Nodes ───────────────────────────────────────────────────────────

export function getNodes(nodeType?: NodeType): Promise<NodesResponse> {
  const qs = nodeType ? `?node_type=${encodeURIComponent(nodeType)}` : "";
  return request<NodesResponse>(`/graph/nodes${qs}`);
}

// ─── Graph Relationships ───────────────────────────────────────────────────

export function getRelationships(): Promise<RelationshipsResponse> {
  return request<RelationshipsResponse>("/graph/relationships");
}

// ─── Graph Stats ───────────────────────────────────────────────────────────

export function getGraphStats(): Promise<GraphStats> {
  return request<GraphStats>("/graph/stats");
}

// ─── Search ────────────────────────────────────────────────────────────────

export function searchGraph(q: string): Promise<SearchResponse> {
  return request<SearchResponse>(
    `/graph/search?q=${encodeURIComponent(q)}`,
  );
}

// ─── Callers / Callees / Impact ────────────────────────────────────────────

export function getCallers(functionName: string): Promise<CallersResponse> {
  return request<CallersResponse>(
    `/graph/functions/${encodeURIComponent(functionName)}/callers`,
  );
}

export function getCallees(functionName: string): Promise<CalleesResponse> {
  return request<CalleesResponse>(
    `/graph/functions/${encodeURIComponent(functionName)}/callees`,
  );
}

export function getImpact(functionName: string): Promise<ImpactResponse> {
  return request<ImpactResponse>(
    `/graph/functions/${encodeURIComponent(functionName)}/impact`,
  );
}
