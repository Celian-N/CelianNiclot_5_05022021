const orderContainer = document.getElementById('order-container');
const orderId = window.location.href.toString().slice(46); //A REVOIR;
const basketIndicator = document.getElementById('basket-indicator');
orderContainer.textContent = `Merci ${
  JSON.parse(localStorage.getItem('contact')).firstName
} ! Numéro de commande : ${orderId}`;
