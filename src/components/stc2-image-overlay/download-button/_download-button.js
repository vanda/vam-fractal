(function(){
	var buttons = [
		{
			button: "__license-button",
			content: "__license-content"
		},
		{
			button: "__download-button",
			content: "__download-content",

		}
	];

	var prefix = "image-button";

	buttons.forEach(function(c) {
		if (!!document.querySelector("." + prefix + c.button + " button")) {
			document.querySelector("." + prefix + c.button + " button").onclick = function() {
				document.querySelector("." + prefix + c.content).classList.add(prefix + c.content + "--active");
			}
		}
	});

	if (document.querySelector(".image-button__download-button")) {
		document.querySelector(".image-button__download-button").onclick = function(e) {
			document.querySelector(".image-button__download-modal").classList.add("b-modal--active");
		}
	}

	if (document.querySelector(".image-button__license-button")) {
		document.querySelector(".image-button__license-button").onclick = function(e) {
			document.querySelector(".image-button__license-modal").classList.add("b-modal--active");
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