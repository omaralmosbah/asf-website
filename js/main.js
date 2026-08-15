const html = document.documentElement;
const languageToggle = document.querySelector('#languageToggle');
const navToggle = document.querySelector('#navToggle');
const siteNav = document.querySelector('#siteNav');

function setLanguage(language) {
  const arabic = language === 'ar';
  html.lang = language;
  html.dir = arabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('is-arabic', arabic);
  document.querySelectorAll('[data-en][data-ar]').forEach((node) => {
    node.textContent = node.dataset[language];
  });
  languageToggle.textContent = arabic ? 'English' : 'العربية';
  languageToggle.setAttribute('aria-label', arabic ? 'Switch to English' : 'التبديل إلى العربية');
  localStorage.setItem('asf-language', language);
}

languageToggle.addEventListener('click', () => setLanguage(html.lang === 'ar' ? 'en' : 'ar'));
navToggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
siteNav.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.product-card, .service-grid article, .process-list li').forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

document.querySelectorAll('.product-card[href*="?id="]').forEach((card) => {
  const productId = new URL(card.href).searchParams.get('id');
  if (productId) card.href = `product.html#${productId}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem('asf-language') === 'ar' ? 'ar' : 'en');
