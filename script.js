// Smooth scroll for navigation links
document.querySelectorAll("nav ul li a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Highlight section on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section, header");
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll("nav ul li a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sec.id) {
          link.classList.add("active");
        }
      });
    }
  });
});