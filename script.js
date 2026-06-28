const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const animatedItems = [...document.querySelectorAll("[data-animate]")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.15 }
);

animatedItems.forEach((item) => observer.observe(item));

const topBtn = document.querySelector(".back-to-top");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 350);
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function validate(form) {
  const msg = form.querySelector(".form-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = [...form.querySelectorAll("[required]")];
    const allFilled = requiredFields.every((field) => field.value.trim() !== "");

    if (!allFilled) {
      msg.textContent = "Please fill in all required fields.";
      msg.style.color = "#b91c1c";
      return;
    }

    const email = form.querySelector('input[type="email"]');
    if (email && !email.checkValidity()) {
      msg.textContent = "Please enter a valid email address.";
      msg.style.color = "#b91c1c";
      return;
    }

    msg.textContent = "Thanks! Your submission has been received in this demo form.";
    msg.style.color = "#1e63ff";
    form.reset();
  });
}

document.querySelectorAll('form[data-validate="true"]').forEach(validate);