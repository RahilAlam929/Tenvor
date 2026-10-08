import type { NodeType } from "@/lib/api/types";

// ─── Badge ─────────────────────────────────────────────────────────────────

const NODE_TYPE_COLORS: Record<NodeType, { bg: string; text: string }> = {
  file:     { bg: "rgba(37,99,235,0.1)",  text: "#2563eb" },
  function: { bg: "rgba(22,163,74,0.1)",  text: "#16a34a" },
  class:    { bg: "rgba(202,138,4,0.1)",  text: "#ca8a04" },
  import:   { bg: "rgba(147,51,234,0.1)", text: "#9333ea" },
};

interface NodeBadgeProps {
  type: NodeType;
}

export function NodeBadge({ type }: NodeBadgeProps) {
  const colors = NODE_TYPE_COLORS[type] ?? { bg: "var(--bg-subtle)", text: "var(--text-muted)" };
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium"
      style={{ background: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const BADGE_VARIANTS = {
  default: { bg: "var(--bg-subtle)",      color: "var(--text-muted)" },
  success: { bg: "rgba(22,163,74,0.1)",   color: "#16a34a" },
  warning: { bg: "rgba(202,138,4,0.1)",   color: "#ca8a04" },
  danger:  { bg: "rgba(220,38,38,0.1)",   color: "#dc2626" },
  info:    { bg: "rgba(37,99,235,0.1)",   color: "#2563eb" },
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const style = BADGE_VARIANTS[variant];
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      {children}
    </span>
  );
}

// ─── CodeBlock ─────────────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
    >
      {language && (
        <div
          className="border-b px-4 py-2 text-xs font-medium"
          style={{ borderColor: "var(--border)", color: "var(--text-subtle)" }}
        >
          {language}
        </div>
      )}
      <pre
        className="overflow-x-auto p-4 text-sm leading-relaxed"
        style={{ color: "var(--text)", fontFamily: "var(--font-mono, monospace)" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
