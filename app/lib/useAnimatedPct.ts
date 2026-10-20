"use client";

import { useEffect, useState } from "react";

/**
 * Starts at 0 and eases to `pct` right after mount, and again whenever `pct`
 * changes afterwards (e.g. after a pedometer sync). Pairs with the CSS
 * `transition:--p` on .ring/.big-ring/.dc-ring.
 *
 * Callers must only mount this once real data is available (gate on
 * `hydrated` from useAppState) — otherwise the "0 -> target" animation plays
 * against a transient default-state value instead of the real one, and
 * looks like the number itself got reset on reload.
 */
export function useAnimatedPct(pct: number): number {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  return animated;
}
