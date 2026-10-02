const themeStorageKey = "portfolio-theme";
const root = document.documentElement;

function readSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The selected theme still works for the current page when storage is unavailable.
  }
}

function applyTheme(theme) {
  root.dataset.theme = theme;

  const toggle = document.querySelector("[data-theme-toggle]");
  const isLight = theme === "light";

  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "Включить тёмную тему" : "Включить светлую тему");
    toggle.title = isLight ? "Включить тёмную тему" : "Включить светлую тему";
  }

  let themeColor = document.querySelector('meta[name="theme-color"]');

  if (!themeColor) {
    themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    document.head.append(themeColor);
  }

  themeColor.content = isLight ? "#fafafa" : "#0b0b0b";
}

applyTheme(readSavedTheme() ?? "dark");

document.addEventListener("DOMContentLoaded", () => {
  const socials = document.querySelector(".socials");

  if (!socials) {
    return;
  }

  const footer = document.createElement("div");
  footer.className = "sidebar-footer";

  const toggle = document.createElement("button");
  toggle.className = "theme-toggle";
  toggle.type = "button";
  toggle.dataset.themeToggle = "";
  toggle.innerHTML = `
    <span class="theme-toggle-option theme-toggle-light" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.25" />
        <path d="M8 1.5v1.25M8 13.25v1.25M14.5 8h-1.25M2.75 8H1.5M12.6 3.4l-.88.88M4.28 11.72l-.88.88M12.6 12.6l-.88-.88M4.28 4.28l-.88-.88" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
      </svg>
    </span>
    <span class="theme-toggle-option theme-toggle-dark" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M13.5 9.76A5.75 5.75 0 0 1 6.24 2.5 5.76 5.76 0 1 0 13.5 9.76Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  `;

  socials.before(footer);
  footer.append(socials, toggle);

  applyTheme(root.dataset.theme);

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
});
