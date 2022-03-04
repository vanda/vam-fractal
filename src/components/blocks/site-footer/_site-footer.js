
const bpMinSmall = 768;
const elesSocialListItems = document.querySelectorAll('.b-site-footer__legal .b-site-footer__item:not(:first-child)');
let viewportSizeBase = (window.innerWidth >= bpMinSmall) ? 'medium' : 'small';

const updateCopyrightYear = () => {
  const eleCopyrightYear = document.querySelector('#copyrightYear');

  if (eleCopyrightYear) {
    eleCopyrightYear.textContent = new Date().getFullYear();
  }
};

const manageViewportInitialClasses = () => {
  if (viewportSizeBase === 'medium') {
    // add class 's-separated' for the V&A double-backslash
    elesSocialListItems.forEach((el) => {
      el.classList.add('s-separated');
    });
  }
};

const manageViewportChangeClasses = () => {
  window.onresize = () => {
    const viewportSizeNew = (window.innerWidth >= bpMinSmall) ? 'medium' : 'small';

    if (viewportSizeNew !== viewportSizeBase) {
      viewportSizeBase = viewportSizeNew;

      if (viewportSizeNew === 'medium') {
        // add class 's-separated' for the V&A double-backslash
        elesSocialListItems.forEach((el) => {
          el.classList.add('s-separated');
        });
      }

      if (viewportSizeNew === 'small') {
        // remove class 's-separated' for the V&A double-backslash
        elesSocialListItems.forEach((el) => {
          el.classList.remove('s-separated');
        });
      }
    }
  };
};

const init = () => {
  // if viewport width is over specification add HTML classes
  manageViewportInitialClasses();

  // viewport width changes above/below specification add/remove HTML classes
  manageViewportChangeClasses();

  // maintain current year in copyright notice
  updateCopyrightYear();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
