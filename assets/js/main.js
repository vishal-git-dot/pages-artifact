(function () {
  "use strict";

  const galleryEl = document.getElementById("gallery");
  const tabsEl = document.getElementById("filterTabs");
  const searchEl = document.getElementById("searchInput");
  const countEl = document.getElementById("headerCount");

  // data/pages.js is committed as an empty placeholder and overwritten
  // by scripts/generate.js. Guard against it being missing entirely
  // (e.g. a typo, or the script tag failing to load) rather than
  // letting a bare reference throw and break the whole page.
  const pages = typeof PAGES !== "undefined" ? PAGES : [];
  const categories = typeof CATEGORIES !== "undefined" ? CATEGORIES : [];

  let activeCategory = "all";
  let query = "";

  function buildTabs() {
    const all = [{ id: "all", label: "All" }, ...categories];

    tabsEl.innerHTML = all
      .map(
        (cat) => `
        <button
          class="filter-tab"
          data-cat="${cat.id}"
          type="button"
          aria-pressed="${cat.id === "all" ? "true" : "false"}"
        >${cat.label}</button>
      `
      )
      .join("");

    tabsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-tab");
      if (!btn) return;

      activeCategory = btn.dataset.cat;
      tabsEl.querySelectorAll(".filter-tab").forEach((el) => {
        el.setAttribute("aria-pressed", String(el === btn));
      });
      render();
    });
  }

  function cardHTML(item) {
    return `
      <a class="page-card" href="${item.path}" target="_blank" rel="noopener"
         style="--dot: var(--cat-${item.category})">
        <div class="page-thumb">
          <img
            src="${item.thumbnail}"
            alt="${item.title} preview"
            loading="lazy"
            onerror="this.closest('.page-thumb').style.background='linear-gradient(135deg, var(--dot), var(--card))'; this.remove();"
          />
        </div>
        <div class="page-body">
          <span class="page-tag">${labelFor(item.category)}</span>
          <h3>${item.title}</h3>
          <p>${item.description || "No description yet."}</p>
        </div>
      </a>
    `;
  }

  function labelFor(catId) {
    const found = categories.find((c) => c.id === catId);
    return found ? found.label : catId;
  }

  function matches(item) {
    const inCategory = activeCategory === "all" || item.category === activeCategory;
    if (!inCategory) return false;
    if (!query) return true;
    const haystack = (item.title + " " + item.description).toLowerCase();
    return haystack.includes(query);
  }

  function render() {
    if (pages.length === 0) {
      galleryEl.innerHTML = `
        <div class="gallery-empty">
          <strong>No pages generated yet</strong>
          <p>Run <code>npm run generate</code> (or push to main and let CI do it) to capture screenshots and populate the gallery.</p>
        </div>
      `;
      return;
    }

    const filtered = pages.filter(matches);

    if (filtered.length === 0) {
      galleryEl.innerHTML = `
        <div class="gallery-empty">
          <strong>No pages match "${escapeHTML(query)}"</strong>
          <p>Try a different search term or clear the filter.</p>
        </div>
      `;
      return;
    }

    const sections = categories
      .map((cat) => ({
        cat,
        items: filtered.filter((item) => item.category === cat.id),
      }))
      .filter((section) => section.items.length > 0);

    galleryEl.innerHTML = sections
      .map(
        (section) => `
        <section class="gallery-section" id="cat-${section.cat.id}">
          <div class="section-heading">
            <h2>${section.cat.label}</h2>
            <span class="count">${section.items.length}</span>
          </div>
          <div class="card-grid">
            ${section.items.map(cardHTML).join("")}
          </div>
        </section>
      `
      )
      .join("");
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function bindSearch() {
    searchEl.addEventListener("input", (e) => {
      query = e.target.value.trim().toLowerCase();
      render();
    });
  }

  function init() {
    countEl.textContent = pages.length + " pages";
    buildTabs();
    bindSearch();
    render();
  }

  init();
})();
