(function(){
	var links = [
		"download-button__download-icon-link",
		"download-button__download-link-text"
	];

	if (document.querySelector(".download-button__button")) {
		document.querySelector(".download-button__button").onclick = function(e) {
			document.querySelector(".download-button__modal").classList.add("b-modal--active");
		}
	}

	document.querySelector(".download-button__checkbox-container").onclick = function(e) {
		if (e.target === document.querySelector(".download-button__agree-to-terms")) {
			document.querySelector(".download-button__agree-checkbox").checked =
				!document.querySelector(".download-button__agree-checkbox").checked;

				var prefix = "download-button";

				var elements = [
					"__icon-link-container",
					"__checkmark",
					"__download-icon-link",
					"__agree-to-terms"
				];

				if (document.querySelector(".download-button__agree-checkbox").checked) {
					document.querySelector(".download-button__agree-to-terms-reminder").style.display = "none";

					elements.forEach(function(c) {
						document.querySelector("." + prefix + c).classList.add(prefix + c + "--active");
					})

				} else {
					elements.forEach(function(c) {
						document.querySelector("." + prefix + c).classList.remove(prefix + c + "--active");
					})					
				}
		}
	}

	links.forEach(function(link) {
		if (document.querySelector("." + link)) {
			document.querySelector("." + link).onclick = function(e) {
				if (!document.querySelector(".download-button__agree-checkbox").checked) {
					document.querySelector(".download-button__agree-to-terms-reminder").style.display = "block";
					document.querySelector(".download-button__agree-to-terms").classList.add("download-button__agree-to-terms--warning");
				}
			}
		}
	});
})()