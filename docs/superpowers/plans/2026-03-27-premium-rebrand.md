# BCC Premium Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign bharatwarriors.org across all pages to match the BCC logo — deep navy, amber-gold gradient, white text, Bebas Neue + Oswald + Montserrat fonts — replacing the current teal/glass-morphism style with a premium solid sports-franchise look.

**Architecture:** All pages share `styles.css` for global nav/base styles plus page-specific `<style>` blocks. We update CSS variables in `styles.css` first (immediate global effect on nav, body background, shared components), then update each page's `<style>` block and font import individually. No new files created.

**Tech Stack:** HTML, CSS (no build step). Google Fonts: Bebas Neue, Oswald, Montserrat.

---

## Design Tokens (reference throughout all tasks)

```css
/* Colors */
--navy-dark:    #07111f   /* page background */
--navy-primary: #0c3054   /* nav, hero overlay */
--navy-mid:     #0a1e40   /* section backgrounds */
--navy-card:    #0c1e38   /* card backgrounds */
--gold-dark:    #9A6010   /* gradient anchor/shadow */
--gold-mid:     #D89018   /* gradient mid */
--gold-bright:  #F5C040   /* gradient highlight */
--white:        #ffffff
--white-muted:  rgba(255,255,255,0.6)
--white-dim:    rgba(255,255,255,0.3)
--tricolor-saffron: #FF9933
--tricolor-green:   #138808

/* Gold gradient (reuse everywhere) */
--gold-gradient: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010)

/* Fonts */
Display:  'Bebas Neue' — hero titles, large stat numbers
Headings: 'Oswald' 600/700 — section headings, nav, card titles
Body:     'Montserrat' 400–800 — body text, labels, buttons
```

---

## File Map

| File | What changes |
|---|---|
| `styles.css` | `:root` CSS variables, body/html background, nav styles, shared `.btn`, `.section-header`, `.card` base |
| `index.html` | Font import, `<style>` block (hero, buttons, stats bar, league cards, footer), hero HTML structure |
| `about.html` | Font import, `<style>` block (leader cards, timeline) |
| `achievements.html` | Font import, `<style>` block (achievement cards) |
| `warriors.html` | Font import, `<style>` block (team cards, player cards, join CTA) |
| `gallery.html` | Font import, `<style>` block (filter buttons, gallery items) |
| `partners.html` | Font import, `<style>` block (sponsor cards, become-sponsor section) |
| `support.html` | Font import, `<style>` block (donation cards, support CTA) |
| `contact.html` | Font import, `<style>` block (form, social links) |
| `fixtures.html` | Font import, `<style>` block (fixture cards) |
| `expenses.html` | Font import, `<style>` block (expense form, table) |

---

## Task 1: Update CSS variables and global base in styles.css

**Files:** Modify `styles.css:323–391` (`:root` block), `styles.css:44–80` (html/body)

- [ ] **Step 1: Replace the `:root` block**

In `styles.css`, find the `:root { ... }` block at line 323 and replace the entire block with:

