// The summon.guide mark: an arched doorway with a small light inside it.
// The same arch frames every guide portrait on the site (the "niche").
// Lapis ground, marble arch, gilt light. Drawn to stay legible at 16px.
export const BRAND = { lapis: "#1F3D7A", marble: "#F3F0E8", gilt: "#C29A45", ink: "#14171F" } as const;

export const SUMMON_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${BRAND.lapis}"/><path d="M18 52V30a14 14 0 0 1 28 0v22" fill="none" stroke="${BRAND.marble}" stroke-width="6" stroke-linecap="square"/><circle cx="32" cy="35" r="5" fill="${BRAND.gilt}"/></svg>`;
