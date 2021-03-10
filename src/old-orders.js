const oldOrdersTable = document.getElementById('old-orders-table');
const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');

function switchOldOrders(e) {
  const orders = JSON.parse(localStorage.getItem('myOrders')).reverse();
  if (oldOrdersTable.hasChildNodes()) {
    oldOrdersTable.removeChild(oldOrdersTable.firstChild);
  }
  if (e.matches) {
    setOrdersContainer(orders);
  } else {
    setOrdersTable(orders);
  }
}

window.onload = () => {
  if (
    !localStorage.getItem('myOrders') ||
    JSON.parse(localStorage.getItem('myOrders')).length <= 0
  ) {
    oldOrdersTable.appendChild(setEmptyOrders());
  } else {
    //Check if device is 768px max width to change set Table or Container
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addListener(switchOldOrders);

    // Run it initially
    switchOldOrders(mediaQuery);
  }
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
};

//Set ordersTable if orders include products
const setOrdersTable = (datas) => {
  oldOrdersTable.appendChild(ordersTable(datas));
};

//Create orders table of products
const ordersTable = (datas) => {
  const table = document.createElement('table');
  table.classList = 'orders__table';

  const tableRow = document.createElement('tr');
  const tableMenu1 = document.createElement('th');
  const tableMenu2 = document.createElement('th');
  const tableMenu3 = document.createElement('th');
  const tableMenu4 = document.createElement('th');
  const tableMenu5 = document.createElement('th');

  tableMenu1.textContent = 'Nom et Prénom';
  tableMenu2.textContent = 'Adresse de livraison';
  tableMenu3.textContent = 'Numéro de commande';
  tableMenu4.textContent = 'Date';
  tableMenu5.textContent = ' ';

  tableRow.appendChild(tableMenu1);
  tableRow.appendChild(tableMenu2);
  tableRow.appendChild(tableMenu3);
  tableRow.appendChild(tableMenu4);
  tableRow.appendChild(tableMenu5);

  table.appendChild(tableRow);

  for (const data of datas) {
    table.appendChild(ordersRows(data));
    for (const product of data.products) {
      table.appendChild(ordersDetails(product, data.orderId));
    }
  }

  return table;
};

//Create orders details
//Set every column of table
const ordersRows = (data) => {
  const tableRow = document.createElement('tr');
  tableRow.classList = 'main-rows';

  const tableDescr1 = document.createElement('td');
  const tableDescr2 = document.createElement('td');
  const tableDescr3 = document.createElement('td');
  const tableDescr4 = document.createElement('td');
  const tableDescr5 = document.createElement('td');
  const divBtn = document.createElement('div');
  divBtn.classList = 'toggle-btn';
  divBtn.id = `btn-${data.orderId}`;
  const spanBtn = document.createElement('span');
  spanBtn.classList = 'fas fa-chevron-down';
  divBtn.appendChild(spanBtn);

  divBtn.addEventListener('click', () => {
    const detailsRows = document.getElementsByClassName(`${data.orderId}`);
    document.getElementById(`btn-${data.orderId}`).classList.toggle('rotate');
    for (let i = 0; i < detailsRows.length; i++) {
      detailsRows[i].classList.toggle('show');
    }
  });

  tableDescr1.textContent = `${data.contact.firstName} ${data.contact.lastName}`;
  tableDescr2.textContent = `${data.contact.address} - ${data.contact.city}`;
  tableDescr3.textContent = `${data.orderId}`;
  tableDescr4.textContent = `${data.date}`;
  tableDescr5.appendChild(divBtn);

  tableRow.appendChild(tableDescr1);
  tableRow.appendChild(tableDescr2);
  tableRow.appendChild(tableDescr3);
  tableRow.appendChild(tableDescr4);
  tableRow.appendChild(tableDescr5);

  return tableRow;
};

const ordersDetails = (product, orderId) => {
  const tableRow = document.createElement('tr');
  tableRow.classList = `details-row ${orderId}`;
  tableRow.id = `${orderId}`;

  const tableDescr1 = document.createElement('td');
  const tableDescr2 = document.createElement('td');
  const tableDescr3 = document.createElement('td');
  const tableDescr4 = document.createElement('td');
  const tableDescr5 = document.createElement('td');

  const img = document.createElement('img');
  img.classList = 'details-row__img';
  img.src = `${product.imageUrl}`;
  img.alt = `Image de l'ourson ${product.name}`;

  const link = document.createElement('a');
  link.href = `./product.html?id=${product._id}`;
  link.textContent = `${product.name}`;

  tableDescr1.appendChild(img);
  tableDescr2.appendChild(link);
  tableDescr3.textContent = `${product.price / 100},00€`;
  tableDescr4.textContent = ' ';
  tableDescr5.textContent = ' ';

  tableRow.appendChild(tableDescr1);
  tableRow.appendChild(tableDescr2);
  tableRow.appendChild(tableDescr3);
  tableRow.appendChild(tableDescr4);
  tableRow.appendChild(tableDescr5);

  return tableRow;
};

