const initialiseSearchpage = () => {
  const searchPageContainer = document.querySelector(".b-search-results-page");
  const searchForm = document.querySelector(".b-search-form");

  searchPageContainer.addEventListener("termToggleSearchBox", ({ detail }) => {
    searchForm.dispatchEvent(new CustomEvent("termToggleSearchBox", {
      detail
    }));
  });
};

(() => initialiseSearchpage())();
