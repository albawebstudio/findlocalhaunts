# Find Local Haunts — Nuxt 4 / @nuxt/ui / Cloudflare Migration

This document records the audit, migration steps, and manual verification for moving from Nuxt 3 + Tailwind v3 + Netlify to **Nuxt 4** + **@nuxt/ui** (Tailwind v4) + **Cloudflare Pages**.

## Current state (after migration branch)

| Area | Before | After |
|------|--------|--------|
| Nuxt | ^3.13.2 | **4.6.4** (via `pnpm install`) |
| UI / CSS | Tailwind 3 + PostCSS + `tailwind.config.js` | Tailwind v4 `@theme` in `assets/css/main.css` + `@nuxt/ui` |
| Fonts (Google) | `@nuxtjs/google-fonts` | **`@nuxt/fonts`** (via `@nuxt/ui`) — see parity table below |
| Fonts (local OTF) | `public/fonts` → `assets/fonts` | `@font-face` in `assets/css/*.css` |
| State | Pinia `useQueryParamStore` | `composables/useQueryParams.ts` (`useState`) |
| reCAPTCHA | `vue-recaptcha-v3` plugin | Native `grecaptcha` loader in `useGoogleRecaptcha.ts` |
| Router | Explicit `vue-router` dep | **Removed** — Nuxt file routing only; one type import was Pinia-only |
| Lodash | `nuxt-lodash` | **`lodash-es`** + Nuxt `imports.presets` (`isEmpty`, `forOwn`) |
| Hosting | `netlify.toml`, `netlify-dev` | `wrangler.toml`, `cf:preview` / `cf:deploy` |
| Nitro preset | default | **`cloudflare-pages`** (static prerender + Pages Functions for `/api/*`) |

Resolved versions are pinned in `pnpm-lock.yaml`. Re-run `pnpm update` in `app/` when bumping; do not guess versions in `package.json` beyond `latest` or lockfile.

---

## Step-by-step migration checklist

### 1. Nuxt 4 and directory layout

The app already lives under `app/` as the Nuxt root (`nuxt.config.ts`, `pages/`, `components/`). Nuxt 4 defaults align with this layout; no `srcDir` change required.

1. `cd app && pnpm install` — upgrades `nuxt` to 4.x.
2. Fix SSR/prerender issues (done: `Hero.vue` guards `useNuxtUTM()` during prerender).
3. Run `pnpm run build` — must prerender `/`, `/terms`, `/privacy` without errors.

### 2. @nuxt/ui + Tailwind v4

1. Add `@nuxt/ui` to `modules` (before other modules).
2. Single CSS entry: `assets/css/main.css` with:
   - `@import "tailwindcss";`
   - `@import "@nuxt/ui";`
   - `@theme { … }` for brand colors and font tokens.
3. Remove `postcss` / `autoprefixer` / `tailwindcss` v3 devDependencies and delete `tailwind.config.js`.
4. Map legacy Tailwind theme (`primary`, `secondary`, `tertiary`, `light`, `dark`, custom `font-*`) into `@theme` in `main.css`.

**Breaking / verify:** Visual regression on hero, nav (`font-another-danger`, `font-oswald`), and semantic color utilities (`bg-primary`, `text-tertiary`, etc.).

### 3. Google Fonts → @nuxt/fonts (remove `@nuxtjs/google-fonts`)

| Family | Old `googleFonts` config | New `fonts.families` |
|--------|-------------------------|----------------------|
| Oswald | wght 300, 500, 700, 800 | Same weights, `provider: google` |
| Lato | 100, 300 | Same |
| Raleway | wght + **ital** 100–900 | `styles: ['normal', 'italic']`, weights 100–900 |

`@nuxt/fonts` downloads and caches fonts at build time (see build log). **Removed** `@nuxtjs/google-fonts` after parity.

Local display fonts (Another Danger, Supercreep, Unthinkers) stay self-hosted under `assets/fonts/`.

**Manual verification:** Compare font rendering on Navigation (Oswald/Raleway), body copy (Raleway/Lato), and footer brand (Another Danger).

### 4. Dependency cleanup (`package.json`)

| Action | Package |
|--------|---------|
| Add | `@nuxt/ui`, `lodash-es`, `wrangler` |
| Update | `@fortawesome/*`, `nuxt`, `nuxt-security`, `nuxt-svgo`, `nuxt-utm` |
| Remove | `@pinia/nuxt`, `pinia`, `vue-recaptcha-v3`, `vue-router`, `@nuxtjs/google-fonts`, `nuxt-lodash`, `tailwindcss`, `postcss`, `autoprefixer` |

