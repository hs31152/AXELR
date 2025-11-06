// ===== Mobile nav toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== Sticky navbar shrink =====
const navbar = document.getElementById('navbar');
const onScrollNavbar = () => { if (!navbar) return; window.scrollY > 10 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'); };
window.addEventListener('scroll', onScrollNavbar); onScrollNavbar();

// ===== Reveal on scroll (IntersectionObserver) =====
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
},{ threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Parallax (GSAP) if available =====
if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray('[data-parallax]').forEach(el=>{
    gsap.to(el, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el, scrub: true }});
  });
}

// ===== Scroll progress bar =====
const sp = document.querySelector('.scroll-progress span');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
  if (sp) sp.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
}
window.addEventListener('scroll', updateProgress); updateProgress();

// ===== Filters (Collections) =====
const pills = document.querySelectorAll('.filter-btn');
const grid = document.getElementById('productGrid');
if (pills.length && grid) {
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      pills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(c => { c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none'; });
      window.scrollTo({ top: grid.offsetTop - 90, behavior: 'smooth' });
    });
  });
}

// ===== Quick View Modal (cards with data-*) =====
const modal = document.getElementById('quickView');
if (modal) {
  const qvImg = document.getElementById('qvImg');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');

  function openModal({image, title, price}){
    qvImg.src = image; qvTitle.textContent = title; qvPrice.textContent = price;
    modal.setAttribute('aria-hidden','false'); modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modal.addEventListener('click', (e)=>{ if (e.target.matches('[data-close], .modal-backdrop')) closeModal(); });

  // Turn any .card or .product-card into quick view on middle-click/long-press
  document.querySelectorAll('.card, .product-card').forEach(el=>{
    el.addEventListener('contextmenu', e=>e.preventDefault());
    el.addEventListener('mousedown', e=>{
      if (e.button === 1) {
        e.preventDefault();
        openModal({
          image: el.dataset.image || el.querySelector('img')?.src,
          title: el.dataset.title || el.querySelector('h4')?.textContent || 'AXELR',
          price: el.dataset.price || el.querySelector('.price')?.textContent || ''
        });
      }
    });
    // Also open on double click
    el.addEventListener('dblclick', ()=>{
      openModal({
        image: el.dataset.image || el.querySelector('img')?.src,
        title: el.dataset.title || el.querySelector('h4')?.textContent || 'AXELR',
        price: el.dataset.price || el.querySelector('.price')?.textContent || ''
      });
    });
  });
}

// ===== Page transitions (fade slide) =====
const transitionLayer = document.querySelector('.page-transition');
function go(url){
  if (!transitionLayer) { location.href = url; return; }
  transitionLayer.style.transform = 'scaleY(1)';
  setTimeout(()=>location.href = url, 350);
}
document.querySelectorAll('a[data-transition]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || a.target === '_blank') return;
    e.preventDefault(); go(href);
  });
});
window.addEventListener('pageshow', ()=>{ if (transitionLayer) transitionLayer.style.transform = 'scaleY(0)'; });

// ===== Theme toggle (dark/light) =====
const themeToggle = document.getElementById('themeToggle');
function setTheme(mode){ document.body.classList.toggle('dark', mode==='dark'); localStorage.setItem('axelr-theme', mode); if (themeToggle) themeToggle.innerHTML = mode==='dark' ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>'; }
const saved = localStorage.getItem('axelr-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);
if (themeToggle) themeToggle.addEventListener('click', ()=> setTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));

// ===== Magnetic buttons (subtle) =====
document.querySelectorAll('.magnet').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', ()=> btn.style.transform = 'translate(0,0)');
});
