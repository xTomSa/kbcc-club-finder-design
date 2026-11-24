# Maritime Dark Mode Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Deep Midnight Ocean" dark mode toggle to the Kingsborough Club Directory with persistent preference storage and zero page-load flash.

**Architecture:** CSS custom property overrides keyed under `[data-theme="dark"]` on `<html>`, an inline anti-FOUC script in `<head>`, and a vanilla JavaScript toggle controller in `preview.js` persisting state to `localStorage`.

**Tech Stack:** HTML5, CSS3 Custom Properties, Vanilla JavaScript (ES6+).

**Spec:** `docs/superpowers/specs/2026-11-24-dark-mode-design.md`

## Global Constraints
- Zero build tools or npm dependencies; pure static HTML, CSS, and JS.
- Strict WCAG AA contrast compliance for all dark mode text and action buttons.
- Full compatibility with the Page Builder team's Python f-string templates.

## Review Focus
1. **Flash of Unstyled/Light Content (FOUC):** When reloading in dark mode, the page must not flash white before switching to midnight navy. (Addressed by inline `<head>` script before CSS paint).
2. **First-Time OS Preference Sync:** Users with OS dark mode enabled must automatically see dark mode on first visit without needing to click the toggle.
3. **Toggle Icon & Label Synchronization:** The button state (icon `🌙`/`☀️` and label `Dark`/`Light`) must accurately reflect the active theme on load and on click.
4. **Mobile Layout Integrity:** The toggle button in `.strip` must wrap cleanly on narrow screens (< 600px) without breaking header alignment.
5. **Button & Badge Contrast in Dark Mode:** The `.btn-join` (gold), `.btn-email` (tide), and `.btn-pending` (disabled) buttons must remain distinct and accessible against `#132639` card surfaces.

---

### Task 1: Maritime Midnight Dark Theme Styles in `style.css`

**Files:**
- Modify: `style.css:14-38` (Root tokens)
- Modify: `style.css:65-95` (Strip & Header styles)
- Modify: `style.css:300-360` (Card and surface rules)

**Interfaces:**
- Consumes: Existing `:root` token names (`--foam`, `--surface-card`, `--border-card`, `--mist`, `--ink`, `--muted`, `--harbor`).
- Produces: `[data-theme="dark"]` token overrides, `.theme-toggle-btn` styling, smooth surface transitions.

- [ ] **Step 1: Define `[data-theme="dark"]` CSS token overrides**
  In `style.css`, add:
  ```css
  [data-theme="dark"] {
    --foam: #0B1926;
    --surface-card: #132639;
    --surface-subtle: #18324B;
    --border-card: #1F3E5C;
    --mist: #1E3A57;
    --ink: #E2EDF5;
    --muted: #8BA9C4;
    --harbor: #091A2B;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.4);
    --shadow-hover: 0 10px 22px rgba(0, 0, 0, 0.5);
  }
  ```

- [ ] **Step 2: Add theme toggle button styles in `style.css`**
  Style `.theme-toggle-btn` for placement in `.strip`:
  ```css
  .theme-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .theme-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.22);
    border-color: var(--buoy);
  }
  ```

- [ ] **Step 3: Add smooth transition rules on theme change**
  Add `transition: background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease;` to `body`, `.strip`, `header.site`, `aside.section-nav`, `.controls-card`, `.club-card`, `.way`, and `.start`.

- [ ] **Step 4: Verify dark mode contrast and borders**
  Ensure `.club-card`, `header.site`, and `aside.section-nav` look crisp against `#0B1926` background in dark mode.

---

### Task 2: Toggle Markup & Anti-Flash Script in `index.html`

**Files:**
- Modify: `index.html:10-18` (`<head>` section)
- Modify: `index.html:23-35` (`.strip` section)

**Interfaces:**
- Consumes: `localStorage.getItem('kbcc-theme')`, `#themeToggle` button.
- Produces: Immediate `<html data-theme="dark">` attribute before paint.

- [ ] **Step 1: Add inline anti-FOUC script in `<head>`**
  Place right before `<link rel="stylesheet" href="style.css">`:
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

- [ ] **Step 2: Add theme toggle button to `.strip`**
  Inside `<div class="strip"><div class="wrap">`:
  ```html
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
  ```

- [ ] **Step 3: Verify HTML markup structure**
  Check that `.strip-right` has flex layout so links and button align neatly.

---

### Task 3: Theme Controller & Event Logic in `preview.js`

**Files:**
- Modify: `preview.js:1-92`

**Interfaces:**
- Consumes: `#themeToggle`, `window.matchMedia('(prefers-color-scheme: dark)')`.
- Produces: Click handler that toggles `data-theme`, updates button text/icon, and writes to `localStorage`.

- [ ] **Step 1: Implement `initThemeToggle()` function in `preview.js`**
  ```javascript
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const themeLabel = themeToggle?.querySelector('.theme-label');

  function updateToggleUI(isDark) {
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
    if (themeToggle) themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Sync initial button state
  const isDarkInitial = document.documentElement.getAttribute('data-theme') === 'dark';
  updateToggleUI(isDarkInitial);

  themeToggle?.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('kbcc-theme', nextTheme);
    updateToggleUI(!isCurrentlyDark);
  });
  ```

- [ ] **Step 2: Add OS preference change listener**
  Add listener for `window.matchMedia('(prefers-color-scheme: dark)')` to adapt dynamically if no manual override is saved in `localStorage`.

- [ ] **Step 3: Verify toggle interaction**
  Click the toggle multiple times; ensure `data-theme` switches between `'dark'` and `'light'`, button updates, and refreshing preserves the selection.

---

### Task 4: Documentation & Handoff Updates

**Files:**
- Modify: `HANDOFF.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: Dark mode token specifications.
- Produces: Updated documentation for the Page Builder team and visitors.

- [x] **Step 1: Update `HANDOFF.md`**
  Add the dark mode tokens table and explain how `[data-theme="dark"]` works with the Python template.

- [x] **Step 2: Update `README.md`**
  Add dark mode toggle to the features list and maritime token reference.

---

### Task 5: Testing, Git Commit & Deployment

**Files:**
- All modified repository files.

- [ ] **Step 1: Check git status and inspect diff**
  ```bash
  cd "/Users/tomsa/AI/CS Club Project"
  git status
  git diff
  ```

- [ ] **Step 2: Commit changes**
  ```bash
  git add style.css index.html preview.js HANDOFF.md README.md docs/
  git commit -m "feat: add maritime midnight dark mode toggle with local storage persistence"
  ```

- [ ] **Step 3: Push to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Step 4: Verify GitHub Pages deployment**
  ```bash
  gh api repos/xTomSa/kbcc-club-finder-design/pages
  ```
