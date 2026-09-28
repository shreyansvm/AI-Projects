# App Design — Recommendations Wishlist

**Working name:** Reclist  
**Platform:** Web app  
**Scope:** MVP  
**Model:** Solo — one user captures all recommendations

---

## Problem Statement

Friend and family recommendations for movies, restaurants, parks, and places get lost in text threads and memory. There is no single place to see everything you want to experience, with the context of who suggested it.

---

## User Persona

**Shreyans** — Parent, 30s, socially active within a close family/friend circle. Asks people he trusts for recs constantly but has no system for capturing them. By the time he's free on a Friday night or planning a weekend, the recommendations are gone.

**Core need:** One page. Everything. Who told me. What it is.

---

## Design Philosophy (inspired by Monogram AI)

Monogram's core insight: *AI deserves a better interface than chat — one that is visual, interactive, and intuitive.* Applied here: a wishlist deserves a better interface than a plain list — one where each recommendation feels like a living object, not a text row.

**Principles borrowed from Monogram:**
- **Visual-first** — each card communicates category, title, and recommender at a glance, without reading
- **Task-specific layout** — the view adapts based on which category you're browsing (not just filtered rows)
- **No nested navigation** — the board IS the app; nothing lives behind a second screen
- **Speed** — adding a rec takes under 10 seconds; the card appears instantly
- **Interactive objects** — cards are tappable, swipeable, and contextual, not static list items

---

## MVP Scope

### In scope
- Add a recommendation (manual entry)
- Visual card-based wishlist, single page
- Category-specific card styles
- Filter/switch by category
- Mark an item as done
- Delete an item

### Out of scope (v1)
- Friend/family accounts or sharing
- Push notifications or reminders
- Ratings or reviews after completing
- Import from texts or links
- Mobile app

---

## Core User Flow

```
Land on app
  → See full board (default: All, cards grouped by category)
  → Switch category tab (optional) → board reflows to that category's layout
  → Click [+ Add]
    → Quick-add panel slides in (autofocus on Title)
    → Fill: Title · Category · Who recommended it · Notes (optional)
    → Save → card animates into board
  → Tap card → expands in place to show notes + actions
  → Mark done → card fades, moves to Done shelf at bottom
```

---

## Visual Layout

### Board view — All categories

```
┌──────────────────────────────────────────────────────────┐
│  Reclist                                      [+ Add]    │
│──────────────────────────────────────────────────────────│
│  [All]  [🎬 Movies]  [🍽 Restaurants]  [🌳 Parks]  [···] │
│──────────────────────────────────────────────────────────│
│                                                          │
│  🎬 MOVIES                                               │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ The Brutalist   │  │ Dune Part Two   │               │
│  │                 │  │                 │               │
│  │ 👤 Dad          │  │ 👤 Priya        │               │
│  └─────────────────┘  └─────────────────┘               │
│                                                          │
│  🍽 RESTAURANTS                                          │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ Nopalito        │  │ Tartine         │               │
│  │ SF · Mexican    │  │ SF · Bakery     │               │
│  │ 👤 Meera        │  │ 👤 Kevin        │               │
│  └─────────────────┘  └─────────────────┘               │
│                                                          │
│  🌳 PARKS & MUSEUMS                                      │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ Muir Woods      │  │ Bay Area        │               │
│  │ Marin · Nature  │  │ Discovery Mus.  │               │
│  │ 👤 Mom          │  │ 👤 Sarah        │               │
│  └─────────────────┘  └─────────────────┘               │
│                                                          │
│  ────────────────── DONE (2) ──────────────────          │
│  ✓ Oppenheimer · Dad   ✓ State Bird · Meera              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Category view — Restaurants (focused layout)

When a category tab is selected, the layout shifts to a wider, more immersive single-category view — less like a list, more like a dedicated board for that context.

```
┌──────────────────────────────────────────────────────────┐
│  Reclist                                      [+ Add]    │
│──────────────────────────────────────────────────────────│
│  [All]  [🎬 Movies]  [🍽 Restaurants] ←active  [🌳 Parks]│
│──────────────────────────────────────────────────────────│
│                                                          │
│  ┌──────────────────────────────────┐                    │
│  │ Nopalito                         │                    │
│  │ San Francisco · Mexican          │                    │
│  │ "Best tacos in the city"         │                    │
│  │                        👤 Meera  │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
│  ┌──────────────────────────────────┐                    │
│  │ Tartine Manufactory              │                    │
│  │ San Francisco · Bakery           │                    │
│  │ "Go on a weekday morning"        │                    │
│  │                        👤 Kevin  │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Card Design

