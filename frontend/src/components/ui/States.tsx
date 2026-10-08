import { AlertCircle, Inbox, Loader2 } from "lucide-react";

// ─── EmptyState ────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border"
        style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
      >
        <Inbox size={20} style={{ color: "var(--text-subtle)" }} />
      </div>
      <h3 className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-xs text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── LoadingState ──────────────────────────────────────────────────────────

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 size={20} className="animate-spin" style={{ color: "var(--text-subtle)" }} />
      <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
        {message}
      </p>
    </div>
  );
}

// ─── ErrorState ────────────────────────────────────────────────────────────

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border"
        style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
      >
        <AlertCircle size={20} style={{ color: "var(--danger)" }} />
      </div>
      <h3 className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--text-muted)" }}>
        {message}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
