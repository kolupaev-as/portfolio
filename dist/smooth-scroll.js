(() => {
  const scrollContainers = document.querySelectorAll("[data-smooth-scroll]");
  const instances = new WeakMap();
  const activeInstances = new Set();

  window.portfolioSmoothScroll = {
    get(container) {
      return instances.get(container) ?? null;
    },
  };

  if (!window.Lenis || scrollContainers.length === 0) {
    return;
  }

  scrollContainers.forEach((container) => {
    const lenis = new window.Lenis({
      wrapper: container,
      content: container,
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      overscroll: false,
      respectReducedMotion: true,
    });

    instances.set(container, lenis);
    activeInstances.add(lenis);
  });

  const resizeInstances = () => {
    requestAnimationFrame(() => {
      activeInstances.forEach((lenis) => lenis.resize());
    });
  };

  window.addEventListener("hashchange", resizeInstances);
  window.addEventListener("resize", resizeInstances);

  window.addEventListener(
    "pagehide",
    () => {
      window.removeEventListener("hashchange", resizeInstances);
      window.removeEventListener("resize", resizeInstances);
      activeInstances.forEach((lenis) => lenis.destroy());
      activeInstances.clear();
    },
    { once: true },
  );
})();
