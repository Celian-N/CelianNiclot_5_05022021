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

//Check if device is 768px max width to change textContent of dropdown button
const dropdownTitle = document.getElementById('dropdown__title');

const mediaQuery = window.matchMedia('(max-width: 768px)');

mediaQuery.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) dropdownTitle.textContent = '';
  else dropdownTitle.textContent = 'PROFIL';
}

// Run it initially
handleDeviceChange(mediaQuery);
