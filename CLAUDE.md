# Bharat Cricket Club — Project Context

**Site:** bharatwarriors.org
**Repo:** Aksharnixglobal/bharatwarriors.org (GitHub Pages)
**Stack:** Static HTML/CSS/JS — no build step, no framework
**Org:** Bharat Cricket Club By UGNT (United Gujaratis of North Texas), Dallas-Fort Worth TX

---

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | Homepage — hero, stats bar, leagues, UGNT section |
| `about.html` | `/about.html` | Club story, leadership, mission, values |
| `achievements.html` | `/achievements.html` | League results (DFCL, LECA) with tier cards |
| `warriors.html` | `/warriors.html` | Teams (Warriors & Yodhas), rosters, values |
| `gallery.html` | `/gallery.html` | Photo gallery with tabs + lightbox (`<dialog>`) |
| `partners.html` | `/partners.html` | Sponsor cards |
| `expenses.html` | `/expenses.html` | Expense reimbursement form |
| `support.html` | `/support.html` | Donations via Zelle |
| `contact.html` | `/contact.html` | Contact form + social links (YouTube, Instagram) |
| `fixtures.html` | `/fixtures.html` | Match schedule |

---

## Architecture

- **`styles.css`** — Global nav, body, shared components (cards, buttons, footer). All pages link this.
- **Per-page `<style>` blocks** — Page-specific styles live inline in each HTML file's `<head>`.
- **No shared partials** — Nav and footer HTML are duplicated across pages (intentional, no build step).
- **Images:** `images/gallery/` (photos), `images/logos/` (partner/league logos), `images/assets/` (icons: medal.png, om.png)

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

## Social Links (contact.html)

- **YouTube:** https://www.youtube.com/@bharatwarriorsdallas
- **Instagram:** https://www.instagram.com/bccugnt2024

---

## Deployment

Push to `main` branch → auto-deploys via GitHub Pages to bharatwarriors.org.
Commits are GPG-signed.
