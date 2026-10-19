export type TipIcon =
  | "shoe" | "heart" | "footprint" | "sun" | "breath"
  | "target" | "calendar" | "route" | "users" | "bell"
  | "card" | "sparkle" | "check";

export type Tip = { t: string; icon: TipIcon; body: string; photo: string };

export const PARC_ROWS: Record<"tips" | "how" | "concept", Tip[]> = {
  tips: [
    { t: "Comment choisir ses chaussures ?", icon: "shoe", photo: "/tips/chaussures.jpg", body: "Privilégiez une pointure confortable, un talon stable et une semelle souple. Essayez-les en fin de journée, quand le pied a un peu gonflé." },
    { t: "Quels sont les bienfaits de la marche ?", icon: "heart", photo: "/tips/bienfaits.jpg", body: "Beaucoup de personnes se sentent mieux au quotidien quand elles marchent régulièrement. Le plus important est la régularité, pas la vitesse. Cela ne remplace pas l'avis d'un professionnel de santé." },
    { t: "Comment bien commencer ?", icon: "footprint", photo: "/tips/demarrer.jpg", body: "Commencez par des balades courtes, à un rythme où vous pouvez parler. Augmentez petit à petit, sans pression." },
    { t: "Marcher par temps chaud", icon: "sun", photo: "/tips/chaleur.jpg", body: "Privilégiez les heures fraîches, buvez régulièrement et choisissez les parcours ombragés." },
    { t: "Respirer en marchant", icon: "breath", photo: "/tips/respirer.jpg", body: "Inspirez sur quelques pas, expirez sur quelques pas. Une respiration calme aide à garder le rythme." },
  ],
  how: [
    { t: "Mon cap du jour", icon: "target", photo: "/tips/cap-du-jour.jpg", body: "Votre objectif s'adapte à votre parcours choisi à l'inscription : 5 000, 7 000 ou 10 000 pas par jour." },
    { t: "Suivre vos pas", icon: "footprint", photo: "/tips/suivre-pas.jpg", body: "Connectez un podomètre Bluetooth : vos pas se comptent pendant la journée." },
    { t: "Ma semaine", icon: "calendar", photo: "/tips/ma-semaine.jpg", body: "Pas, distance et ressenti sur 7 jours. Passez de 1j à 1a pour voir vos tendances." },
    { t: "Lancer une balade", icon: "route", photo: "/tips/lancer-balade.jpg", body: "Depuis Balades, choisissez un parcours plat et appuyez sur Partir. Le minuteur vous accompagne." },
    { t: "Les défis", icon: "users", photo: "/tips/defis.jpg", body: "Créez un challenge solo, individuel ou en équipe, ou rejoignez un défi public. Il n'y a pas de classement." },
    { t: "Rappels doux", icon: "bell", photo: "/tips/rappels.jpg", body: "Activez des rappels de motivation et des idées de balade dans les réglages. Vous pouvez les couper à tout moment." },
  ],
  concept: [
    { t: "Qu'est-ce qu'une D-carte ?", icon: "card", photo: "/tips/dcarte.jpg", body: "Une D-carte est un conseil court sur la marche, écrit par la communauté." },
    { t: "Pourquoi des cartes courtes ?", icon: "sparkle", photo: "/tips/cartes-courtes.jpg", body: "Une idée claire, lisible en quelques secondes, pour marcher un peu mieux demain." },
    { t: "Comment elle est relue", icon: "check", photo: "/tips/relecture.jpg", body: "Chaque D-carte est relue avant d'être publiée, pour éviter les conseils médicaux ou dangereux." },
    { t: "Partager son expérience", icon: "users", photo: "/tips/partager.jpg", body: "Vous pouvez soumettre la vôtre : une astuce qui vous aide, en quelques phrases." },
  ],
};

export const DC_THEMES: { key: string; label: string }[] = [
  { key: "equilibre", label: "Équilibre" },
  { key: "meteo", label: "Météo et saisons" },
  { key: "groupe", label: "Marcher à plusieurs" },
  { key: "confort", label: "Confort et sécurité" },
  { key: "plaisir", label: "Plaisir et découverte" },
];

export function dcThemeName(key: string | null): string {
  return DC_THEMES.find((t) => t.key === key)?.label ?? "";
}

export type DCarte = { id: string; title: string; theme: string; text: string; status: string };
