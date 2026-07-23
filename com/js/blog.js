// Renders the blog grid (no filtering — just a straightforward list).
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  grid.innerHTML = "";

  BLOG_POSTS.forEach((p) => {
    const card = document.createElement("a");
    card.className = "card blog-card";
    card.href = p.url;
    card.target = "_blank";
    card.rel = "noopener";

    const tagsHtml = p.tags.map((t) => `<span class="chip static">${t}</span>`).join("");

    card.innerHTML = `
      <p class="blog-source">${p.source}</p>
      <h3 class="blog-title">${p.title}</h3>
      <p class="blog-desc">${p.description}</p>
      <div class="project-tags" style="margin-bottom:16px;">${tagsHtml}</div>
      <span class="blog-read">Read more &rarr;</span>
    `;
    grid.appendChild(card);
  });
});