**Pinia → composable:** `stores/query-params.store.ts` deleted; use `useQueryParams()`.

**vue-router:** No direct router usage except removed Pinia type import. Safe to drop from `package.json` (Nuxt still ships router internally).

**nuxt-lodash:** Incompatible with Nuxt 4 at time of migration — replaced with `lodash-es` imports preset.

### 5. reCAPTCHA without `vue-recaptcha-v3`

- Deleted `plugins/recaptcha.ts`.
- `useGoogleRecaptcha.ts` loads `https://www.google.com/recaptcha/api.js?render={siteKey}` client-side.
- Server route `server/api/recaptcha.ts` unchanged.

**nuxt-security:** May need CSP exceptions for `script-src` / `connect-src`:

- `https://www.google.com`
- `https://www.gstatic.com`

Test contact form end-to-end after deploy.

### 6. Cloudflare hosting

**Assumption:** The site needs **prerendered pages** plus **server routes** (`/api/subscribe`, `/api/recaptcha`). Pure `nuxt generate` with `nitro.preset: 'static'` will **not** run those APIs.

**Chosen approach:** `nitro.preset: 'cloudflare-pages'`:

- Prerenders `/`, `/terms`, `/privacy` via `routeRules`.
- Emits `dist/` with `_worker.js` for Pages Functions (API + SSR fallback).

| Netlify | Cloudflare |
|---------|------------|
| `netlify.toml` | **Removed** — use `wrangler.toml` + Pages dashboard |
| `pnpm netlify-dev` | `pnpm dev` / `pnpm cf:preview` |
| `publish = dist` | `pages_build_output_dir = "dist"` |
| SPA `/* → /index.html` | Nitro generates `_redirects` / `_routes.json` |

**Deploy:**

```bash
cd app
pnpm cf:deploy
```

Set Pages environment variables (same as `.env.example`):

- `BEEHIIV_API_KEY`, `BEEHIIV_API_URL`, `BEEHIIV_PUBLICATION_ID`
- `FLH_API_URL` (AWS API Gateway contact form)
- `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`

**Optional pure static:** `NITRO_PRESET=static pnpm run generate` — only if `/api/subscribe` and `/api/recaptcha` are moved to external endpoints (e.g. existing `api/` Lambda + new subscribe proxy).

### 7. Files touched summary

| File | Change |
|------|--------|
| `nuxt.config.ts` | Modules, fonts, nitro preset, routeRules; removed PostCSS/googleFonts/Pinia |
| `assets/css/main.css` | Tailwind v4 `@theme`, semantic colors, fonts |
| `package.json` | Dependencies/scripts |
| `wrangler.toml` | **New** |
| `composables/useQueryParams.ts` | **New** (replaces Pinia) |
| `composables/useGoogleRecaptcha.ts` | No `vue-recaptcha-v3` |
| `composables/useApi.ts` | Uses `useQueryParams` |
| `components/Hero.vue` | UTM prerender-safe |
| `netlify.toml` | **Deleted** |
| `tailwind.config.js` | **Deleted** |
| `plugins/recaptcha.ts` | **Deleted** |
| `stores/query-params.store.ts` | **Deleted** |

### 8. Manual verification matrix

- [ ] `pnpm dev` — home, terms, privacy, dark/light body classes
- [ ] Newsletter signup → `/api/subscribe` (Beehiiv) on deployed Pages
- [ ] Contact form → reCAPTCHA → `/api/recaptcha` → `FLH_API_URL/contact-form`
- [ ] UTM params persisted into API bodies via `useApi`
- [ ] Font Awesome icons in About/Footer/Hero
- [ ] `nuxt-security` headers do not block fonts, icons, or reCAPTCHA
- [ ] Cloudflare Pages env secrets set; worker has Node compat if required (build warns if disabled)

### 9. Known follow-ups

1. **Vue peer warnings:** Bump `vue` to ≥3.5.34 if warnings persist (`pnpm update vue`).
2. **Bundle size:** Font Awesome full `fas`/`fab` packs inflate chunks — consider tree-shaking individual icons.
3. **Supercreep OTF (~390 KB):** Consider subsetting or `font-display: swap` tuning for LCP.
4. **`api/` Serverless (AWS):** Unchanged; contact form still posts to `FLH_API_URL`, not Nuxt.

---

## Quick reference: `nuxt.config.ts` modules

```ts
modules: ['@nuxt/ui', 'nuxt-utm', 'nuxt-svgo', 'nuxt-security'],
```

CSS: `~/assets/css/main.css` + Font Awesome core styles.

Fonts: top-level `fonts: { families: [...] }` (documented in Nuxt Fonts / UI docs).