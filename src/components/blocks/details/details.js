function updateCounter() {
	document.querySelector(".image-overlay-detail__current-image").innerHTML =
		parseInt(document.querySelector(".image-carosel__image-preview-container--selected").getAttribute("data-image-index")) + 1
	document.querySelector(".image-overlay-detail__total-number-of-images").innerHTML =
		document.querySelectorAll(".image-carosel__image-preview-container").length			
}

function updateImageAndCounter(e) {
	var opr = e && e.detail && e.detail.opr;
	var setIndex = e && e.detail && e.detail.index;
	var newIndex;

	var classActive = "b-image-overlay__image--active";
	var currentSelect = document.querySelector("." + classActive);

	if (!!opr) {
		newIndex = parseInt(currentSelect.getAttribute("data-image-index"));
	} else {
		newIndex = setIndex;
	}
	if (opr == "+") {
		newIndex = newIndex + 1;
	} else if (opr == "-") {
		newIndex = newIndex - 1;
	}

	if (document.querySelector("img[data-image-index='" + String(newIndex) + "']")) {
		if (!!currentSelect) {
			currentSelect.classList.remove(classActive);
		}

		var classSelected = "image-carosel__image-preview-container--selected";
		var selectedEl = document.querySelector("." + classSelected);

		if (!!selectedEl) {
			selectedEl.classList.remove(classSelected);
		}

		document.querySelector('div[data-image-index="' + String(newIndex) + '"]').classList.add(classSelected);

		var imageDetailNext = document.querySelector(".image-overlay-detail__next");
		var imageDetailPrev = document.querySelector(".image-overlay-detail__prev");

		if (newIndex === document.querySelectorAll(".image-carosel__image-preview-container").length - 1) {
			imageDetailNext.classList.remove("image-overlay-detail__next--enabled");
		} else {
			imageDetailNext.classList.add("image-overlay-detail__next--enabled");
		}

		if (newIndex === 0) {
			imageDetailPrev.classList.remove("image-overlay-detail__prev--enabled");
		} else {
			imageDetailPrev.classList.add("image-overlay-detail__prev--enabled");
		}	

		document.querySelector("img[data-image-index='"+ String(newIndex) +"']").classList.add(classActive);
		
		updateCounter();
	}
}

(function() {
	var imageDetailNext = document.querySelector(".image-overlay-detail__next");
	var imageDetailPrev = document.querySelector(".image-overlay-detail__prev");

	var updateEvent = function(opr) {
		return new CustomEvent("updateimageandcounter", { detail: { opr: opr }, bubbles: true })
	}
 
	if (!!document.querySelector(".image-overlay-detail")) {
		imageDetailPrev.onclick = function(e) {
			e.target.dispatchEvent(updateEvent("-"));
		}
		imageDetailNext.onclick = function(e) {
			e.target.dispatchEvent(updateEvent("+"));
		}		
		document.querySelector(".image-overlay-detail").addEventListener("updateimageandcounter", updateImageAndCounter);
	}
})();
