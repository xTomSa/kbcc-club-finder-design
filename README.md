# Kingsborough Club Directory - Design Team Deliverables

> **KBCC CS Club Team Project — Design Team (Merged Maritime Edition)**  
> **Live GitHub Pages Preview:** [https://xtomsa.github.io/kbcc-club-finder-design/](https://xtomsa.github.io/kbcc-club-finder-design/)

---

## 📌 Project Overview
This repository contains the official design system, HTML markup template, and CSS styling for the Kingsborough Community College (KBCC) **Student Club Directory**.

The page merges:
1. **The Official KBCC Maritime Layout**: Top utility strip, official KCC header & navigation, seaside hero banner with seagull and wave artwork, "Three ways to get involved" cards, sticky sidebar navigation, and 3-column campus footer.
2. **The Interactive "Bubble-Like" Directory**: Floating search box with instant type-to-filter, category chips (`All`, `Academic & Tech`, `Arts & Culture`, `Social & Community`, `Sports & Wellness`), live counter, and responsive 2-column cards grid with custom action buttons (`Join now`, `Email to join`, and `Pending confirmation`).
3. **Maritime Midnight Dark Mode Toggle**: Instant theme switching (`🌙 Dark` / `☀️ Light`) with persistent `localStorage` preference and automatic OS `prefers-color-scheme` detection, engineered with zero page-load flash (anti-FOUC).

---

## 🎨 Files in This Repository
- **`style.css`**: Pure modern CSS using the official KBCC maritime color system (`--harbor`, `--tide`, `--buoy`, `--foam`, `--mist`) with full dark mode token overrides under `[data-theme="dark"]`.
- **`index.html`**: Semantic prototype page containing the merged layout, anti-FOUC `<head>` script, dark mode toggle button in the header strip, and 6 representative sample clubs from the kickoff deck.
- **`preview.js`**: Lightweight search and category filter prototype, plus the dark mode controller with local storage persistence and system preference sync.
- **`images/`**: Vector assets (`hero-waves.svg` and `seagull.svg`).
- **`HANDOFF.md`**: Direct integration guide, dark mode token reference, and Python f-string snippet for the **Page Builder Team** (`build_page.py`).

---

## 📋 Maritime Color Tokens Reference

| Token | Light Mode | Dark Mode | Visual Role |
| :--- | :--- | :--- | :--- |
| `--harbor` | `#0E2A47` | `#091A2B` | Deep nautical navy (headers, hero, footer) |
| `--tide` | `#2F7FB8` | `#2F7FB8` | Ocean tide blue (navigation accents, hover borders) |
| `--deep-tide` | `#1E4F7A` | `#1E4F7A` | Deep ocean water (links, email CTA buttons) |
| `--buoy` | `#F2B632` | `#F2B632` | Golden buoy amber (primary "Join now" buttons) |
| `--foam` | `#F4F9FA` | `#0B1926` | Deep Midnight background (dark) / Soft sea-foam (light) |
| `--surface-card` | `#ffffff` | `#132639` | Elevated card surfaces |
| `--surface-subtle` | `#edf5f8` | `#18324B` | Inputs / chip backgrounds |
| `--border-card` | `#d3e4ec` | `#1F3E5C` | Card borders |
| `--mist` | `#DCEBF0` | `#1E3A57` | Subtle dividers |
| `--ink` | `#1B2733` | `#E2EDF5` | High-contrast ice-white text (dark) / Dark charcoal (light) |
| `--muted` | `#55697A` | `#8BA9C4` | Secondary text |

---

## 🤝 Team Handoff
Refer to [HANDOFF.md](HANDOFF.md) for ready-to-copy Python card template strings for `build_page.py` and dark mode integration details.
