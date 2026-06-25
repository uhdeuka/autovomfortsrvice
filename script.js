const revealTargets = document.querySelectorAll('.reveal, .section-intro, .info-card, .service-card, .dealer-copy, .gallery-copy, .process-list article, .detail-card, .route-grid .placeholder-route');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
revealTargets.forEach((el, index) => {
  if (!el.style.getPropertyValue('--delay')) el.style.setProperty('--delay', `${Math.min(index % 4, 3) * 80}ms`);
  observer.observe(el);
});

const header = document.querySelector('.site-header');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.transform = y > 80 && y > lastY && !header.classList.contains('menu-open') ? 'translateY(-86px)' : 'translateY(0)';
  lastY = y;
}, { passive: true });


const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    header.style.transform = 'translateY(0)';
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
