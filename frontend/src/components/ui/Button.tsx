import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a spinner and disables the button while true. */
  loading?: boolean;
  /** Icon placed before the label. */
  leftIcon?: React.ReactNode;
  /** Icon placed after the label. */
  rightIcon?: React.ReactNode;
  /** Stretch the button to fill its container. */
  fullWidth?: boolean;
}

// ─── Style maps ──────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background:  "var(--accent-primary)",
    color:       "#ffffff",
    border:      "1px solid transparent",
  },
  secondary: {
    background:  "var(--bg-subtle)",
    color:       "var(--text)",
    border:      "1px solid var(--border)",
  },
  ghost: {
    background:  "transparent",
    color:       "var(--text-muted)",
    border:      "1px solid transparent",
  },
  danger: {
    background:  "rgba(220, 38, 38, 0.1)",
    color:       "var(--danger)",
    border:      "1px solid rgba(220, 38, 38, 0.2)",
  },
};

const VARIANT_HOVER_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--accent-primary-hover)",
  },
  secondary: {
    background: "var(--bg-muted)",
  },
  ghost: {
    background: "var(--bg-subtle)",
    color:      "var(--text)",
  },
  danger: {
    background: "rgba(220, 38, 38, 0.18)",
    borderColor: "rgba(220, 38, 38, 0.35)",
  },
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: "28px", paddingLeft: "10px", paddingRight: "10px", fontSize: "0.75rem",  gap: "5px"  },
  md: { height: "36px", paddingLeft: "14px", paddingRight: "14px", fontSize: "0.875rem", gap: "6px"  },
  lg: { height: "44px", paddingLeft: "20px", paddingRight: "20px", fontSize: "1rem",     gap: "8px"  },
};

// ─── Spinner ──────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      style={{
        animation: "spin 0.7s linear infinite",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// Inject spin keyframe once (safe to repeat — browser deduplicates identical rules)
if (typeof window !== "undefined") {
  const styleId = "__tenvor-spin";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
  }
}

// ─── Button ───────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant    = "primary",
      size       = "md",
      loading    = false,
      leftIcon,
      rightIcon,
      fullWidth  = false,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const [hovered, setHovered] = React.useState(false);

    const isDisabled = disabled || loading;

    const baseStyle: React.CSSProperties = {
      display:         "inline-flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontWeight:      500,
      borderRadius:    "6px",
      cursor:          isDisabled ? "not-allowed" : "pointer",
      opacity:         isDisabled ? 0.55 : 1,
      textDecoration:  "none",
      userSelect:      "none",
      whiteSpace:      "nowrap",
      outline:         "none",
      transition:      "background 0.15s ease, color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease",
      width:           fullWidth ? "100%" : undefined,
      ...SIZE_STYLES[size],
      ...VARIANT_STYLES[variant],
      ...(hovered && !isDisabled ? VARIANT_HOVER_STYLES[variant] : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={baseStyle}
        onMouseEnter={(e) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {loading ? (
          <Spinner size={size} />
        ) : (
          leftIcon && (
            <span aria-hidden="true" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {leftIcon}
            </span>
          )
        )}

        {children && (
          <span style={{ display: "flex", alignItems: "center" }}>
            {children}
          </span>
        )}

        {!loading && rightIcon && (
          <span aria-hidden="true" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
