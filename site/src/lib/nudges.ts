// What: Every nudge on the site, in one place.
// How: Plain strings keyed by screen; world nudges keyed by industry slug.
// Objective: Easy to edit the club's voice without touching components. Dry, never mocking the member or the problem.
export const NUDGES = {
  landing: "Reading the mission takes 20 seconds. Reading a 60-page case study takes your will to live.",
  pickWorld: "Pick a world. You can always rage-quit back here.",
  world: {
    fintech: "Hover a card. It won't bite. The questions might.",
    "frontier-science": "Nobody has the answer key. That's the good news.",
    "saas-b2b": "Every one of these started with an agent doing something weird.",
    "ecommerce-retail": "Somewhere a robot is adding things to a cart. Find out why.",
    healthtech: "No diagnosis, no lab coat. Just questions that matter.",
    "marketing-adtech": "If an ad plays and no human sees it, did it work?",
    logistics: "History is a great forecaster, right up until it isn't.",
    edtech: "Does learning stick, or just feel like it does?",
    "real-estate": "Every flood map is an opinion with a price tag.",
    legal: "Objection: the robot cited a case that doesn't exist.",
  } as Record<string, string>,
  known: "That's everything anyone knows for sure. The next card is the fun part.",
  unknown: "This is the bit nobody has cracked. Yet.",
  start: "It asks you questions before it answers any. That's the point.",
  emptyFilter: "Nothing matches. Loosen a filter; the problems won't judge you.",
  notToday: "Save it. The question isn't going anywhere. That's kind of the problem.",
  swipe: "Not your thing? Back to the world. It won't take it personally. Probably.",
};
