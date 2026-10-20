export type PointIcon = "flag" | "route" | "bench" | "cross";

export type Point = { t: string; d: string; i: PointIcon };

export type Parcours = {
  id: string;
  name: string;
  km: string;
  min: number;
  ville: string;
  hard: 0 | 1 | 2;
  access: string;
  pts: Point[];
  surface: string[];
  path: string;
  photo?: string;
};

export const BAL_PARCOURS: Parcours[] = [
  {
    id: "canal",
    name: "Parcours Canal",
    km: "2,4 km",
    min: 32,
    ville: "Paris",
    hard: 0,
    access: "Accessible poussette et fauteuil",
    pts: [
      { t: "Départ : place de la mairie", d: "0 m", i: "flag" },
      { t: "Pont du canal", d: "800 m", i: "route" },
      { t: "Banc au bord de l'eau", d: "1,4 km", i: "bench" },
      { t: "Traversée difficile : rue des Lilas", d: "1,9 km", i: "cross" },
      { t: "Arrivée : square Vert", d: "2,4 km", i: "flag" },
    ],
    surface: ["Bitume lisse", "Chemin de halage en gravier fin"],
    path: "M12 78 C 50 20, 90 92, 130 42 S 178 26, 190 22",
    photo: "/balades/canal.jpg",
  },
  {
    id: "parc",
    name: "Tour du parc",
    km: "1,2 km",
    min: 15,
    ville: "Montreuil",
    hard: 1,
    access: "Accessible poussette et fauteuil",
    pts: [
      { t: "Départ : entrée du parc", d: "0 m", i: "flag" },
      { t: "Grand bassin", d: "400 m", i: "route" },
      { t: "Banc ombragé", d: "800 m", i: "bench" },
      { t: "Arrivée : entrée du parc", d: "1,2 km", i: "flag" },
    ],
    surface: ["Allée en gravier stabilisé", "Trottoir large en bitume"],
    path: "M16 70 C 58 38, 84 92, 122 62 S 170 50, 186 74",
    photo: "/balades/parc.jpg",
  },
  {
    id: "centre",
    name: "Centre-ville",
    km: "3,1 km",
    min: 40,
    ville: "Vincennes",
    hard: 2,
    access: "Trottoirs étroits par endroits",
    pts: [
      { t: "Départ : place centrale", d: "0 m", i: "flag" },
      { t: "Rue commerçante", d: "600 m", i: "route" },
      { t: "Traversée difficile : avenue du Parc", d: "1,3 km", i: "cross" },
      { t: "Traversée difficile : boulevard", d: "2,0 km", i: "cross" },
      { t: "Traversée difficile : rue Haute", d: "2,6 km", i: "cross" },
      { t: "Arrivée : église", d: "3,1 km", i: "flag" },
    ],
    surface: ["Trottoirs étroits par endroits", "Pavés irréguliers"],
    path: "M14 30 L 60 30 L 60 76 L 128 76 L 128 24 L 186 24",
    photo: "/balades/centre.jpg",
  },
];

export type Creneau = {
  id: string;
  title: string;
  parcoursId: string;
  date: string;
  time: string;
  meet: string;
  count: number;
  max: number;
  photo?: string;
};

export const BAL_CRENEAUX: Creneau[] = [
  { id: "c1", title: "Boucle Bagnolet parc Romainville", parcoursId: "canal", date: "Samedi 12 octobre", time: "10 h 00", meet: "Place de la mairie", count: 8, max: 15, photo: "/balades/samedi.jpg" },
  { id: "c2", title: "Balade entre voisins", parcoursId: "parc", date: "Mercredi 16 octobre", time: "18 h 30", meet: "Entrée du parc", count: 14, max: 15, photo: "/balades/voisins.jpg" },
];

export const BAL_LIEUX = ["Paris", "Montreuil", "Vincennes"];

export const BAL_NAMES = ["Claire", "Mehdi", "Sophie", "Julien", "Amina", "Thomas", "Léa", "Karim"];

export function balParcours(id: string): Parcours | undefined {
  return BAL_PARCOURS.find((p) => p.id === id);
}

export function balDiff(p: Parcours): { label: string; cls: string } {
  if (p.hard === 0) return { label: "Pour tous", cls: "pour-tous" };
  if (p.hard === 1) return { label: "Modérée", cls: "moderee" };
  return { label: "Soutenue", cls: "soutenue" };
}

const DAY_SHORT: Record<string, string> = { Samedi: "sam", Dimanche: "dim", Lundi: "lun", Mardi: "mar", Mercredi: "mer", Jeudi: "jeu", Vendredi: "ven" };
const MONTH_SHORT: Record<string, string> = { janvier: "janv", février: "févr", mars: "mars", avril: "avr", mai: "mai", juin: "juin", juillet: "juil", août: "août", septembre: "sept", octobre: "oct", novembre: "nov", décembre: "déc" };

export function creneauWhen(c: Creneau): string {
  const [wd, dd, mo] = c.date.split(" ");
  const day = DAY_SHORT[wd] || wd.toLowerCase();
  const month = MONTH_SHORT[(mo || "").toLowerCase()] || mo;
  const time = c.time.replace(/\s*h\s*00$/, "h").replace(/\s*h\s*/, "h");
  return `${day} ${dd} ${month} à ${time}`;
}

export function balCountCity(v: string): number {
  return (
    BAL_PARCOURS.filter((p) => p.ville === v).length +
    BAL_CRENEAUX.filter((c) => balParcours(c.parcoursId)?.ville === v).length
  );
}
