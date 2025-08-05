document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>السلة فارغة</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>الصورة</th>
      <th>المنتج</th>
      <th>السعر</th>
      <th>الكمية</th>
      <th>الإجمالي</th>
      <th>حذف</th>
    </tr>
  `;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;" /></td>
      <td>${item.name}</td>
      <td>${item.price} د.ت</td>
      <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${i}, this.value)" /></td>
      <td>${itemTotal} د.ت</td>
      <td><button onclick="removeItem(${i})">🗑️</button></td>
    `;
    table.appendChild(row);
  });

  container.appendChild(table);

  const totalDiv = document.createElement("div");
  totalDiv.className = "total";
  totalDiv.innerHTML = `المجموع الكلي: ${total} د.ت`;
  container.appendChild(totalDiv);
});

function updateQty(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty = parseInt(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productList = cart.map(item => `${item.name} x${item.qty} = ${item.price * item.qty} د.ت`).join("\n");
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const formURL = `https://docs.google.com/forms/d/e/1FAIpQLSdxVtdc4dagivge64WOX2uncJUZGSEYTu7Zz1xahO4Z6CEjUA/formResponse?entry.1067681632=${encodeURIComponent(name)}&entry.1473694202=${encodeURIComponent(phone)}&entry.1133191766=${encodeURIComponent(address)}&entry.1116637128=${encodeURIComponent(productList)}&entry.884411459=${total}`;

  fetch(formURL, { method: "POST", mode: "no-cors" });
  localStorage.removeItem("cart");
  window.location.href = "menu.html";
}
