export type LevelKey = "doux" | "progresser" | "accomp";

export const LEVELS: Record<LevelKey, { title: string; steps: number; desc: string; reco: string }> = {
  doux: {
    title: "Commencer doucement",
    steps: 5000,
    desc: "Moins de 30 minutes par jour",
    reco: "Visez 5 000 pas aujourd'hui. Découpez-les en deux balades courtes, avec une pause assise entre les deux.",
  },
  progresser: {
    title: "Marcher régulièrement",
    steps: 7000,
    desc: "Plus de 30 minutes par jour",
    reco: "Visez 7 000 pas aujourd'hui. Ajoutez un petit tour à votre marche habituelle, à un rythme où vous pouvez parler.",
  },
  accomp: {
    title: "Marcher activement",
    steps: 10000,
    desc: "Plus d'une heure par jour",
    reco: "Visez 10 000 pas aujourd'hui. Proposez à un proche ou à un groupe une balade, un tour du quartier ou du parc.",
  },
};

export type GoalMetric = "duree" | "sorties" | "pas";

export const GOAL_METRICS: { key: GoalMetric; label: string; desc: string }[] = [
  { key: "duree", label: "Durée", desc: "Minutes de marche par jour" },
  { key: "sorties", label: "Nombre de sorties", desc: "Sorties de marche par jour" },
  { key: "pas", label: "Nombre de pas", desc: "Pas par jour" },
];

export const DEVICES = ["Podomètre Pas à pas (démo)", "Montre connectée (démo)"];

export const DEVICE_INFO: Record<string, { model: string; fw: string; battery: number; signal: string }> = {
  "Podomètre Pas à pas (démo)": { model: "PAP-200 Bluetooth", fw: "2.1.4", battery: 82, signal: "Fort" },
  "Montre connectée (démo)": { model: "Montre Active Demo 3", fw: "5.0.2", battery: 56, signal: "Moyen" },
};
