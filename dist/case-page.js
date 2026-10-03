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

const smoothCaseScroll = window.portfolioSmoothScroll?.get(caseScroll);

if (smoothCaseScroll) {
  smoothCaseScroll.scrollTo(0, { immediate: true });
} else {
  caseScroll?.scrollTo({ top: 0 });
}

scrollToTopButton?.addEventListener("click", () => {
  if (smoothCaseScroll) {
    smoothCaseScroll.scrollTo(0, { duration: 0.9 });
    return;
  }

  caseScroll?.scrollTo({ top: 0, behavior: "smooth" });
});

syncCloseCaseLink();
compactCaseQuery.addEventListener?.("change", syncCloseCaseLink);
