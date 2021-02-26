const tableContainer = document.getElementById('table-container');
const orderBtn = document.getElementById('order-btn');
const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');
const formContainer = document.getElementById('form-container');

const setFormContainer = (data) => {
  if (!data || JSON.parse(data).length <= 0) {
    return (formContainer.classList = 'display-none');
  }
  return (formContainer.classList = 'basket__form');
};

//Load basket when page is mounted to set basketTable or emptyBasket text
window.onload = () => {
  if (
    !localStorage.getItem('basketDetails') ||
    JSON.parse(localStorage.getItem('basketDetails')).length <= 0
  ) {
    tableContainer.appendChild(setEmptyBasket());
  } else {
    setBasketTable(JSON.parse(localStorage.getItem('basketDetails')));
  }
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
  setFormContainer(localStorage.getItem('basket'));
  getContactForm();
  if (JSON.parse(localStorage.getItem('contact'))) {
    setContactForm();
  }
};

//Function to set Empty basket container if basket is empty
const setEmptyBasket = () => {
  const div = document.createElement('div');
  div.classList = 'basket__empty';

  const span = document.createElement('span');
  span.textContent = "Vous n'avez aucun article dans votre panier...";

  const button = document.createElement('a');
  button.classList = 'basket__empty--btn';
  button.textContent = 'Découvrez nos peluches';
  button.href = './products.html';

  div.appendChild(span);
  div.appendChild(button);

  return div;
};

//Set basketTable if basket include products
const setBasketTable = (datas) => {
  tableContainer.appendChild(basketTable(datas));
};

//Function to reload basket table when a product is delete from basket
const reloadBasketTable = (datas) => {
  if (datas.length <= 0) {
    setFormContainer();
    return tableContainer.replaceChild(
      setEmptyBasket(),
      tableContainer.childNodes[0]
    );
  }
  tableContainer.replaceChild(basketTable(datas), tableContainer.childNodes[0]);
};

//Create basket table of products
const basketTable = (datas) => {
  const table = document.createElement('table');
  table.classList = 'basket__table';

  const tableRow = document.createElement('tr');
  const tableMenu1 = document.createElement('th');
  const tableMenu2 = document.createElement('th');
  const tableMenu3 = document.createElement('th');

  tableMenu1.textContent = 'Ourson';
  tableMenu2.textContent = 'Couleur';
  tableMenu3.textContent = 'Prix';

  tableRow.appendChild(tableMenu1);
  tableRow.appendChild(tableMenu2);
  tableRow.appendChild(tableMenu3);

  table.appendChild(tableRow);

  for (const data of datas) {
    table.appendChild(basketDetails(data));
  }

  return table;
};

//Create basket details and set event when deleteBtn is clicked
//Set every column of table
const basketDetails = (data) => {
  const tableRow = document.createElement('tr');

  const tableDescr1 = document.createElement('td');
  const tableDescr2 = document.createElement('td');
  const tableDescr3 = document.createElement('td');
  const tableDescr4 = document.createElement('td');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList = 'basket__product--delete';
  deleteBtn.textContent = 'X';
  deleteBtn.addEventListener('click', () => {
    const basketTable = JSON.parse(localStorage.getItem('basket'));
    const basketDetailsTable = JSON.parse(
      localStorage.getItem('basketDetails')
    );

    const dataIndex = basketDetailsTable.findIndex(
      (product) => product.id == data.id && product.color == data.color
    );

    basketTable.splice(dataIndex, 1);
    basketDetailsTable.splice(dataIndex, 1);

    localStorage.setItem('basket', JSON.stringify(basketTable));
    localStorage.setItem('basketDetails', JSON.stringify(basketDetailsTable));
    deleteProduct(data.price);
    setBasketPrice();
    setBasketIndicator(localStorage.getItem('basket'));

    reloadBasketTable(JSON.parse(localStorage.getItem('basketDetails')));
  });

  const img = document.createElement('img');
  const link = document.createElement('a');

  img.classList = 'basket__product--img';
  img.src = `${data.image}`;
  img.alt = `Image de l'ourson ${data.name}`;

  link.classList = 'basket__link';
  link.href = `./product.html?id=${data.id}`;
  link.textContent = `${data.name}`;

  tableDescr1.appendChild(img);
  tableDescr1.appendChild(link);
  tableDescr1.classList = 'basket__product';

  tableDescr2.textContent = `${data.color}`;
  tableDescr3.textContent = `${data.price},00 €`;

  tableDescr4.appendChild(deleteBtn);

  tableRow.appendChild(tableDescr1);
  tableRow.appendChild(tableDescr2);
  tableRow.appendChild(tableDescr3);
  tableRow.appendChild(tableDescr4);

  return tableRow;
};

orderBtn.addEventListener('click', () => {
  orderBasket();
});

//Function to deleteProduct price in basketPrice
const deleteProduct = (price) => {
  currentBasketPrice = JSON.parse(localStorage.getItem('basketPrice'));

  newBasketPrice = currentBasketPrice - price;

  localStorage.setItem('basketPrice', newBasketPrice);

  basketPrice.textContent = `${localStorage.getItem('basketPrice')},00 €`;
};

const requestContact = {};

const getContactForm = () => {
  lastNameInput = document.getElementById('lastname');
  firstNameInput = document.getElementById('firstname');
  addressInput = document.getElementById('address');
  cityInput = document.getElementById('city');
  emailInput = document.getElementById('mail');
};

const setContactForm = () => {
  const userContact = JSON.parse(localStorage.getItem('contact'));
  lastNameInput.value = userContact.lastName;
  firstNameInput.value = userContact.firstName;
  addressInput.value = userContact.address;
  cityInput.value = userContact.city;
  emailInput.value = userContact.email;
};

//set contact from form when order btn is clicked
const setRequestContact = () => {
  requestContact.lastName = lastNameInput.value;
  requestContact.firstName = firstNameInput.value;
  requestContact.address = addressInput.value;
  requestContact.city = cityInput.value;
  requestContact.email = emailInput.value;
};

//Set request object
const setRequest = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: requestContact,
      products: JSON.parse(localStorage.getItem('basket')),
    }),
  };
};
//Ajouter la verification du formulaire avant d'envoyer l'order à l'API

//function to lauchn order when orderBtn is clicked
const orderBasket = () => {
  setRequestContact();
  if (
    !requestContact.lastName ||
    !requestContact.firstName ||
    !requestContact.address ||
    !requestContact.city ||
    !requestContact.email ||
    !validateEmail(requestContact.email)
  ) {
    return alert('Veuillez remplir le formulaire pour effectuer la commande');
  }
  const request = setRequest();

  fetch('http://localhost:3000/api/teddies/order', request)
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      window.location.href = `order.html?id=${res.orderId}`;
      resetBasket();
      localStorage.setItem('contact', JSON.stringify(requestContact));
      localStorage.setItem('myOrders', JSON.stringify(res));
    })
    .catch(() => alert('Erreur :'));
};

//reset basket after ordering and set contact to localStorage to get it in order-page
const resetBasket = () => {
  localStorage.setItem('basket', []);
  localStorage.setItem('basketDetails', []);
  localStorage.setItem('basketPrice', 0);

  basketPrice.textContent = '0,00 €';
  tableContainer.removeChild(tableContainer.childNodes[0]);
};

//REGEX to validate email
const validateEmail = (inputMail) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputMail.match(mailformat)) {
    return true;
  } else {
    alert('Veuillez rentrer une adresse mail valide');
    return false;
  }
};
