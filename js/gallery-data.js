(function () {
  "use strict";

  const groups = [
    {
      key: "teachers",
      category: "education",
      categoryLabel: "Education",
      title: "Teachers Capacity Building",
      description: "Teachers take part in practical capacity-building sessions designed to strengthen classroom learning.",
      files: [
        "Teachers_capacity_building1.jpg",
        "Teachers_capacity_building2.jpg",
        "Teachers_capacity_building3.jpg"
      ]
    },
    {
      key: "feeding",
      category: "nutrition",
      categoryLabel: "Nutrition",
      title: "School Feeding Program Completion",
      description: "Students and partners mark the completion of a school feeding program supporting learning and wellbeing.",
      files: [
        "school_feeding_program_completion1.jpg",
        "school_feeding_program_completion2.jpg",
        "school_feeding_program_completion3.jpg",
        "school_feeding_program_completion4.jpg"
      ]
    },
    {
      key: "unity-park",
      category: "education",
      categoryLabel: "Education",
      title: "Scholarship Participants at Unity Park",
      description: "Scholarship participants learn beyond the classroom during an educational exposure visit to Unity Park.",
      files: [
        "scholarship_participants_unity_park1.jpg",
        "scholarship_participants_unity_park2.jpg",
        "scholarship_participants_unity_park3.jpg",
        "scholarship_participants_unity_park4.jpg"
      ]
    },
    {
      key: "scholarship",
      category: "education",
      categoryLabel: "Education",
      title: "Scholarship Support",
      description: "Scholarship support helps promising students continue learning and pursue their goals with confidence.",
      files: ["scholarship.jpg"]
    },
    {
      key: "sanitary-pads",
      category: "dignity",
      categoryLabel: "Dignity",
      title: "Sanitary Pad Support for Girls",
      description: "Girls receive menstrual health supplies that protect dignity, confidence, and consistent school attendance.",
      files: [
        "Sanitary_pads_support_for_girls1.jpg",
        "Sanitary_pads_support_for_girls2.jpg"
      ]
    },
    {
      key: "primary-school",
      category: "education",
      categoryLabel: "Education",
      title: "Primary School Support",
      description: "Targeted support gives primary school students and educators better resources for everyday learning.",
      files: [
        "primary_school_support1.jpg",
        "primary_school_support2.jpg"
      ]
    },
    {
      key: "caterers",
      category: "livelihood",
      categoryLabel: "Livelihood",
      title: "Mothers and Caterers Support",
      description: "Mothers and school caterers receive practical support that strengthens livelihoods and dependable meal service.",
      files: [
        "Mother's_Caterer's_support1.jpg",
        "Mother's_Caterer's_support2.jpg"
      ]
    },
    {
      key: "aviation",
      category: "education",
      categoryLabel: "Education",
      title: "Merit Scholars Visit Ethiopian Aviation University",
      description: "Merit scholarship students explore future careers during an exposure visit to Ethiopian Aviation University.",
      files: [
        "Merit_scholarship_exposure_vist_to_Ethiopian_Avaition_University1.jpg",
        "Merit_scholarship_exposure_vist_to_Ethiopian_Avaition_University2.jpg",
        "Merit_scholarship_exposure_vist_to_Ethiopian_Avaition_University3.jpg",
        "Merit_scholarship_exposure_vist_to_Ethiopian_Avaition_University4.jpg",
        "Merit_scholarship_exposure_vist_to_Ethiopian_Avaition_University5.jpg"
      ]
    },
    {
      key: "meal-sharing",
      category: "nutrition",
      categoryLabel: "Nutrition",
      title: "Meal Sharing",
      description: "Children and community members share nutritious meals in a welcoming and caring environment.",
      files: [
        "Meal_sharing1.jpg",
        "Meal_sharing2.jpg",
        "Meal_sharing3.jpg",
        "Meal_sharing4.jpg",
        "Meal_sharing5.jpg",
        "Meal_sharing6.jpg"
      ]
    },
    {
      key: "health-education",
      category: "health",
      categoryLabel: "Health",
      title: "Health Education Sessions",
      description: "Community health education sessions share practical knowledge for safer and healthier daily lives.",
      files: [
        "Health_education_sessions1.jpg",
        "Health_education_sessions2.jpg",
        "Health_education_sessions3.jpg",
        "Health_education_sessions4.jpg"
      ]
    },
    {
      key: "green-legacy",
      category: "environment",
      categoryLabel: "Environment",
      title: "Green Legacy",
      description: "Community members contribute to a greener future through tree planting and environmental action.",
      files: ["green_legacy.jpg"]
    },
    {
      key: "book-donation",
      category: "education",
      categoryLabel: "Education",
      title: "Book Donation to Abrehot Library",
      description: "A book donation expands access to reading and learning resources at Abrehot Library.",
      files: ["Book_Donation_books_for_Abrehot_Library1.jpg"]
    }
  ];

  const items = groups.flatMap((group) =>
    group.files.map((file, index) => ({
      id: `${group.key}-${index + 1}`,
      src: `img/gallery/${file}`,
      category: group.category,
      categoryLabel: group.categoryLabel,
      title: group.title,
      description: group.description,
      position: index + 1,
      total: group.files.length
    }))
  );

  const createCard = (item, className) => {
    const article = document.createElement("article");
    article.className = className;
    article.dataset.category = item.category;
    article.dataset.galleryId = item.id;
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Open ${item.title} image ${item.position} of ${item.total}`);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = `${item.title}, image ${item.position} of ${item.total}`;
    image.loading = "lazy";
    image.decoding = "async";

    const caption = document.createElement("div");
    caption.className = "program-gallery-caption";
    caption.innerHTML = `
      <span>${item.categoryLabel}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;

    article.append(image, caption);
    return article;
  };

  const renderHomeGallery = () => {
    const host = document.getElementById("homeGalleryGrid");
    if (!host) return;

    const featuredIds = [
      "teachers-1",
      "feeding-1",
      "aviation-1",
      "health-education-1",
      "sanitary-pads-1",
      "green-legacy-1"
    ];

    const featuredItems = featuredIds
      .map((id) => items.find((item) => item.id === id))
      .filter(Boolean);

    const createStrip = (isDuplicate) => {
      const strip = document.createElement("div");
      strip.className = "home-gallery-strip";

      if (isDuplicate) {
        strip.setAttribute("aria-hidden", "true");
      }

      featuredItems.forEach((item, index) => {
        const card = createCard(item, "home-gallery-card");
        card.style.setProperty("--gallery-card-index", index);

        if (isDuplicate) {
          card.tabIndex = -1;
          card.setAttribute("role", "presentation");
          card.removeAttribute("aria-label");
        }

        card.addEventListener("click", () => {
          window.location.href = `gallery.html#${item.id}`;
        });

        if (!isDuplicate) {
          card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              card.click();
            }
          });
        }

        strip.appendChild(card);
      });

      return strip;
    };

    host.append(createStrip(false), createStrip(true));

    const viewport = host.closest(".home-gallery-viewport");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (viewport && !reduceMotion.matches) {
      const updateDepth = (event) => {
        const bounds = viewport.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        viewport.style.setProperty("--gallery-pointer-x", `${(x * 3.5).toFixed(2)}deg`);
        viewport.style.setProperty("--gallery-pointer-y", `${(y * -2.5).toFixed(2)}deg`);
      };

      const resetDepth = () => {
        viewport.style.setProperty("--gallery-pointer-x", "0deg");
        viewport.style.setProperty("--gallery-pointer-y", "0deg");
      };

      viewport.addEventListener("pointermove", updateDepth);
      viewport.addEventListener("pointerleave", resetDepth);
    }
  };

  const renderArchive = () => {
    const host = document.getElementById("programGalleryGrid");
    if (!host) return;

    const buttons = Array.from(document.querySelectorAll("[data-gallery-filter]"));
    const lightbox = document.getElementById("programGalleryLightbox");
    const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
    const lightboxCategory = lightbox ? lightbox.querySelector("[data-lightbox-category]") : null;
    const lightboxTitle = lightbox ? lightbox.querySelector("[data-lightbox-title]") : null;
    const lightboxDescription = lightbox ? lightbox.querySelector("[data-lightbox-description]") : null;
    const lightboxCount = lightbox ? lightbox.querySelector("[data-lightbox-count]") : null;
    let visibleItems = items.slice();
    let activeIndex = 0;
    let lastTrigger = null;

    const openLightbox = (item, trigger) => {
      if (!lightbox || !lightboxImage) return;
      activeIndex = visibleItems.findIndex((visibleItem) => visibleItem.id === item.id);
      if (activeIndex < 0) activeIndex = 0;
      lastTrigger = trigger;
      lightboxImage.src = item.src;
      lightboxImage.alt = `${item.title}, image ${item.position} of ${item.total}`;
      lightboxCategory.textContent = item.categoryLabel;
      lightboxTitle.textContent = item.title;
      lightboxDescription.textContent = item.description;
      lightboxCount.textContent = `${activeIndex + 1} / ${visibleItems.length}`;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("gallery-modal-open");
      lightbox.querySelector(".program-lightbox-close").focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("gallery-modal-open");
      if (lastTrigger) lastTrigger.focus();
    };

    const moveLightbox = (direction) => {
      if (!visibleItems.length) return;
      activeIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length;
      openLightbox(visibleItems[activeIndex], lastTrigger);
    };

    items.forEach((item, index) => {
      const card = createCard(
        item,
        `program-gallery-card${index % 9 === 0 ? " program-gallery-card-wide" : ""}`
      );
      const activate = () => openLightbox(item, card);
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
      host.appendChild(card);
    });

    const filterGallery = (category) => {
      visibleItems = category === "all"
        ? items.slice()
        : items.filter((item) => item.category === category);

      host.querySelectorAll(".program-gallery-card").forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });

      buttons.forEach((button) => {
        const active = button.dataset.galleryFilter === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      const count = document.querySelector("[data-gallery-result-count]");
      if (count) count.textContent = `${visibleItems.length} photos`;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => filterGallery(button.dataset.galleryFilter));
    });

    if (lightbox) {
      lightbox.querySelector(".program-lightbox-close").addEventListener("click", closeLightbox);
      lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => moveLightbox(-1));
      lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => moveLightbox(1));
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") moveLightbox(-1);
        if (event.key === "ArrowRight") moveLightbox(1);
      });
    }

    filterGallery("all");

    const hashId = window.location.hash.slice(1);
    const hashItem = items.find((item) => item.id === hashId);
    if (hashItem) {
      const trigger = host.querySelector(`[data-gallery-id="${hashId}"]`);
      window.setTimeout(() => openLightbox(hashItem, trigger), 250);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderHomeGallery();
    renderArchive();
  });
})();
