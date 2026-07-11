document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body) return;

  const headerHost = document.getElementById("site-header");
  const footerHost = document.getElementById("site-footer");

  const headerFallbackMarkup = `
    <header class="site-shell_header">
      <div class="header-area">
        <div class="header-top_area">
          <div class="container-fluid">
            <div class="site-topbar_inner">
              <div class="short_contact_list">
                <ul>
                  <li><a href="tel:+251902200020"><i class="fa fa-phone"></i> +251 902 200 020</a></li>
                  <li><a href="mailto:mahletworku@enehofiker.org"><i class="fa fa-envelope"></i> mahletworku@enehofiker.org</a></li>
                </ul>
              </div>
              <div class="social_media_links d-none d-lg-flex">
                <a href="https://www.facebook.com/profile.php?id=61583776258199" aria-label="Facebook"><i class="ti-facebook"></i></a>
                <a href="https://www.instagram.com/eneho_fikir?igsh=N2lhZng4NGwybHVr" aria-label="Instagram"><i class="ti-instagram"></i></a>
                <a href="https://www.linkedin.com/company/eneho-fiker/" aria-label="LinkedIn"><i class="ti-linkedin"></i></a>
                <a href="https://www.youtube.com/channel/UCWWUkwSKkab4SGOPQ10S5Lw" aria-label="YouTube"><i class="ti-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div id="sticky-header" class="main-header-area">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-3">
                <div class="brand-card">
                  <a href="index.html" class="brand-card_link">
                    <img src="img/logo.png" alt="Enehofikir Logo" class="brand-card_logo" />
                    <span class="brand-card_text">
                      <span class="brand-card_name">Eneho Fikir</span>
                      <span class="brand-card_tagline">Our Children Our Future</span>
                    </span>
                  </a>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9">
                <div class="main-menu">
                  <div class="site-nav_cluster">
                    <nav>
                      <ul id="navigation">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="project.html">Projects</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="news.html">News</a></li>
                        <li><a href="about_us.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                      </ul>
                    </nav>
                    <div class="Appointment">
                      <div class="book_btn d-none d-lg-block">
                        <a href="donation.html"><i class="fa fa-heart"></i> Make a Donation</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  function activateCurrentNav() {
    const currentPage =
      window.location.pathname.split("/").pop().toLowerCase() || "index.html";

    document.querySelectorAll("#navigation a[href]").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      const isActive = href === currentPage;

      link.classList.toggle("active", isActive);
      if (link.parentElement) {
        link.parentElement.classList.toggle("active", isActive);
      }
    });
  }

  function renderHeader(markup) {
    headerHost.outerHTML = markup;
    activateCurrentNav();
    document.dispatchEvent(new CustomEvent("siteHeaderLoaded"));
  }

  if (headerHost) {
    if (window.location.protocol === "file:") {
      renderHeader(headerFallbackMarkup);
    } else {
      fetch("partials/header.html?v=20260503")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Header request failed: ${response.status}`);
          }

          return response.text();
        })
        .then((markup) => {
          renderHeader(markup);
        })
        .catch((error) => {
          console.error("Unable to load shared header partial. Falling back to embedded header.", error);
          renderHeader(headerFallbackMarkup);
        });
    }
  }

  if (footerHost) {
    footerHost.outerHTML = `
      <footer class="footer site-shell_footer">
        <div class="footer_top full-width">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-md-6 col-lg-4 mb-4">
                <div class="footer_widget">
                  <a href="index.html" class="footer-logo-wrapper text-center">
                    <img src="img/logo.png" alt="Enehofikir Logo" class="footer-logo" />
                    <p class="logo-tagline">Our Children Our Future</p>
                  </a>
                  <p>
                    Enehofikir is a non-profit organization founded in 2019 G.C.
                    We transform the lives of vulnerable children, teachers,
                    young people, and women through education, healthcare,
                    livelihood support, and emergency aid programs.
                  </p>
                  <div class="socail_links mt-3">
                    <ul class="footer_social_list">
                      <li><a href="https://www.facebook.com/profile.php?id=61583776258199" class="social-circle"><i class="ti-facebook"></i></a></li>
                      <li><a href="https://www.instagram.com/eneho_fikir?igsh=N2lhZng4NGwybHVr" class="social-circle"><i class="ti-instagram"></i></a></li>
                      <li><a href="https://www.linkedin.com/company/eneho-fiker/" class="social-circle"><i class="ti-linkedin"></i></a></li>
                      <li><a href="https://www.youtube.com/channel/UCWWUkwSKkab4SGOPQ10S5Lw" class="social-circle"><i class="ti-youtube"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-md-6 col-lg-2 mb-4">
                <div class="footer_widget">
                  <h3 class="footer_title">Quick Links</h3>
                  <ul class="links">
                    <li><a href="project.html">Projects</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="about_us.html">About Us</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="donation.html">Donate</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-lg-3 mb-4">
                <div class="footer_widget">
                  <h3 class="footer_title">Contact Us</h3>
                  <div class="contacts">
                    <p>
                      <i class="fa fa-phone"></i> +251 902 200 020 <br />
                      <i class="fa fa-envelope"></i> mahletworku@enehofiker.org <br />
                      <i class="fa fa-map-marker"></i> Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-lg-3 mb-4">
                <div class="footer_widget">
                  <h3 class="footer_title">Our Impact</h3>
                  <ul class="news_links">
                    <li class="impact-item">
                      <div class="thumb">
                        <a href="project.html"><img src="img/news/1.jpg" alt="School feeding program" class="impact-thumb" /></a>
                      </div>
                      <div class="info">
                        <a href="project.html"><h4>School Feeding Program</h4></a>
                        <span>Supporting 300+ students yearly</span>
                      </div>
                    </li>
                    <li class="impact-item">
                      <div class="thumb">
                        <a href="project.html"><img src="img/news/2.jpg" alt="Medical campaigns" class="impact-thumb" /></a>
                      </div>
                      <div class="info">
                        <a href="project.html"><h4>Medical Campaigns</h4></a>
                        <span>5,000+ people reached</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-right_text full-width">
          <div class="container">
            <div class="row">
              <div class="bordered_1px"></div>
              <div class="col-xl-12">
                <p class="copy_right text-center">
                  &copy; ${new Date().getFullYear()} Enehofikir Organization | All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
});
