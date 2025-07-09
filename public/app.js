// Cart logic with item removal feature

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.name} - ${item.price}৳</span>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemElement);
  });

  updateTotal();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  document.getElementById('total').innerText = `Total: ${total}৳`;
}

// Call on load
document.addEventListener('DOMContentLoaded', renderCart);
