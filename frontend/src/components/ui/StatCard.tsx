interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  loading?: boolean;
}

export function StatCard({ label, value, description, loading }: StatCardProps) {
  return (
    <div
      className="rounded-lg border p-5"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
        {label}
      </p>
      {loading ? (
        <div className="skeleton mt-2 h-8 w-24 rounded" />
      ) : (
        <p className="mt-1.5 text-2xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      )}
      {description && !loading && (
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
