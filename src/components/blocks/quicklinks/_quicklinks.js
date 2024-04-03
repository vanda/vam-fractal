const container = document.querySelector('.b-quicklinks__list');
const moreButtonWrapper = document.querySelector('.b-quicklinks__more');
const moreButton = document.querySelector('.u-btn--quicklink-more');
const dropdownParent = document.querySelector('.b-quicklinks__more-list');
const menuItems = document.querySelectorAll('.b-quicklinks__link-item');
const menuItemsArray = Array.from(menuItems);
let moreButtonWidth;
let menuItemsWidths;

moreButton.addEventListener('click', () => {
  if (moreButtonWrapper) {
    moreButtonWrapper.classList.toggle('b-quicklinks__more--open');
  }
});

// Get the container width
// Loop over each item width and add them together
// If adding the next item width to the total is greater than the container width
// Then move all remaining items into a dropdown
const positionMenuItems = () => {
  if (!menuItems) return;

  const containerWidth = container.offsetWidth;
  let totalWidth = 0;
  let mainItems = [];
  let remainingItems = [];

  menuItemsWidths.some((itemWidth, index) => {
    // Calculate next total width including more button width and 40px padding
    if ((totalWidth + itemWidth + moreButtonWidth + 40) > containerWidth) {
      // If the totalwidth + last item is not wider than the container, display all items
      if (index === menuItemsArray.length - 1 && totalWidth + itemWidth < containerWidth) {
        mainItems = menuItemsArray;
      } else {
        // Select remaining items to be moved to dropdown
        remainingItems = menuItemsArray.slice(index);

        // Add items back to the main menu as container width increases
        mainItems = menuItemsArray.slice(0, index);
      }

      return true;
    }

    totalWidth += itemWidth;

    return false;
  });

  // Ensure all possible items are visible in main menu
  mainItems.forEach((item) => {
    container.appendChild(item);
  });

  // Move remaining items into dropdown
  if (remainingItems.length) {
    moreButtonWrapper.classList.remove('b-quicklinks__more--hidden');

    remainingItems.forEach((item) => {
      dropdownParent.appendChild(item);
    });
  } else if (mainItems.length) {
    // Hide more button if all items are displayed
    moreButtonWrapper.classList.add('b-quicklinks__more--hidden');
  }
};

// Wait for the page to load before getitng width of menu items
window.addEventListener("load", () => {
  menuItemsWidths = menuItemsArray.map((item) => item.offsetWidth);
  moreButtonWidth = moreButton.offsetWidth;
  moreButtonWrapper.classList.add('b-quicklinks__more--hidden');

  positionMenuItems();
});

window.addEventListener("resize", () => {
  positionMenuItems();
});
