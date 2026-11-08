// What: Human-friendly labels for level and effort chips.
// How: Small pure functions.
// Objective: Chips read like plain English ("L3 to L5", "A semester") everywhere.
export const levelLabel = (levelFit: string) => levelFit.replace("–", " to ");
export const effortLabel = (effort: string) => `A ${effort}`;
