# Design Team Handoff Guide

> **To:** Page Builder Team (`build_page.py`) & Search Team  
> **From:** Design Team  
> **Deliverable:** `style.css` and HTML Component Template  
> **Repository:** [https://github.com/xTomSa/kbcc-club-finder-design](https://github.com/xTomSa/kbcc-club-finder-design)  
> **Live Preview:** [https://xtomsa.github.io/kbcc-club-finder-design/](https://xtomsa.github.io/kbcc-club-finder-design/)

---

## 1. Overview
This design system provides a responsive, accessible card grid directory for active KBCC student clubs. It requires **no CSS build steps or bundlers**—just link `style.css` into your output HTML.

---

## 2. Card HTML Template for Python (`build_page.py`)

When your Python script loops over the scraped CSV rows (`scrape.py`), format each club card using this exact markup structure:

```python
def render_club_card(club_name, category, category_slug, description, meeting_info, signup_type, signup_url):
    # signup_type: "link" | "email" | "pending"
    
    if signup_type == "link":
        action_btn = f'''<a href="{signup_url}" target="_blank" rel="noopener noreferrer" class="btn btn-join">
            <span>Join now</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>'''
    elif signup_type == "email":
        action_btn = f'''<a href="mailto:{signup_url}?subject=Interested%20in%20joining%20{club_name}" class="btn btn-email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Email to join</span>
          </a>'''
    else:  # pending confirmation
        action_btn = '''<button type="button" class="btn btn-pending" disabled>
            <span>Signup pending confirmation</span>
          </button>'''

    return f'''
    <article class="club-card" data-category="{category_slug}">
      <div class="card-top">
        <span class="card-category-badge {category_slug}">{category}</span>
        <h2 class="club-name">{club_name}</h2>
        <p class="club-description">{description}</p>
      </div>
      <div class="card-bottom">
        <div class="club-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{meeting_info}</span>
        </div>
        <div class="card-action">
          {action_btn}
        </div>
      </div>
    </article>
    '''
```

---

## 3. Category Slugs Reference
Use these category slugs for the `data-category` attribute and badge styling:

| Category Display Name | Category Slug (`data-category`) | Badge Color Scheme |
|-----------------------|---------------------------------|-------------------|
| Academic & Tech       | `academic`                      | Sky Blue          |
| Arts & Culture        | `arts`                          | Warm Amber        |
| Social & Community    | `social`                        | Lavender/Purple   |
| Sports & Wellness     | `sports`                        | Emerald Green     |

---

## 4. Key CSS Custom Properties (`:root` in `style.css`)
If the Page Builder or Design teams need to adjust branding colors, edit these tokens at the top of `style.css`:
- `--kbcc-teal`: `#0e525a` (Primary Marine Teal)
- `--kbcc-gold`: `#e59a38` (Wave Gold / Amber CTA)
- `--bg-page`: `#f8fafc` (Background surface)
- `--border-light`: `#e2e8f0` (Subtle divider border)

---

## 5. Contact & Questions
For any tweaks or additions to the design, submit an issue or pull request on this repository!
