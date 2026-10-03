const tabletViewRoot = document.documentElement;

function syncTabletView() {
  tabletViewRoot.dataset.tabletView = location.hash === "#projects" ? "projects" : "hero";
}

syncTabletView();
window.addEventListener("hashchange", syncTabletView);
