// ─── Health ────────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

// ─── Repository ────────────────────────────────────────────────────────────

export interface ImportRepositoryRequest {
  url: string;
}

export interface ImportRepositoryResponse {
  repository_id: string;
  path: string;
  file_count: number;
  languages: Record<string, number>;
  files: string[];
}

// ─── Graph Nodes ───────────────────────────────────────────────────────────

export type NodeType = "file" | "function" | "class" | "import";

export interface GraphNode {
  id: string;
  node_type: NodeType;
  name: string;
  file_path: string;
  line: number;
}

export interface NodesResponse {
  nodes: GraphNode[];
}

// ─── Graph Relationships ───────────────────────────────────────────────────

export type RelationType = "calls" | "defined_in" | "imports";

export interface GraphRelationship {
  source: string;
  source_type: NodeType;
  relation: RelationType;
  target: string;
  target_type: NodeType;
}

export interface RelationshipsResponse {
  relationships: GraphRelationship[];
}

// ─── Graph Stats ───────────────────────────────────────────────────────────

export interface GraphStats {
  nodes: number;
  edges: number;
}

// ─── Search ────────────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  name: string;
  node_type: NodeType;
  file_path: string;
  line: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
}

// ─── Callers / Callees ─────────────────────────────────────────────────────

export interface CallerRecord {
  caller: string;
  caller_file: string;
  target: string;
  target_file: string;
}

export interface CallersResponse {
  function: string;
  callers: CallerRecord[];
}

export interface CalleeRecord {
  source: string;
  source_file: string;
  callee: string;
  callee_file: string;
}

export interface CalleesResponse {
  function: string;
  callees: CalleeRecord[];
}

// ─── Impact ────────────────────────────────────────────────────────────────

export interface ImpactRecord {
  source: string;
  source_file: string;
  target: string;
  target_file: string;
}

export interface ImpactResponse {
  function: string;
  impact: ImpactRecord[];
}

// ─── API Error ─────────────────────────────────────────────────────────────

export interface ApiError {
  detail: string;
}
