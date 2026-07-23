// Portfolio filtering, sorting, rendering, and detail modal (with image gallery).
// Depends on PROJECTS + SKILL_OPTIONS from portfolio-data.js

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("project-grid");
  if (!grid) return; // not on the portfolio page

  const skillFilterEl = document.getElementById("skill-filters");
  const teamFilterEl = document.getElementById("team-filters");
  const yearSortEl = document.getElementById("year-sort");
  const countEl = document.getElementById("result-count");
  const resetBtn = document.getElementById("reset-filters");
  const emptyState = document.getElementById("empty-state");

  const state = { skills: new Set(), teams: new Set(), sort: "newest" };

  // Build the "Project Team" option list, following TEAM_ORDER (see
  // portfolio-data.js). Any team not in that list is appended afterward,
  // alphabetically, so a brand-new team name never gets lost.
  const teamOptions = Array.from(new Set(PROJECTS.map((p) => p.team).filter(Boolean))).sort(
    (a, b) => {
      const ai = TEAM_ORDER.indexOf(a);
      const bi = TEAM_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
  );

  function renderChipGroup(container, options, activeSet) {
    container.innerHTML = "";
    options.forEach((opt) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (activeSet.has(opt) ? " active" : "");
      chip.textContent = opt;
      chip.addEventListener("click", () => {
        if (activeSet.has(opt)) activeSet.delete(opt);
        else activeSet.add(opt);
        renderAll();
      });
      container.appendChild(chip);
    });
  }

  function matches(project) {
    const skillOk =
      state.skills.size === 0 || project.skills.some((s) => state.skills.has(s));
    const teamOk = state.teams.size === 0 || state.teams.has(project.team);
    return skillOk && teamOk;
  }

  function renderCards() {
    const filtered = PROJECTS.filter(matches).sort((a, b) =>
      state.sort === "oldest" ? a.sortYear - b.sortYear : b.sortYear - a.sortYear
    );
    grid.innerHTML = "";

    emptyState.style.display = filtered.length === 0 ? "block" : "none";

    filtered.forEach((p) => {
      const images = p.images || [];
      const card = document.createElement("article");
      card.className = "card project-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View details for " + p.title);

      const galleryBadge =
        images.length > 1
          ? `<span class="gallery-badge">&#128247; ${images.length}</span>`
          : "";

      const thumbHtml = images.length
        ? `<div class="project-thumb">${galleryBadge}<img src="${images[0]}" alt="${p.title}" loading="lazy"></div>`
        : `<div class="project-thumb" style="display:flex;align-items:center;justify-content:center;background:var(--color-primary-tint);">
             <span style="font-size:2.4rem;color:var(--color-primary);">&#128196;</span>
           </div>`;

      const tagsHtml = p.skills
        .slice(0, 4)
        .map((s) => `<span class="chip static">${s}</span>`)
        .join("");

      card.innerHTML = `
        ${thumbHtml}
        <div class="project-body">
          <div class="project-meta-row">
            <span>${p.team || ""}</span>
            <span>${p.year}</span>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">${tagsHtml}</div>
        </div>
      `;

      card.addEventListener("click", () => openModal(p));
      card.addEventListener("keypress", (e) => {
        if (e.key === "Enter") openModal(p);
      });

      grid.appendChild(card);
    });

    countEl.textContent = `Showing ${filtered.length} of ${PROJECTS.length} projects`;
  }

  function renderAll() {
    renderChipGroup(skillFilterEl, SKILL_OPTIONS, state.skills);
    renderChipGroup(teamFilterEl, teamOptions, state.teams);
    renderCards();
  }

  yearSortEl.addEventListener("change", () => {
    state.sort = yearSortEl.value;
    renderCards();
  });

  resetBtn.addEventListener("click", () => {
    state.skills.clear();
    state.teams.clear();
    state.sort = "newest";
    yearSortEl.value = "newest";
    renderAll();
  });

  // ---------------- Modal + gallery ----------------
  const overlay = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  let galleryIndex = 0;
  let galleryImages = [];

  function goToSlide(index) {
    if (!galleryImages.length) return;
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    const img = modalBody.querySelector(".modal-image");
    if (img) img.src = galleryImages[galleryIndex];
    const counter = modalBody.querySelector(".gallery-counter");
    if (counter) counter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
    modalBody.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === galleryIndex);
    });
  }

  function buildGalleryHtml(images, title) {
    if (!images.length) return "";

    const navHtml =
      images.length > 1
        ? `
          <button class="gallery-nav gallery-prev" aria-label="Previous image">&#8249;</button>
          <button class="gallery-nav gallery-next" aria-label="Next image">&#8250;</button>
          <span class="gallery-counter">1 / ${images.length}</span>
        `
        : "";

    const dotsHtml =
      images.length > 1
        ? `<div class="gallery-dots">${images
            .map((_, i) => `<button class="gallery-dot${i === 0 ? " active" : ""}" aria-label="Go to image ${i + 1}"></button>`)
            .join("")}</div>`
        : "";

    return `
      <div class="modal-gallery">
        <div class="modal-gallery-viewport">
          <img class="modal-image" src="${images[0]}" alt="${title}">
          ${navHtml}
        </div>
        ${dotsHtml}
      </div>
    `;
  }

  function openModal(p) {
    galleryImages = p.images || [];
    galleryIndex = 0;

    const galleryHtml = buildGalleryHtml(galleryImages, p.title);
    const linkHtml = p.link
      ? `<a class="btn btn-primary" href="${p.link.url}" target="_blank" rel="noopener">${p.link.label} &rarr;</a>`
      : `<span class="text-muted">No public link available</span>`;
    const skillsHtml = p.skills.map((s) => `<span class="chip static">${s}</span>`).join(" ");

    modalBody.innerHTML = `
      <div class="modal-inner">
        <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
        ${galleryHtml}
        <div class="modal-body">
          <p class="eyebrow">${p.client || p.team || ""}</p>
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <div class="modal-meta-grid">
            <div><span>Year</span>${p.year}</div>
            <div><span>Project Team</span>${p.team || "—"}</div>
            <div><span>Client</span>${p.client || "—"}</div>
          </div>
          <div class="project-tags" style="margin-bottom:20px;">${skillsHtml}</div>
          ${linkHtml}
        </div>
      </div>
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    document.getElementById("modal-close-btn").addEventListener("click", closeModal);

    if (galleryImages.length > 1) {
      modalBody.querySelector(".gallery-prev").addEventListener("click", () => goToSlide(galleryIndex - 1));
      modalBody.querySelector(".gallery-next").addEventListener("click", () => goToSlide(galleryIndex + 1));
      modalBody.querySelectorAll(".gallery-dot").forEach((dot, i) => {
        dot.addEventListener("click", () => goToSlide(i));
      });

      // Swipe support for touch devices
      const viewport = modalBody.querySelector(".modal-gallery-viewport");
      let touchStartX = 0;
      let touchStartY = 0;
      viewport.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        },
        { passive: true }
      );
      viewport.addEventListener(
        "touchend",
        (e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            goToSlide(galleryIndex + (dx < 0 ? 1 : -1));
          }
        },
        { passive: true }
      );
    }
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") goToSlide(galleryIndex - 1);
    if (e.key === "ArrowRight") goToSlide(galleryIndex + 1);
  });

  renderAll();
});
