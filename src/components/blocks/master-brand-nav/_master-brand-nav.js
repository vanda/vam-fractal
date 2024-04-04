const masterBrandNav = document.querySelector('.b-master-brand-nav');

if (masterBrandNav) {
  const menuButton = document.querySelector('.b-master-brand-nav__menu-button');
  const closeButton = document.querySelector('.b-master-brand-nav__menu-close');

  menuButton.addEventListener('click', () => {
    masterBrandNav.classList.add('b-master-brand-nav--menu-open');
  });

  closeButton.addEventListener('click', () => {
    masterBrandNav.classList.remove('b-master-brand-nav--menu-open');
  });
}
