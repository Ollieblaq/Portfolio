# Portfolio Rebuild — Build Specification

**Project:** olivia-onyekaba portfolio
**Repo:** github.com/Ollieblaq/Portfolio
**Stack:** Vite + React 19 + React Router 7 + Tailwind 4 — **do not change this**
**Scope:** Full rebuild. Four pages. New palette, new typography, new structure.

---

## 0. Ground rules

Read this section before writing any code.

### Stack is fixed

Stay on Vite, React, React Router and Tailwind 4. Do **not** migrate to Next.js,
Astro, Remix, or anything else. Do not add a meta-framework. Do not introduce
SSR. This is a deliberate decision, not an oversight.

### Never invent content

The previous build shipped three fabricated testimonials attributed to invented
people at real, named client companies. That must not happen again.

- **No testimonials** unless real quotes are supplied. Do not scaffold a
  placeholder carousel "to be filled in later."
- **No invented metrics.** No "24+ projects," no "lead volume tripled," no
  "50+ happy clients." If a number is not in this document, it does not go on
  the site.
- **No placeholder names, emails, or logos.** No `john@example.com`,
  no `Lorem ipsum`, no fake client logo strip.
- **No capability claims beyond section 7.** Specifically: do not claim Docker,
  Kubernetes, Nginx, CI/CD pipelines, Terraform, or AWS/GCP certifications.

If a section would need invented content to look complete, **leave the section
out** and note it in your summary.

### Delete before you build

Remove these from the existing codebase entirely:

| File | Reason |
|---|---|
| `src/components/Testimonials.tsx` | Fabricated quotes attributed to real clients |
| `src/components/Numbers.tsx` | Unverifiable stats with count-up animation |
| `src/components/StackMarquee.tsx` | Infinite logo marquee |
| `src/components/NoiseOverlay.tsx` | 3% noise, not earning its bytes |
| `src/components/ScrollProgress.tsx` | Reading-progress bar on a portfolio |
| `src/components/ProjectImage.tsx` | Live screenshot proxy |
| `src/lib/screenshot.ts` | Proxies all client URLs to s.wordpress.com |
| `metadata.json` | Google AI Studio scaffold leftover |
| `.env.example` | Gemini API scaffold leftover |

Also uninstall unused dependencies: `@google/genai`, `express`, `dotenv`.
And fix `package.json` — the `name` field is still `react-example`.

**Why these four in particular:** a hero that cycles through words, stat counters
that animate up on scroll, an infinite logo marquee, and a testimonial carousel
is the exact combination that reads as AI-generated. Any one is fine in
isolation. All four together is a signature. They all go.

---

## 1. Design direction

### Concept

Olivia builds systems that take money and capture leads across borders —
multi-currency storefronts, gated portals, programmatic page matrices, two-step
application forms. Her work is infrastructure for commerce, not decoration.

The site should read the way a good engineering firm's does: confident, quiet,
evidence-first. Restraint is the point. Every claim on the page should be
checkable by clicking a link.

### Signature element

**The live site is the hero.**

Her single strongest asset is that all nine projects are live, real, and
clickable. Most developer portfolios show mockups floating in fake laptop
frames. Hers should show the actual screenshot, large and full-bleed, with the
real URL displayed as a prominent, clickable label directly beneath it.

Presented plainly, as evidence. No device mockups, no tilted 3D perspective, no
browser chrome graphics, no drop shadows. The stance is: *these are live, go
look.*

This is the one place to spend boldness. Everything else stays disciplined.

### Palette

Deep green, chalk, brass. Replaces the previous cream-and-terracotta scheme,
which is a documented AI-default combination.

