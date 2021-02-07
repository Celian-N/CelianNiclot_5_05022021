const productId = window.location.href.toString().slice(49); //A REVOIR
const productContainer = document.getElementById('product-container');

const basketPrice = document.getElementById('basket-price');
basketPrice.textContent = `${localStorage.getItem('basket')},00 €` || '0,00 €';

let teddyBear;
let orderBtn;
let selectColor;

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((result) => {
    return result.json();
  })
  .then((teddy) => {
    console.log(teddy);
    setProduct(teddy);
    return teddy;
  })
  .then((selectedTeddy) => {
    basketListener(selectedTeddy);
  })
  .catch(() => alert('Erreur :' + error));

const setProduct = (data) => {
  productContainer.appendChild(product(data));
};

const product = (data) => {
  const div = document.createElement('div');
  div.classList = 'product';

  const para = document.createElement('p');
  para.classList = 'name';
  para.textContent = `${data.name}`;

  div.appendChild(para);
  div.appendChild(productDetails(data));

  return div;
};

const productDetails = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-details';
  div.appendChild(productImg(data));
  div.appendChild(productDescr(data));

  return div;
};

const productImg = (data) => {
  const img = document.createElement('img');
  img.classList = 'product-details__img';
  img.src = `${data.imageUrl}`;
  return img;
};

const productDescr = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-details__descr';

  const para = document.createElement('p');
  para.classList = 'product-details__descr--descr';
  para.textContent = `${data.description}`;

  div.appendChild(para);
  div.appendChild(productColors(data));
  div.appendChild(productOrder(data));
  return div;
};

const productColors = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-details__descr--colors';

  const label = document.createElement('label');
  label.htmlFor = 'color-select';
  label.textContent = 'Couleurs :';

  const select = document.createElement('select');
  select.id = 'color-select';
  select.name = 'colors';

  for (color of data.colors) {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = `${color}`;
    select.appendChild(option);
  }
  selectColor = select;

  div.appendChild(label);
  div.appendChild(select);

  return div;
};
const productOrder = (data) => {
  const span = document.createElement('span');
  span.classList = 'order__price';
  span.textContent = `${data.price / 100} €`;

  const button = document.createElement('button');
  button.classList = 'order__btn';
  button.id = 'order-btn';
  button.textContent = 'Ajouter au panier';

  orderBtn = button;

  const div = document.createElement('div');
  div.classList = 'order';

  div.appendChild(span);
  div.appendChild(button);

  return div;
};

const basketListener = (selectedTeddy) => {
  let selectedIndex = 0;
  let selectedColor = selectedTeddy.colors[selectedIndex];

  selectColor.addEventListener('change', () => {
    selectedIndex = selectColor.selectedIndex;
    selectedColor = selectColor.options[selectedIndex].value;
  });

  orderBtn.addEventListener('click', () => {
    selectedTeddy.selectedColor = selectedColor;

    localStorage.setItem(`${selectedTeddy._id}`, JSON.stringify(selectedTeddy));

    updateBasket(selectedTeddy);
  });
};

const updateBasket = (selectedTeddy) => {
  const test = document.getElementById('TEST');
  if (!localStorage.getItem('basket')) {
    currentBasketPrice = 0;
  } else {
    currentBasketPrice = JSON.parse(localStorage.getItem('basket'));
  }

  newBasketPrice = currentBasketPrice + selectedTeddy.price / 100;

  localStorage.setItem('basket', newBasketPrice);

  basketPrice.textContent = `${localStorage.getItem('basket')},00 €`;

  test.innerHTML = `${newBasketPrice}`;
};
