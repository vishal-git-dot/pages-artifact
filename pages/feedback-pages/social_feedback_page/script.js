const form = document.getElementById("feedbackForm");
const ratingInput = document.getElementById("rating");
const ratingButtons = [...document.querySelectorAll(".rating-option")];
const comments = document.getElementById("comments");
const charCount = document.getElementById("charCount");
const anonymous = document.getElementById("anonymous");
const displayName = document.getElementById("displayName");
const formStatus = document.getElementById("formStatus");

ratingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.rating;
    ratingInput.value = selected;
    ratingButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.getElementById("ratingError").textContent = "";
  });
});

comments.addEventListener("input", () => {
  charCount.textContent = comments.value.length;
  if (comments.value.trim()) document.getElementById("commentsError").textContent = "";
});

anonymous.addEventListener("change", () => {
  displayName.disabled = anonymous.checked;
  displayName.setAttribute("aria-disabled", String(anonymous.checked));
  if (anonymous.checked) displayName.value = "";
});

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = document.getElementById("category").value;
  const message = comments.value.trim();
  const rating = ratingInput.value;
  let valid = true;

  setError("categoryError", "");
  setError("ratingError", "");
  setError("commentsError", "");
  formStatus.textContent = "";
  formStatus.classList.remove("success");

  if (!category) {
    setError("categoryError", "Please choose a category.");
    valid = false;
  }
  if (!rating) {
    setError("ratingError", "Please select a rating from 1 to 5.");
    valid = false;
  }
  if (!message) {
    setError("commentsError", "Please enter your feedback.");
    valid = false;
  }

  if (!valid) {
    const firstError = document.querySelector(".field-error:not(:empty)");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Front-end demo: no server is connected. Keep a non-identifying confirmation only.
  const reference = "FB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  formStatus.textContent = `Thank you for sharing your thoughts. Your feedback has been prepared for submission. Reference: ${reference}.`;
  formStatus.classList.add("success");
  formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  form.reset();
  ratingInput.value = "";
  ratingButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
  charCount.textContent = "0";
  displayName.disabled = anonymous.checked;
  displayName.setAttribute("aria-disabled", String(anonymous.checked));
});
displayName.disabled = anonymous.checked;
displayName.setAttribute("aria-disabled", String(anonymous.checked));
