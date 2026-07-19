(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector(".about-story-scene");
    if (!scene || reduceMotion) return;

    const layers = Array.from(scene.querySelectorAll("[data-depth]"));
    let frame;

    const reset = () => {
      layers.forEach((layer) => {
        layer.style.transform = "";
      });
    };

    scene.addEventListener("pointermove", (event) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth || 1);
          const rotateX = y * -7 * depth;
          const rotateY = x * 9 * depth;
          const shiftX = x * 16 * depth;
          const shiftY = y * 12 * depth;
          layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${depth * 20}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
      });
    });

    scene.addEventListener("pointerleave", reset);

    const revealItems = document.querySelectorAll(".about-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  });
})();
