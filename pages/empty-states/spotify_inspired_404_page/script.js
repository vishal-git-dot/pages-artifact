const homeButton = document.getElementById("homeButton");
const backButton = document.getElementById("backButton");

homeButton.addEventListener("click", () => {
  // Change "/" if your application's home page uses another route.
  window.location.href = "/";
});

backButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
});
