export function nf(n: number, d = 0): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function plural(n: number, word: string): string {
  return `${nf(n)} ${word}${n > 1 ? "s" : ""}`;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function fmtTimer(totalSeconds: number): string {
  return `${pad2(Math.floor(totalSeconds / 60))}:${pad2(totalSeconds % 60)}`;
}

export function fmtHoursMin(totalMinutes: number): string {
  return `${Math.floor(totalMinutes / 60)}h${pad2(totalMinutes % 60)}`;
}

export function spokenDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const part = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;
  return (m ? part(m, "minute") : "") + (m && s ? " et " : "") + (s || !m ? part(s, "seconde") : "");
}
