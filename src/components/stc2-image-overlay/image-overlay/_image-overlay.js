
// --active

(function(){
	document.querySelector(".etc-image-overlay__close").onclick = function() {
		document.querySelector(".etc-image-overlay__container").classList.remove("etc-image-overlay__container--active");
		document.querySelector("body").style.overflowY = "auto";
	}

	function openObjectOverlay() {
		document.querySelector(".etc-image-overlay__container").classList.add("etc-image-overlay__container--active");
		document.querySelector("body").style.overflowY = "hidden";
		var scrollY = window.scrollY;
		document.querySelector(".etc-image-overlay__container").style.top = String(scrollY) + "px";
	}

	console.log(document.querySelector(".etc-image-overlay__container"));
	document.querySelector(".etc-image-overlay").addEventListener("openObjectOverlay", openObjectOverlay);

	Array.from(document.querySelectorAll(".etc-image-overlay__preview")).forEach(function(e) {
		e.onclick = function(e) {
			e.target.dispatchEvent(new CustomEvent("openObjectOverlay", {bubbles: true}));
		}
	})
})();