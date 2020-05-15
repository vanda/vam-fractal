(function(){
	if (document.querySelector(".b-image-overlay")) {
		document.querySelector(".b-image-overlay__close-container").onclick = function(e) {
			e.target.dispatchEvent(new Event("closedImageOverlay"), { bubbles: true });
			document.querySelector(".b-image-overlay__container").classList.remove("b-image-overlay__container--active");
			document.querySelector("body").style.overflowY = "auto";
		}

		function openObjectOverlay() {
			document.querySelector(".b-image-overlay__container").classList.add("b-image-overlay__container--active");
			document.querySelector("body").style.overflowY = "hidden";
			var scrollY = window.pageYOffset;
			document.querySelector(".b-image-overlay__container").style.top = String(scrollY) + "px";
		}

		document.querySelector(".b-image-overlay").addEventListener("openObjectOverlay", openObjectOverlay);
		document.querySelector(".b-image-overlay__container").addEventListener("jsModalOpen", function(e) {
			document.querySelector(".b-image-overlay__close-container").style.display = "none";
		});

		document.querySelector(".b-image-overlay__container").addEventListener("jsModalClosed", function(e) {
			document.querySelector(".b-image-overlay__close-container").style.display = "block";
		});

		Array.from(document.querySelectorAll(".b-image-overlay__preview")).forEach(function(e) {
			e.onclick = function(e) {
			    e.preventDefault();
				e.target.dispatchEvent(new CustomEvent("openObjectOverlay", {bubbles: true}));
			}
		})
	}
})();