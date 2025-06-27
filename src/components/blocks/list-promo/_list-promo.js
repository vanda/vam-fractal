document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-list-promo'), (promo) => {
    const listImgs = promo.querySelectorAll('.b-list-promo__image-list-item');

    /* Promo logic only required if > 1 promo img present */
    if (listImgs.length > 1) {
      const listItems = promo.querySelectorAll('.b-list-promo__list-item');

      /* set initial item active state */
      let activeIndex = 0;
      listItems[activeIndex].classList.add('b-list-promo__list-item--active');

      /* fn to set active item classes */
      const setActiveItem = (itemIndex) => {
        promo.querySelector('.b-list-promo__image-list-item--active').classList.remove('b-list-promo__image-list-item--active');
        listImgs[itemIndex].classList.add('b-list-promo__image-list-item--active');
        promo.querySelector('.b-list-promo__list-item--active').classList.remove('b-list-promo__list-item--active');
        listItems[itemIndex].classList.add('b-list-promo__list-item--active');
      };

      /* promo ctrls can be shown */
      const ctrls = promo.querySelector('.b-list-promo__ctrls');
      ctrls.classList.add('b-list-promo__ctrls--active');

      /* promo controls setup */
      const prev = ctrls.querySelector('.js-list-promo__ctrls-btn--prev');
      const next = ctrls.querySelector('.js-list-promo__ctrls-btn--next');
      prev.setAttribute('disabled', 'true');

      /* promo controls logic */
      ctrls.addEventListener('click', (e) => {
        if (e.target === prev) {
          activeIndex -= 1;
          next.removeAttribute('disabled');
          if (activeIndex === 0) prev.setAttribute('disabled', 'true');
        } else if (e.target === next) {
          activeIndex += 1;
          prev.removeAttribute('disabled');
          if (activeIndex === listImgs.length - 1) next.setAttribute('disabled', 'true');
        }
        setActiveItem(activeIndex);
      });
    }

    return true;
  });
});
