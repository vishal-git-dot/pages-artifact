const steps = [
  {
    eyebrow: "Welcome.",
    title: "Discover better product inspiration.",
    subtitle: "Set up your experience in a few simple steps.",
    render() {
      return `
        <div class="option-list">
          <button class="option" data-value="Product design">
            <span class="option-copy">
              <span class="option-title">Product design</span>
              <span class="option-description">Explore interfaces, flows, and patterns.</span>
            </span>
            <span class="option-icon">◌</span>
          </button>
          <button class="option" data-value="UX research">
            <span class="option-copy">
              <span class="option-title">UX research</span>
              <span class="option-description">Study real-world decisions and user journeys.</span>
            </span>
            <span class="option-icon">⌕</span>
          </button>
          <button class="option" data-value="Inspiration">
            <span class="option-copy">
              <span class="option-title">Inspiration</span>
              <span class="option-description">Find ideas for your next product.</span>
            </span>
            <span class="option-icon">✦</span>
          </button>
        </div>
      `;
    }
  },
  {
    eyebrow: "Your focus.",
    title: "What are you working on?",
    subtitle: "Choose the area that best describes what you need right now.",
    render() {
      return `
        <div class="choice-grid">
          <button class="choice" data-value="Mobile apps">
            <strong>Mobile apps.</strong>
            <span>iOS and Android experiences.</span>
          </button>
          <button class="choice" data-value="Web apps">
            <strong>Web apps.</strong>
            <span>Responsive product experiences.</span>
          </button>
          <button class="choice" data-value="SaaS">
            <strong>SaaS.</strong>
            <span>Tools, dashboards, and workflows.</span>
          </button>
          <button class="choice" data-value="E-commerce">
            <strong>E-commerce.</strong>
            <span>Shopping and conversion journeys.</span>
          </button>
        </div>
      `;
    }
  },
  {
    eyebrow: "Make it yours.",
    title: "What should we call you?",
    subtitle: "A small detail that makes the experience feel more personal.",
    render() {
      return `
        <label class="field-label" for="nameField">Your name</label>
        <input
          class="text-field"
          id="nameField"
          type="text"
          autocomplete="name"
          placeholder="Enter your name"
          maxlength="60"
        />
      `;
    }
  },
  {
    eyebrow: "All set.",
    title: "Your workspace is ready.",
    subtitle: "You can update these preferences whenever you want.",
    render() {
      return `
        <div class="summary">
          <div class="summary-mark">m</div>
          <h2>Ready to explore.</h2>
          <p>We'll use your choices to shape the inspiration you see first.</p>
          <div class="selected-summary" id="selectedSummary"></div>
        </div>
      `;
    }
  }
];

let currentStep = 0;
const answers = {};

const eyebrow = document.getElementById("eyebrow");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const stepContent = document.getElementById("stepContent");
const stepCard = document.getElementById("stepCard");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const stepLabel = document.getElementById("stepLabel");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const finePrint = document.getElementById("finePrint");
const navCta = document.getElementById("navCta");

function renderStep() {
  const step = steps[currentStep];

  eyebrow.textContent = step.eyebrow;
  title.textContent = step.title;
  subtitle.textContent = step.subtitle;
  stepContent.innerHTML = step.render();

  const percent = Math.round(((currentStep + 1) / steps.length) * 100);
  stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.textContent = currentStep === steps.length - 1 ? "Start exploring" : "Continue";

  if (currentStep === steps.length - 1) {
    finePrint.textContent = "Your preferences are saved for this session.";
    renderSummary();
  } else {
    finePrint.textContent = "You can change these choices later.";
  }

  attachStepEvents();
}

function attachStepEvents() {
  const options = stepContent.querySelectorAll("[data-value]");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      answers[currentStep] = option.dataset.value;
    });
  });

  const nameField = document.getElementById("nameField");

  if (nameField) {
    nameField.value = answers[2] || "";
    nameField.addEventListener("input", (event) => {
      answers[2] = event.target.value.trim();
    });
    setTimeout(() => nameField.focus(), 0);
  }
}

function renderSummary() {
  const summary = document.getElementById("selectedSummary");
  if (!summary) return;

  const values = Object.values(answers).filter(Boolean);
  summary.innerHTML = values.map((value, index) => {
    const isLast = index === values.length - 1;
    return `<span class="summary-chip ${isLast ? "accent" : ""}">${escapeHtml(value)}</span>`;
  }).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function canContinue() {
  if (currentStep === 2) {
    return Boolean(answers[2]);
  }
  if (currentStep < 3) {
    return Boolean(answers[currentStep]);
  }
  return true;
}

nextBtn.addEventListener("click", () => {
  if (!canContinue()) {
    stepCard.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 180 }
    );
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    nextBtn.textContent = "Done";
    finePrint.textContent = "Welcome. Your onboarding is complete.";
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});

navCta.addEventListener("click", () => {
  window.scrollTo({ top: document.querySelector(".hero").offsetTop - 30, behavior: "smooth" });
});

renderStep();
