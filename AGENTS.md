# Bharat Cricket Club — Project Context

**Live site:** bharatcricketclub.org (see `CNAME`)
**Repo:** Aksharnixglobal/bharatwarriors.org (GitHub Pages — repo name predates the domain switch)
**Stack:** Static HTML/CSS/JS — no build step, no framework, no dependencies
**Org:** Bharat Cricket Club By UGNT (United Gujaratis of North Texas), Dallas-Fort Worth TX

---

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | Homepage — hero, stats bar, leagues, UGNT section |
| `about.html` | `/about.html` | Club story, leadership, mission, values |
| `achievements.html` | `/achievements.html` | League results (DFCL, LECA) with tier cards |
| `team.html` | `/team.html` | Teams (Warriors & Yodhas), rosters, values |
| `gallery.html` | `/gallery.html` | Photo gallery with album tabs + lightbox (`<dialog>`) |
| `sponsors.html` | `/sponsors.html` | Sponsor cards |
| `community-partner.html` | `/community-partner.html` | Community partner cards |
| `contact.html` | `/contact.html` | Contact cards, mailto, social links |
| `fixtures.html` | `/fixtures.html` | Match schedule |
| `thank-you.html` | `/thank-you.html` | Post-submission confirmation page |

Nav order across all pages: Home · About Us · Achievements · Teams · Gallery · Sponsor · Community Partner · Contact Us.

---

## Architecture

- **`styles.css`** (~110 KB) — Global nav, body, shared components (cards, buttons, footer). Every page links it.
- **Per-page `<style>` blocks** — Page-specific styles live inline in each HTML file's `<head>`.
- **Inline `<script>` blocks** — All live JS is inline per page (nav toggle, gallery albums, lightbox). The standalone `script.js` is **not loaded by any page** — see Legacy below.
- **No shared partials** — Nav and footer HTML are duplicated across pages (intentional, no build step). A nav or footer change must be applied to every page.
- **`data/players.json`** — Roster data (`warriors` / `yodhas` arrays: `initials`, `name`, `role`, optional `badges`, `type`).

### Images (`images/`)

| Dir | Contents |
|---|---|
| `assets/` | Icons — `medal.png`, `om.png` |
| `awards/` | Award & presentation photos (`<name>-mom.jpg`, `<name>-best-<role>-<league>.jpg`, `annual-party-2026-*.jpg`) |
| `brand/` | `bcc-logo.jpg`, `bcc-logo-og.jpg`, `ugnt-logo.png`, `zelle-qr.jpg` |
| `celebrations/` | `celebration-01..09.jpg` |
| `hero/` | `bw-hero-1.jpg`, `bw-team-photo.jpg` |
| `leaders/` | Leadership headshots, `firstname-lastname.jpg` |
| `logos/` | Sponsor & league logos |
| `practice/` | `practice-01..02.jpg` |
| `team/` | Team photos — `warriors.jpg`, `yodhas.jpg`, `warriors-team.jpg` |
| `gallery/`, `party/` | Empty — legacy dirs, not referenced |

Photos come off phones at 4-5K. Downscale to ~1600px long edge before committing (`sips -Z 1600 -s formatOptions 78 file.jpg`) to keep page weight sane.

---

## Gallery

Four albums, toggled by `showAlbum('<id>')` — only one `.gallery-grid` visible at a time:

| Tab | Div id |
|---|---|
| Awards | `album-awards` |
| Celebrations | `album-party` |
| Training | `album-practice` |
| Team Intros | `album-intro` |

Each tile repeats its image path and caption three times — `openLightbox(path, caption)`, the `.ph` background-image, and the `.cap` text. Keep all three in sync.

---

## Brand & Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| Page background | `#07111f` | `body`, `html` |
| Nav / hero overlay | `#0c3054` | `nav` background |
| Card background | `linear-gradient(160deg, #0e2244 0%, #071428 100%)` | All cards |
| Gold gradient | `linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010)` | Headings, accents |
| Gold border | `rgba(216,144,24,0.18)` | Card borders (hover: `0.45`) |
| Muted text | `rgba(255,255,255,0.5)` | Body/descriptions |
| Tricolor saffron | `#FF9933` | Nav bottom strip |
| Tricolor green | `#138808` | Nav bottom strip |

### Typography
| Role | Font | Weight |
|---|---|---|
| Hero display, stat numbers | Bebas Neue | 400 |
| Section headings, card titles, nav | Oswald | 600–700 |
| Body text, labels, buttons | Montserrat | 400–900 |

Google Fonts: `Bebas+Neue`, `Oswald:wght@600;700`, `Montserrat:wght@400;500;600;700;800;900`

### Recurring Patterns
- **Gold animated top bar** on cards: `::before` with `goldSlide` keyframe animation
- **Spinning conic logo ring** on team/league cards: `::before` conic-gradient, `animation: spin 10s linear infinite`
- **Card hover:** `border-color: rgba(216,144,24,0.45)`, `box-shadow: 0 0 50px rgba(216,144,24,0.1)`, `transform: translateY(-3px)`
- **Tricolor strip** at bottom of nav via CSS background layering (not a separate element)
- **Page titles:** `<h1 class="page-title">` directly in `<main>`, `font-size: 3rem`, Oswald, gold gradient text

---

## Nav

- Sticky, `z-index: 999998`
- Mobile: hamburger at `≤1100px`, sidebar slides in from right
- Sidebar: `position: fixed; top: 92px` (below nav height), `width: 280px`
- Overlay: `.nav-overlay` (dark backdrop, `z-index: 998`) — created dynamically by inline JS
- Each page has identical inline nav JS for toggle/overlay/scroll-lock

---

## Contact & Social

- **Email:** info@bharatcricketclub.org (mailto link — there is no form on `contact.html`)
- **YouTube:** https://www.youtube.com/@bharatwarriorsdallas
- **Instagram:** https://www.instagram.com/bccugnt2024
- **Facebook:** https://www.facebook.com/share/1B5jLm9N7W/

---

## Legacy / stale files

These are checked in but no longer wired to anything. Don't treat them as live config:

- `script.js` — scroll progress bar and scroll-lock overrides; no page includes it
- `CLEAN_GOOGLE_SCRIPT.js` — Google Apps Script `doPost` for the old expense sheet
- `GOOGLE_SHEETS_SETUP.md` — setup notes for that sheet
- `EXPENSE_EMAIL_SETUP.md` — Formspree setup notes for the removed expense form
- `images/brand/bcc-logo-old.jpg` — superseded logo

Removed pages, for context when reading old commits: `expenses.html`, `support.html`, `partners.html` (dropped in `59ce415`), and `warriors.html` (renamed to `team.html` in `0becbf4`).

---

## Deployment

Push to `main` → auto-deploys via GitHub Pages to bharatcricketclub.org. There is no CI, no tests, no staging — verify locally by opening the HTML file before pushing.

Commits are GPG-signed. `.gitignore` covers `.DS_Store` and `.superpowers`.
