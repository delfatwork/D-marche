import type { CSSProperties, ReactNode } from "react";
import { useAnimatedPct } from "@/app/lib/useAnimatedPct";

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
  const animated = useAnimatedPct(v);
  const style = { "--p": animated.toFixed(1) } as CSSProperties;
  return (
    <div className={`ring${className ? ` ${className}` : ""}`} style={style} aria-hidden="true">
      <span>{children}</span>
    </div>
  );
}
