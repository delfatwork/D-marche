export const STEP_MIN = 100;
export const KM_PER_STEP = 0.00075;
export const INITIALS = ["D", "L", "M", "M", "J", "V", "S"];
export const DAY = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export type Day = { dow: number; date: number; iso: string; min: number; feel: string | null; today: boolean };

export function blankWeek(): Day[] {
  const out: Day[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push({ dow: d.getDay(), date: d.getDate(), iso: isoDate(d), min: 0, feel: null, today: i === 0 });
  }
  return out;
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const DEMO_WEEK: [number, Day["feel"]][] = [[12, "bien"], [0, null], [8, "fatigue"], [10, "bien"], [0, null], [15, "bien"]];

export function buildDemoWeek(): Day[] {
  const out: Day[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const [min, feel] = i === 0 ? [0, null] : DEMO_WEEK[6 - i];
    out.push({ dow: d.getDay(), date: d.getDate(), iso: isoDate(d), min, feel, today: i === 0 });
  }
  return out;
}

export const stepsOf = (d: Day) => d.min * STEP_MIN;
export const kmOf = (d: Day) => stepsOf(d) * KM_PER_STEP;

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function capFirst(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function dayFullName(d: Day): string {
  return capFirst(new Date(d.iso).toLocaleDateString("fr-FR", { weekday: "long" }));
}

export function dayDateLabel(d: Day): string {
  return new Date(d.iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

export function weekRangeLabel(week: Day[]): string {
  const start = new Date(week[0].iso);
  const end = new Date(week[6].iso);
  const mon = (d: Date) => d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
  const sameMonth = start.getMonth() === end.getMonth();
  return `${start.getDate()}${sameMonth ? "" : " " + mon(start)} - ${end.getDate()} ${mon(end)}`;
}
