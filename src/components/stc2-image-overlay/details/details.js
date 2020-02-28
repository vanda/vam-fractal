(function() {
	if (!!document.querySelector(".image-overlay-detail")) {
		function updateImageCounter() {
			document.querySelector(".image-overlay-detail__current-image").innerHTML =
				parseInt(document.querySelector(".image-carosel__image-preview-container--selected").getAttribute("data-image-index")) + 1
			document.querySelector(".image-overlay-detail__total-number-of-images").innerHTML =
				document.querySelectorAll(".image-carosel__image-preview-container").length
		}
		document.querySelector(".image-overlay-detail").addEventListener("updateimagecounter", updateImageCounter);
	}
})();

