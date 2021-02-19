const saveBtn = document.getElementById('save-btn');
const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');
const lastNameInput = document.getElementById('lastname');
const firstNameInput = document.getElementById('firstname');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('mail');

const userContact = {};

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
  userContact.lastName = lastNameInput.value;
  userContact.firstName = firstNameInput.value;
  userContact.address = addressInput.value;
  userContact.city = cityInput.value;
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
