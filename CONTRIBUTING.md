# Contributing

Thanks for considering a contribution.

## Setup

```bash
git clone <repo-url>
cd ucchash-IELTS
pnpm install     # or npm / yarn
pnpm dev
```

Open http://localhost:3000.

## Tooling

- **Next.js 15** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS 4** with custom design tokens in `app/globals.css`
- **shadcn-style primitives** in `components/ui/*`
- **Lint:** `pnpm lint`
- **Build:** `pnpm build`

## Conventions

- **Components** are colocated under `components/`. Keep section components in the root and reusable primitives under `components/ui/`.
- **Pages** live in `app/` following the App Router convention.
- **API calls** belong in `lib/*-api.ts` (typed clients).
- **Types** live in `lib/types/`.
- **Brand colors and tokens** come from `app/globals.css` — prefer Tailwind classes over inline hex unless you need a one-off accent.
- **Fonts:** Playfair Display for headings, Inter for body. Use `font-heading` / `font-body` utilities or rely on the default base styles.
- **Icons:** use `lucide-react`. If you need a brand glyph (WhatsApp, Facebook), inline an SVG.

## Commit messages

Use a short imperative prefix: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`. Example:

```
feat: add Malaysia and Japan to study-abroad page
fix: prevent contact info grid from overflowing on 320px
refactor: extract floating contact widget
```

## Pull requests

1. Branch from `main`.
2. Keep PRs focused — one feature or fix per PR.
3. Run `pnpm build` locally before opening the PR.
4. Include screenshots for any visual change.

## Code style

- Tabs vs spaces: follow the existing file's indentation.
- Prefer composition over abstraction. Don't add layers unless they're paying for themselves.
- Avoid dead comments and TODOs without context.
- Don't add backwards-compatibility shims for code paths nobody uses yet.

## Reporting issues

Open a GitHub issue with:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser + viewport size if it's a UI bug
