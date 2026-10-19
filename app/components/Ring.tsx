import type { CSSProperties, ReactNode } from "react";

export default function Ring({
  pct,
  children,
  className,
}: {
  pct: number;
  children: ReactNode;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, pct));
  const style = { "--p": v.toFixed(1) } as CSSProperties;
  return (
    <div className={`ring${className ? ` ${className}` : ""}`} style={style} aria-hidden="true">
      <span>{children}</span>
    </div>
  );
}
