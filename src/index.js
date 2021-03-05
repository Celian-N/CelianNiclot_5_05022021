const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');

window.onload = () => {
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
};
