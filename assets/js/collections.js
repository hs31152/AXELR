// --- FILTERING ---
const chips = document.querySelectorAll('.filter-chip');
const cards = document.querySelectorAll('.product-card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const f = chip.getAttribute('data-filter');
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const show = (f === 'all') || (cat === f);
      card.style.display = show ? '' : 'none';
    });
    window.scrollTo({ top: document.querySelector('.filters-wrap').offsetTop - 40, behavior: 'smooth' });
  });
});

// --- QUICK VIEW ---
const modal = document.getElementById('quickView');
const qvImg = document.getElementById('qvImg');
const qvTitle = document.getElementById('qvTitle');
const qvPrice = document.getElementById('qvPrice');

cards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    qvImg.src = card.dataset.image;
    qvTitle.textContent = card.dataset.title;
    qvPrice.textContent = card.dataset.price;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.hasAttribute('data-close') || e.target.closest('[data-close]')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

// --- tiny navbar mobile (optional) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// --- top scroll progress (works if defined globally) ---
const bar = document.querySelector('.scroll-progress span');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${(sc / h) * 100}%`;
});
