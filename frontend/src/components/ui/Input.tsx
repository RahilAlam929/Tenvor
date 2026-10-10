import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────

export type InputSize    = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual size of the input. */
  size?: InputSize;
  /** Visual variant. */
  variant?: InputVariant;
  /** Label text rendered above the input. */
  label?: string;
  /** Helper text rendered below the input. */
  hint?: string;
  /** Error message — replaces hint and applies error styling when set. */
  error?: string;
  /** Icon or element rendered on the left inside the input. */
  leftElement?: React.ReactNode;
  /** Icon or element rendered on the right inside the input. */
  rightElement?: React.ReactNode;
  /** Stretch the input to fill its container (default: true). */
  fullWidth?: boolean;
  /** Id forwarded to the underlying <input>. Auto-generated if not provided. */
  id?: string;
}

// ─── Size maps ────────────────────────────────────────────────────────────

const SIZE_HEIGHT: Record<InputSize, string> = {
  sm: "28px",
  md: "36px",
  lg: "44px",
};

const SIZE_FONT: Record<InputSize, string> = {
  sm: "0.75rem",
  md: "0.875rem",
  lg: "1rem",
};

const SIZE_PADDING_X: Record<InputSize, string> = {
  sm: "8px",
  md: "10px",
  lg: "14px",
};

const SIZE_ICON_WIDTH: Record<InputSize, string> = {
  sm: "28px",
  md: "36px",
  lg: "44px",
};

// ─── Input ────────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size      = "md",
      variant   = "default",
      label,
      hint,
      error,
      leftElement,
      rightElement,
      fullWidth = true,
      id: providedId,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);

    // Stable auto-generated id for accessibility (React 18+)
    const generatedId = React.useId();
    const id = providedId ?? generatedId;

    const hasError = Boolean(error);

    // Wrapper (relative container for icons)
    const wrapperStyle: React.CSSProperties = {
      position:    "relative",
      display:     "flex",
      alignItems:  "center",
      width:       fullWidth ? "100%" : undefined,
    };

    // Background based on variant
    const bg =
      variant === "filled"
        ? "var(--bg-subtle)"
        : "var(--bg-elevated)";

    const borderColor = hasError
      ? "var(--danger)"
      : focused
        ? "var(--accent-primary)"
        : "var(--border)";

    const boxShadow = focused
      ? hasError
        ? "0 0 0 3px rgba(220, 38, 38, 0.15)"
        : "0 0 0 3px var(--accent-primary-subtle)"
      : "none";

    const inputStyle: React.CSSProperties = {
      width:           "100%",
      height:          SIZE_HEIGHT[size],
      paddingLeft:     leftElement  ? SIZE_ICON_WIDTH[size] : SIZE_PADDING_X[size],
      paddingRight:    rightElement ? SIZE_ICON_WIDTH[size] : SIZE_PADDING_X[size],
      fontSize:        SIZE_FONT[size],
      fontFamily:      "inherit",
      background:      bg,
      color:           "var(--text)",
      border:          `1px solid ${borderColor}`,
      borderRadius:    "6px",
      outline:         "none",
      transition:      "border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
      boxShadow,
      cursor:          disabled ? "not-allowed" : "text",
      opacity:         disabled ? 0.55 : 1,
      ...style,
    };

    const iconContainerStyle = (side: "left" | "right"): React.CSSProperties => ({
      position:       "absolute",
      top:            "50%",
      transform:      "translateY(-50%)",
      [side]:         "0",
      width:          SIZE_ICON_WIDTH[size],
      height:         SIZE_HEIGHT[size],
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      pointerEvents:  "none",
      color:          "var(--text-subtle)",
      flexShrink:     0,
    });

    const labelStyle: React.CSSProperties = {
      display:      "block",
      marginBottom: "5px",
      fontSize:     "0.8125rem",
      fontWeight:   500,
      color:        "var(--text-muted)",
    };

    const hintStyle: React.CSSProperties = {
      marginTop: "4px",
      fontSize:  "0.75rem",
      color:     hasError ? "var(--danger)" : "var(--text-subtle)",
    };

    const rootStyle: React.CSSProperties = {
      width: fullWidth ? "100%" : undefined,
    };

    return (
      <div style={rootStyle}>
        {label && (
          <label htmlFor={id} style={labelStyle}>
            {label}
          </label>
        )}

        <div style={wrapperStyle}>
          {leftElement && (
            <span style={iconContainerStyle("left")} aria-hidden="true">
              {leftElement}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hint || error ? `${id}-hint` : undefined}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            style={inputStyle}
            {...rest}
          />

          {rightElement && (
            <span style={iconContainerStyle("right")} aria-hidden="true">
              {rightElement}
            </span>
          )}
        </div>

        {(error || hint) && (
          <p id={`${id}-hint`} style={hintStyle} role={hasError ? "alert" : undefined}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
