export type Moment = "matin" | "apres-midi" | "indifferent";

export type Defi = { id: string; moment: Moment; t: string; b: string };

export const DEFI_DU_MOMENT: Defi = {
  id: "m-cafe",
  moment: "apres-midi",
  t: "La pause café",
  b: "Marcher 10 minutes à la pause déjeuner.",
};

export const DEFI_ETAPES: Defi[] = [
  { id: "e-boulangerie", moment: "matin", t: "La pause boulangerie", b: "Effectuer un trajet court vers un commerce de proximité." },
  { id: "e-detour", moment: "apres-midi", t: "Le détour", b: "Rallonger un trajet habituel de 500 mètres." },
  { id: "e-frais", moment: "apres-midi", t: "L'air du frais", b: "Sortir marcher après le repas du soir." },
];

export const DEFI_HABITUDES: Defi[] = [
  { id: "h-triplette", moment: "matin", t: "La triplette", b: "Marcher au moins 10 minutes par jour pendant 3 jours consécutifs." },
  { id: "h-echappee", moment: "apres-midi", t: "L'Échappée dominicale", b: "Réaliser 1 balade chaque week-end pendant 1 mois." },
  { id: "h-parenthese", moment: "apres-midi", t: "La parenthèse", b: "3 marches légères dans la même semaine." },
  { id: "h-saisons", moment: "matin", t: "Les 4 saisons", b: "Valider au moins une marche par mois pendant un trimestre." },
];

export type Habit = { id: string; t: string; d: string; b: string; moment: Moment; type: "A" | "B" | "C" };

export const HABITS: Habit[] = [
  { id: "baguette", t: "La baguette du matin", d: "~ 10 min", b: "Prendre l'air et passer à la boulangerie du quartier.", moment: "matin", type: "A" },
  { id: "courrier", t: "Le petit courrier", d: "~ 8 min", b: "Déposer une lettre ou vérifier sa boîte aux lettres.", moment: "matin", type: "A" },
  { id: "comptoir", t: "La pause comptoir", d: "~ 10 min", b: "Prendre un café ou saluer son commerçant.", moment: "matin", type: "A" },
  { id: "vert", t: "Le détour vert", d: "~ 8 min", b: "Faire le tour du pâté de maisons ou du square le plus proche.", moment: "indifferent", type: "A" },
  { id: "geste", t: "Le geste du jour", d: "~ 8 min", b: "Un petit geste utile pour le quartier.", moment: "indifferent", type: "A" },
  { id: "marche", t: "Le tour du marché", d: "~ 20 min", b: "Acheter un fruit frais et échanger avec les étals.", moment: "matin", type: "B" },
  { id: "mediatheque", t: "La halte lecture", d: "~ 20 min", b: "Passer à la médiathèque ou à la boîte à livres.", moment: "apres-midi", type: "B" },
  { id: "banc", t: "Le banc du parc", d: "~ 20 min", b: "S'asseoir sur un banc repéré et observer la vie de quartier.", moment: "apres-midi", type: "B" },
  { id: "pharmacie", t: "La course santé", d: "~ 15 min", b: "Aller chercher un produit à la pharmacie.", moment: "indifferent", type: "B" },
  { id: "course", t: "La course du quotidien", d: "~ 20 min", b: "Acheter un produit du quotidien en marchant.", moment: "indifferent", type: "B" },
  { id: "accompagnee", t: "La promenade accompagnée", d: "~ 20 min", b: "Marcher avec un proche, à votre rythme.", moment: "indifferent", type: "B" },
  { id: "patrimoine", t: "Le détail du quartier", d: "~ 30 min", b: "Observer une plaque historique ou une belle façade.", moment: "apres-midi", type: "C" },
  { id: "photo", t: "La mission photo", d: "~ 30 min", b: "Photographier une fleur, une vitrine ou un rayon de soleil.", moment: "apres-midi", type: "C" },
  { id: "lechevitrine", t: "Le lèche-vitrines", d: "~ 35 min", b: "Parcourir la rue commerçante à son propre rythme.", moment: "apres-midi", type: "C" },
];

export type TrophyDef = {
  name: string;
  concept: string;
  cond: string;
  cur: number;
  goal: number;
  icon: "footprint" | "route" | "calendar" | "sun" | "trophy";
  ok: boolean;
};

export function trophyDefs(defisValides: Record<string, boolean>, syncCount: number, balDone: number): TrophyDef[] {
  const count = (ids: string[]) => ids.filter((id) => defisValides[id]).length;
  const simple = count(DEFI_ETAPES.map((d) => d.id));
  const habits = count(DEFI_HABITUDES.map((d) => d.id));
  const total = Object.values(defisValides).filter(Boolean).length;
  const defs: Omit<TrophyDef, "ok">[] = [
    { name: "Premier pas", concept: "Le tout premier relevé de pas", cond: "1er relevé de pas", cur: Math.min(syncCount, 1), goal: 1, icon: "footprint" },
    { name: "Le Flâneur", concept: "L'éveil, le premier pas", cond: "1 défi simple validé", cur: Math.min(simple, 1), goal: 1, icon: "footprint" },
    { name: "L'Explorateur de quartier", concept: "La curiosité du quotidien", cond: "5 défis simples validés", cur: Math.min(simple, 5), goal: 5, icon: "route" },
    { name: "Le Marcheur au long cours", concept: "L'installation de la routine", cond: "3 rituels complétés", cur: Math.min(habits, 3), goal: 3, icon: "calendar" },
    { name: "L'Aventurier des sentiers", concept: "L'ancrage durable", cond: "10 balades effectuées", cur: Math.min(balDone, 10), goal: 10, icon: "sun" },
    { name: "Le Passeur de chemins", concept: "La maîtrise sereine", cond: "Défis sur plusieurs mois", cur: Math.min(total, 15), goal: 15, icon: "trophy" },
  ];
  return defs.map((t) => ({ ...t, ok: t.cur >= t.goal }));
}
