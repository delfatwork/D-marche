"use client";

import { useEffect, useRef } from "react";

const PATH_D = "M24 150 C 90 150, 70 112, 140 106 S 214 82, 236 62 S 276 40, 296 34";

export default function Trail({ progress }: { progress: number }) {
  const baseRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const p = Math.max(0, Math.min(1, progress));

  useEffect(() => {
    const base = baseRef.current;
    if (!base) return;
    if (progRef.current) progRef.current.style.strokeDashoffset = String(100 - p * 100);
    const length = base.getTotalLength();
    const pt = base.getPointAtLength(length * p);
    markerRef.current?.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
  }, [p]);

  return (
    <svg className="trail" viewBox="0 0 320 170" aria-hidden="true" focusable="false">
      <path className="h1" d="M0 112 Q 80 64 170 98 T 320 74 V170 H0Z" />
      <path className="h2" d="M0 146 Q 110 108 210 136 T 320 126 V170 H0Z" />
      <path ref={baseRef} className="trail-base" pathLength={100} d={PATH_D} />
      <path ref={progRef} className="trail-prog" pathLength={100} d={PATH_D} />
      <g className="trail-flag" transform="translate(296 34)">
        <line x1={0} y1={0} x2={0} y2={-26} />
        <path d="M0 -26 L17 -20 L0 -14Z" />
      </g>
      <g ref={markerRef} className="trail-marker">
        <circle r={11} />
        <circle className="dot" r={4} />
      </g>
    </svg>
  );
}
