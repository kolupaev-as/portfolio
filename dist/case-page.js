const caseScroll = document.querySelector("[data-case-scroll]");
const scrollToTopButton = document.querySelector("[data-scroll-to-top]");
const closeCaseLink = document.querySelector("[data-close-case]");
const compactCaseQuery = window.matchMedia("(max-width: 900px)");

function syncCloseCaseLink() {
  if (closeCaseLink) {
    closeCaseLink.href = compactCaseQuery.matches ? "/#projects" : "/";
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
compactCaseQuery.addEventListener?.("change", syncCloseCaseLink);
