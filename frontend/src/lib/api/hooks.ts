"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getHealth,
  getNodes,
  getRelationships,
  getGraphStats,
  searchGraph,
  getCallers,
  getCallees,
  getImpact,
  importRepository,
  ApiClientError,
} from "./client";
import type {
  HealthResponse,
  GraphNode,
  GraphRelationship,
  GraphStats,
  SearchResult,
  CallerRecord,
  CalleeRecord,
  ImpactRecord,
  ImportRepositoryResponse,
  NodeType,
} from "./types";

// ─── Generic async hook ────────────────────────────────────────────────────

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    fn()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "An unexpected error occurred.";
        setState({ data: null, loading: false, error: message });
      });
  }, [fn]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, refetch };
}

// ─── Health ────────────────────────────────────────────────────────────────

export function useHealth(): AsyncState<HealthResponse> & {
  refetch: () => void;
} {
  return useAsync(getHealth, []);
}

// ─── Stats ─────────────────────────────────────────────────────────────────

export function useGraphStats(): AsyncState<GraphStats> & {
  refetch: () => void;
} {
  return useAsync(getGraphStats, []);
}

// ─── Nodes ─────────────────────────────────────────────────────────────────

export function useNodes(
  nodeType?: NodeType,
): AsyncState<{ nodes: GraphNode[] }> & { refetch: () => void } {
  return useAsync(() => getNodes(nodeType), [nodeType]);
}

// ─── Relationships ─────────────────────────────────────────────────────────

export function useRelationships(): AsyncState<{
  relationships: GraphRelationship[];
}> & { refetch: () => void } {
  return useAsync(getRelationships, []);
}

// ─── Search ────────────────────────────────────────────────────────────────

export function useSearch(query: string): AsyncState<SearchResult[]> & {
  refetch: () => void;
} {
  const [state, setState] = useState<AsyncState<SearchResult[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback((q: string) => {
    if (!q.trim()) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    searchGraph(q)
      .then(({ results }) =>
        setState({ data: results, loading: false, error: null }),
      )
      .catch((err) => {
        const message =
          err instanceof ApiClientError ? err.message : "Search failed.";
        setState({ data: null, loading: false, error: message });
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => run(query), 300);
    return () => clearTimeout(timeout);
  }, [query, run]);

  return { ...state, refetch: () => run(query) };
}

// ─── Callers ───────────────────────────────────────────────────────────────

export function useCallers(
  functionName: string | null,
): AsyncState<CallerRecord[]> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<CallerRecord[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback(() => {
    if (!functionName) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    getCallers(functionName)
      .then(({ callers }) =>
        setState({ data: callers, loading: false, error: null }),
      )
      .catch((err) => {
        const message =
          err instanceof ApiClientError ? err.message : "Failed to load callers.";
        setState({ data: null, loading: false, error: message });
      });
  }, [functionName]);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
}

// ─── Callees ───────────────────────────────────────────────────────────────

export function useCallees(
  functionName: string | null,
): AsyncState<CalleeRecord[]> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<CalleeRecord[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback(() => {
    if (!functionName) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    getCallees(functionName)
      .then(({ callees }) =>
        setState({ data: callees, loading: false, error: null }),
      )
      .catch((err) => {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "Failed to load callees.";
        setState({ data: null, loading: false, error: message });
      });
  }, [functionName]);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
}

// ─── Impact ────────────────────────────────────────────────────────────────

export function useImpact(
  functionName: string | null,
): AsyncState<ImpactRecord[]> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<ImpactRecord[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback(() => {
    if (!functionName) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    getImpact(functionName)
      .then(({ impact }) =>
        setState({ data: impact, loading: false, error: null }),
      )
      .catch((err) => {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "Failed to load impact.";
        setState({ data: null, loading: false, error: message });
      });
  }, [functionName]);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
}

// ─── Import Repository ─────────────────────────────────────────────────────

interface ImportState {
  data: ImportRepositoryResponse | null;
  loading: boolean;
  error: string | null;
}

export function useImportRepository(): ImportState & {
  importRepo: (url: string) => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<ImportState>({
    data: null,
    loading: false,
    error: null,
  });

  const importRepo = useCallback(async (url: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await importRepository({ url });
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof ApiClientError ? err.message : "Import failed.";
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, importRepo, reset };
}
