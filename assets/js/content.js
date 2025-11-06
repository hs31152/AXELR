async function loadContent() {
  const res = await fetch("/api/content");
  const data = await res.json();

  // Topbar + WhatsApp
  document.querySelector(".topbar").innerHTML = `
    ${data.topbarText}
    <a href="https://wa.me/${data.whatsapp.replace('+', '')}" target="_blank">${data.whatsapp}</a>
  `;

  // Brand name
  document.querySelectorAll(".logo").forEach(el => el.textContent = data.brand);

  // About Page auto-fill
  if (document.querySelector(".about-main")) {
    const about = data.about;
    document.querySelector(".about-text h2").textContent = about.headline;
    const paragraphs = about.paragraphs.map(p => `<p>${p}</p>`).join("");
    document.querySelector(".about-text .about-details").innerHTML = paragraphs;

    const valuesHTML = about.values.map(v => `
      <div class="value-card">
        <i class="${v.icon}"></i>
        <h4>${v.title}</h4>
        <p>${v.text}</p>
      </div>
    `).join("");
    document.querySelector(".values-grid").innerHTML = valuesHTML;
  }

  // Collections Page
  if (document.querySelector(".product-grid")) {
    let html = "";
    data.collections.forEach(col => {
      col.products.forEach(prod => {
        html += `
          <div class="product-card">
            <img src="${prod.image}" alt="${prod.title}">
            <div class="pc-info">
              <h4>${prod.title}</h4>
              <p class="price">${prod.price}</p>
            </div>
          </div>`;
      });
    });
    document.querySelector(".product-grid").innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