```css
:root {
  /* grounds */
  --forest:        #16281F;  /* primary dark ground */
  --forest-raised: #1E3428;  /* panels on forest */
  --chalk:         #FAF8F3;  /* primary light ground */
  --chalk-soft:    #EFEBE1;  /* panels on chalk */

  /* accents — TWO brasses. One cannot serve both grounds. */
  --brass:      #C9A340;  /* ON FOREST ONLY — 6.48:1 */
  --brass-deep: #7E6019;  /* ON CHALK ONLY  — 5.54:1 */

  /* type */
  --text-on-forest:  #EAE8E0;  /* 12.61:1 */
  --muted-on-forest: #8B968A;  /*  5.03:1 */
  --text-on-chalk:   #1C1C18;  /* 16.10:1 */
  --muted-on-chalk:  #6E6E64;  /*  4.85:1 */

  /* rules */
  --rule-forest: rgba(234, 232, 224, 0.14);
  --rule-chalk:  rgba(28, 28, 24, 0.13);
}
```

**Critical:** `--brass` (#C9A340) on a chalk background is 3.33:1 and fails WCAG
AA for body text. Never use it on a light ground. Use `--brass-deep` there. The
previous build had this exact bug with ochre on cream.

### Ground system

Sections declare a ground; children read semantic variables and never reference
a palette value directly. This makes the whole site recolourable from one block.

```css
.ground-dark {
  --ink: var(--forest);
  --raised: var(--forest-raised);
  --ink-text: var(--text-on-forest);
  --ink-muted: var(--muted-on-forest);
  --ink-rule: var(--rule-forest);
  --accent: var(--brass);
  background-color: var(--ink);
  color: var(--ink-text);
}

.ground-light {
  --ink: var(--chalk);
  --raised: var(--chalk-soft);
  --ink-text: var(--text-on-chalk);
  --ink-muted: var(--muted-on-chalk);
  --ink-rule: var(--rule-chalk);
  --accent: var(--brass-deep);
  background-color: var(--ink);
  color: var(--ink-text);
}
```

Every component uses `var(--ink-text)`, `var(--accent)`, `var(--ink-muted)`.
Never `var(--forest)` directly inside a component.

Alternate grounds between sections for rhythm. Do not build a light/dark theme
toggle — it doubles the testing surface for no benefit on a portfolio, and the
previous build's toggle was the only thing forcing client-side state.

### Typography

```
Display:  Newsreader   (400, 500; italic available and worth using)
Body:     Archivo      (400, 500, 600)
Utility:  JetBrains Mono (400, 500) — labels, metadata, URLs only
```

**Do not use Instrument Serif.** It is heavily overused in AI-generated design
right now and is part of the same default cluster as the old palette. Newsreader
is editorial, has genuine personality in its italic, and is far less common.

**Do not use Inter.** Archivo is a grotesque with slightly tighter proportions —
professional without being the default.

Load via `@fontsource-variable/newsreader`, `@fontsource-variable/archivo`, and
`@fontsource-variable/jetbrains-mono` as npm packages, imported in `main.tsx`.
Do **not** use a `<link>` to fonts.googleapis.com — the current build does, and
it costs a DNS lookup, TLS handshake and round trip before any text can paint.

Type scale — use `clamp()` throughout, no fixed pixel sizes above 20px:

| Role | Size | Face |
|---|---|---|
| Page title | `clamp(2.75rem, 7vw, 5.5rem)` | Newsreader 400 |
| Section heading | `clamp(2rem, 4vw, 3.25rem)` | Newsreader 400 |
| Project name | `clamp(1.5rem, 3vw, 2.25rem)` | Newsreader 500 |
| Body | `1.0625rem` / 1.65 | Archivo 400 |
| Small | `0.875rem` / 1.55 | Archivo 400 |
| Eyebrow / label | `0.72rem`, `0.16em` tracking, uppercase | JetBrains Mono 500 |

### Motion

Minimal and deliberate. Permitted:

- A single page-load fade-and-rise on the hero, ~400ms, once
- Hover states on links and project rows (colour or underline, 150ms)
- Scroll-reveal on project rows via CSS `animation-timeline: view()` — no
  IntersectionObserver, no JS

Not permitted: cycling text, count-up numbers, marquees, carousels, parallax,
typewriter effects, cursor followers, magnetic buttons, page-transition overlays.

Respect `prefers-reduced-motion` globally — final state shown immediately.

### Structure

Do **not** use numbered markers (01 / 02 / 03) on projects. The previous build
did. Numbers only earn their place when order carries information the reader
needs — a process, a timeline. A portfolio list is not a sequence, so they were
decoration.

Zero border-radius on structural elements. Hairline rules at 1px using
`var(--ink-rule)`. Generous vertical rhythm: sections at `clamp(5rem, 10vw, 9rem)`
padding block.

---

## 2. Site structure

Four routes. React Router, `BrowserRouter`.

```
/            Home
/projects    Projects index (all nine)
/projects/:slug   Individual case study
/about       About
/contact     Contact
```

Note the route change: the old build used `/work/:slug`. Use `/projects/:slug`
so the URL matches the nav label.

### Required: fix deep links

The current build 404s on direct load of any route except `/`, because Netlify
has no SPA rewrite rule. Create `public/_redirects`:

```
/*    /index.html   200
```

This is required. Without it, every project page is unreachable by direct URL,
which means unshareable and unindexable.

### Required: per-page metadata

Install `react-helmet-async`. Every route sets its own `<title>`,
`<meta name="description">`, `<link rel="canonical">` and Open Graph tags.
Currently all routes share one static title.

Root `index.html` additions:

- `<meta property="og:image" content="/og.png">` — the file exists in `/public`,
  and the site currently declares `summary_large_image` with no image, so every
  share renders blank
- `<meta property="og:url">` and a canonical link
- Favicon
- `Person` + `ProfilePage` JSON-LD (content in section 7)

---

## 3. Page: Home

Single job: establish in ten seconds that Olivia is a real developer who ships
real things, then route the visitor to the proof.

```
┌──────────────────────────────────────────────────┐
│  [ground-dark]                                   │
│                                                  │
│  LAGOS, NIGERIA                    ← mono eyebrow│
│                                                  │
│  Olivia Onyekaba                   ← Newsreader  │
│  Web developer                                   │
│                                                  │
│  I build websites and web applications  [PHOTO]  │
│  that take payments, capture leads and           │
│  hold up under real traffic. Nine live           │
│  now, for clients in Nigeria, the UK             │
│  and the United States.                          │
│                                                  │
│  [See the work]  [Download CV]                   │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  [ground-light]  SELECTED WORK                   │
│                                                  │
│  Three featured projects.                        │
│  Full-bleed screenshot, name, one line,          │
│  stack, live URL. Stacked vertically,            │
│  generous spacing. NOT a 3-up card grid.         │
│                                                  │
│  → See all nine projects                         │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  [ground-dark]  WHAT I DO                        │
│                                                  │
│  Three columns, text only, no icons.             │
│  (Content in section 7.)                         │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  [ground-light]  Contact CTA + footer            │
└──────────────────────────────────────────────────┘
```

**Hero rules:** the headline is static. No cycling words. The portrait sits
beside the text on desktop, above it on mobile. Use `aspect-ratio` and explicit
`width`/`height` to prevent layout shift.

**No icons anywhere on this page.** Lucide icons in capability cards are a
generic tell. Text and rules only.

---

## 4. Page: Projects

The centrepiece. All nine, no filtering UI, no category tabs, no masonry grid.

Each project is a full-width block:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   [ full-bleed screenshot, 1400x900, webp ]      │
│                                                  │
│   HPM Electric                    2026           │
│   Freelance Web Developer                        │
│                                                  │
│   Site for a Pennsylvania electrical contractor  │
│   built on a programmatic page matrix spanning   │
│   four service categories, roughly twenty        │
│   sub-services and eight service areas.          │
│                                                  │
│   Astro · TypeScript · Schema.org · Technical SEO│
│                                                  │
│   hpmelectric.com ↗        Read the case study → │
│   ─────────────────────────────────────────────  │
└──────────────────────────────────────────────────┘
```

The live URL is set in JetBrains Mono, in `var(--accent)`, and is a real
`<a target="_blank" rel="noopener noreferrer">`. It should be visually
prominent — this is the signature element from section 1.

Alternate ground between consecutive projects, or keep one ground and separate
with hairline rules. Pick one and be consistent.

### Screenshots

The current build proxies every thumbnail live through
`s.wordpress.com/mshots`. It cold-starts slowly, frequently returns grey, and
hands all nine client URLs to WordPress.com on every page view. Remove it.

Capture each site once at 1400x900, convert to webp at quality 80, target under
120KB, commit to `public/images/work/<slug>.webp`. Set explicit `width` and
`height` on every `<img>`, `loading="lazy"` on all but the first.

If a screenshot is not yet captured, render a plain panel in `var(--raised)`
with the project name — do not fall back to a live proxy.

### Case study page — `/projects/:slug`

Header (name, role, year, stack, live link), hero screenshot, then the section
headings and bodies from the project data. Previous/next navigation at the
bottom. Keep it simple; the index page is where the design work goes.

---

## 5. Page: About

Needs real photos — see section 8. Structure:

- Short intro, first person, Newsreader italic pull-quote for one line
- Photo
- **Background:** HND in Electrical/Electronics Engineering from Federal
  Polytechnic Oko, moved into web development, freelancing since 2021
- **Now:** CTO at AfroVoy, web developer at Bature Digital, freelance clients
- **Learning:** currently working through DevOps — Docker, CI/CD, Linux
  administration. Frame as in progress, not as a service offered.
- Download CV button

Four to six short paragraphs. First person throughout. No "passionate about
crafting digital experiences."

---

## 6. Page: Contact

Simplest page on the site. Do not build a form that posts nowhere.

- One line: what she's open to
- Email as a visible `mailto:` link — `oliviaimmaculate1@gmail.com`
- GitHub: `github.com/Ollieblaq`
- LinkedIn: **URL to be supplied** — leave a clearly marked TODO, do not guess
- Download CV — `/cv/Olivia-Onyekaba-CV.pdf`
- Location: Lagos, Nigeria

**Do not** include the phone number. It belongs on the CV she sends directly,
not on a public page scrapers crawl.

If a contact form is wanted later, use Netlify Forms — it needs no backend. Not
required for this build.

---

## 7. Content

### Positioning

**Lead with "Web developer."** Not "Web Developer, UI/UX Designer & DevOps
Engineer." Three co-equal roles reads as uncertainty, and the reader has to
decide for themselves what she is. Design and infrastructure appear as
supporting depth further down, never in the H1 or the page title.

Page title: `Olivia Onyekaba — Web Developer, Lagos`

### Voice

Her real voice is already in the project descriptions — specific, plain,
confident. Match that register everywhere.

**Rewrite, do not reuse,** the old capability copy. Examples of what to avoid,
taken from the current site:

- "Deliberate UI/UX interfaces constructed around mathematical typographic
  scales"
- "Rigid type safety and clean business logic integration"
- "An absolute masterclass in e-commerce strategy"
- "Austere editorial layout"

Nobody writes like this about their own work. Compare to what she actually
wrote: *"Every product carries both a standard add-to-cart and a Chat to Order
action that opens WhatsApp pre-filled with the item name, price and URL, so the
two paths run in parallel instead of competing."* That is the target.

### "What I do" — three columns, Home page

Rewrite in the voice above. Permitted scope only:

1. **Front-end development** — Next.js, React, Astro, TypeScript, Tailwind.
   Responsive builds to Core Web Vitals targets.
2. **Commerce and lead capture** — WooCommerce, Stripe, PayPal, multi-currency,
   gated membership areas, multi-step application forms.
3. **Technical SEO** — programmatic page architecture, Schema.org structured
   data, metadata at scale.

Do not add a fourth column for DevOps. That belongs in About as learning.

### Projects data

Port all nine from the existing `src/data/projects.ts` — the content there is
good and already specific. Keep `slug`, `name`, `year`, `role`, `disciplines`,
`description`, `stack`, `liveUrl`, `sections`.

Add `cover` (local webp path) and `order`. Drop `index` (the '01'/'02' display
numbers).

Order: AfroVoy, HPM Electric, All Grace African Market, District 9 Branded
Residences, London Bible Academy, Aura Cayane, TheCampStack, HYTENS Solutions,
Kúnlé Ìlòrí-Diamond.

### Structured data

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Olivia Onyekaba",
    "jobTitle": "Web Developer",
    "email": "oliviaimmaculate1@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    },
    "sameAs": ["https://github.com/Ollieblaq"],
    "knowsAbout": ["Next.js", "React", "Laravel", "Astro", "TypeScript",
                   "WordPress", "WooCommerce", "Technical SEO"],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Federal Polytechnic Oko"
    }
  }
}
```

---

## 8. Assets

| Asset | Status | Path |
|---|---|---|
| CV PDF | Ready | `public/cv/Olivia-Onyekaba-CV.pdf` |
| OG image | Ready | `public/og.png` |
| Project screenshots | **To capture** | `public/images/work/<slug>.webp` |
| Portraits | **To supply** | `public/images/` |

**On portraits:** the repo currently contains one photo, duplicated four times.
`portrait.webp` is not a webp — it is the same JPEG with the extension changed,
so it is 642KB where a real webp would be under 60KB. Convert it properly.

The Home hero and the About page need different images. Until more are supplied,
use the existing portrait on Home only and leave About's image slot as a marked
TODO. Do not source a stock photo to fill the gap.

---

## 9. Quality floor

Non-negotiable, verified before the work is considered done:

- Responsive from 320px up. Test at 320, 375, 768, 1024, 1440.
- Visible keyboard focus on every interactive element — `2px solid var(--accent)`,
  `outline-offset: 3px`.
- `prefers-reduced-motion` honoured globally.
- Every image has `alt`, explicit `width`/`height`, and `loading="lazy"` below
  the fold.
- Semantic HTML: one `<h1>` per page, `<nav>`, `<main>`, `<footer>`, heading
  levels in order.
- Skip-to-content link.
- All external links `rel="noopener noreferrer"`.
- No `console.log` in committed code.
- `npm run lint` (tsc --noEmit) passes clean.

### Verification

```bash
npm run build && npx serve dist
```

1. Every route loads by direct URL, not just by clicking. Hard refresh on
   `/projects/hpm-electric` does not 404. **This is the main regression to
   watch** — it is broken on the current site.
2. Lighthouse: performance and accessibility both above 95.
3. Tab through every page start to finish. Focus always visible.
4. Throttle to slow 3G. Text readable before images land.
5. `grep -rn "mshots\|genai\|placeholder\|lorem\|example.com" src/` returns
   nothing.
6. No fabricated content anywhere. Re-read section 0.

---

## 10. Build order

1. Delete the components in section 0. Commit.
2. Palette and type tokens in `src/index.css`. Install fontsource packages.
3. `public/_redirects`, react-helmet-async, root `index.html` meta.
4. Router with four routes + `/projects/:slug`. Shared layout, header, footer.
5. Projects data module — port all nine.
6. Projects index page. **This is the design centrepiece — spend the time here.**
7. Case study page.
8. Home.
9. About and Contact.
10. Screenshot capture and optimisation.
11. Quality floor pass, then verification.

Work on a branch: `git checkout -b rebuild`. Keep `main` deployable.

---

## Open questions — ask before assuming

1. LinkedIn profile URL for `sameAs` and the contact page.
2. Additional portraits for Home and About.
3. Custom domain — `olivia-onyekaba.netlify.app` undercuts the credibility the
   site exists to build. If one is registered, update `og:url` and canonicals.
4. Any real client testimonials. If none, the site ships without that section —
   which is correct, and better than inventing them.
