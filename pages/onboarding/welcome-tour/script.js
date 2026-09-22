(function () {
  const steps = [
    { art: "🗒️", title: "Capture notes anywhere", body: "Jot down a thought on your phone, and it's on your desktop before you sit back down." },
    { art: "🔍", title: "Find anything instantly", body: "Search across every note, tag, and attachment in a fraction of a second." },
    { art: "🤝", title: "Share with your team", body: "Turn any note into a shared doc with one click — no export, no copy-paste." },
  ];

  let index = 0;

  const art = document.getElementById("tourArt");
  const title = document.getElementById("tourTitle");
  const body = document.getElementById("tourBody");
  const dots = document.querySelectorAll("#tourDots .dot");
  const nextBtn = document.getElementById("nextBtn");
  const skipBtn = document.getElementById("skipBtn");

  function render() {
    const step = steps[index];
    art.textContent = step.art;
    title.textContent = step.title;
    body.textContent = step.body;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    nextBtn.textContent = index === steps.length - 1 ? "Get started" : "Next";
  }

  nextBtn.addEventListener("click", () => {
    if (index < steps.length - 1) {
      index += 1;
      render();
    } else {
      nextBtn.textContent = "You're all set!";
    }
  });

  skipBtn.addEventListener("click", () => {
    index = steps.length - 1;
    render();
  });

  render();
})();
