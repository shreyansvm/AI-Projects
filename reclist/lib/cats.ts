export const CATS = [
  {
    key: "movies",
    label: "Movies",
    accent: "oklch(0.45 0.14 285)",
    detailsPlaceholder: "Genre, runtime…",
  },
  {
    key: "restaurants",
    label: "Restaurants",
    accent: "oklch(0.6 0.13 62)",
    detailsPlaceholder: "City, cuisine…",
  },
  {
    key: "parks",
    label: "Parks & Museums",
    accent: "oklch(0.47 0.09 152)",
    detailsPlaceholder: "Location, type…",
  },
  {
    key: "other",
    label: "Other",
    accent: "oklch(0.52 0.02 260)",
    detailsPlaceholder: "Any details…",
  },
] as const

export type CatKey = (typeof CATS)[number]["key"]

export function getCat(key: string) {
  return CATS.find((c) => c.key === key) ?? CATS[3]
}

export type RecItem = {
  id: string
  title: string
  category: string
  details: string | null
  recommendedBy: string
  notes: string | null
  status: string
  createdAt: number
}
