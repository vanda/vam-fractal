document.addEventListener('DOMContentLoaded', () => {
  const ctrlsDirectional = [
    {
      ctrlName: 'Previous',
      ctrlClasses: ['u-btn-icon', 'u-btn-icon--light', 'u-btn-icon--point-left', 'b-list-promo__ctrls-directional-btn'],
      ctrlAttr: 'disabled',
    },
    {
      ctrlName: 'Next',
      ctrlClasses: ['u-btn-icon', 'u-btn-icon--light', 'u-btn-icon--point-right', 'b-list-promo__ctrls-directional-btn'],
    },
  ];

  const setActiveListItem = (listIndex = 0) => {
    const promoImgListItems = document.querySelectorAll('.b-list-promo__image-list-item');
    const promoInfoListItems = document.querySelectorAll('.b-list-promo__list-item');

    promoImgListItems.forEach((listItem, index) => {
      if (index !== listIndex) {
        listItem.classList.remove('b-list-promo__image-list-item--active');
      } else {
        listItem.classList.add('b-list-promo__image-list-item--active');
      }
    });

    promoInfoListItems.forEach((listItem, index) => {
      if (index !== listIndex) {
        listItem.classList.remove('b-list-promo__list-item--active');
      } else {
        listItem.classList.add('b-list-promo__list-item--active');
      }
    });
  };

  const switchListItem = (e) => {
    const selectedDirection = e.target.textContent;

    const promoListItems = Array.from(document.querySelectorAll('.b-list-promo__list-item'));
    const promoListActiveItem = document.querySelector('.b-list-promo__list-item--active');
    const currentListItemIndex = promoListItems.indexOf(promoListActiveItem);
    const lastListItemIndex = promoListItems.length - 1;

    const ctrlDirectionPrev = document.querySelector('.u-btn-icon--point-left.b-list-promo__ctrls-directional-btn');
    const ctrlDirectionNext = document.querySelector('.u-btn-icon--point-right.b-list-promo__ctrls-directional-btn');

    if (selectedDirection === 'Previous') {
      if (currentListItemIndex > 0) {
        setActiveListItem(currentListItemIndex - 1);
        ctrlDirectionNext.removeAttribute('disabled');
      }
      if (currentListItemIndex === 1) {
        ctrlDirectionPrev.setAttribute('disabled', '');
      }
    }

    if (selectedDirection === 'Next') {
      if (currentListItemIndex < lastListItemIndex) {
        setActiveListItem(currentListItemIndex + 1);
        ctrlDirectionPrev.removeAttribute('disabled');
      }
      if (currentListItemIndex === lastListItemIndex - 1) {
        ctrlDirectionNext.setAttribute('disabled', '');
      }
    }
  };

  const buildDirectionCtrls = () => {
    const ctrlsContainerParent = document.querySelector('.b-list-promo__image-list-container');
    const ctrlsContainer = document.createElement('ul');

    ctrlsContainer.classList.add('b-list-promo__ctrls-directional-list');

    ctrlsDirectional.forEach((ctrl) => {
      const ctrlListItem = document.createElement('li');
      const ctrlBtn = document.createElement('button');

      ctrlBtn.classList.add(...ctrl.ctrlClasses);
      ctrlBtn.textContent = ctrl.ctrlName;
      ctrlBtn.setAttribute('title', `${ctrl.ctrlName} item`);

      // disable 'Previous' button on initialisation
      if (ctrl.ctrlAttr) {
        ctrlBtn.setAttribute(ctrl.ctrlAttr, '');
      }

      ctrlBtn.addEventListener('click', switchListItem, false);

      ctrlListItem.appendChild(ctrlBtn);
      ctrlsContainer.appendChild(ctrlListItem);
      ctrlsContainerParent.appendChild(ctrlsContainer);
    });
  };

  const init = () => {
    buildDirectionCtrls();
    setActiveListItem();
  };

  init();
});
