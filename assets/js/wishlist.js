document.addEventListener("DOMContentLoaded", () => {
  const wishlistCount = document.getElementById("wishlistCount");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Update badge count
  function updateWishlistCount() {
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
  }

  // Toggle wishlist
  function toggleWishlist(item, button) {
    const exists = wishlist.find(p => p.name === item.name);
    if (exists) {
      wishlist = wishlist.filter(p => p.name !== item.name);
      button.innerHTML = '<i class="ri-heart-line"></i>';
      button.classList.remove("active");
    } else {
      wishlist.push(item);
      button.innerHTML = '<i class="ri-heart-fill"></i>';
      button.classList.add("active");
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
  }

  // Add event for all "add-to-wishlist" buttons
  document.querySelectorAll(".add-to-wishlist").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = e.target.closest("[data-product]");
      const item = {
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img
      };
      toggleWishlist(item, btn);
    });
  });

  // Wishlist Page rendering
  const wishlistContainer = document.getElementById("wishlistContainer");
  const emptyWishlist = document.getElementById("emptyWishlist");
  const moveAllToCart = document.getElementById("moveAllToCart");

  if (wishlistContainer) {
    function renderWishlist() {
      wishlistContainer.innerHTML = "";
      updateWishlistCount();

      if (wishlist.length === 0) {
        emptyWishlist.style.display = "block";
        wishlistContainer.style.display = "none";
        moveAllToCart.style.display = "none";
        return;
      }

      emptyWishlist.style.display = "none";
      wishlistContainer.style.display = "grid";
      moveAllToCart.style.display = "inline-block";

      wishlist.forEach((item, i) => {
        const card = document.createElement("div");
        card.className = "wishlist-card";
        card.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="wishlist-info">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <div class="wishlist-actions">
              <button class="btn add-to-cart" data-index="${i}">
                <i class="ri-shopping-bag-line"></i> Add to Cart
              </button>
              <button class="btn-outline remove-item" data-index="${i}">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>`;
        wishlistContainer.appendChild(card);
      });
    }

    wishlistContainer.addEventListener("click", e => {
      if (e.target.closest(".remove-item")) {
        const index = e.target.closest(".remove-item").dataset.index;
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
      }

      if (e.target.closest(".add-to-cart")) {
        const index = e.target.closest(".add-to-cart").dataset.index;
        const item = wishlist[index];
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
      }
    });

    moveAllToCart?.addEventListener("click", () => {
      if (wishlist.length > 0) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify([...cart, ...wishlist]));
        wishlist = [];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
        alert("All wishlist items moved to cart!");
      }
    });

    renderWishlist();
  }

  updateWishlistCount();
});
