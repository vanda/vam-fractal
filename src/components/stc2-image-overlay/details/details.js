function updateCounter() {
	document.querySelector(".image-overlay-detail__current-image").innerHTML =
		parseInt(document.querySelector(".image-carosel__image-preview-container--selected").getAttribute("data-image-index")) + 1
	document.querySelector(".image-overlay-detail__total-number-of-images").innerHTML =
		document.querySelectorAll(".image-carosel__image-preview-container").length			
}

function updateImageAndCounter(e) {
	var opr = e && e.detail;

	var classActive = "etc-image-overlay__image--active";
	var currentSelect = document.querySelector("." + classActive);

	if (!!currentSelect) {
		currentSelect.classList.remove(classActive);
	}

	var newIndex = parseInt(
		document.querySelector(
			".image-carosel__image-preview-container--selected").getAttribute("data-image-index")
	);

	if (opr == "+") {
		newIndex = newIndex + 1;
	} else if (opr == "-") {
		newIndex = newIndex - 1;
	}

	if (!!opr) {
		var classSelected = "image-carosel__image-preview-container--selected";
		document.querySelector("." + classSelected).classList.remove(classSelected);
		document.querySelector('div[data-image-index="' + String(newIndex) + '"]').classList.add(classSelected);
	}

	if (newIndex === document.querySelectorAll(".image-carosel__image-preview-container").length - 1) {
		document.querySelector(".image-overlay-detail__next").classList.remove("image-overlay-detail__next--enabled");
	} else {
		document.querySelector(".image-overlay-detail__next").classList.add("image-overlay-detail__next--enabled");
	}

	if (newIndex === 0) {
		document.querySelector(".image-overlay-detail__prev").classList.remove("image-overlay-detail__prev--enabled");
	} else {
		document.querySelector(".image-overlay-detail__prev").classList.add("image-overlay-detail__prev--enabled");
	}	

	document.querySelector("img[data-image-index='"+ String(newIndex) +"']").classList.add(classActive);
	updateCounter();
}

(function() {
	if (!!document.querySelector(".image-overlay-detail")) {
		document.querySelector(".image-overlay-detail__prev").onclick = function(e) {
			e.target.dispatchEvent(new CustomEvent("updateimageandcounter", { detail: "-", bubbles: true }));
		}
		document.querySelector(".image-overlay-detail__next").onclick = function(e) {
			e.target.dispatchEvent(new CustomEvent("updateimageandcounter", { detail: "+", bubbles: true }));
		}		
		document.querySelector(".image-overlay-detail").addEventListener("updateimageandcounter", updateImageAndCounter);
	}
})();
