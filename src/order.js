const orderContainer = document.getElementById('order-container');
const orderId = window.location.search.slice(4);
const basketIndicator = document.getElementById('basket-indicator');
const basketPrice = document.getElementById('basket-price');

window.onload = () => {
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
  setOrder();
};

const setOrder = () => {
  const div = document.createElement('div');
  div.classList = 'order__title';
  div.textContent = `Merci ${
    JSON.parse(localStorage.getItem('contact')).firstName
  } !`;

  const divDescr = document.createElement('div');
  divDescr.classList = 'order__descr';
  divDescr.textContent = `Numéro de commande : ${orderId}`;

  const divButton = document.createElement('div');
  divButton.classList = 'order__buttons';

  const buttonReturn = document.createElement('a');
  buttonReturn.textContent = "Retourner à l'acceuil";
  buttonReturn.classList = 'order__btn';
  buttonReturn.href = '../../index.html';

  const buttonOrders = document.createElement('a');
  buttonOrders.textContent = 'Voir votre commande';
  buttonOrders.classList = 'order__btn';
  buttonOrders.href = './old-orders.html';

  divButton.appendChild(buttonReturn);
  divButton.appendChild(buttonOrders);

  orderContainer.appendChild(div);
  orderContainer.appendChild(divDescr);
  orderContainer.appendChild(divButton);
};
