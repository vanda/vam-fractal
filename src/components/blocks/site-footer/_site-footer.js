const updateCopyrightYear = () => {
  const eleCopyrightYear = document.querySelector('#copyrightYear');

  if (eleCopyrightYear) {
    eleCopyrightYear.textContent = new Date().getFullYear();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateCopyrightYear();
});
