(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".volunteer-reveal");

  if (!reducedMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = Number(entry.target.getAttribute("data-delay") || 0);
        window.setTimeout(function () { entry.target.classList.add("is-visible"); }, delay);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px" });
    reveals.forEach(function (element) { revealObserver.observe(element); });
  } else {
    reveals.forEach(function (element) { element.classList.add("is-visible"); });
  }

  var visual = document.querySelector(".volunteer-hero_visual");
  if (visual && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    visual.addEventListener("pointermove", function (event) {
      var bounds = visual.getBoundingClientRect();
      var x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      var y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      visual.style.setProperty("--pointer-x", (x * 9).toFixed(2) + "px");
      visual.style.setProperty("--pointer-y", (y * 7).toFixed(2) + "px");
    });
    visual.addEventListener("pointerleave", function () {
      visual.style.setProperty("--pointer-x", "0px");
      visual.style.setProperty("--pointer-y", "0px");
    });
  }

  document.querySelectorAll(".volunteer-faq details").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".volunteer-faq details[open]").forEach(function (other) {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });

  var form = document.getElementById("volunteerForm");
  var status = document.getElementById("volunteerFormStatus");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please complete the required fields before continuing.";
        return;
      }
      var data = new FormData(form);
      var subject = "Volunteer interest — " + data.get("name");
      var body = [
        "Hello Eneho Fikir team,", "", "I would like to express my interest in volunteering.", "",
        "Name: " + data.get("name"), "Email: " + data.get("email"),
        "Phone / WhatsApp: " + (data.get("phone") || "Not provided"), "Location: " + data.get("location"),
        "Area of interest: " + data.get("interest"), "Availability: " + data.get("availability"),
        "Preferred format: " + data.get("format"), "", "Skills and motivation:", data.get("message"), "", "Thank you."
      ].join("\n");
      status.textContent = "Your email app is opening with your application ready to review and send.";
      window.location.href = "mailto:mahletworku@enehofiker.org?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
