const productId = window.location.href.toString().slice(48); //A REVOIR
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
let selectColor;

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
};
//Create the product main container from productDetails
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

//create the product details from product's image and product's description
const productDetails = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-details';
  div.appendChild(productImg(data));
  div.appendChild(productDescr(data));

  return div;
};
//Create the product image
const productImg = (data) => {
  const img = document.createElement('img');
  img.classList = 'product-details__img';
  img.src = `${data.imageUrl}`;
  img.alt = `Image de l'ourson ${data.name}`;
  return img;
};

//Create the product description
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

//Create the product's color selection from options loop of data.colors
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

//Create the product add to basket button and and product price
//It also set addBasketButton to the created button
const productOrder = (data) => {
  const span = document.createElement('span');
  span.classList = 'order__price';
  span.textContent = `${data.price / 100} €`;

  const button = document.createElement('button');
  button.classList = 'order__btn';
  button.id = 'order-btn';
  button.textContent = 'Ajouter au panier';

  addBasketBtn = button;

  const div = document.createElement('div');
  div.classList = 'order';

  div.appendChild(span);
  div.appendChild(button);

  return div;
};

//Enable the button to be reactive when clicked and select element to send the choosen element and update basket
const basketListener = (selectedTeddy) => {
  let selectedIndex = 0;
  let selectedColor = selectedTeddy.colors[selectedIndex];

  selectColor.addEventListener('change', () => {
    selectedIndex = selectColor.selectedIndex;
    selectedColor = selectColor.options[selectedIndex].value;
  });

  addBasketBtn.addEventListener('click', () => {
    if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify([]));
      localStorage.setItem('basketDetails', JSON.stringify([]));
    }
    selectedTeddy.selectedColor = selectedColor;

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
