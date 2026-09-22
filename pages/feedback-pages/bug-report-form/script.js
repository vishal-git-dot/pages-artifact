(function () {
  const submitBtn = document.getElementById("submitBug");
  const titleInput = document.getElementById("title");

  submitBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      titleInput.focus();
      titleInput.style.borderColor = "#f85149";
      return;
    }
    submitBtn.textContent = "Submitted ✓";
    submitBtn.disabled = true;
  });

  titleInput.addEventListener("input", () => {
    titleInput.style.borderColor = "";
  });
})();
