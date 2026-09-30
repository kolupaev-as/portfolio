const caseScroll = document.querySelector("[data-case-scroll]");
const scrollToTopButton = document.querySelector("[data-scroll-to-top]");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

caseScroll?.scrollTo({ top: 0 });

scrollToTopButton?.addEventListener("click", () => {
  caseScroll?.scrollTo({ top: 0, behavior: "smooth" });
});
