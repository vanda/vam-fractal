document.addEventListener('DOMContentLoaded', () => {
  // maintain current year in copyright notice
  const eleCopyrightYear = document.querySelector('#copyrightYear');

  if (eleCopyrightYear) {
    eleCopyrightYear.textContent = new Date().getFullYear();
  }
});
