// animations.js
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animación para las secciones al hacer scroll
    gsap.from(".section-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".section-title",
            start: "top 75%",
        },
    });

    gsap.from(".card", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".card-container",
            start: "top 80%",
        },
    });
});
