# Migration plan: skippyenglish.school → AstroWind (this repo)

This document is a **plan only**: it describes how to move the live [Skippy English School](https://skippyenglish.school) site into this Astro + Tailwind (AstroWind) codebase. It does not implement the migration.

---

## 1. Source site snapshot

### 1.1 Platform and stack

| Area | Current |
|------|---------|
| CMS | WordPress 6.9.x |
| Page builder | Elementor (+ Royal Elementor Addons, Essential Addons) |
| Theme | Royal Elementor Kit |
| SEO | Yoast SEO (titles, OG/Twitter, JSON-LD `WebSite` / `Organization` / `WebPage`) |
| Analytics | Plausible (script from `plausible.skippyenglish.school`) |
| Other | Popup Maker; custom CSS for `<ruby>` (furigana-style) sizing |

The homepage is a **long, single-page marketing layout** in Japanese with English navigation labels using HTML `<ruby>` (e.g. “Home” with “トップ” as ruby text). Content themes: speaking-first methodology, teacher bio, schedule/urgency, CTAs to trial booking.

### 1.2 Published WordPress pages (REST: 7)

| Slug | Purpose (from structure / menu) |
|------|----------------------------------|
| *(front page)* | Main landing (Elementor page; Yoast shows long JP description) |
| `trial` | Trial lesson landing; links out to external booking (`trial.skippyenglish.school` appears in content) |
| `trial-friends`, `trial-qr`, `trial-list` | Trial-related auxiliary pages (QR, friend referral, list flows) |
| `contact` | Contact |
| `students` | “Students / マイページ” — student-facing area; behaves like a hub with blog-style updates (categories, “All Posts”) |

**Primary nav (mobile header):** Home → Trial Lesson → Contact → Students (with JP ruby subtitles).

### 1.3 Blog posts (REST: 11)

Posts use **WordPress date permalinks**, e.g. `/2025/10/07/post-slug/`. Topics include teacher updates, homework, events (Halloween), trial announcements. These need either **slug-preserving redirects** or a deliberate **URL redesign** with redirects from old URLs.

### 1.4 Integrations and assets

- **Social:** Instagram, Facebook (in schema `sameAs`), LINE (`lin.ee/...`).
- **Logo / images:** Served from `wp-content/uploads/` (e.g. pink bubble logo, hero/OG images).
- **Booking:** Trial flow depends on **`trial.skippyenglish.school`** — treat as **out of scope for static Astro** unless you later embed or API-integrate; migration should **preserve outbound links** and test conversion paths.

---

## 2. Target: this AstroWind template

### 2.1 What you already have

- **Astro 5**, **static output**, **Tailwind**, `@astrojs/sitemap`, MDX, **TinaCMS** wired into `build`/`dev` scripts.
- Global config in `src/config.yaml` (site name, URL, metadata defaults, blog path, analytics placeholder).
- **Layouts:** `PageLayout`, `LandingLayout`, `MarkdownLayout`.
- **Widgets:** Hero, Features, Steps, FAQs, CTA, Contact, Blog lists, etc. (`src/components/widgets/`).
- **Blog:** Content collections under `content/posts/` (and `src/data/post/` for bundled samples), routes under `[...blog]/`.
- **Deployment:** `vercel.json` uses `trailingSlash: false` and `cleanUrls` — aligns with **no trailing slash** URLs unless you change config.

### 2.2 Template gaps vs Skippy

| Need | Template default |
|------|------------------|
| Brand | AstroWind demo copy, generic palette |
| Nav | Demo mega-menu (homes, landings, blog samples) |
| Language | `config.yaml` `i18n.language: en`; site content is JP-heavy + ruby |
| Blog URL shape | Configurable (`permalink` pattern); **not** WP `/:year/:month/:day/:slug/` by default |
| Students hub | No equivalent; closest is **blog category/tag** or a **dedicated page** listing filtered posts |
| LINE icon | May need **custom icon** or SVG in footer/header (Tabler may not cover LINE) |
| Plausible | Not wired; add script or `@astrolib/analytics`-style integration |
| TinaCMS | Optional for editors; **not required** if you edit Markdown/Git only |

---

## 3. Migration goals and principles

1. **Parity:** Match primary user journeys: learn about the school → trial → contact → students’ updates.
2. **Performance:** Replace Elementor’s CSS/JS weight with static HTML + minimal JS (animations only where needed).
3. **SEO:** Preserve titles/descriptions where good; implement **301 redirects** for all indexed URLs (especially blog permalinks).
4. **Maintainability:** Prefer **structured sections** (`.astro` + small components + content in Markdown/MDX or data files) over one giant page, while still allowing a **single-scroll** homepage if desired.
5. **Honest scope:** WordPress admin, Popup Maker, and Elementor templates **do not** migrate 1:1; behaviors are **reimplemented** or **dropped** by decision.

---

## 4. Recommended phases

### Phase A — Inventory and baseline (short)

- Export a **URL list**: all pages, all posts, key media URLs (or use `wp-json` + sitemap if enabled).
- Record **analytics** (Plausible): top landing pages, outbound clicks to `trial.skippyenglish.school`, LINE, etc.
- Screenshot **mobile + desktop** for each template section (for visual QA later).

### Phase B — Information architecture in Astro

- **Replace demo routes** with a minimal IA:
  - `/` — Skippy homepage.
  - `/trial`, `/trial-friends`, `/trial-qr`, `/trial-list` — as needed (merge or redirect duplicates if some are legacy).
  - `/contact` — contact page (reuse `Contact` widget + form strategy; see §6).
  - `/students` — hub page + either **tag/category “students”** in blog or a **content collection** for “announcements”.
  - `/blog` (or keep AstroWind’s list path from `config.yaml`) — public news; decide if student-only tone posts stay public or move behind a future auth (out of scope for static site).
- **Remove or hide** template demo pages (`/homes/*`, `/landing/*`, sample posts) from **navigation** and optionally delete routes in a later cleanup to avoid sitemap noise.

### Phase C — Design system

- **Colors / typography:** Map Elementor globals to Tailwind theme extension (e.g. primary purple ~`#605BE5`, accent pinks/magentas from existing CSS). Load **Noto Sans JP** + **Poppins** (or your chosen pairing) via `@fontsource` or CSS `@import`; match existing **ruby** styling via global CSS (the live site already uses classes like `.ruby-large` / `rt` sizing).
- **Logo / favicon:** Copy assets into `src/assets/` (or `public/`) and update `Logo`, `Favicons`, and `config.yaml` metadata images.
- **Header / footer:** Slim down `src/navigation.ts` and `footerData` to Skippy links + socials (Instagram, Facebook, LINE).
- **Components:** Reuse AstroWind widgets where they fit (`Hero`, `Features`, `Steps`, `CallToAction`, `FAQs`, `Testimonials` if used). Add **one-off sections** only where no widget matches (e.g. bespoke “Speaking / Reading / Writing” three-column method).

### Phase D — Content migration

- **Homepage:** Rebuild section-by-section from WordPress (copy from published HTML or editor export). Store **repeatable** fragments in MDX partials or TS data objects to avoid duplication.
- **Static pages:** Same for `/trial*`, `/contact`, `/students` landing copy.
- **Blog:** For each of the **11 posts**, either:
  - **Export to Markdown** (WP plugin, or copy from REST `content.rendered` and clean HTML → MD), or
  - Keep as **MDX with embedded HTML** where needed.
- **Images:** Download from `wp-content/uploads` into the repo or a CDN; update references; add `skippyenglish.school` to `astro.config.ts` `image.domains` if using remote optimization during transition.

### Phase E — SEO, schema, feeds

- Set `site.name`, `site.site`, and default metadata in `src/config.yaml` to **Skippy English School** and production URL.
- Per-page `metadata` in Astro layouts: titles/descriptions aligned with Yoast (avoid duplicate title patterns like “Skippy English School - Skippy English School”).
- **JSON-LD:** Recreate `Organization` + `WebSite` (and `WebPage` where useful) via a small component or `@astrolib/seo` patterns already common in AstroWind.
- **RSS:** Template has `rss.xml.ts`; point it at Skippy posts and verify `/rss.xml`.

### Phase F — Analytics and compliance

- **Plausible:** Add the same script domain pattern or use official Astro-friendly injection; confirm **form** events if you rely on Plausible form goals (WP had a form integration script).
- **Privacy:** If contact forms collect data, align `privacy.md` / `terms.md` with your actual stack (hosting, analytics, form backend).

### Phase G — Forms and CTAs

- **Contact:** AstroWind `Form` widget is front-end–only unless wired. Choose:
  - **Formspree / Getform / Netlify Forms / serverless** endpoint, or
  - **mailto:** link as temporary measure (worse UX).
- **Trial:** Keep **primary CTA** linking to `https://trial.skippyenglish.school` (or current booking URL) until a deeper integration exists.

### Phase H — Redirects and cutover

- In hosting (e.g. Vercel `redirects` in `vercel.json` or dashboard), map:
  - `/feed/` → `/rss.xml` (optional).
  - Each old blog URL → new canonical post URL.
  - Trailing-slash variants → non-trailing if you stay `trailingSlash: false`.
- **DNS:** Point `skippyenglish.school` to new hosting; lower TTL before cutover.
- **Post-launch:** Search Console: submit sitemap, inspect key URLs, fix crawl errors.

### Phase I — Cleanup

- Remove AstroWind demo content from `src/pages/` and sample posts if no longer needed.
- Decide on **TinaCMS:** keep only if non-technical editors need it; otherwise simplify `package.json` scripts to plain `astro build`.

---

## 5. URL mapping (initial)

| Old (WordPress) | New (Astro) | Notes |
|-----------------|------------|--------|
| `/` | `/` | Full homepage rebuild |
| `/trial/` | `/trial` | Match `trailingSlash: false` |
| `/trial-friends/`, `/trial-qr/`, `/trial-list/` | same slugs without slash | Merge pages if redundant |
| `/contact/` | `/contact` | |
| `/students/` | `/students` | Hub + blog list or filtered posts |
| `/2025/10/07/post-slug/` | e.g. `/blog/post-slug` or `/post-slug` | **Must** add redirects from old pattern |
| N/A | `/404` | Custom copy for parents |

Exact blog permalink style should follow `config.yaml` `apps.blog.post.permalink` after you choose `%slug%` vs dated paths.

---

## 6. Risks and decisions

| Topic | Decision needed |
|-------|-----------------|
| **Blog URL shape** | Keep SEO from old dated URLs vs cleaner `/blog/slug` (redirects mitigate). |
| **Students content** | Public blog vs gated area (static site cannot authenticate without another service). |
| **Popups** | Rebuild critical CTAs as in-page sections; defer modal popups or use a tiny client script. |
| **Instagram “feed”** | WP may use a widget; replace with static gallery, embed, or periodic manual updates. |
| **“Popular Articles” / related** | Recreate with AstroWind “related posts” if categories/tags are set. |
| **TinaCMS** | Use or remove to reduce build complexity. |

---

## 7. Effort estimate (order of magnitude)

- **IA + shell + nav + theme:** 1–3 days  
- **Homepage parity (long page):** 2–5 days depending on animation fidelity  
- **Remaining pages + blog (11 posts) + images:** 3–7 days  
- **SEO redirects + QA + performance pass:** 1–3 days  

Highly dependent on how much you simplify Elementor effects and whether blog HTML cleanup is automated or manual.

---

## 8. References (in-repo)

- Site config: `src/config.yaml`
- Astro config: `astro.config.ts`
- Navigation: `src/navigation.ts`
- Homepage entry: `src/pages/index.astro`
- Blog routing: `src/pages/[...blog]/`
- Deployment: `vercel.json`

---

## 9. External references

- Live site: [https://skippyenglish.school](https://skippyenglish.school)
- WordPress REST index: [https://skippyenglish.school/wp-json/](https://skippyenglish.school/wp-json/) (pages, posts, media for export scripts)

---

*Last updated: 2026-04-16. Regenerate this plan if the WordPress site structure changes materially.*
