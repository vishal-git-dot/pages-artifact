(function () {
  const form = document.getElementById("letterForm");
  const note = document.getElementById("letterNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.textContent = "You're on the list — first letter arrives Thursday.";
  });
})();
