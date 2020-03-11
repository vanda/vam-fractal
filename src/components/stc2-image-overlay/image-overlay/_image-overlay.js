
// --active

(function(){
	document.querySelector(".etc-image-overlay__close").onclick = function() {
		document.querySelector(".etc-image-overlay__container").classList.remove("etc-image-overlay__container--active");
	}
	document.querySelector(".etc-image-overlay__preview").onclick = function() {
		document.querySelector(".etc-image-overlay__container").classList.add("etc-image-overlay__container--active");
	}	
})();