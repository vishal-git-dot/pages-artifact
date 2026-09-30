/* =====================================================
   FRUVIA — JAVASCRIPT
   ===================================================== */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (nav.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= HEADER SCROLL ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


/* ================= CART ================= */

let cartCount = 0;

const cartCountElement = document.querySelector(".cart-count");
const toast = document.getElementById("toast");
const toastProduct = document.getElementById("toastProduct");

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product = button.dataset.product;

        cartCount++;

        cartCountElement.textContent = cartCount;

        toastProduct.textContent = product;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);

    });

});


/* ================= WISHLIST ================= */

document.querySelectorAll(".wishlist").forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            button.style.color = "#f28b38";

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            button.style.color = "";

        }

    });

});


/* ================= NEWSLETTER ================= */

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        newsletterForm.querySelector("input").value;

    if (!email) {
        return;
    }

    const button =
        newsletterForm.querySelector("button");

    button.innerHTML =
        'Subscribed <i class="fa-solid fa-check"></i>';

    newsletterForm.querySelector("input").value = "";

});


/* ================= SEARCH ================= */

const searchButton =
    document.querySelector(".search-btn");

searchButton.addEventListener("click", () => {

    const searchTerm =
        prompt("What fruit are you looking for?");

    if (searchTerm) {

        alert(
            `Searching for "${searchTerm}"...`
        );

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".product-card, .category-card, .feature, .about-content, .testimonial blockquote"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});
