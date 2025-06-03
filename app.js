// app.js

// Import Firebase functions. Ensure 'firebase.js' contains the consolidated Firebase
// setup and exports: initializeFirebase, navigateTestimonials, addTestimonial, showMessageBox.
import { setupEmailJsContactForm } from './email.js';
import { initializeFirebase, navigateTestimonials, addTestimonial, showMessageBox } from './firebase.js'; 

let text;
let img;
// GSAP Plugins
// Make sure to include GSAP and ScrollTrigger in your HTML file via CDN or local files
// index.html uses GSAP 3.9.1:
// e.g., <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/Draggable.min.js"></script>
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, Draggable);
} else {
    console.error("GSAP library is not loaded. Please ensure it's included in your HTML.");
    // Optionally, use the showMessageBox if available and appropriate
    if (typeof showMessageBox === 'function') {
        // This relies on showMessageBox being loaded, which might be an issue if firebase.js hasn't exported it yet
        // or if this part of the script runs too early. Consider a simple console.log as a fallback.
        console.error('showMessageBox function not available to display GSAP loading error.');
    }
}

// --- DOMContentLoaded Event Listener ---
// Ensures the DOM is fully loaded before executing scripts that manipulate it.
document.addEventListener('DOMContentLoaded', () => {
   
    text=document.querySelectorAll(".text-1")
    text.forEach(t=>t.classList.add("hidden"))
   img=document.querySelector(".img-hero")

    // --- UI Element Event Listeners & Setup ---
    // These functions set up general UI interactions.
    setupUIEventListeners(); // Handles testimonial navigation, add testimonial form, etc.
    updateCurrentYear();
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeTabs();

    // --- GSAP Animations & Firebase Initialization ---
    // setupGsapAnimations configures scroll-triggered and other static animations.
    setupGsapAnimations();
    // setupLoaderDependentInitializations handles the loading screen,
    // and then calls startHeroAnimations and initializeFirebase.
    setupLoaderDependentInitializations();
    setupEmailJsContactForm()
});


// --- UI Setup Functions ---

function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'current-year' not found.");
    }
}

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    if (!themeToggle || !themeToggleIcon) {
        console.warn("Theme toggle elements not found.");
        return;
    }

    const loadTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            htmlElement.classList.add('dark');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            htmlElement.classList.remove('dark'); // Default to light
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    };

    loadTheme(); // Load theme on initial page load

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    });
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');

    if (!mobileMenuButton || !mobileOverlayMenu || !closeMobileMenuButton) {
        console.warn("Mobile menu elements not found.");
        return;
    }

    const toggleMenu = (open) => {
        if (open) {
            mobileOverlayMenu.classList.add('open');
            document.body.classList.add('no-scroll');
        } else {
            mobileOverlayMenu.classList.remove('open');
            document.body.classList.remove('open'); // Ensure 'open' class is removed on close
            document.body.classList.remove('no-scroll');
        }
    };

    mobileMenuButton.addEventListener('click', () => toggleMenu(true));
    closeMobileMenuButton.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's a valid selector and not just "#"
            if (targetId.length > 1) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        console.warn(`Smooth scroll target '${targetId}' not found on this page.`);
                    }
                } catch (error) {
                    console.warn(`Invalid selector for smooth scroll: '${targetId}'`, error);
                }
            }
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length === 0) {
        // console.warn("No tab buttons found for initialization."); // Optional: only log if tabs are expected
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            const targetContentId = `${button.dataset.tab}-content`;
            const targetContentElement = document.getElementById(targetContentId);
            if (targetContentElement) {
                targetContentElement.classList.remove('hidden');
            } else {
                console.warn(`Tab content with ID '${targetContentId}' not found.`);
            }
        });
    });
    // Activate the first tab by default if any exist
    if (tabButtons.length > 0 && document.querySelector('.tab-button.active') === null) {
        tabButtons[0].click();
    }
}

function setupUIEventListeners() {
    // Testimonial navigation and form submission
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const addTestimonialForm = document.getElementById('add-testimonial-form');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (typeof navigateTestimonials === 'function') navigateTestimonials(-1);
            else console.error("navigateTestimonials function is not available.");
        });
    } else {
        console.warn("Element with ID 'prev-testimonial' not found.");
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (typeof navigateTestimonials === 'function') navigateTestimonials(1);
            else console.error("navigateTestimonials function is not available.");
        });
    } else {
        console.warn("Element with ID 'next-testimonial' not found.");
    }

    if (addTestimonialForm) {
        addTestimonialForm.addEventListener('submit', (event) => {
            if (typeof addTestimonial === 'function') addTestimonial(event);
            else {
                event.preventDefault(); // Prevent submission if function is missing
                console.error("addTestimonial function is not available.");
            }
        });
    } else {
        console.warn("Element with ID 'add-testimonial-form' not found.");
    }

    // Add other general UI event listeners here if needed
}


// --- GSAP Animation Functions ---

function startHeroAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn("GSAP not available for hero animations.");
        return;
    }

    const homeSection = document.getElementById('home'); // Target the main section
    const heroText = document.querySelector(".gsap-hero-text");
    const typingName = document.getElementById("typing-name");
    const heroDescElements = document.querySelectorAll(".gsap-hero-desc");
    const heroBtn = document.querySelector(".gsap-hero-btn");
    const heroImage = document.querySelector(".gsap-hero-image");

     text.forEach(t=>t.classList.remove("hidden"))
     img.classList.remove('hidden')
    const heroTimeline = gsap.timeline();

    // 1. Animate the entire home section from opacity 0 to 1
    // REDUCED DURATION for faster appearance of the background section
    if (homeSection) {
        heroTimeline.fromTo(homeSection,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" } // Changed from 1.5 to 0.8 seconds
        );
    }

    // 2. Then, animate the individual elements.
    // Adjusted offset to start text animations even sooner relative to the home section fade.
    // Using 0 ensures they start immediately with the homeSection's fade.
    const delayRelativeFromSectionStart = 0; 

    if (heroText) heroTimeline.from(heroText, { opacity: 0, y: 30, duration: 1.5, ease: "power3.out" }, delayRelativeFromSectionStart);
    if (typingName) heroTimeline.from(typingName, { opacity: 0, y: 30, duration: 1.5, ease: "power3.out" }, "<0.2"); // Relative to heroText start
    if (heroImage) heroTimeline.from(heroImage, { opacity: 0, scale: 0.8, duration: 2.5, ease: "elastic.out(1, 0.5)" }, "<0.2"); // Relative to typingName start

    if (heroDescElements.length > 0) {
        heroDescElements.forEach(el => {
            heroTimeline.from(el, { opacity: 0, y: 30, duration: 1.5, ease: "power3.out" }, "<0.1"); // Relative to previous desc/image start
        });
    }
    if (heroBtn) heroTimeline.from(heroBtn, { opacity: 0, y: 30, duration: 1.5, ease: "power3.out" }, "<0.2"); // Relative to last desc start

    heroTimeline.play();
}


function setupGsapAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn("GSAP not available for general animations.");
        return;
    }

   gsap.utils.toArray(".gsap-section-heading").forEach(element => {
        if (!element) return;
        gsap.from(element, {
            opacity: 0, y: 50, duration: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Animation tab trigger hogi jab element ka top viewport ke 85% tak pahunchega
                toggleActions: "play none none reverse",
                // ***** Ye add karein *****
            }
        });
    });

    gsap.utils.toArray(".gsap-sub-heading").forEach(element => {
        if (!element) return;
        gsap.from(element, {
            opacity: 0, y: 50, duration: 1, delay: 0.2, ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
                // ***** Ye add karein *****
            }
        });
    });


    gsap.utils.toArray(".gsap-skill-item").forEach((element, index) => {
        if (!element) return;
        gsap.from(element, {
            opacity: 0, y: 50, duration: 0.8, delay: index * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" }
        });
    });

    gsap.utils.toArray(".gsap-service-card").forEach((element, index) => {
        if (!element) return;
        gsap.from(element, {
            opacity: 0, y: 50, duration: 0.8, delay: index * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" }
        });
    });

    const testimonialCard = document.querySelector(".gsap-testimonial-card");
    if (testimonialCard) {
        gsap.from(testimonialCard, {
            opacity: 0, scale: 0.8, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: testimonialCard, start: "top 80%", toggleActions: "play none none reverse" }
        });
    } else {
        // This might be expected if testimonials are loaded dynamically
        // console.warn("Element with class '.gsap-testimonial-card' not found for animation at initial setup.");
    }

    gsap.utils.toArray(".gsap-project-card").forEach((element, index) => {
        if (!element) return;
        gsap.from(element, {
            opacity: 0, y: 50, duration: 0.8, delay: index * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" }
        });
    });

    const scrollingTextElements = gsap.utils.toArray(".gsap-scrolling-text");
    if (scrollingTextElements.length > 0) {
        // Corrected: Animate all elements in the array directly for a continuous marquee effect.
        // The xPercent: -100 will move each element left by 100% of its own width.
        // The modifiers ensure it wraps around for a continuous loop.
        gsap.to(scrollingTextElements, {
            xPercent: -100, // Move left by 100% of its own width
            duration: 20, // Adjust speed as needed
            ease: "none", // Linear movement for continuous scroll
            repeat: -1, // Loop infinitely
            modifiers: {
                // This modifier makes the element "jump" back to 0% when it reaches -100%,
                // creating a seamless looping effect for a marquee.
                xPercent: gsap.utils.unitize(x => parseFloat(x) % 100) 
            }
        });
    } else {
        console.warn("Elements with class '.gsap-scrolling-text' not found for animation.");
    }
}


// --- Loader and Initialization Logic ---
// app.js

// ... (your existing imports and global variables)

function setupLoaderDependentInitializations() {
    const loaderOverlay = document.getElementById('loader-overlay');

    const LOADER_TOTAL_DISPLAY_DURATION_MS = 1500;
    const LOADER_FADE_OUT_DURATION_MS = 500;

    const onReady = () => {
        if (typeof initializeFirebase === 'function') initializeFirebase();
        else console.error("initializeFirebase function is not available.");

        // Start hero animations immediately after the loader finishes.
        if (typeof startHeroAnimations === 'function') startHeroAnimations();
        else console.error("startHeroAnimations function is not available.");

        // ***** Ye line add karein *****
        // Jab DOM fully loaded ho jaye aur hero animations start ho jayein,
        // tab ScrollTrigger ko refresh karein
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
            console.log("ScrollTrigger refreshed after loader hidden.");
        } else {
            console.warn("ScrollTrigger not available to refresh.");
        }
    };

    if (loaderOverlay) {
        const delayBeforeFadeOut = LOADER_TOTAL_DISPLAY_DURATION_MS - LOADER_FADE_OUT_DURATION_MS;
        const actualDelayBeforeFadeOut = Math.max(0, delayBeforeFadeOut);

        setTimeout(() => {
            loaderOverlay.classList.add('hidden');
            setTimeout(() => {
                if (loaderOverlay.parentElement) {
                    loaderOverlay.remove();
                }
                onReady();
            }, LOADER_FADE_OUT_DURATION_MS);
        }, actualDelayBeforeFadeOut);

    } else {
        console.warn("Loader overlay with ID 'loader-overlay' not found. Running initializations directly.");
        onReady();
    }
}