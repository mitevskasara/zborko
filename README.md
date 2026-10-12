# Зборко (Zborko)

Зборко is a small Macedonian "word of the day" web app. It shows a random
dictionary headword with its definition and examples, lets you search a word
directly from the URL, and keeps a personal favorites list in the browser.

The project is built with the Next.js App Router, Prisma ORM and PostgreSQL, and
also exposes the dictionary through a small JSON API.

## Features

- Random word-of-the-day card with definition and examples
- Direct word lookup by URL (e.g. `/куќа`) with fuzzy "similar words" suggestions
- JSON API for word lookup and random words
- Favorites stored locally in the browser (`localStorage`) — no account needed
- Responsive UI with Tailwind CSS and Motion animations

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, React 19)
- [Prisma ORM](https://www.prisma.io/orm) 7 with PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Motion](https://motion.dev/) for animation
- TypeScript

## Getting started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (a free [Prisma Postgres](https://www.prisma.io/postgres)
  instance works well)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Create a `.env` file in the project root and set your database connection
string:

```bash
# .env
DATABASE_URL="postgresql://user:password@host:5432/zborko"
```

### 3. Set up the database

```bash
npx prisma migrate dev
# The full dictionary is not included in this repository.
# Start from the sample, or supply your own dataset:
cp prisma/seed.sample.ts prisma/seed.ts
npx prisma db seed
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

### `GET /api/words?zbor=<word>`

Looks up a word. Returns the best matching entry plus similar words.

```jsonc
{
  "id": 123,
  "zbor": "куќа",
  "vid": "Именка",
  "rod": "женски",
  "znacenje": "Дефиниција…",
  "random": true,
  "match": "exact",
  "similarWords": [{ "zbor": "куќар", "vid": "Именка" }],
}
```

`match` is one of `exact`, `prefix-of-query`, or `query-is-prefix`. Returns
`404` when nothing matches and `400` for a missing or too-long query.

### `GET /api/words/random`

Returns a single random entry, or `404` if none is available.

## Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm run dev`    | Start the development server              |
| `npm run build`  | Apply migrations and build for production |
| `npm run start`  | Start the production server               |
| `npm run lint`   | Run ESLint                                |
| `npm run test`   | Run the unit tests                        |
| `npm run format` | Format with Prettier                      |

## Project structure

```
app/
  api/words/         API route handlers (lookup + random)
  components/        UI components (Header, Footer, Logo, WordCard)
  constants/         API routes, navigation routes, shared constants
  core/              Browser storage service
  types/             Shared TypeScript types
  [slug]/            Word lookup page
  omileni/           Favorites page
  zborko/            About page
lib/
  prisma.ts          Prisma client singleton
  word-match.ts      Matching helpers (LIKE escaping, best-row selection)
prisma/
  schema.prisma      Database schema
  migrations/        SQL migrations
  seed.sample.ts     Small sample dataset to start from
```

## Data

The full dictionary dataset is **not** included in this repository; only a small
sample (`prisma/seed.sample.ts`) is provided so the app can run locally. The
**code** is licensed under the MIT license (see [LICENSE](./LICENSE)). The
dictionary **data** is a separate work with its own provenance and licensing:
supply a dataset whose license permits redistribution. To use the app locally,
copy the sample (or your own dataset) to `prisma/seed.ts`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please read the
[Code of Conduct](CODE_OF_CONDUCT.md) and the [Security Policy](SECURITY.md).

## License

[MIT](LICENSE) © Sara Mitevska
