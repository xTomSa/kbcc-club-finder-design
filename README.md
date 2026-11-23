# Kingsborough Club Directory - Design Team Deliverables

> **KBCC CS Club Team Project — Design Team (Merged Maritime Edition)**  
> **Live GitHub Pages Preview:** [https://xtomsa.github.io/kbcc-club-finder-design/](https://xtomsa.github.io/kbcc-club-finder-design/)

---

## 📌 Project Overview
This repository contains the official design system, HTML markup template, and CSS styling for the Kingsborough Community College (KBCC) **Student Club Directory**.

The page merges:
1. **The Official KBCC Maritime Layout**: Top utility strip, official KCC header & navigation, seaside hero banner with seagull and wave artwork, "Three ways to get involved" cards, sticky sidebar navigation, and 3-column campus footer.
2. **The Interactive "Bubble-Like" Directory**: Floating search box with instant type-to-filter, category chips (`All`, `Academic & Tech`, `Arts & Culture`, `Social & Community`, `Sports & Wellness`), live counter, and responsive 2-column cards grid with custom action buttons (`Join now`, `Email to join`, and `Pending confirmation`).

---

## 🎨 Files in This Repository
- **`style.css`**: Pure modern CSS using the official KBCC maritime color system (`--harbor`, `--tide`, `--buoy`, `--foam`, `--mist`).
- **`index.html`**: Semantic prototype page containing the merged layout and 6 representative sample clubs from the kickoff deck.
- **`preview.js`**: Lightweight search and category filter prototype for live preview testing.
- **`images/`**: Vector assets (`hero-waves.svg` and `seagull.svg`).
- **`HANDOFF.md`**: Direct integration guide and Python f-string snippet for the **Page Builder Team** (`build_page.py`).

---

## 📋 Maritime Color Tokens Reference

| Token | Hex Value | Visual Role |
| :--- | :--- | :--- |
| `--harbor` | `#0E2A47` | Deep nautical navy (headers, hero, footer) |
| `--tide` | `#2F7FB8` | Ocean tide blue (navigation accents, hover borders) |
| `--deep-tide` | `#1E4F7A` | Deep ocean water (links, email CTA buttons) |
| `--buoy` | `#F2B632` | Golden buoy amber (primary "Join now" buttons) |
| `--foam` | `#F4F9FA` | Soft sea-foam page background |
| `--mist` | `#DCEBF0` | Sea mist borders and subtle dividers |
| `--ink` | `#1B2733` | Dark charcoal body text |

---

## 🤝 Team Handoff
Refer to [HANDOFF.md](HANDOFF.md) for ready-to-copy Python card template strings for `build_page.py`.
