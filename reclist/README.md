# Reclist

> Good advice, saved.

A personal wishlist for recommendations from family and friends — movies, restaurants, parks, museums, and anything else — all in one place, with who told you.

## Screenshots

### Landing page
![Sign-in](docs/screenshots/01-sign-in.png)

### Board view
Cards grouped by category, each showing the recommender. Switch categories with the filter tabs.

![Board view](docs/screenshots/02-board.png)

### Add a rec
Slide-in panel with quick-pick chips for past recommenders. Details field auto-suggests based on category.

![Add panel](docs/screenshots/03-add-panel.png)

### Expanded card
Click any card to expand it — edit notes, mark done, or delete.

![Card expanded](docs/screenshots/04-card-expanded.png)

### Shelf view
An editorial alternative to the board. Toggle between views with the floating pill at the bottom.

![Shelf view](docs/screenshots/05-shelf.png)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth v5 (Google OAuth) |
| Database | SQLite via Drizzle ORM |
| Fonts | Geist · Geist Mono · Instrument Serif |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Get started →** to use the app without Google sign-in.

To enable Google sign-in, add credentials to `.env.local`:

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=any-random-string
AUTH_URL=http://localhost:3000
```

Get credentials at [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth Client ID (Web). Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

## Docs

- [Problem Definition](docs/Problem%20Definition.md)
- [Design](docs/Design.md)
- [Product · Design · Tech Spec](docs/Reclist%20Spec.html)
