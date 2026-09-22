(function () {
  const stars = document.querySelectorAll(".star");
  const submitBtn = document.getElementById("submitBtn");
  let selected = 0;

  stars.forEach((star) => {
    const value = Number(star.dataset.value);

    star.addEventListener("mouseenter", () => paint(value));
    star.addEventListener("mouseleave", () => paint(selected));
    star.addEventListener("click", () => {
      selected = value;
      paint(selected);
    });
  });

  function paint(value) {
    stars.forEach((star) => {
      star.classList.toggle("is-active", Number(star.dataset.value) <= value);
    });
  }

  submitBtn.addEventListener("click", () => {
    submitBtn.textContent = selected ? "Thanks for your feedback!" : "Please pick a rating";
  });
})();
