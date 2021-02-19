let products = document.getElementById('products-container');
let filters = document.getElementById('filters');

const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');

let allTeddies;
let filteredTeddies;
let filterColor;
let filterIndex = -1;

//Check if basketPrice exist or not to put the right value in the basketPrice
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

//Check if basket is empty or not to set the basket Indicator
const setBasketIndicator = (data) => {
  if (!data || JSON.parse(data).length <= 0) {
    return (basketIndicator.classList = 'display-none');
  }
  basketIndicator.classList = 'basket-indicator';
  basketIndicator.textContent = `${JSON.parse(data).length}`;
};

//Load basket when page is mounted
window.onload = () => {
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
};

//Get products from API and launch setProducts function to create DOM Elements
fetch('http://localhost:3000/api/teddies')
  .then((result) => {
    return result.json();
  })
  .then((teddies) => {
    allTeddies = teddies;
    setAllColors(allTeddies);
    setProducts(allTeddies);
  })
  .catch(() => alert('Erreur :' + error));

//Loop on every elements from datas to create each initial card
const setProducts = (datas) => {
  for (const data of datas) {
    products.appendChild(productLink(data));
  }
};

const filterProducts = (datas) => {
  products.innerHTML = '';
  setProducts(datas);
};

//Create the main container of the card including image and description and the link which takes us to the product page
const productLink = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-card';

  div.appendChild(productImg(data));
  div.appendChild(productDescr(data));

  const link = document.createElement('a');
  link.href = `./src/pages/product.html?id=${data._id}`;

  link.appendChild(div);
  return link;
};

//Create Image of the product
const productImg = (data) => {
  const img = document.createElement('img');
  img.classList = 'product-card__img';
  img.src = `${data.imageUrl}`;
  img.alt = `Image de l'ourson ${data.name}`;
  return img;
};

//Create the description of the product (name/price)
const productDescr = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-card__descr';

  const spanName = document.createElement('p');
  spanName.classList = 'product-card__descr--name';
  spanName.textContent = `${data.name}`;

  const spanPrice = document.createElement('p');
  spanPrice.classList = 'product-card__descr--price';
  spanPrice.textContent = `${data.price / 100}€`;

  const spanColors = document.createElement('div');
  spanColors.classList = 'product-card__descr--colors';

  for (color of data.colors) {
    const divColor = document.createElement('div');
    divColor.classList = 'product-card__descr--color';
    if (color == 'Dark brown') {
      divColor.style.backgroundColor = '#654321';
    }
    if (color == 'Pale brown') {
      divColor.style.backgroundColor = '#987654';
    }
    divColor.style.backgroundColor = `${color}`;
    spanColors.appendChild(divColor);
  }

  div.appendChild(spanName);
  div.appendChild(spanPrice);
  div.appendChild(spanColors);

  return div;
};

const allColors = [];

//set allColors table width available color of teddies
const setAllColors = (datas) => {
  for (const data of datas) {
    for (color of data.colors) {
      if (!allColors.includes(color)) {
        allColors.push(color);
      }
    }
  }
  setFilter(allColors);
};

//set filter buttons for all colors
const setFilter = (colors) => {
  filters.classList = 'filter';
  for (const color of colors) {
    filters.appendChild(setBtnColor(color));
  }
};

//create filter buttons and event listener when clicked
const setBtnColor = (color) => {
  const div = document.createElement('div');
  div.classList = 'filter__btn';
  if (color == 'Dark brown') {
    div.style.backgroundColor = '#654321';
  }
  if (color == 'Pale brown') {
    div.style.backgroundColor = '#987654';
  }
  div.style.backgroundColor = `${color}`;

  div.addEventListener('click', () => {
    if (filterIndex >= 0) {
      filters.childNodes[filterIndex].classList.remove('filter__active');
    }
    if (!filterColor || filterColor != color) {
      filterColor = color;
      filterIndex = allColors.indexOf(filterColor);
      filters.childNodes[filterIndex].classList.add('filter__active');
      filteredTeddies = allTeddies.filter((teddy) =>
        teddy.colors.includes(color)
      );
    } else {
      filterColor = '';
      filterIndex = -1;
      filteredTeddies = allTeddies;
    }
    filterProducts(filteredTeddies);
  });

  return div;
};