```css
:root {
  /* BCC Brand — Navy + Gold */
  --navy:        #0c3054;
  --navy-2:      #0a1e40;
  --navy-dark:   #07111f;
  --navy-card:   #0c1e38;
  --navy-light:  rgba(12, 48, 84, 0.8);

  /* Gold gradient — extracted from BCC logo */
  --gold-dark:    #9A6010;
  --gold-mid:     #D89018;
  --gold-bright:  #F5C040;
  --gold-gradient: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);

  /* Indian flag accents */
  --saffron:       #FF9933;
  --green:         #138808;
  --green-light:   #2ecc71;
  --green-dark:    #27ae60;

  /* Functional */
  --blue:          #3b82f6;
  --orange:        #FF9933;
  --primary-color: #D89018;
  --secondary-color: #9A6010;
  --chakra:        #3b82f6;
  --accent-gradient: var(--gold-gradient);

  /* Typography */
  --ink:           #ffffff;
  --text-color:    #ffffff;
  --text-light:    rgba(255,255,255,0.6);
  --muted:         rgba(255,255,255,0.4);
  --text-accent:   #D89018;

  /* Surfaces */
  --bg:              #07111f;
  --bg-secondary:    #0a1e40;
  --paper:           #0c1e38;
  --surface-elevated: #0c3054;
  --line:            rgba(255,255,255,0.08);
  --line-light:      rgba(255,255,255,0.04);

  /* Nav */
  --nav-hover: rgba(216,144,24,0.15);
  --nav-bg:    rgba(12,48,84,0.95);

  /* Shadows — subtle on dark bg */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 8px 20px rgba(0,0,0,0.4);
  --shadow-lg: 0 15px 35px rgba(0,0,0,0.5);
  --shadow-xl: 0 25px 50px rgba(0,0,0,0.6);

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-xl: 14px;
  --radius-full: 50%;
}
```

- [ ] **Step 2: Update html/body background in styles.css**

Find the `html` block around line 44 and `body` block around line 57. Replace their background values:

```css
html {
  scroll-behavior: smooth;
  background: #07111f !important;
  background-image: none !important;
}

body {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
  background-color: #07111f !important;
  background-image: none !important;
  background-attachment: unset !important;
  color: #ffffff;
  min-height: 100vh;
}
```

- [ ] **Step 3: Update the nav background in styles.css**

Find `.nav{...}` around line 1024. Update `background` to:
```css
background: #0c3054;
border-bottom: 1px solid rgba(216,144,24,0.18);
```

