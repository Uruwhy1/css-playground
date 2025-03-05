document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".cards-container");
  const cards = document.querySelectorAll(".card");
  const totalCards = cards.length;

  const containers = document.querySelectorAll(".main-container");
  let currentContainerIndex = 0;

  function scrollToContainer(index) {
    if (index >= 0 && index < containers.length) {
      containers[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      currentContainerIndex = index;
    }
  }

  function handleWheel(e) {
    e.preventDefault();

    if (e.deltaY > 0 && currentContainerIndex < containers.length - 1) {
      scrollToContainer(currentContainerIndex + 1);
    } else if (e.deltaY < 0 && currentContainerIndex > 0) {
      scrollToContainer(currentContainerIndex - 1);
    }
  }

  function handleKeyNavigation(e) {
    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        e.preventDefault();
        if (currentContainerIndex < containers.length - 1) {
          scrollToContainer(currentContainerIndex + 1);
        }
        break;
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        if (currentContainerIndex > 0) {
          scrollToContainer(currentContainerIndex - 1);
        }
        break;
    }
  }

  let touchStartY = 0;
  const SWIPE_THRESHOLD = 50;

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (!touchStartY) return;

    const touchEndY = e.touches[0].clientY;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffY) > SWIPE_THRESHOLD) {
      if (diffY > 0 && currentContainerIndex < containers.length - 1) {
        scrollToContainer(currentContainerIndex + 1);
      } else if (diffY < 0 && currentContainerIndex > 0) {
        scrollToContainer(currentContainerIndex - 1);
      }

      touchStartY = 0;
    }
  }

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  containers.forEach((container) => {
    container.style.overscrollBehavior = "none";
  });

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyNavigation);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove, { passive: false });

  setGridTemplate(0);

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", function () {
      cards.forEach((c) => c.classList.remove("active"));

      card.classList.add("active");

      setGridTemplate(index);
    });
  });

  function setGridTemplate(activeIndex) {
    const smallWidth = 1;
    const largeWidth = 5;

    let columns = [];
    for (let i = 0; i < totalCards; i++) {
      columns.push(i === activeIndex ? largeWidth : smallWidth);
    }

    cardsContainer.style.gridTemplateColumns = columns
      .map((size) => `${size}fr`)
      .join(" ");
  }
});
