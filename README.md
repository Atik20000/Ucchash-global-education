# Ucchash Global Education — Next.js Frontend

A premium Next.js 15 frontend for **Ucchash Global Education** — IELTS / PTE coaching, mock-test platform and study-abroad consultancy for Bangladeshi students.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS 4** + `tailwindcss-animate` + custom design tokens
- **shadcn-style UI primitives** (Button, Card, Badge)
- **Fonts:** Playfair Display (heading) + Inter (body)
- **Icons:** `lucide-react`
- **Analytics:** `@vercel/analytics`

## Design system

- **Palette:** deep emerald `#0F5132` · warm gold `#D4A24C` · ivory `#FAF8F3` · charcoal ink `#1A1F2C`
- **Tokens** live in `app/globals.css` (`@theme inline`)
- **Reusable primitives** in `components/ui/*`
- **Brand mark** in `app/icon.svg` + `app/apple-icon.svg` (auto-injected by Next.js as favicon / Apple touch icon)

## Routes

| Route | Purpose |
|---|---|
| `/` | Marketing home — hero, founder, philosophy, why-choose, testimonials, CTA |
| `/courses` | Course batches + exam packages |
| `/study-abroad` | Study abroad destinations (UK, EU, Asia) + services + stats |
| `/contact` | Contact + free consultation |
| `/faq` | FAQ accordion |
| `/privacy` · `/terms` | Legal pages |
| `/exam/login` · `/exam/dashboard` · `/exam/test/[id]` · `/exam/results/[id]` | Student exam portal |
| `/admin/dashboard` | Admin console for tests & results |

The exam and admin pages are pure frontend — they call an external API via the HTTP clients in `lib/exam-api.ts` and `lib/vocavolt-api.ts`. Point those at your backend (env var or constants inside the lib) to wire them up.

## Project structure

```
.
├── app/                  # Next.js App Router pages + global CSS + brand icons
├── components/           # Section components + ui/ primitives
├── lib/                  # API clients, types, utils
│   ├── exam-api.ts
│   ├── vocavolt-api.ts
│   ├── google-sheets-integration.ts
│   ├── form-submission.ts
│   ├── utils.ts
│   └── types/
├── mock-tests/           # Seed JSON used as fallback by lib/exam-api.ts
├── public/               # Static assets (logo, brand SVGs, robots.txt)
│   └── brand/            # Facebook profile + cover SVGs
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Getting started

```bash
pnpm install        # or npm install / yarn

pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint           # next lint
pnpm clean          # remove .next
```

## Environment

Create `.env.local` and configure as needed (API base URL, analytics IDs, etc.). The repo's `.env.local` is gitignored.

## Deploy

The fastest path is **Vercel** — connect the repo and accept the defaults. Any platform that runs Node 20+ and `next start` will work too.

## License

Private — © Ucchash Global Education. All rights reserved.
