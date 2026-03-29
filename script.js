// Mobile menu toggle

const menuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.getElementById("nav-links");

// Toggle menu when button is clicked
if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        const isOpen = menuBtn.getAttribute("aria-expanded") === "true";

        menuBtn.setAttribute("aria-expanded", !isOpen);
        navLinks.classList.toggle("active");
    });
}

// Scroll reveal animation

const revealSelectors = [
    ".page-header",
    ".content-text",
    ".content-image",
    ".commitment-item",
    "#story-heading",
    "#mission-heading",
    "#food-heading",
    ".dark-cat-title",
    ".menu-list-item",
    ".pizza-card",
    ".carousel-overlay h1",
    ".hero-subtitle",
    ".hero > .cta-button",
    ".services-overview h2",
    ".featured-items h2",
    ".view-all-button",
    ".menu-item",
    ".special-card",
    ".mission-card",
    ".food-item",
    ".service-card",
    ".item-card",
    ".cta-section",
    ".contact-info-section h2",
    ".contact-form-section",
    ".contact-form-section h2",
    ".contact-form",
    ".faq-section h2",
    ".contact-info-card",
    ".faq-item",
    ".our-story",
    ".our-mission",
    ".countdown-section"
];

revealSelectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add("reveal");
    });
});

const STAGGER_STEP = 30;
const STAGGER_MAX = 210;
const HEADING_STAGGER_STEP = 20;
const HEADING_STAGGER_MAX = 140;

const staggerConfig = [
    { selector: ".page-header", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".content-text", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".content-image", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".commitment-item", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: "#story-heading", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: "#mission-heading", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: "#food-heading", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".dark-cat-title", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".menu-list-item", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".pizza-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".carousel-overlay h1", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".hero-subtitle", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".hero > .cta-button", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".services-overview h2", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".featured-items h2", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".view-all-button", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".service-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".item-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".menu-item", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".special-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".mission-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".food-item", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".contact-info-section h2", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".contact-form-section", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".contact-form-section h2", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".contact-form", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".faq-section h2", step: HEADING_STAGGER_STEP, max: HEADING_STAGGER_MAX },
    { selector: ".contact-info-card", step: STAGGER_STEP, max: STAGGER_MAX },
    { selector: ".faq-item", step: STAGGER_STEP, max: STAGGER_MAX }
];

staggerConfig.forEach(function (config) {
    document.querySelectorAll(config.selector).forEach(function (el, index) {
        const delay = Math.min(index * config.step, config.max);
        el.style.transitionDelay = delay + "ms";
    });
});

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach(function (el) {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("visible");
        }
    });
}

function refreshRevealAnimations() {
    document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.remove("visible");
    });

    requestAnimationFrame(function () {
        revealOnScroll();
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("menuFilterChanged", refreshRevealAnimations);
revealOnScroll();


// Contact form validation

const form = document.getElementById("contact-form");

if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const privacyInput = document.getElementById("privacy");

    const statusDiv = document.getElementById("form-status");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");
    const privacyError = document.getElementById("privacy-error");

    const messageCount = document.getElementById("message-count");

    
    // Character count for message box
    
    if (messageInput && messageCount) {
        messageInput.addEventListener("input", function () {
            messageCount.textContent = messageInput.value.length + "/500";
        });
    }

    // Valid Input for message box

    function validateName() {
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Name must be at least 2 characters.";
            return false;
        }
        nameError.textContent = "";
        return true;
    }

    function validateEmail() {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

        if (!pattern.test(emailInput.value.trim())) {
            emailError.textContent = "Enter a valid email.";
            return false;
        }
        emailError.textContent = "";
        return true;
    }

    function validatePhone() {
        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "";
            return true;
        }

        const pattern = /^[\d\s\-\+\(\)]+$/;

        if (!pattern.test(phoneInput.value.trim())) {
            phoneError.textContent = "Enter a valid phone number.";
            return false;
        }
        phoneError.textContent = "";
        return true;
    }

    function validateSubject() {
        if (subjectInput.value === "") {
            subjectError.textContent = "Please select a subject.";
            return false;
        }
        subjectError.textContent = "";
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = "Message must be at least 10 characters.";
            return false;
        }
        messageError.textContent = "";
        return true;
    }

    function validatePrivacy() {
        if (!privacyInput.checked) {
            privacyError.textContent = "You must agree to the privacy policy.";
            return false;
        }
        privacyError.textContent = "";
        return true;
    }


    // Real-time validation

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    subjectInput.addEventListener("change", validateSubject);
    messageInput.addEventListener("input", validateMessage);
    privacyInput.addEventListener("change", validatePrivacy);

    // Status message display

    let statusTimeout;

    function setFormStatus(message, type) {
        clearTimeout(statusTimeout);
        statusDiv.textContent = message;
        statusDiv.classList.remove("success", "error");

        if (type) {
            statusDiv.classList.add(type);
        }

        if (type) {
            statusTimeout = setTimeout(function () {
                statusDiv.textContent = "";
                statusDiv.classList.remove("success", "error");
            }, 3000);
        }
    }

    // Form submittied validation

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const validationResults = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validateSubject(),
            validateMessage(),
            validatePrivacy()
        ];

        const isValid = validationResults.every(function (result) {
            return result;
        });

        if (isValid) {
            setFormStatus("✅ Message sent successfully!", "success");

            form.reset();
            messageCount.textContent = "0/500";
        } else {
            setFormStatus("❌ Please submit all required fields. (*)", "error");
        }
    });
}
