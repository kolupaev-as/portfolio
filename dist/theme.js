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
      <img class="theme-icon theme-icon-outline" src="assets/SunDim.svg" alt="">
      <img class="theme-icon theme-icon-filled" src="assets/SunDim-1.svg" alt="">
    </span>
    <span class="theme-toggle-option theme-toggle-dark" aria-hidden="true">
      <img class="theme-icon theme-icon-outline" src="assets/Moon.svg" alt="">
      <img class="theme-icon theme-icon-filled" src="assets/Moon-1.svg" alt="">
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