const setEmptyOrders = () => {
  const div = document.createElement('div');
  div.classList = 'basket__empty';

  const span = document.createElement('span');
  span.textContent = "Vous n'avez effecté aucune commande pour le moment...";

  const button = document.createElement('a');
  button.classList = 'basket__empty--btn';
  button.textContent = 'Découvrez nos peluches';
  button.href = './products.html';

  div.appendChild(span);
  div.appendChild(button);

  return div;
};

//___----____----_____-----______------_____----___

//Set ordersTable if orders include products
const setOrdersContainer = (datas) => {
  oldOrdersTable.appendChild(ordersContainer(datas));
};

//Create orders table of products
const ordersContainer = (datas) => {
  const divContainer = document.createElement('div');
  divContainer.classList = 'orders';

  const span = document.createElement('span');
  span.textContent = 'Vos commandes';
  divContainer.appendChild(span);

  for (const data of datas) {
    const orderContainer = document.createElement('div');
    orderContainer.classList = 'order-container';

    const orderDetailsContainer = document.createElement('div');
    orderDetailsContainer.classList = 'order-details-container';
    orderDetailsContainer.id = `${data.orderId}`;

    const divBtn = document.createElement('div');
    divBtn.classList = 'toggle-btn';
    divBtn.id = `btn-${data.orderId}`;
    const spanBtn = document.createElement('span');
    spanBtn.classList = 'fas fa-chevron-down';
    divBtn.appendChild(spanBtn);

    divBtn.addEventListener('click', () => {
      const detailsRow = document.getElementById(`${data.orderId}`);
      document.getElementById(`btn-${data.orderId}`).classList.toggle('rotate');
      detailsRow.classList.toggle('show');
    });

    orderContainer.appendChild(ordersRow(data));
    orderContainer.appendChild(divBtn);

    divContainer.appendChild(orderContainer);
    for (const product of data.products) {
      orderDetailsContainer.appendChild(orderDetails(product, data.orderId));
    }
    divContainer.appendChild(orderDetailsContainer);
  }

  return divContainer;
};

//Create orders details
//Set every column of table
const ordersRow = (data) => {
  const div = document.createElement('div');
  div.classList = 'order-container__descr';

  const divOrder = document.createElement('div');
  divOrder.classList = 'order-container__nbr';
  divOrder.textContent = `Commande n°${data.orderId}`;

  const divDetails = document.createElement('div');
  divDetails.classList = 'order-container__details';
  const divArticle = document.createElement('div');
  divArticle.classList = 'order-container__details--article';
  const divPrice = document.createElement('div');
  divPrice.classList = 'order-container__details--price';
  const divDate = document.createElement('div');
  divDate.classList = 'order-container__details--date';
  const divSeparation1 = document.createElement('div');
  divSeparation1.classList = 'order-container__details--separation';
  const divSeparation2 = document.createElement('div');
  divSeparation2.classList = 'order-container__details--separation';

  divArticle.textContent = `${data.products.length} ${
    data.products.length > 1 ? 'articles' : 'article'
  }`;

  let totalPrice = 0;

  for (const product of data.products) {
    totalPrice += product.price / 100;
  }
  divPrice.textContent = `${totalPrice},00 €`;

  divDate.textContent = `${data.date}`;

  divDetails.appendChild(divArticle);
  divDetails.appendChild(divSeparation1);
  divDetails.appendChild(divPrice);
  divDetails.appendChild(divSeparation2);
  divDetails.appendChild(divDate);

  div.appendChild(divOrder);
  div.appendChild(divDetails);

  return div;
};

const orderDetails = (product, orderId) => {
  const divDetailsContainer = document.createElement('div');
  divDetailsContainer.classList = `details-container ${orderId}`;

  const divImg = document.createElement('div');
  const divName = document.createElement('div');
  const divPrice = document.createElement('div');

  const img = document.createElement('img');
  img.classList = 'details-container__img';
  img.src = `${product.imageUrl}`;
  img.alt = `Image de l'ourson ${product.name}`;

  const link = document.createElement('a');
  link.href = `./product.html?id=${product._id}`;
  link.textContent = `${product.name}`;

  divImg.appendChild(img);
  divName.appendChild(link);
  divPrice.textContent = `${product.price / 100},00€`;

  divDetailsContainer.appendChild(divImg);
  divDetailsContainer.appendChild(divName);
  divDetailsContainer.appendChild(divPrice);

  return divDetailsContainer;
};
