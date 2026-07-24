// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Manifest ticker content ----------
// Real hardware line items drawn from ASF shipment manifests — the
// texture here is deliberately literal: this is what actually ships.
const MANIFEST_ITEMS = [
  ['7626430', 'MICROS Workstation 820, 14" touch', '32'],
  ['7625253', 'MICROS Tablet 722P, 7" NFC', '48'],
  ['7602414', 'Epson TM-T88VI receipt printer', '56'],
  ['7605498', 'Bixolon SRP-275III impact printer', '26'],
  ['7118444', 'APG Vasario 1616 cash drawer', '32'],
  ['7601258', 'MICROS Express Station 410', '9'],
  ['7118826', 'Tablet 700 battery charger, 4-bay', '10'],
  ['7113368', 'Power cord, UK, C13, 10A', '101'],
  ['7601701', 'Li-polymer battery, Tablet 700', '48'],
  ['7117488', 'Carrying pouch, drop tether', '48'],
  ['SRV-TR00005', 'Delivery & customs clearance', '1'],
];

const manifestList = document.getElementById('manifestList');
if (manifestList) {
  const html = MANIFEST_ITEMS.map(([pn, name, qty]) =>
    `<li><span class="pn">${pn}</span><span>${name}</span><span class="qty">${qty}</span></li>`
  ).join('');
  manifestList.innerHTML = html;
  // duplicate into the sibling (aria-hidden) list to create a seamless loop
  const sibling = manifestList.parentElement.querySelector('ul[aria-hidden="true"]');
  if (sibling) sibling.innerHTML = html;
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.card, .process-steps li, .sector-list li, .about-grid > *');
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => io.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('reveal-in'));
}