Find `.brand .t` (line ~1038, the gradient logo text) and update to gold:
```css
.brand .t {
  font-family: "Oswald", "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 4: Update nav link hover/active in styles.css**

Find `.menu a::after` (line ~1055) gradient underline. Update:
```css
.menu a::after {
  background: linear-gradient(90deg, #D89018, #F5C040);
}
```

Find `.menu .active::after` (line ~1062). Update:
```css
.menu .active::after {
  width: 80%;
  background: linear-gradient(90deg, #D89018, #F5C040);
}
```

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "Rebrand: update CSS variables and nav to navy/gold palette"
```

---

## Task 2: Update index.html

**Files:** Modify `index.html`

The current `index.html` already has a good structure (hero, leagues section, donation section, footer). We're updating the font import, `<style>` block, and the hero HTML to match the new premium design.

- [ ] **Step 1: Update font import**

Find:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet">
```
Replace with:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Replace the page `<style>` block**

Find the `<style>` block (lines ~10–210) and replace entirely with:

```css
<style>
  html, body {
    margin: 0 !important; padding: 0 !important;
    background: #07111f !important;
    font-family: 'Montserrat', sans-serif !important;
  }
  /* Hero */
  .hero {
    position: relative; overflow: hidden;
    background:
      linear-gradient(168deg, rgba(7,17,31,0.94) 0%, rgba(12,30,56,0.87) 55%, rgba(7,17,31,0.96) 100%),
      url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000') center/cover no-repeat;
    background-attachment: fixed;
    padding: 80px 2rem 70px;
    min-height: 70vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center;
  }
  .hero-tricolor {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #FF9933 33.3%, white 33.3%, white 66.6%, #138808 66.6%);
  }
  .hero-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(216,144,24,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-content { position: relative; z-index: 2; }
  .hero-star-row {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; margin-bottom: 16px;
  }
  .hero-star-line {
    width: 56px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(216,144,24,0.45));
  }
  .hero-star-line.r { background: linear-gradient(90deg, rgba(216,144,24,0.45), transparent); }
  .hero-star-dots { font-size: 9px; color: rgba(216,144,24,0.5); letter-spacing: 5px; }
  .hero-eyebrow {
    font-size: 10px; letter-spacing: 8px; text-transform: uppercase;
    color: rgba(255,255,255,0.35); font-weight: 600; margin-bottom: 12px;
  }
  .hero h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 8vw, 80px);
    letter-spacing: 8px; line-height: 0.95;
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 6px;
  }
  .hero-club {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(18px, 3vw, 26px);
    font-weight: 600; letter-spacing: 10px;
    color: rgba(255,255,255,0.8); text-transform: uppercase;
    margin-bottom: 20px;
  }
  .hero-rule {
    width: 72px; height: 2px;
    background: linear-gradient(90deg, transparent, #D89018, #F5C040, #D89018, transparent);
    margin: 0 auto 16px;
  }
  .hero-tagline {
    font-size: 9px; letter-spacing: 10px; text-transform: uppercase;
    color: rgba(255,255,255,0.2); margin-bottom: 36px;
  }
  .hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
  .btn {
    padding: 12px 28px; font-family: 'Montserrat', sans-serif;
    font-weight: 800; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    text-decoration: none; cursor: pointer; border-radius: 3px;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: opacity 0.2s ease;
  }
  .btn:hover { opacity: 0.85; }
  .btn-primary {
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    color: #07111f; border: none;
  }
  .btn-secondary {
    background: transparent; color: rgba(255,255,255,0.8);
    border: 1px solid rgba(216,144,24,0.4);
  }
  .btn-secondary:hover { border-color: rgba(216,144,24,0.8); color: white; opacity: 1; }

  /* Stats bar */
  .hero-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    background: #0a1e40;
    border-top: 1px solid rgba(216,144,24,0.15);
    border-bottom: 1px solid rgba(216,144,24,0.15);
  }
  .hero-stat { padding: 16px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.04); }
  .hero-stat:last-child { border-right: none; }
  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px;
    background: linear-gradient(135deg, #D89018, #F5C040, #D89018);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-stat-label { font-size: 8px; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-top: 2px; }

  /* Leagues section */
  .leagues-section { padding: 4rem 2rem; background: #07111f; text-align: center; }
  .leagues-section h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 0.5rem;
  }
  .leagues-section > p { font-size: 1rem; color: rgba(255,255,255,0.5); max-width: 700px; margin: 0 auto 2.5rem; }
  .leagues-grid {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;
  }
  .league-card {
    background: #0c1e38; border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; padding: 1.75rem; text-align: left;
    position: relative; overflow: hidden;
    transition: border-color 0.2s ease;
  }
  .league-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  }
  .league-card:hover { border-color: rgba(216,144,24,0.3); }
  .league-card h3 {
    font-family: 'Oswald', sans-serif; font-size: 1.2rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: white; margin-bottom: 0.5rem;
  }
  .league-card p { font-size: 0.9rem; color: rgba(255,255,255,0.5); }

  /* Donation section */
  .donation-section { background: #0a1e40; padding: 3rem 2rem; text-align: center; }
  .donation-section h2 {
    font-family: 'Oswald', sans-serif; font-size: 1.6rem; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 1rem;
  }
  .donation-section p { color: rgba(255,255,255,0.55); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
  .donation-info {
    background: #0c1e38; border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; padding: 1.5rem; max-width: 480px; margin: 0 auto 2rem;
    position: relative; overflow: hidden;
  }
  .donation-info::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  }

  /* Footer */
  footer { background: #07111f; color: white; padding: 3rem 2rem 1rem; border-top: 1px solid rgba(216,144,24,0.15); }
  footer .container { max-width: 1200px; margin: 0 auto; }
  footer .footer-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem; margin-bottom: 2rem;
  }
  footer h3 {
    font-family: 'Oswald', sans-serif; font-size: 0.9rem; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    background: linear-gradient(135deg, #D89018, #F5C040);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 1rem;
  }
  footer a { display: block; color: rgba(255,255,255,0.45); text-decoration: none; margin-bottom: 0.5rem; font-size: 0.85rem; transition: color 0.2s; }
  footer a:hover { color: #D89018; }
  footer .ugnt-support { text-align: center; margin: 2rem 0; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06); }
  footer .ugnt-support img { width: 70px; height: 70px; border-radius: 50%; margin-bottom: 0.5rem; border: 1px solid rgba(216,144,24,0.3); }
  footer .copyright { text-align: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.25); font-size: 0.8rem; }
  footer .copyright a { display: inline; color: #D89018; }

  @media (max-width: 768px) {
    .hero-stats { grid-template-columns: repeat(2, 1fr); }
    .hero h2 { font-size: 48px; letter-spacing: 5px; }
    .hero-club { letter-spacing: 5px; }
  }
</style>
```

- [ ] **Step 3: Update the hero HTML**

Find the `<section class="hero">` block and replace with:

```html
<section class="hero">
    <div class="hero-tricolor"></div>
    <div class="hero-glow"></div>
    <div class="hero-content">
        <div class="hero-star-row">
            <div class="hero-star-line"></div>
            <span class="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div class="hero-star-line r"></div>
        </div>
        <p class="hero-eyebrow">Welcome to</p>
        <h2>Bharat</h2>
        <p class="hero-club">Cricket Club</p>
        <div class="hero-rule"></div>
        <p class="hero-tagline">One Team &nbsp;·&nbsp; One Pride</p>
        <div class="hero-buttons">
            <a href="warriors.html" class="btn btn-primary">Explore Teams</a>
            <a href="contact.html" class="btn btn-secondary">Join Us</a>
        </div>
    </div>
</section>
<div class="hero-stats">
    <div class="hero-stat"><div class="hero-stat-num">3+</div><div class="hero-stat-label">Seasons</div></div>
    <div class="hero-stat"><div class="hero-stat-num">2</div><div class="hero-stat-label">Teams</div></div>
    <div class="hero-stat"><div class="hero-stat-num">40+</div><div class="hero-stat-label">Players</div></div>
    <div class="hero-stat"><div class="hero-stat-num">DFW</div><div class="hero-stat-label">Dallas TX</div></div>
</div>
```

- [ ] **Step 4: Verify in browser**

Open `index.html` in a browser. Confirm:
- Page background is dark navy `#07111f`
- Hero shows "BHARAT" in gold gradient, "Cricket Club" in white Oswald below
- Tricolor strip visible at top of hero
- Stats bar shows below hero
- JOIN US button is gold, EXPLORE TEAMS is outlined
- League cards have gold top line, dark navy background
- Footer uses Oswald gold headings

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Rebrand index.html: premium navy/gold hero with stats bar"
```

---

## Task 3: Shared font helper — update all remaining pages' font import

**Files:** Modify `about.html`, `achievements.html`, `contact.html`, `expenses.html`, `fixtures.html`, `gallery.html`, `partners.html`, `support.html`, `warriors.html`

Each page currently imports only Montserrat. Add Bebas Neue and Oswald to all of them.

- [ ] **Step 1: Update font import on all 9 pages**

For each page, replace the existing `<link>` to googleapis with:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

The old string to find (present on all 9 pages):
```
family=Montserrat:wght@400;500;700;800;900
```
Or variants like `400;500;700;800;900`, `400;600;700;900`, `400;600;700` — replace the entire `href` value with the new combined import above.

- [ ] **Step 2: Commit**

```bash
git add about.html achievements.html contact.html expenses.html fixtures.html gallery.html partners.html support.html warriors.html
git commit -m "Rebrand: add Bebas Neue + Oswald font imports to all pages"
```

---

## Task 4: Update about.html

**Files:** Modify `about.html`

- [ ] **Step 1: Read the current `<style>` block**

Read `about.html` lines 1–80 to see current styles.

- [ ] **Step 2: Update page background and leader card styles**

In the `<style>` block, update/replace these rules:

```css
body { background: #07111f !important; }

/* Section headings — use Oswald gold */
.section-title, h1, h2 {
  font-family: 'Oswald', sans-serif;
  font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* Leader / about cards — solid navy, gold top accent */
.leader-card, .about-card, .card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px;
  position: relative; overflow: hidden;
}
.leader-card::before, .about-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}
.leader-card:hover, .about-card:hover {
  border-color: rgba(216,144,24,0.3) !important;
  background: #0c1e38 !important;
}

/* Name/title colors */
.leader-name, .card h3 { color: white !important; font-family: 'Oswald', sans-serif; }
.leader-role, .card .role { color: #D89018 !important; }
.leader-bio, .card p { color: rgba(255,255,255,0.55) !important; }

/* Footer */
.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 3: Verify in browser** — Dark background, gold gradient headings, solid navy cards with gold top line.

- [ ] **Step 4: Commit**

```bash
git add about.html
git commit -m "Rebrand about.html: navy/gold cards, Oswald headings"
```

---

## Task 5: Update achievements.html

**Files:** Modify `achievements.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

.achievement-card, .card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px;
  position: relative; overflow: hidden;
}
.achievement-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}
.achievement-card:hover { border-color: rgba(216,144,24,0.3) !important; }

/* Headings */
h1, h2, .section-title {
  font-family: 'Oswald', sans-serif; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.achievement-card h3 { color: white !important; font-family: 'Oswald', sans-serif; font-size: 1rem; letter-spacing: 1px; }
.achievement-card p, .achievement-card span { color: rgba(255,255,255,0.55) !important; }

/* Trophies / icons — gold tint */
.trophy-icon, .achievement-icon { color: #D89018 !important; }

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add achievements.html
git commit -m "Rebrand achievements.html: navy/gold cards"
```

---

## Task 6: Update warriors.html

**Files:** Modify `warriors.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

/* Team / player cards */
.team-card, .player-card, .warrior-card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px;
  position: relative; overflow: hidden;
}
.team-card::before, .player-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}
.team-card:hover, .player-card:hover { border-color: rgba(216,144,24,0.3) !important; }

/* Player name and role colors */
.player-name, .team-name { color: white !important; font-family: 'Oswald', sans-serif; letter-spacing: 1px; }
.player-role, .player-stat { color: #D89018 !important; }
.player-stat-value { color: white !important; font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; }

/* Headings */
h1, h2, h3.section-heading {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* Join CTA section */
.join-cta, .cta-section {
  background: #0a1e40 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(216,144,24,0.15) !important;
  border-radius: 6px;
}
.join-cta h2, .cta-section h2 { color: white !important; -webkit-text-fill-color: white !important; }

/* Buttons */
.btn, .cta-btn {
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: opacity 0.2s ease;
}
.btn:hover, .cta-btn:hover { opacity: 0.85; }

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add warriors.html
git commit -m "Rebrand warriors.html: navy/gold team and player cards"
```

---

## Task 7: Update gallery.html

**Files:** Modify `gallery.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

/* Filter buttons */
.gallery-btn {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  color: rgba(255,255,255,0.6) !important;
  font-family: 'Montserrat', sans-serif; font-weight: 600;
  transition: border-color 0.2s ease, color 0.2s ease !important;
}
.gallery-btn:hover, .gallery-btn.active {
  border-color: rgba(216,144,24,0.5) !important;
  color: #D89018 !important;
  background: #0c1e38 !important;
}

/* Gallery items */
.gallery-item { border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; overflow: hidden; }
.gallery-item:hover { border-color: rgba(216,144,24,0.3); }

/* Headings */
h1, h2 {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add gallery.html
git commit -m "Rebrand gallery.html: navy/gold filter buttons and items"
```

---

## Task 8: Update partners.html

**Files:** Modify `partners.html`

- [ ] **Step 1: Replace the page `<style>` block entirely**

```css
<style>
  body { background: #07111f !important; font-family: 'Montserrat', sans-serif; color: white; }

  .sponsors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; padding: 2rem; }

  .sponsor {
    background: #0c1e38;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 2rem; text-align: center;
    position: relative; overflow: hidden;
    transition: border-color 0.2s ease;
  }
  .sponsor::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  }
  .sponsor:hover { border-color: rgba(216,144,24,0.4); }

  .logo-container {
    display: flex; align-items: center; justify-content: center;
    height: 100px; padding: 1rem; margin-bottom: 1rem;
    background: white; border-radius: 6px;
  }
  .logo-container img { max-width: 100%; max-height: 100%; object-fit: contain; }

  .sponsor-info h3 {
    font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: white; margin-bottom: 0.5rem;
  }
  .sponsor-description { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; }
  .sponsor-link {
    color: #D89018; font-weight: 600; font-size: 0.85rem;
    text-decoration: none; letter-spacing: 1px;
    border: 1px solid rgba(216,144,24,0.3); padding: 5px 12px; border-radius: 3px;
    transition: border-color 0.2s ease;
  }
  .sponsor-link:hover { border-color: rgba(216,144,24,0.7); }

  /* Section heading */
  .page-header, h1, h2 {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase;
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Become a Sponsor */
  .become-sponsor {
    text-align: center; padding: 3rem 2rem; margin: 2rem;
    background: #0a1e40;
    border: 1px solid rgba(216,144,24,0.2);
    border-radius: 8px; position: relative; overflow: hidden;
  }
  .become-sponsor::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  }
  .become-sponsor h3 {
    font-family: 'Oswald', sans-serif; font-size: 1.8rem; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 0.75rem;
  }
  .become-sponsor p { color: rgba(255,255,255,0.55); margin-bottom: 1.75rem; }
  .btn {
    display: inline-block; padding: 12px 30px; font-weight: 800;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    text-decoration: none; cursor: pointer; border-radius: 3px;
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
    color: #07111f; border: none;
    transition: opacity 0.2s ease;
  }
  .btn:hover { opacity: 0.85; }

  .footer { background: #07111f; border-top: 1px solid rgba(216,144,24,0.15); padding: 2rem; text-align: center; margin-top: 2rem; }
  .footer p { color: rgba(255,255,255,0.35); font-size: 0.85rem; }
</style>
```

- [ ] **Step 2: Verify and commit**

```bash
git add partners.html
git commit -m "Rebrand partners.html: navy/gold sponsor cards and become-sponsor section"
```

---

## Task 9: Update support.html

**Files:** Modify `support.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

/* Donation cards */
.donation-card, .support-card, .card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px;
  position: relative; overflow: hidden;
}
.donation-card::before, .support-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}

h1, h2 {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.card h3 { color: white !important; font-family: 'Oswald', sans-serif; letter-spacing: 1px; }
.card p, .card span { color: rgba(255,255,255,0.55) !important; }

/* Support CTA button */
.support-cta {
  display: inline-block; padding: 12px 30px; font-weight: 800;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase; text-decoration: none;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  color: #07111f; border: none; border-radius: 3px;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: opacity 0.2s ease;
}
.support-cta:hover { opacity: 0.85; }

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add support.html
git commit -m "Rebrand support.html: navy/gold donation cards"
```

---

## Task 10: Update contact.html

**Files:** Modify `contact.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

/* Form container */
.contact-form, .form-container, .contact-card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px; position: relative; overflow: hidden;
}
.contact-form::before, .form-container::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}

/* Inputs */
.form-input, .form-textarea, .form-select, input, textarea, select {
  background: #07111f !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: white !important; border-radius: 4px;
}
.form-input:focus, .form-textarea:focus, input:focus, textarea:focus {
  border-color: rgba(216,144,24,0.5) !important;
  outline: none !important;
}

/* Labels */
label, .form-label { color: rgba(255,255,255,0.6) !important; font-size: 0.85rem; }

/* Submit button */
.submit-btn {
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010) !important;
  color: #07111f !important; font-weight: 800 !important;
  border: none !important; border-radius: 3px !important;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: opacity 0.2s ease;
}
.submit-btn:hover { opacity: 0.85 !important; }

h1, h2 {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add contact.html
git commit -m "Rebrand contact.html: navy/gold form styling"
```

---

## Task 11: Update fixtures.html

**Files:** Modify `fixtures.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

.fixture-card, .match-card, .card {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px; position: relative; overflow: hidden;
}
.fixture-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}
.fixture-card:hover { border-color: rgba(216,144,24,0.3) !important; }

/* Team names, dates */
.fixture-card h3, .match-teams { color: white !important; font-family: 'Oswald', sans-serif; letter-spacing: 1px; }
.fixture-date, .match-date { color: #D89018 !important; }
.fixture-venue, .match-venue { color: rgba(255,255,255,0.45) !important; }

h1, h2 {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add fixtures.html
git commit -m "Rebrand fixtures.html: navy/gold match cards"
```

---

## Task 12: Update expenses.html

**Files:** Modify `expenses.html`

- [ ] **Step 1: Update `<style>` block**

```css
body { background: #07111f !important; }

/* Expense form and table */
.expense-form, .form-container {
  background: #0c1e38 !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  border-radius: 6px; position: relative; overflow: hidden;
}
.expense-form::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
}

/* Inputs */
input, select, textarea {
  background: #07111f !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: white !important; border-radius: 4px;
}
input:focus, select:focus, textarea:focus {
  border-color: rgba(216,144,24,0.5) !important; outline: none;
}
label { color: rgba(255,255,255,0.6) !important; }

/* Table */
table { width: 100%; border-collapse: collapse; }
th {
  background: #0a1e40 !important; color: #D89018 !important;
  font-family: 'Oswald', sans-serif; letter-spacing: 2px; text-transform: uppercase;
  font-size: 0.75rem; padding: 10px 14px; border-bottom: 1px solid rgba(216,144,24,0.2);
}
td { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); color: rgba(255,255,255,0.7); }
tr:hover td { background: rgba(255,255,255,0.02); }

/* Submit button */
.submit-btn {
  background: linear-gradient(135deg, #dc3545, #c0392b) !important; /* keep red for submit expense */
  color: white !important; font-weight: 700 !important;
  border: none !important; border-radius: 3px !important;
  transition: opacity 0.2s ease;
}
.submit-btn:hover { opacity: 0.85 !important; }

h1, h2 {
  font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  background: linear-gradient(135deg, #9A6010, #D89018, #F5C040, #D89018, #9A6010);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.footer { background: #07111f !important; border-top: 1px solid rgba(216,144,24,0.15) !important; }
```

- [ ] **Step 2: Verify and commit**

```bash
git add expenses.html
git commit -m "Rebrand expenses.html: navy/gold form and table"
```

---

## Task 13: Final review and push

- [ ] **Step 1: Open all pages in browser and verify consistency**

Check each page for:
- Dark navy background on all pages
- Nav has gold gradient logo text
- All h1/h2 use Oswald + gold gradient
- Cards are solid `#0c1e38` with gold top-line (no glass blur)
- Buttons use angular clip-path + gold gradient (primary) or gold outline (secondary)
- Footer is dark with gold heading accents

- [ ] **Step 2: Push to remote**

```bash
git push
```

---

## Self-Review Notes

- **Spec coverage:** All 10 pages covered. CSS variables task covers global nav. Fonts task covers all 9 non-index pages. ✓
- **No placeholders:** All CSS blocks are complete and copy-pasteable. ✓
- **Type consistency:** `--gold-gradient` used consistently throughout. `.btn` angular clip-path defined in index.html and repeated in partners/support tasks. ✓
- **Expenses submit button** intentionally keeps red (not gold) — it's a destructive/submit action, red is appropriate functional color. ✓
- **Glass removal:** Every card task explicitly sets `backdrop-filter: none !important` to ensure the glass effect is fully removed even where styles.css may set it. ✓
