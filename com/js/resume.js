// Simple tab switcher for the resume page.
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === "tab-" + target);
      });

      // Keep the tab choice in the URL hash so it can be linked/bookmarked
      history.replaceState(null, "", "#" + target);
    });
  });

  // Open the tab referenced in the URL hash, if any
  const initial = window.location.hash.replace("#", "");
  if (initial) {
    const btn = document.querySelector(`.tab-btn[data-tab="${initial}"]`);
    if (btn) btn.click();
  }
});
