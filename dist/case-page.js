const caseScroll = document.querySelector("[data-case-scroll]");
const scrollToTopButton = document.querySelector("[data-scroll-to-top]");
const closeCaseLink = document.querySelector("[data-close-case]");
const tabletCaseQuery = window.matchMedia("(min-width: 768px) and (max-width: 900px)");

function syncCloseCaseLink() {
  if (closeCaseLink) {
    closeCaseLink.href = tabletCaseQuery.matches ? "/#projects" : "/";
  }
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

caseScroll?.scrollTo({ top: 0 });

scrollToTopButton?.addEventListener("click", () => {
  caseScroll?.scrollTo({ top: 0, behavior: "smooth" });
});

syncCloseCaseLink();
tabletCaseQuery.addEventListener?.("change", syncCloseCaseLink);
