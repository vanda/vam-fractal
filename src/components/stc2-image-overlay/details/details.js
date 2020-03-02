(function() {
	if (!!document.querySelector(".image-overlay-detail")) {
		function updateImageAndCounter() {
			document.querySelector(".image-overlay-detail__current-image").innerHTML =
				parseInt(document.querySelector(".image-carosel__image-preview-container--selected").getAttribute("data-image-index")) + 1
			document.querySelector(".image-overlay-detail__total-number-of-images").innerHTML =
				document.querySelectorAll(".image-carosel__image-preview-container").length

			var classActive = "etc-image-overlay__image--active";
			var currentSelect = document.querySelector("." + classActive);
			if (!!currentSelect) {
				currentSelect.classList.remove(classActive);
			}

			var selectedIndex = parseInt(
				document.querySelector(
					".image-carosel__image-preview-container--selected").getAttribute("data-image-index"));

			document.querySelector("img[data-image-index='"+ String(selectedIndex) +"']").classList.add(classActive);

		}

		document.querySelector(".image-overlay-detail").addEventListener("updateimageandcounter", updateImageAndCounter);
	}
})();

