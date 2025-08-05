document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("products.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const products = results.data;
      const grid = document.getElementById("productGrid");
      products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.price} د.ت</p>
          <input type="number" min="1" value="1" id="qty-${index}" />
          <button onclick="addToCart('${product.name}', ${product.price}, 'images/${product.image}', 'qty-${index}')">أضف إلى السلة</button>
        `;
        grid.appendChild(card);
      });
    }
  });
});

function addToCart(name, price, image, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, image, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة");
}