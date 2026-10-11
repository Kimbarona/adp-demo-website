# ADP Toiture SA — site de démonstration

Interactive one-page demo rebuilt from the client's static mockup (`ADP Toiture SA.jpg`).
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No backend.

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

Deploys to Vercel with zero configuration.

## Content

- All copy and data live in `lib/content.ts`; each section is a component in `components/`.
- Company facts (phone, e-mail, address, team size, services, partner names) come from the mockup.
- **Demo content, labelled as such on the page:** project case studies, the three reviews
  (copied from the mockup), and all photos (Unsplash, bundled in `public/images/`).
- The quote form validates client-side only and **sends nothing**; the UI says so.
- `robots: noindex` is set in `app/layout.tsx` — remove it once the client approves the site.
