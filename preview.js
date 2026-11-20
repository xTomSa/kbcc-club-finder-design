/**
 * Kingsborough Community College - Club Directory
 * Client-side Search & Category Filter (Live Preview Prototype)
 * For Design Preview & handoff reference for the Search Team
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('clubSearch');
  const clearBtn = document.getElementById('clearSearch');
  const chipButtons = document.querySelectorAll('.chip-btn');
  const clubCards = document.querySelectorAll('.club-card');
  const emptyState = document.getElementById('emptyState');
  const visibleCountEl = document.getElementById('visibleCount');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  let activeCategory = 'all';

  function filterClubs() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    // Toggle clear button visibility
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }

    clubCards.forEach((card) => {
      const clubName = card.querySelector('.club-name')?.textContent.toLowerCase() || '';
      const clubDesc = card.querySelector('.club-description')?.textContent.toLowerCase() || '';
      const clubCategory = card.getAttribute('data-category')?.toLowerCase() || '';

      const matchesSearch = !query || clubName.includes(query) || clubDesc.includes(query);
      const matchesCategory = activeCategory === 'all' || clubCategory === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count indicator
    if (visibleCountEl) {
      visibleCountEl.textContent = visibleCount;
    }

    // Toggle empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Search input typing listener
  if (searchInput) {
    searchInput.addEventListener('input', filterClubs);
  }

  // Clear search button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      filterClubs();
    });
  }

  // Reset button in empty state
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      activeCategory = 'all';
      chipButtons.forEach((btn) => btn.classList.remove('active'));
      const allBtn = document.querySelector('.chip-btn[data-category="all"]');
      if (allBtn) allBtn.classList.add('active');
      filterClubs();
    });
  }

  // Category filter chips
  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      chipButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category') || 'all';
      filterClubs();
    });
  });

  // Initial filter run
  filterClubs();
});
