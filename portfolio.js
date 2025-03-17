document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
      });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const navbarHeight = document.querySelector("#navbar").offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
              window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
              });
          }
      });
  });

  // Navbar scroll effect
  const navbar = document.querySelector("#navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
          navbar.style.padding = "10px 0";
          navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
      } else {
          navbar.style.padding = "20px 0";
          navbar.style.boxShadow = "none";
      }
      lastScrollTop = scrollTop;
  });

  // Enhanced scroll animations for elements and text
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  const textElements = document.querySelectorAll(".text-anim");

  function checkScroll() {
      animateElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementTop < windowHeight - 100) {
              element.classList.add("show");
          }
      });

      textElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementTop < windowHeight - 50) {
              element.classList.add("show");
          }
      });
  }

  checkScroll();
  window.addEventListener("scroll", checkScroll);

  // Particle effect for hero section
  function createParticles() {
      const hero = document.getElementById("hero");
      const particles = document.createElement("div");
      particles.className = "particles";
      hero.appendChild(particles);

      for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.position = "absolute";
          particle.style.width = Math.random() * 3 + "px";
          particle.style.height = particle.style.width;
          particle.style.backgroundColor = "rgba(0, 245, 255, " + (Math.random() * 0.5 + 0.2) + ")";
          particle.style.borderRadius = "50%";
          particle.style.top = Math.random() * 100 + "%";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.boxShadow = "0 0 10px rgba(0, 245, 255, 0.8)";
          particle.style.animation = "float " + (Math.random() * 6 + 3) + "s ease-in-out infinite";
          particle.style.animationDelay = Math.random() * 5 + "s";
          particles.appendChild(particle);
      }
  }

  createParticles();

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".mini-project-card");

  // Initially show all cards
  projectCards.forEach(card => {
      card.style.display = "flex";
      setTimeout(() => card.classList.add("visible"), 10);
  });

  filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          const filter = button.getAttribute("data-filter");

          // First hide all cards
          projectCards.forEach((card) => {
              card.classList.remove("visible");
              card.style.pointerEvents = "none"; // Disable interaction during transition
          });

          // Show cards matching the filter after a delay
          setTimeout(() => {
              projectCards.forEach((card) => {
                  const techList = card.getAttribute("data-tech").split(" "); // Split tech into an array
                  if (filter === "all" || techList.includes(filter)) {
                      card.style.display = "flex";
                      setTimeout(() => {
                          card.classList.add("visible");
                          card.style.pointerEvents = "auto";
                      }, 10);
                  } else {
                      card.style.display = "none";
                  }
              });
          }, 500); // Delay matches the CSS transition duration
      });
  });
});