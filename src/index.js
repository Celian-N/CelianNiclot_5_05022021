let products = document.getElementById('products-container');

fetch('http://localhost:3000/api/teddies')
  .then((result) => {
    return result.json();
  })
  .then((teddies) => {
    console.log(teddies);
    setProduct(teddies);
  })
  .catch(() => alert('Erreur :' + error));

function setProduct(datas) {
  for (const data of datas) {
    products.appendChild(productLink(data));
  }
}
const productLink = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-card';

  div.appendChild(productImg(data));
  div.appendChild(productDescr(data));

  const link = document.createElement('a');
  link.href = `products.html/?id=${data._id}`;

  link.appendChild(div);
  return link;
};

const productImg = (data) => {
  const img = document.createElement('img');
  img.classList = 'product-card__img';
  img.src = `${data.imageUrl}`;
  return img;
};

const productDescr = (data) => {
  const div = document.createElement('div');
  div.classList = 'product-card__descr';

  const spanName = document.createElement('p');
  spanName.classList = 'product-card__descr--name';
  spanName.textContent = `${data.name}`;

  const spanPrice = document.createElement('p');
  spanPrice.classList = 'product-card__descr--price';
  spanPrice.textContent = `${data.price / 100}€`;

  div.appendChild(spanName);
  div.appendChild(spanPrice);

  return div;
};

function showProduct() {
  console.log('Produit');
}

// function setProduct(datas) {
//   for (const data of datas) {
//     content.innerHTML +=
//       '<a href="#" onclick="showProduct()"><div class="product-card" ><img class="product-card__img" src="' +
//       data.imageUrl +
//       '"/><div class="product-card__descr"> <span class="product-card__descr--name">' +
//       data.name +
//       '</span> <span class="product-card__descr--price">' +
//       data.price +
//       ' €</span></div></div></a>';
//   }
// }

//create dynamic router / htmlComponent produit.html/?id=doazjdapzdzpad7898769 avec le call(.id)
