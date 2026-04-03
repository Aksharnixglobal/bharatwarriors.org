# BCC Premium Rebrand — Design Spec
**Date:** 2026-03-27
**Scope:** All pages (index, about, achievements, warriors, gallery, partners, expenses, support, contact, fixtures)

---

## Goal
Redesign bharatwarriors.org to match the official BCC logo — Navy Blue + Gold + White — and give it a premium professional cricket franchise feel. Remove glass-morphism. Apply across all pages consistently.

---

## Color Tokens (extracted from BCC.jpg)

| Token | Hex | Use |
|---|---|---|
| `--navy-dark` | `#07111f` | Page background |
| `--navy-primary` | `#0c3054` | Shield navy — nav, hero overlay |
| `--navy-mid` | `#0a1e40` | Card / section backgrounds |
| `--navy-card` | `#0c1e38` | Individual card bg |
| `--gold-dark` | `#9A6010` | Gold gradient anchor |
| `--gold-mid` | `#D89018` | Gold gradient mid (most common pixel) |
| `--gold-bright` | `#F5C040` | Gold gradient highlight |
| `--gold-gradient` | `linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010)` | All gold text, buttons, accents |
| `--white` | `#FFFFFF` | Primary text |
| `--white-muted` | `rgba(255,255,255,0.6)` | Secondary text, meta |
| `--tricolor-saffron` | `#FF9933` | Indian flag accent |
| `--tricolor-green` | `#138808` | Indian flag accent |

---

## Typography

| Role | Font | Weight | Style |
|---|---|---|---|
| Hero display | Bebas Neue | 400 | All-caps, large letter-spacing |
| Section headings, nav, card titles | Oswald | 600–700 | All-caps, letter-spacing |
| Body text, labels, meta | Montserrat | 400–700 | Mixed case |

Google Fonts import: `Bebas+Neue`, `Oswald:wght@600;700`, `Montserrat:wght@400;500;600;700;800;900`

---

## Design Patterns

### Removing glass-morphism
Replace all:
- `background: rgba(255,255,255,0.07)` → `#0c1e38` (solid navy card)
- `backdrop-filter: blur(10px)` → remove
- `border: 1px solid rgba(255,255,255,0.14)` → `1px solid rgba(255,255,255,0.06)`

### Cards
```css
background: #0c1e38;
border: 1px solid rgba(255,255,255,0.06);
border-radius: 6px;
position: relative;
/* Gold top accent line */
::after { top: 0; height: 2px; background: var(--gold-gradient); }
```

### Buttons
- **Primary (JOIN US):** `background: var(--gold-gradient); color: #07111f;` + `clip-path: polygon(10px 0%, 100% 0%, calc(100%-10px) 100%, 0% 100%)` (angular)
- **Secondary (EXPLORE TEAMS):** `transparent; border: 1px solid rgba(216,144,24,0.4); color: rgba(255,255,255,0.75)`
- **Hover:** primary → slightly brighter; secondary → border brightens to `rgba(216,144,24,0.8)`, text white
- **No transform, no box-shadow on hover** (border/opacity change only)

### Section headers
Left gold bar + Oswald heading + optional right badge:
```html
<div class="sec-bar"></div>  <!-- 3px wide, gold gradient -->
<span class="sec-title">Section Name</span>
<span class="sec-badge">Label</span>
```

### Hero (index.html)
- Tricolor strip top (3px, saffron/white/green)
- Dark overlay: `linear-gradient(168deg, rgba(7,17,31,0.94), rgba(12,30,56,0.87), rgba(7,17,31,0.96))`
- "WELCOME TO" eyebrow (9px, 8px letter-spacing, muted white)
- Star divider row (★ ★ ★ with gold rule lines)
- "BHARAT" in Bebas Neue 64px gold gradient
- "CRICKET CLUB" in Oswald 22px white
- Gold rule divider
- "ONE TEAM · ONE PRIDE" tagline (tiny, very muted)
- JOIN US + EXPLORE TEAMS buttons
- Stats bar: 3+ Seasons / 2 Teams / 40+ Players / DFW

### Navigation
- Background: `#0c1e38`
- Logo: BCC.jpg circle + "Bharat Cricket Club" (Oswald) + "By UGNT" subline
- Links: Montserrat 9px, letter-spacing 2px
- Active: white; inactive: `rgba(255,255,255,0.4)`
- CTA pill: gold gradient background

### Footer
- Background: `#07111f`
- Top border: 1px `rgba(216,144,24,0.2)`
- Heading color: gold gradient text
- Link color: `rgba(255,255,255,0.5)` → white on hover

---

## Styles.css Updates
- Update CSS variables: `--primary-color`, `--accent-gradient`, background colors
- Replace `.btn` with new angular button system
- Remove all ripple / transform hover animations (already done)
- Update `.become-sponsor`, `.sponsor`, `.contact-link` to match new palette

## Per-page changes
All pages share `styles.css` + page-level `<style>` blocks. Each page needs:
1. Font imports updated to include Bebas Neue + Oswald
2. Page background: `#07111f`
3. Glass → solid navy cards
4. Gold gradient applied to headings/accents
5. Button classes updated

---

## Out of scope (iterate later)
- Mobile nav redesign
- New photography / hero images
- Animations / scroll effects
- Individual player profile cards
