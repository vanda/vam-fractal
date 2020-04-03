(function(){
	var prefix = "image-button";

	if (document.querySelector(".image-button__download-button")) {
		document.querySelector(".image-button__download-button").onclick = function(e) {
	        document.querySelector(".image-button__image-modal").dispatchEvent(new CustomEvent("jsModalOpen", {bubbles: true}));
			document.querySelector(".image-button__image-modal").classList.add("b-modal--active");
			document.querySelector(".image-button__modal-download-content").classList.add("image-button__modal-download-content--active");
			document.querySelector(".image-button__modal-license-content").classList.remove("image-button__modal-license-content--active");
		}
	}

	if (document.querySelector(".image-button__license-button")) {
		document.querySelector(".image-button__license-button").onclick = function(e) {
			document.querySelector(".image-button__image-modal").dispatchEvent(new CustomEvent("jsModalOpen", {bubbles: true}));
			document.querySelector(".image-button__image-modal").classList.add("b-modal--active");
			document.querySelector(".image-button__modal-download-content").classList.remove("image-button__modal-download-content--active");
			document.querySelector(".image-button__modal-license-content").classList.add("image-button__modal-license-content--active");			
		}
	}

	if (document.querySelector(".image-button__license-modal-open")) {
		document.querySelector(".image-button__license-modal-open").onclick = function(e) {
			document.querySelector(".image-button__modal-download-content").classList.remove("image-button__modal-download-content--active");
			document.querySelector(".image-button__modal-license-content").classList.add("image-button__modal-license-content--active");			
		}		
	}

	if (document.querySelector(".image-button__checkbox-container")) {
		document.querySelector(".image-button__checkbox-container").onclick = function(e) {
			if (e.target === document.querySelector(".image-button__agree-to-terms")) {
				document.querySelector(".image-button__agree-checkbox").checked =
					!document.querySelector(".image-button__agree-checkbox").checked;

				document.querySelector(".image-button__agree-to-terms").classList.remove("image-button__agree-to-terms--warning");

				var elements = [
					"__icon-link-container",
					"__checkmark",
					"__image-icon-link",
					"__agree-to-terms",
					"__download-content",
					"__license-content"
				];

				if (document.querySelector(".image-button__agree-checkbox").checked) {
					document.querySelector(".image-button__agree-to-terms-reminder").style.display = "none";

					elements.forEach(function(c) {
						document.querySelector("." + prefix + c).classList.add(prefix + c + "--active");
					});


				} else {
					elements.forEach(function(c) {
						document.querySelector("." + prefix + c).classList.remove(prefix + c + "--active");
					});
				}
			}
		}
	}

	var links = [
		"__download-icon-link",
		"__download-link-text"
	];

	links.forEach(function(link) {
		if (document.querySelector("." + prefix + link)) {
			document.querySelector("." + prefix + link).onclick = function(e) {
				if (!document.querySelector(".image-button__agree-checkbox").checked) {
					document.querySelector(".image-button__agree-to-terms-reminder").style.display = "block";
					document.querySelector(".image-button__agree-to-terms").classList.add("image-button__agree-to-terms--warning");
				}
			}
		}
	});
})()