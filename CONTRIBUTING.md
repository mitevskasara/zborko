# Contributing

Thanks for your interest in improving Зборко!

## Getting started

1. Fork and clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and set `DATABASE_URL` (see the README).
4. Apply migrations and seed the database (the full dictionary is not
   distributed; start from the sample or your own data):
   ```bash
   npx prisma migrate dev
   cp prisma/seed.sample.ts prisma/seed.ts
   npx prisma db seed
   ```
5. Start the dev server: `npm run dev`

## Before you open a pull request

Run the same checks CI runs:

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

- Keep pull requests focused on a single change.
- Use clear commit messages (conventional prefixes such as `feat:`, `fix:`,
  `chore:` are appreciated).
- Update documentation when behavior or setup changes.
- Do not commit secrets, `.env` files, or generated Prisma client output.

## Reporting bugs and requesting features

Open an issue and include as much detail as possible: steps to reproduce,
expected vs. actual behavior, and environment details.
