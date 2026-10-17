export const SITE = {
  name: "Cave of Chi",
  tagline: "Art. Space. Energy.",
  description:
    "Cave of Chi — sanctuary kreatif untuk workshop, ritual mindful, dan koneksi bermakna.",
  instagram: "@caveofchi",
} as const;

export const CATEGORIES = {
  creative: "Creative Studio",
  wellness: "Healing & Wellness",
  social: "Gather & Connect",
} as const;

function isEventCategory(value: string): value is keyof typeof CATEGORIES {
  return Object.hasOwn(CATEGORIES, value);
}

export function getCategoryLabel(category: string | null | undefined): string {
  if (category && isEventCategory(category)) {
    return CATEGORIES[category];
  }

  return "Live Event";
}

export const NAV_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "The Caves", href: "/#spaces" },
  { label: "Experiences", href: "/experiences" },
  { label: "Schedule", href: "/schedule" },
  { label: "Community", href: "/about#community" },
] as const;
