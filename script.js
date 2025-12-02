document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // collapse navbar on mobile after click (if open)
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });

  // Highlight section on scroll (updates nav link active state)
  const sections = Array.from(document.querySelectorAll('section, header'));
  const navLinks = Array.from(document.querySelectorAll('.navbar .nav-link, nav ul li a'));

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = '';
    for (const sec of sections) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.id || '';
        break;
      }
    }
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentId && currentId !== '') link.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Theme toggle (night mode)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '🌞';
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.classList.remove('btn-outline-light');
        themeToggle.classList.add('btn-outline-warning');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.classList.remove('btn-outline-warning');
        themeToggle.classList.add('btn-outline-light');
      }
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  // Load saved theme
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') applyTheme('dark'); else applyTheme('light');
  } catch (e) { applyTheme('light'); }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

});