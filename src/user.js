const saveBtn = document.getElementById('save-btn');
const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');

const userContact = {};

//Check if basketPrice exist or not to put the right value in the basket
const setBasketPrice = () => {
  if (
    !localStorage.getItem('basketPrice') ||
    localStorage.getItem('basketPrice') <= 0
  ) {
    basketPrice.textContent = '0,00€';
  } else {
    basketPrice.textContent = `${localStorage.getItem('basketPrice')},00 €`;
  }
};

//Check if basket is empty or not to set the basket Indicator and form container
const setBasketIndicator = (data) => {
  if (!data || JSON.parse(data).length <= 0) {
    return (basketIndicator.classList = 'display-none');
  }
  basketIndicator.classList = 'basket-indicator';
  basketIndicator.textContent = `${JSON.parse(data).length}`;
};

//Load basket when page is mounted to set basketTable or emptyBasket text

window.onload = () => {
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
  if (JSON.parse(localStorage.getItem('contact'))) {
    setContactForm();
  }
};

saveBtn.addEventListener('click', () => setUserContact());

const setUserContact = () => {
  getUserContact();
  if (
    !userContact.lastName ||
    !userContact.firstName ||
    !userContact.address ||
    !userContact.city ||
    !userContact.email ||
    !validateEmail(userContact.email)
  ) {
    return alert(
      'Veuillez remplir tous les champs pour enregistrer votre profil'
    );
  }

  localStorage.setItem('contact', JSON.stringify(userContact));
  console.log(localStorage.setItem('contact', JSON.stringify(userContact)));
};

const getUserContact = () => {
  const lastNameInput = document.getElementById('lastname');
  userContact.lastName = lastNameInput.value;
  const firstNameInput = document.getElementById('firstname');
  userContact.firstName = firstNameInput.value;
  const addressInput = document.getElementById('address');
  userContact.address = addressInput.value;
  const cityInput = document.getElementById('city');
  userContact.city = cityInput.value;
  const emailInput = document.getElementById('mail');
  userContact.email = emailInput.value;
};

const setContactForm = () => {
  const userContact = JSON.parse(localStorage.getItem('contact'));
  lastNameInput.value = userContact.lastName;
  firstNameInput.value = userContact.firstName;
  addressInput.value = userContact.address;
  cityInput.value = userContact.city;
  emailInput.value = userContact.email;
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