Each card is a distinct visual object, not a row. The category determines the card's subtle accent color and icon.

| Category | Accent | Icon |
|---|---|---|
| Movies | Deep indigo | 🎬 |
| Restaurants | Warm amber | 🍽 |
| Parks & Museums | Forest green | 🌳 |
| Other | Slate | ··· |

**Card anatomy:**
```
┌─────────────────────┐
│ [category icon]     │  ← top-left accent
│                     │
│  Title              │  ← large, prominent
│  Subtitle (notes)   │  ← small, muted
│                     │
│  👤 Recommended by  │  ← bottom, always visible
└─────────────────────┘
```

**Card states:**
- **Default** — full color, clickable
- **Hovered** — subtle lift (box-shadow)
- **Expanded** — grows in place, reveals full notes + Mark Done / Edit / Delete actions
- **Done** — desaturated, ✓ badge, moved to Done shelf

---

## Quick-Add Panel

Slides in from the right (or bottom on narrow viewports). Autofocuses on Title so the user can start typing immediately.

```
┌───────────────────────────────┐
│  Add a rec             [✕]    │
│───────────────────────────────│
│  Title                        │
│  ┌─────────────────────────┐  │
│  │ e.g. Nopalito           │  │
│  └─────────────────────────┘  │
│                               │
│  Category                     │
│  [🎬 Movie] [🍽 Rest.] [🌳 Park] [···] │
│                               │
│  Recommended by               │
│  ┌─────────────────────────┐  │
│  │ e.g. Mom                │  │
│  └─────────────────────────┘  │
│                               │
│  Notes (optional)             │
│  ┌─────────────────────────┐  │
│  │                         │  │
│  └─────────────────────────┘  │
│                               │
│  [Save]              [Cancel] │
└───────────────────────────────┘
```

---

## Data Model

| Field | Type | Required |
|---|---|---|
| `id` | uuid | auto |
| `title` | string | yes |
| `category` | enum | yes |
| `recommended_by` | string | yes |
| `notes` | string | no |
| `status` | `wishlist` / `done` | default: wishlist |
| `created_at` | timestamp | auto |

**Categories (v1):** Movies, Restaurants, Parks & Museums, Other

---

## Visual Design Tokens

| Token | Value |
|---|---|
| Background | Off-white `#F9F8F6` |
| Card background | White `#FFFFFF` |
| Card radius | `12px` |
| Card shadow | `0 2px 8px rgba(0,0,0,0.07)` |
| Primary font | Inter or Geist |
| Title size | `16px / 600` |
| Recommender label | `13px / 400 / muted` |
| Done shelf | `#F4F4F4`, desaturated cards |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js + Tailwind | Fast to build, great defaults |
| Storage | Supabase | Persistence across devices from day one |
| Deployment | Vercel | One-command deploy |

---

## Open Questions

- [ ] Should "Recommended by" be free-text or a saved contacts list (reusable names)?
- [ ] Do we want a link field per card (Google Maps, Letterboxd, etc.)?
- [ ] Should cards within a category be sortable (drag to reorder)?
- [ ] Should the Done shelf be collapsed by default and expandable?

---

## Related
- [[Problem Definition]]

---

## Sources
- [Launching Monogram — monogram.ai](https://www.monogram.ai/blog/introducing-monogram)
- [Monogram AI on Product Hunt](https://www.producthunt.com/products/monogram-ai)
- [Monogram AI for iPhone — ScriptByAI](https://www.scriptbyai.com/monogram-ai-iphone/)
