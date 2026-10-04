const $ = (selector) => document.querySelector(selector);

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

$("#heroArrow").addEventListener("click", () => {
  $("#notify").scrollIntoView({ behavior: "smooth", block: "center" });
});

const loadingBar = $("#loadingBar");
let progress = 0;
const timer = setInterval(() => {
  progress += Math.floor(Math.random() * 8) + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(timer);
    document.querySelector(".screen-glow").textContent = "READY!";
  }
  loadingBar.style.width = `${progress}%`;
}, 220);

$("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#searchInput").value.trim();
  if (!query) {
    $("#searchInput").focus();
    return;
  }
  $("#searchInput").value = "";
  alert(`SEARCH: "${query}"\\n\\nThe site is still powering up.`);
});

$("#pollButton").addEventListener("click", () => {
  const selected = document.querySelector('input[name="choice"]:checked');
  const status = $("#pollStatus");
  if (!selected) {
    status.textContent = "SELECT AN OPTION FIRST!";
    status.style.color = "#e60012";
    return;
  }
  status.textContent = "VOTE RECEIVED — PLAYER 1 READY!";
  status.style.color = "#206479";
});

$("#signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#email").value.trim();
  const status = $("#signupStatus");
  status.textContent = `YOU'RE ON THE LIST — ${email}`;
  status.style.color = "#206479";
  event.target.reset();
});
