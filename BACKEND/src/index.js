let content = document.getElementById('content-container');

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
    content.innerHTML +=
      '<a href="#" onclick="showProduct()"><div class="product-card" ><img class="product-card__img" src="' +
      data.imageUrl +
      '"/><div class="product-card__descr"> <span class="product-card__descr--name">' +
      data.name +
      '</span> <span class="product-card__descr--price">' +
      data.price +
      ' €</span></div></div></a>';
  }
}

function showProduct() {
  console.log('Produit');
}

//utiliser document.createElement + appendChild

//create dynamic router / htmlComponent produit.html/?id=doazjdapzdzpad7898769 avec le call(.id)
