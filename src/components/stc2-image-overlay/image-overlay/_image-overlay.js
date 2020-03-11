
// --active

(function(){
	document.querySelector(".etc-image-overlay__close").onclick = function() {
		document.querySelector(".etc-image-overlay__container").classList.remove("etc-image-overlay__container--active");
	}
	Array.from(document.querySelectorAll(".etc-image-overlay__preview")).forEach(function(e) {
		e.onclick = function() {
			document.querySelector(".etc-image-overlay__container").classList.add("etc-image-overlay__container--active");
		}
	})	
})();