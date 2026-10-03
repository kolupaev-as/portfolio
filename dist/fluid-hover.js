(() => {
  const menus = document.querySelectorAll(".menu");

  menus.forEach((menu) => {
    const items = [...menu.querySelectorAll(".menu-item")];

    if (items.length < 2) {
      return;
    }

    const highlight = document.createElement("span");
    highlight.className = "menu-fluid-highlight";
    highlight.setAttribute("aria-hidden", "true");
    menu.prepend(highlight);
    menu.classList.add("menu-fluid-enabled");

    let pointerY = 0;
    let pointerFrame = 0;
    let pointerInside = false;

    const hideHighlight = () => {
      highlight.classList.remove("is-visible");
    };

    const moveHighlight = (item) => {
      const menuRect = menu.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      highlight.style.setProperty("--fluid-x", `${itemRect.left - menuRect.left}px`);
      highlight.style.setProperty("--fluid-y", `${itemRect.top - menuRect.top}px`);
      highlight.style.setProperty("--fluid-width", `${itemRect.width}px`);
      highlight.style.setProperty("--fluid-height", `${itemRect.height}px`);
      highlight.classList.toggle("is-visible", !item.classList.contains("menu-item-active"));
    };

    const moveToNearestItem = () => {
      pointerFrame = 0;

      const nearestItem = items.reduce((nearest, item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const nearestRect = nearest.getBoundingClientRect();
        const nearestCenter = nearestRect.top + nearestRect.height / 2;

        return Math.abs(pointerY - itemCenter) < Math.abs(pointerY - nearestCenter) ? item : nearest;
      });

      moveHighlight(nearestItem);
    };

    menu.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      pointerInside = true;
      pointerY = event.clientY;
      moveToNearestItem();
    });

    menu.addEventListener("pointermove", (event) => {
      if (!pointerInside || event.pointerType === "touch") {
        return;
      }

      pointerY = event.clientY;

      if (!pointerFrame) {
        pointerFrame = requestAnimationFrame(moveToNearestItem);
      }
    });

    menu.addEventListener("pointerleave", () => {
      pointerInside = false;

      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
      }

      if (!menu.contains(document.activeElement)) {
        hideHighlight();
      }
    });

    menu.addEventListener("focusin", (event) => {
      const item = event.target.closest(".menu-item");

      if (item) {
        moveHighlight(item);
      }
    });

    menu.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!pointerInside && !menu.contains(document.activeElement)) {
          hideHighlight();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (pointerInside) {
        moveToNearestItem();
        return;
      }

      const focusedItem = menu.querySelector(".menu-item:focus");

      if (focusedItem) {
        moveHighlight(focusedItem);
      }
    });
  });
})();
