const productId = window.location.search.slice(4);
const productContainer = document.getElementById('product-container');

const basketPrice = document.getElementById('basket-price');
const basketIndicator = document.getElementById('basket-indicator');

//Load basket when page is mounted
window.onload = () => {
  setBasketPrice();
  setBasketIndicator(localStorage.getItem('basket'));
};

let teddyBear;
let addBasketBtn;
//let selectColor;
let selectedColor;

//Get product from product ID in API and launch setProduct function to create DOM Elements. Then, it launch function that listen event from color select and add to baket button
fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((result) => {
    return result.json();
  })
  .then((teddy) => {
    setProduct(teddy);
    return teddy;
  })
  .then((selectedTeddy) => {
    basketListener(selectedTeddy);
  })
  .catch(() => alert('Erreur :' + error));

//Create the product container
const setProduct = (data) => {
  productContainer.appendChild(product(data));
  productContainer.appendChild(backButton());
  productContainer.classList = 'product-container';
};
//Create the product main container from productDetails
const product = (data) => {
  const div = document.createElement('div');
  div.classList = 'product';

  div.appendChild(productDetails(data));
  div.appendChild(productImg(data));
  div.appendChild(productFeatures(data));

  return div;
};

//create the product details from product's image and product's description
const productDetails = (data) => {
  const div = document.createElement('div');
  div.classList = 'product__details';

  const divDescr = document.createElement('div');
  divDescr.classList = 'product__details--descr';
  divDescr.textContent = `${data.description}`;

  const title = document.createElement('p');
  title.classList = 'product__details--name';
  title.textContent = `${data.name.toUpperCase()}.`;

  div.appendChild(title);
  div.appendChild(divDescr);

  return div;
};
//Create the product image
const productImg = (data) => {
  const img = document.createElement('img');
  img.classList = 'product__img';
  img.src = `${data.imageUrl}`;
  img.alt = `Image de l'ourson ${data.name}`;
  return img;
};

//Create the product description
const productFeatures = (data) => {
  const div = document.createElement('div');
  div.classList = 'product__features';

  const divPrice = document.createElement('div');
  divPrice.classList = 'product__features--price';

  const spanName = document.createElement('span');
  spanName.textContent = 'Prix';
  const spanPrice = document.createElement('span');
  spanPrice.textContent = `${data.price / 100} €`;
  spanPrice.classList = 'price';

  divPrice.appendChild(spanName);
  divPrice.appendChild(spanPrice);
  div.appendChild(divPrice);
  div.appendChild(productColors(data));
  div.appendChild(productOrder());
  return div;
};

//Create the product's color selection from options loop of data.colors
// const productColors = (data) => {
//   const div = document.createElement('div');
//   div.classList = 'product__features--colors';

//   const label = document.createElement('label');
//   label.htmlFor = 'color-select';
//   label.textContent = 'Couleurs';

//   const select = document.createElement('select');
//   select.id = 'color-select';
//   select.name = 'colors';

//   for (color of data.colors) {
//     const option = document.createElement('option');
//     option.value = color;
//     option.textContent = `${color}`;
//     select.appendChild(option);
//   }
//   selectColor = select;

//   div.appendChild(label);
//   div.appendChild(select);

//   return div;
// };

//Create the product's color selection from options loop of data.colors
const productColors = (data) => {
  const div = document.createElement('div');
  div.classList = 'product__features--colors';
  const span = document.createElement('span');
  span.textContent = 'Couleurs';
  span.classList = 'colors__title';

  const divColors = document.createElement('div');
  divColors.classList = 'colors__list';
  let isFirstColor = true;

  for (const color of data.colors) {
    const radio = document.createElement('input');
    radio.classList = 'colors__radio';
    radio.setAttribute('type', 'radio');
    radio.id = `${color}`;
    radio.value = `${color}`;
    radio.name = 'color';
    const label = document.createElement('label');
    label.classList = 'colors__label';
    label.htmlFor = `${color}`;
    const divLabel = document.createElement('div');
    divLabel.textContent = `${color}`;
    divLabel.classList = 'colors__label--title';

    if (color == 'Dark brown') {
      label.style.backgroundColor = '#654321';
    }
    if (color == 'Pale brown') {
      label.style.backgroundColor = '#987654';
    }
    label.style.backgroundColor = `${color}`;
    radio.addEventListener('change', () => {
      selectedColor = radio.value;
    });

    isFirstColor ? (radio.checked = true) : (radio.checked = false);

    label.appendChild(divLabel);
    divColors.appendChild(radio);
    divColors.appendChild(label);

    isFirstColor = false;
  }

  div.appendChild(span);
  div.appendChild(divColors);

  return div;
};

//Create the product add to basket button and and product price
//It also set addBasketButton to the created button
const productOrder = () => {
  const button = document.createElement('button');
  button.classList = 'order__btn';
  button.id = 'order-btn';
  button.textContent = 'Ajouter au panier';

  addBasketBtn = button;

  const div = document.createElement('div');
  div.classList = 'order';

  div.appendChild(button);

  return div;
};

//Enable the button to be reactive when clicked and select element to send the choosen element and update basket
const basketListener = (selectedTeddy) => {
  // let selectedIndex = 0;
  // let selectedColor = selectedTeddy.colors[selectedIndex];

  // selectColor.addEventListener('change', () => {
  //   selectedIndex = selectColor.selectedIndex;
  //   selectedColor = selectColor.options[selectedIndex].value;
  // });

  addBasketBtn.addEventListener('click', () => {
    if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify([]));
      localStorage.setItem('basketDetails', JSON.stringify([]));
    }
    selectedTeddy.selectedColor = selectedColor;
    console.log(selectedTeddy.selectedColor);

    const basketTable = JSON.parse(localStorage.getItem('basket'));
    basketTable.push(`${selectedTeddy._id}`);
    const basketDetailsTable = JSON.parse(
      localStorage.getItem('basketDetails')
    );
    basketDetailsTable.push({
      id: selectedTeddy._id,
      name: selectedTeddy.name,
      image: selectedTeddy.imageUrl,
      color: selectedColor,
      price: selectedTeddy.price / 100,
    });

    localStorage.setItem('basket', JSON.stringify(basketTable));
    localStorage.setItem('basketDetails', JSON.stringify(basketDetailsTable));

    updateBasketPrice(selectedTeddy);
    setBasketIndicator(localStorage.getItem('basket'));
  });
};

//Update local storage when add to basket button is clicked
const updateBasketPrice = (selectedTeddy) => {
  if (!localStorage.getItem('basketPrice')) {
    currentBasketPrice = 0;
  } else {
    currentBasketPrice = JSON.parse(localStorage.getItem('basketPrice'));
  }

  newBasketPrice = currentBasketPrice + selectedTeddy.price / 100;

  localStorage.setItem('basketPrice', newBasketPrice);

  basketPrice.textContent = `${localStorage.getItem('basketPrice')},00 €`;
};

const backButton = () => {
  const div = document.createElement('div');
  div.classList = 'back';
  const btn = document.createElement('button');
  btn.classList = 'back__btn';
  const spanLogo = document.createElement('span');
  spanLogo.classList = 'fas fa-chevron-left';
  const span = document.createElement('span');
  span.classList = 'back__title';
  span.textContent = 'Retour';
  btn.appendChild(spanLogo);
  div.appendChild(btn);
  div.appendChild(span);

  div.addEventListener('click', () => {
    window.history.back();
  });

  return div;
};
