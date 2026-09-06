import type { CSSProperties } from "react";

export function MaterialSymbol({
  name,
  filled = false,
  size = 20,
  className = "",
  style,
}: {
  name: string;
  filled?: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`ms ${filled ? "msf" : ""} ${className}`}
      style={{ fontSize: size, ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
