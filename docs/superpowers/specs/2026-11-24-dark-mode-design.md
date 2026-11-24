# Design Document: Maritime Dark Mode Toggle

**Date:** 2026-11-24  
**Project:** KBCC Club Directory (`kbcc-club-finder-design`)  
**Scope:** Small change  

---

## 1. Intent & The Why
Provide Kingsborough Community College students with a comfortable viewing mode for evening and low-light browsing of the student club directory, while reinforcing KBCC's unique coastal/maritime identity through a "Deep Midnight Ocean" theme rather than a generic dark gray.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Add a theme toggle in the top utility strip (`.strip`) labeled with clear iconography (`🌙 Dark` / `☀️ Light`).
- Create a cohesive "Deep Midnight Ocean" dark palette where the page background, navigation, sidebar, and club cards feel like the Kingsborough harbor at night.
- Ensure the student's selected theme persists across page refreshes and visits using `localStorage`.
- Automatically default to the student's system preference (`prefers-color-scheme: dark`) if no manual selection has been made.
- Prevent theme flickering/flashing on page load with an inline head script.
- Maintain high contrast and WCAG AA accessibility for all text and action buttons (`Join now`, `Email to join`, `Pending`).

### Non-Goals
- Changing the layout or card grid structure.
- Introducing heavy UI frameworks or third-party theme packages.

### Anti-Goals
- Generic AMOLED pure black (`#000000`) or desaturated gray that washes out the college's nautical maritime branding.
- Flash of unstyled/light content (FOUC) when reloading in dark mode.

---

## 3. Constraints
- Zero build tools or npm dependencies; pure semantic HTML, CSS custom properties, and vanilla JS.
- Fully compatible with the Page Builder team's Python f-string templates (`build_page.py`).
- Instant hot-reloading in Phoenix Code Live Preview.

---

## 4. Approaches Considered

### Approach 1: Top Utility Strip Integration (Selected)
- **Description:** Place a theme toggle button (`#themeToggle`) on the right side of the `.strip` alongside *Inside KCC*, *Events*, and *Student Life*.
- **Trade-offs:** Kept the primary college header (`header.site`) and academic navigation uncluttered while placing utility settings in the standard institutional location.
- **Decision:** Picked by the user because it keeps the main college navigation focused on academics while making the toggle immediately visible and accessible at the top.

### Approach 2: Main Header Navigation Button
- **Description:** Place the toggle inside `header.site` next to *About*.
- **Trade-offs:** Highly visible, but mixes a presentation preference into the college's primary academic menu and causes extra layout shifts between mobile and desktop headers. Rejected.

---

## 5. Decisions & Specifications

### 5.1 Color Tokens (Maritime Midnight)
Under `[data-theme="dark"]` (and fallback `@media (prefers-color-scheme: dark)`):

| Token | Light Value | Dark Midnight Value | Visual Role |
| :--- | :--- | :--- | :--- |
| `--foam` | `#F4F9FA` | `#0B1926` | Main page background (deep midnight water) |
| `--surface-card` | `#FFFFFF` | `#132639` | Elevated card surfaces (sidebar, club bubbles, controls) |
| `--surface-subtle` | `#EDF5F8` | `#18324B` | Search input, filter chip backgrounds |
| `--border-card` | `#D3E4EC` | `#1F3E5C` | Card borders and structural dividers |
| `--mist` | `#DCEBF0` | `#1E3A57` | Subtle separators and inactive badges |
| `--ink` | `#1B2733` | `#E2EDF5` | High-contrast headings and body text (ice-white) |
| `--muted` | `#55697A` | `#8BA9C4` | Secondary text, meeting times, subtitles |
| `--harbor` | `#0E2A47` | `#091A2B` | Header strip, hero, and footer background |

*Accents retained:*
- Golden Buoy Amber (`--buoy: #F2B632`): High contrast "Join now" buttons and star highlights.
- Ocean Tide Blue (`--tide: #2F7FB8`): Active filter chips and category tags.

### 5.2 Toggle Placement & Markup
Inside `.strip .wrap`:
```html
<div class="strip">
  <div class="wrap">
    <span>Office of Student Life</span>
    <div class="strip-right">
      <a href="https://inside.kingsborough.edu/">Inside KCC</a>
      <a href="https://www.kbcc.cuny.edu/calendar.html">Events</a>
      <a href="https://www.kbcc.cuny.edu/studentlife/index.html">Student Life</a>
      <button type="button" id="themeToggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
        <span class="theme-icon" aria-hidden="true">🌙</span>
        <span class="theme-label">Dark</span>
      </button>
    </div>
  </div>
</div>
```

### 5.3 Anti-Flash Script (in `<head>`)
```html
<script>
  (function() {
    const saved = localStorage.getItem('kbcc-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

### 5.4 Toggle Controller (`preview.js`)
- Reads current `data-theme` attribute.
- On click, toggles between `'light'` and `'dark'`.
- Updates `localStorage.setItem('kbcc-theme', newTheme)`.
- Updates button icon (`🌙` / `☀️`) and label (`Dark` / `Light`).

---

## 6. What's Left to the Builder
- Implementing CSS transitions (`transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease`) so toggling feels smooth and polished.
- Updating `HANDOFF.md` with the dark mode token table.
- Updating `README.md`.
