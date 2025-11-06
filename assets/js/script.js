// Sticky navbar + shrink
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
});

// Scroll progress
const bar = document.querySelector('.scroll-progress span');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${(sc / h) * 100}%`;
});

// Page transition (links with data-transition)
document.querySelectorAll('[data-transition]').forEach(link => {
  link.addEventListener('click', e => {
    // allow normal anchor within same page sections
    if (link.getAttribute('href')?.startsWith('#')) return;
    e.preventDefault();
    const to = link.getAttribute('href');
    const layer = document.querySelector('.page-transition');
    layer.style.transform = 'scaleY(1)';
    setTimeout(() => (window.location.href = to), 300);
  });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .product-card');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
reveals.forEach(el => io.observe(el));

// Collections filters
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.product-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

// Quick View / Gallery (collections)
const galleryModal = document.getElementById('galleryModal');
const galleryMain = document.getElementById('galleryMain');
const thumbsWrap = document.getElementById('galleryThumbs');
const closeGallery = document.getElementById('closeGallery');

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const imgs = card.dataset.images ? JSON.parse(card.dataset.images) : [card.querySelector('img').src];
    galleryMain.src = imgs[0];
    thumbsWrap.innerHTML = imgs.map(i => `<img src="${i}" alt="thumb">`).join('');
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    thumbsWrap.querySelectorAll('img').forEach(t => t.addEventListener('click', () => galleryMain.src = t.src));
  });
});

if (closeGallery) closeGallery.addEventListener('click', () => {
  galleryModal.classList.remove('open');
  document.body.style.overflow = '';
});
