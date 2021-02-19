const orderContainer = document.getElementById('order-container');
const orderId = window.location.search.slice(4);
const basketIndicator = document.getElementById('basket-indicator');
orderContainer.textContent = `Merci ${
  JSON.parse(localStorage.getItem('contact')).firstName
} ! Numéro de commande : ${orderId}`;
