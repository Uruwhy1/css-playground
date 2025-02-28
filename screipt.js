document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".cards-container");
  const cards = document.querySelectorAll(".card");
  const totalCards = cards.length;

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
